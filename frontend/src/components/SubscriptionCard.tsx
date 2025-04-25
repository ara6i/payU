import React from "react";
import axios from "axios";

// Define SubscriptionFormData locally if types.ts is deleted
interface SubscriptionFormData {
  amount: number | string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string | number;
  si_details: {
    billingAmount: string;
    billingCurrency: string;
    billingCycle: string;
    billingInterval: number;
    paymentStartDate: string;
    paymentEndDate: string;
  };
  api_version: string;
  si: string;
}

// Prop type for the individual card
interface SubscriptionCardProps {
  planName: string;
  price: number;
  billingCycle: string;
  // Expect the handler function from the hook
  subscriptionHandler: (data: SubscriptionFormData) => Promise<void>;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  planName,
  price,
  billingCycle,
  subscriptionHandler, // Destructure the handler
}) => {

  const handleSubscribe = async () => {
    // Format data for the hook function
    const formattedAmount = price.toFixed(2);
    const payload: SubscriptionFormData = {
        amount: formattedAmount,
        firstname: "PayU User", // Make dynamic if needed
        email: "ara6i.sn@gmail.com", // Make dynamic if needed
        phone: "9876543210", // Make dynamic if needed
        productinfo: `Subscription for ${planName} - ${billingCycle}`,
        si_details: {
            billingAmount: formattedAmount,
            billingCurrency: "INR",
            billingCycle: billingCycle.toUpperCase(),
            billingInterval: 1,
            paymentStartDate: new Date().toISOString().split("T")[0],
            paymentEndDate: new Date(
              new Date().setFullYear(new Date().getFullYear() + 1)
            ).toISOString().split("T")[0],
        },
        api_version: "7",
        si: "1",
    };

    // Call the handler passed from the hook
    await subscriptionHandler(payload);

    // Error handling is now done within the hook
  };

  return (
    <>
      <div className="p-4 md:w-1/3">
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
                onClick={handleSubscribe} // Calls the function above
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow"
              >
                Subscribe for ${price}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- SubscriptionOptions Component --- 

// Prop type for the options wrapper
interface SubscriptionOptionsProps {
  subscriptionHandler: (data: SubscriptionFormData) => Promise<void>;
}

const SubscriptionOptions: React.FC<SubscriptionOptionsProps> = ({ subscriptionHandler }) => {
  return (
    <div className="flex flex-wrap">
      <SubscriptionCard
        planName="Basic Plan"
        price={100}
        billingCycle="monthly"
        subscriptionHandler={subscriptionHandler} // Pass down the prop
      />
      <SubscriptionCard
        planName="Standard Plan"
        price={250}
        billingCycle="weekly"
        subscriptionHandler={subscriptionHandler} // Pass down the prop
      />
      <SubscriptionCard
        planName="Premium Plan"
        price={900}
        billingCycle="yearly"
        subscriptionHandler={subscriptionHandler} // Pass down the prop
      />
    </div>
  );
};

export default SubscriptionOptions;
