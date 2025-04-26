# Razorpay Subscription Integration

This project demonstrates how to integrate Razorpay subscriptions into a React application with a Node.js backend.

## Features

- Create and manage Razorpay subscriptions
- Process payments securely
- Verify payment signatures
- Display subscription details

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

4. Start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```

## Testing Payments in Test Mode

Razorpay provides a test mode that allows you to test the payment flow without making actual charges. Here's how to test payments:

### Test Card Details

Use these test card details when making a payment:

| Card Number | Expiry | CVV | Name | 3D Secure Password |
|-------------|--------|-----|------|-------------------|
| 4111 1111 1111 1111 | Any future date | Any 3 digits | Any name | 1221 |
| 5267 3181 8797 5449 | Any future date | Any 3 digits | Any name | 1221 |

### Test UPI Details

For UPI payments, use these test UPI IDs:
- `success@razorpay` - Successful payment
- `failure@razorpay` - Failed payment

### Test Netbanking Details

For netbanking, select any bank and use these credentials:
- Username: `razorpay`
- Password: `razorpay`

### Testing Subscription Flow

1. Select a subscription plan on the homepage
2. Click "Subscribe" to initiate the payment
3. In the Razorpay checkout popup, use the test card details above
4. For 3D Secure authentication, use the password: `1221`
5. After successful payment, you'll be redirected to the success page

### Common Test Scenarios

1. **Successful Payment**: Use card number `4111 1111 1111 1111`
2. **Failed Payment**: Use card number `4917 6100 0000 0000`
3. **Card Declined**: Use card number `4917 6100 0000 0000` with CVV `911`
4. **Insufficient Funds**: Use card number `4917 6100 0000 0000` with CVV `911`

## Production Deployment

When moving to production:

1. Replace the test API keys with your live Razorpay API keys
2. Update the webhook URL to your production domain
3. Implement proper error handling and logging
4. Add user authentication to protect subscription data

## Troubleshooting

If you encounter issues:

1. Check the browser console for errors
2. Verify that the backend server is running
3. Ensure you're using the correct API keys
4. Check the Razorpay dashboard for payment status

## Resources

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Test Mode Guide](https://razorpay.com/docs/payments/payments/test-card-details/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Node.js Documentation](https://nodejs.org/en/docs/)




