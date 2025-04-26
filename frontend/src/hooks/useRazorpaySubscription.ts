import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface RazorpaySubscriptionData {
  amount: number;
  currency: string;
  period: string;
  interval: number;
  customer: {
    name: string;
    email: string;
    contact: string;
  };
  notes?: {
    [key: string]: string | undefined;
  };
}

interface RazorpayResponse {
  id: string;
  short_url: string;
  status: string;
}

interface VerificationResponse {
  success: boolean;
  message: string;
  subscription?: any;
}

export const useRazorpaySubscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const createSubscription = async (data: RazorpaySubscriptionData) => {
    try {
      setLoading(true);
      setError(null);

      // Extract planId from notes
      const planId = data.notes?.planId;
      
      if (!planId) {
        throw new Error('Plan ID is required');
      }

      // Create subscription through our backend
      const response = await axios.post<RazorpayResponse>(
        'http://localhost:4000/razorpay/subscriptions',
        {
          ...data,
          planId // Add planId to the request body
        }
      );

      const { id, short_url } = response.data;

      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: 'rzp_test_nSSL5BwGwBOa7M',
          subscription_id: id,
          name: 'Your Company Name',
          description: 'Subscription Payment',
          handler: async (response: any) => {
            try {
              // Verify the subscription payment
              const verificationResponse = await axios.post<VerificationResponse>(
                'http://localhost:4000/razorpay/verify-subscription', 
                {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_subscription_id: response.razorpay_subscription_id,
                  razorpay_signature: response.razorpay_signature
                }
              );

              if (verificationResponse.data.success) {
                // Redirect to success page with subscription details
                navigate(`/subscription/success?subscription_id=${id}&plan_name=${data.notes?.planName}`);
              } else {
                setError('Payment verification failed: ' + verificationResponse.data.message);
              }
            } catch (error) {
              console.error('Subscription verification failed:', error);
              setError('Subscription verification failed. Please contact support.');
            }
          },
          modal: {
            ondismiss: () => {
              setLoading(false);
            }
          },
          prefill: {
            name: data.customer.name,
            email: data.customer.email,
            contact: data.customer.contact
          },
          theme: {
            color: '#3399cc'
          }
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      };

      script.onerror = () => {
        setError('Failed to load Razorpay script. Please try again.');
        setLoading(false);
      };

    } catch (error) {
      console.error('Subscription creation failed:', error);
      setError('Failed to create subscription. Please try again.');
      setLoading(false);
    }
  };

  return {
    createSubscription,
    loading,
    error
  };
}; 