import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { getApi } from '../lib/api'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')

export default function StripePayButton({ billId }) {
  async function pay() {
    const api = getApi()
    const { data } = await api.post('/api/stripe/create-checkout-session', null, { params: { billId } })
    if (data.error) { alert(data.error); return }
    const stripe = await stripePromise
    if (!stripe) { alert('Stripe not configured'); return }
    if (data.url) { window.location.href = data.url; return }
    if (data.id) await stripe.redirectToCheckout({ sessionId: data.id })
  }
  return <button onClick={pay}>Pay with Stripe</button>
}
