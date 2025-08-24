-- Seed data for Energy Billing System
-- Insert sample users (passwords should be hashed in real application)

INSERT INTO users (username, email, password_hash, role, first_name, last_name, address, phone) VALUES
('admin', 'admin@energybilling.com', '$2a$10$example.hash.for.admin.password', 'ADMIN', 'System', 'Administrator', '123 Admin St, City, State 12345', '555-0001'),
('john.doe', 'john.doe@email.com', '$2a$10$example.hash.for.user.password', 'USER', 'John', 'Doe', '456 Oak Ave, City, State 12345', '555-0002'),
('jane.smith', 'jane.smith@email.com', '$2a$10$example.hash.for.user.password', 'USER', 'Jane', 'Smith', '789 Pine St, City, State 12345', '555-0003'),
('bob.wilson', 'bob.wilson@email.com', '$2a$10$example.hash.for.user.password', 'USER', 'Bob', 'Wilson', '321 Elm Dr, City, State 12345', '555-0004');

-- Insert sample energy readings for the past 3 months
INSERT INTO energy_readings (user_id, reading_date, kwh_consumed, meter_number, reading_type) VALUES
-- John Doe's readings
(2, '2024-01-01', 450.50, 'MTR001', 'MANUAL'),
(2, '2024-01-15', 425.75, 'MTR001', 'MANUAL'),
(2, '2024-02-01', 380.25, 'MTR001', 'MANUAL'),
(2, '2024-02-15', 410.00, 'MTR001', 'MANUAL'),
(2, '2024-03-01', 395.80, 'MTR001', 'MANUAL'),
(2, '2024-03-15', 420.30, 'MTR001', 'MANUAL'),

-- Jane Smith's readings
(3, '2024-01-01', 320.75, 'MTR002', 'AUTOMATIC'),
(3, '2024-01-15', 335.50, 'MTR002', 'AUTOMATIC'),
(3, '2024-02-01', 298.25, 'MTR002', 'AUTOMATIC'),
(3, '2024-02-15', 315.80, 'MTR002', 'AUTOMATIC'),
(3, '2024-03-01', 342.10, 'MTR002', 'AUTOMATIC'),
(3, '2024-03-15', 358.90, 'MTR002', 'AUTOMATIC'),

-- Bob Wilson's readings
(4, '2024-01-01', 520.25, 'MTR003', 'MANUAL'),
(4, '2024-01-15', 495.75, 'MTR003', 'MANUAL'),
(4, '2024-02-01', 475.50, 'MTR003', 'MANUAL'),
(4, '2024-02-15', 510.25, 'MTR003', 'MANUAL'),
(4, '2024-03-01', 485.75, 'MTR003', 'MANUAL'),
(4, '2024-03-15', 502.40, 'MTR003', 'MANUAL');

-- Insert sample bills
INSERT INTO bills (user_id, bill_number, billing_period_start, billing_period_end, total_kwh, rate_per_kwh, subtotal, tax_amount, total_amount, status, due_date) VALUES
(2, 'BILL-2024-001', '2024-01-01', '2024-01-31', 876.25, 0.12, 105.15, 8.41, 113.56, 'PAID', '2024-02-28'),
(2, 'BILL-2024-002', '2024-02-01', '2024-02-29', 790.25, 0.12, 94.83, 7.59, 102.42, 'PAID', '2024-03-31'),
(2, 'BILL-2024-003', '2024-03-01', '2024-03-31', 816.10, 0.12, 97.93, 7.83, 105.76, 'PENDING', '2024-04-30'),

(3, 'BILL-2024-004', '2024-01-01', '2024-01-31', 656.25, 0.12, 78.75, 6.30, 85.05, 'PAID', '2024-02-28'),
(3, 'BILL-2024-005', '2024-02-01', '2024-02-29', 614.05, 0.12, 73.69, 5.90, 79.59, 'PAID', '2024-03-31'),
(3, 'BILL-2024-006', '2024-03-01', '2024-03-31', 701.00, 0.12, 84.12, 6.73, 90.85, 'PENDING', '2024-04-30'),

(4, 'BILL-2024-007', '2024-01-01', '2024-01-31', 1016.00, 0.12, 121.92, 9.75, 131.67, 'PAID', '2024-02-28'),
(4, 'BILL-2024-008', '2024-02-01', '2024-02-29', 985.75, 0.12, 118.29, 9.46, 127.75, 'OVERDUE', '2024-03-31'),
(4, 'BILL-2024-009', '2024-03-01', '2024-03-31', 988.15, 0.12, 118.58, 9.49, 128.07, 'PENDING', '2024-04-30');

-- Insert sample payment records for paid bills
INSERT INTO payments (bill_id, stripe_payment_intent_id, amount, currency, status, payment_method, paid_at) VALUES
(1, 'pi_1234567890abcdef', 113.56, 'USD', 'SUCCEEDED', 'card', '2024-02-15 10:30:00'),
(2, 'pi_abcdef1234567890', 102.42, 'USD', 'SUCCEEDED', 'card', '2024-03-10 14:22:00'),
(4, 'pi_fedcba0987654321', 85.05, 'USD', 'SUCCEEDED', 'card', '2024-02-20 09:15:00'),
(5, 'pi_123abc456def789', 79.59, 'USD', 'SUCCEEDED', 'card', '2024-03-25 16:45:00'),
(7, 'pi_789def123abc456', 131.67, 'USD', 'SUCCEEDED', 'card', '2024-02-28 11:20:00');

-- Update paid_at timestamps for paid bills
UPDATE bills SET paid_at = '2024-02-15 10:30:00' WHERE id = 1;
UPDATE bills SET paid_at = '2024-03-10 14:22:00' WHERE id = 2;
UPDATE bills SET paid_at = '2024-02-20 09:15:00' WHERE id = 4;
UPDATE bills SET paid_at = '2024-03-25 16:45:00' WHERE id = 5;
UPDATE bills SET paid_at = '2024-02-28 11:20:00' WHERE id = 7;
