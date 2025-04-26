import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface SubscriptionDetails {
  id: string;
  status: string;
  plan_id: string;
  short_url: string;
}

const SubscriptionSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        // Get subscription ID from URL params
        const params = new URLSearchParams(location.search);
        const subscriptionId = params.get('subscription_id');
        const planName = params.get('plan_name');

        if (!subscriptionId) {
          setError('No subscription ID found');
          setLoading(false);
          return;
        }

        // Fetch subscription details from backend
        const response = await axios.get(`http://localhost:4000/razorpay/subscriptions/${subscriptionId}`);
        setSubscriptionDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subscription details:', error);
        setError('Failed to fetch subscription details');
        setLoading(false);
      }
    };

    fetchSubscriptionDetails();
  }, [location]);

  const handleViewSubscription = () => {
    if (subscriptionDetails?.short_url) {
      window.open(subscriptionDetails.short_url, '_blank');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error</div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={handleBackToHome}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Payment Successful!</h1>
          <p className="text-gray-600 mt-2">Your subscription has been activated.</p>
        </div>

        {subscriptionDetails && (
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Subscription Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subscription ID:</span>
                <span className="font-medium">{subscriptionDetails.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${
                  subscriptionDetails.status === 'active' ? 'text-green-500' : 'text-yellow-500'
                }`}>
                  {subscriptionDetails.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium">{new URLSearchParams(location.search).get('plan_name') || 'Unknown'}</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col space-y-3">
          <button
            onClick={handleViewSubscription}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-colors"
          >
            View Subscription
          </button>
          <button
            onClick={handleBackToHome}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow hover:bg-gray-300 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess; 