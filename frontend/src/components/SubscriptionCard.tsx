import React from "react";
import axios from "axios";

interface SubscriptionCardProps {
  planName: string;
  price: number;
  billingCycle: string;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  planName,
  price,
  billingCycle,
}) => {
  const handleSubscribe = async () => {
    try {
      const si_details = JSON.stringify({
        billingAmount: price.toFixed(2),
        billingCurrency: "INR",
        billingCycle: billingCycle.toUpperCase(),
        billingInterval: 1,
        paymentStartDate: new Date().toISOString().split("T")[0], // Start date as today
        paymentEndDate: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        )
          .toISOString()
          .split("T")[0], // End date as one year from today
      });

      const response = await axios.post(
        "http://localhost:4000/create-subscription",
        {
          amount: price,
          firstname: "PayU User",
          email: "ara6i.sn@gmail.com",
          phone: "1111111",
          productinfo: planName,
          si_details,
          customParameter: {
            Policynumber: "12743123133",
            Policytype: "Terms Insurance",
          },
        }
      );

      alert("Subscription created successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating subscription:", error.response?.data);
        alert(`Failed to create subscription: ${error.response?.data?.message || error.message}`);
      } else {
        console.error("Error creating subscription:", error);
        alert("Failed to create subscription. Please try again.");
      }
    }
  };

  return (
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
              onClick={handleSubscribe}
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow"
            >
              Subscribe for ${price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SubscriptionOptions = () => {
  return (
    <div className="flex flex-wrap">
      <SubscriptionCard
        planName="Basic Plan"
        price={100}
        billingCycle="monthly"
      />
      <SubscriptionCard
        planName="Standard Plan"
        price={250}
        billingCycle="weekly"
      />
      <SubscriptionCard
        planName="Premium Plan"
        price={900}
        billingCycle="yearly"
      />
    </div>
  );
};

export default SubscriptionOptions;
