import React from "react";
import { useRazorpaySubscription } from "../hooks/useRazorpaySubscription";

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

interface SubscriptionCardProps {
  planName: string;
  price: number;
  billingCycle: string;
  planId: string;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  planName,
  price,
  billingCycle,
  planId,
}) => {
  const { createSubscription, loading, error } = useRazorpaySubscription();

  const handleSubscribe = async () => {
    const payload: RazorpaySubscriptionData = {
      amount: price * 100, // Razorpay expects amount in paise
      currency: "INR",
      period: billingCycle,
      interval: 1,
      customer: {
        name: "Test User",
        email: "test@example.com",
        contact: "9876543210",
      },
      notes: {
        planName: planName,
        billingCycle: billingCycle,
        planId: planId,
      },
    };

    try {
      await createSubscription(payload);
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  return (
    <>
      <div className="p-4 md:w-1/2">
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
              {planName} - {billingCycle}
            </h1>
            <p className="leading-relaxed mb-3">
              Enjoy unlimited access with our {planName} plan.
            </p>
            <div className="mb-3">
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className={`px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-colors ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Processing..." : `Subscribe for ₹${price}`}
              </button>
              {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- SubscriptionOptions Component ---

const SubscriptionOptions: React.FC = () => {
  return (
    <div className="flex flex-wrap">
      <SubscriptionCard
        planName="Basic Plan"
        price={999}
        billingCycle="monthly"
        planId="plan_QNhURoGgIKf7UY"
      />
      <SubscriptionCard
        planName="Premium Plan"
        price={2499}
        billingCycle="monthly"
        planId="plan_QNhUi7ZQsFERZI"
      />
    </div>
  );
};

export default SubscriptionOptions;
