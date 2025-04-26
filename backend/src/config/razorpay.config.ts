import Razorpay from 'razorpay';

// Razorpay configuration
export const razorpay_key_id = "rzp_test_nSSL5BwGwBOa7M";
export const razorpay_key_secret = "cKjnM6my3J0lgChjplydCocl";

console.log('Loading Razorpay configuration:', {
  key_id: razorpay_key_id,
  key_secret: razorpay_key_secret ? '***' : undefined
});

// Initialize Razorpay client
export const razorpayClient = new Razorpay({
  key_id: razorpay_key_id,
  key_secret: razorpay_key_secret,
});

// Export configuration data
export const RazorpayData = {
  client: razorpayClient,
  key_id: razorpay_key_id,
  key_secret: razorpay_key_secret,
}; 