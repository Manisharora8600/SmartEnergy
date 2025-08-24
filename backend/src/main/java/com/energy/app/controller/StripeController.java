package com.energy.app.controller;

import com.energy.app.model.Bill;
import com.energy.app.repo.BillRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController @RequestMapping("/api/stripe")
public class StripeController {

  @Value("${stripe.secret-key:}") private String stripeSecret;
  @Value("${stripe.publishable-key:}") private String publishable;
  @Value("${stripe.success-url}") private String successUrl;
  @Value("${stripe.cancel-url}") private String cancelUrl;
  @Value("${stripe.webhook-secret:}") private String webhookSecret;

  private final BillRepository bills;
  public StripeController(BillRepository bills) { this.bills = bills; }

  @PostMapping("/create-checkout-session")
  public Map<String,Object> createCheckout(@RequestParam Long billId) throws StripeException {
    if (stripeSecret == null || stripeSecret.isBlank()) return Map.of("error","Stripe not configured. Set stripe.secret-key.");
    Stripe.apiKey = stripeSecret;
    Bill b = bills.findById(billId).orElseThrow();
    long amount = Math.round(b.getAmount() * 100);

    SessionCreateParams params = SessionCreateParams.builder()
        .setMode(SessionCreateParams.Mode.PAYMENT)
        .setSuccessUrl(successUrl)
        .setCancelUrl(cancelUrl)
        .addLineItem(SessionCreateParams.LineItem.builder()
            .setQuantity(1L)
            .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                .setCurrency("inr")
                .setUnitAmount(amount)
                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                    .setName("Electricity Bill #" + b.getId())
                    .build())
                .build())
            .build())
        .putMetadata("billId", String.valueOf(b.getId()))
        .build();

    Session session = Session.create(params);
    return Map.of("id", session.getId(), "url", session.getUrl(), "publishableKey", publishable);
  }

  @PostMapping("/webhook")
  public Map<String,Object> webhook(@RequestHeader("Stripe-Signature") String sig, @RequestBody String payload) {
    if (webhookSecret == null || webhookSecret.isBlank()) return Map.of("error","Webhook secret not configured");
    try {
      Event event = Webhook.constructEvent(payload, sig, webhookSecret);
      if ("checkout.session.completed".equals(event.getType())) {
        var deser = event.getDataObjectDeserializer();
        if (deser.getObject().isPresent()) {
          Session session = (Session) deser.getObject().get();
          String billIdStr = session.getMetadata() != null ? session.getMetadata().get("billId") : null;
          if (billIdStr != null) {
            Long billId = Long.parseLong(billIdStr);
            var b = bills.findById(billId).orElse(null);
            if (b != null) { b.setStatus(Bill.Status.PAID); bills.save(b); }
          }
        }
      }
      return Map.of("status","ok");
    } catch (Exception e) {
      return Map.of("error","Invalid webhook: " + e.getMessage());
    }
  }
}
