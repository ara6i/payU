import { useState } from "react";
import axios from "axios";
// Define types locally since types.ts was deleted
interface PaymentFormData {
  amount: number | string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string | number;
}

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

/**
 * Custom hook for handling the Buy Now functionality
 * @returns Object containing the form state and BuyNowHandler function
 */
export const useBuyNowHandler = () => {
  const [form, setForm] = useState<string>("");

  /**
   * Handles the Buy Now action by initiating a payment
   * @param data Payment form data
   */
  const BuyNowHandler = async (data: PaymentFormData): Promise<void> => {
    try {
      // Make sure this endpoint is correct for regular payments
      const response = await axios.post<string>(
        "http://localhost:4000/get-payment", // Changed based on previous context
        data
      );
      setForm(response.data);
    } catch (error: any) {
      console.error(error.response?.data?.msg || error.message);
    }
  };

  // Updated function to accept SubscriptionFormData
  const subscription = async (data: SubscriptionFormData): Promise<void> => {
    try {
      const response = await axios.post<string>(
        "http://localhost:4000/create-subscription",
        data
      );
      setForm(response.data);
    } catch (error: any) {
      console.error(error.response?.data?.msg || error.message);
    }
  };

  return {
    form,
    BuyNowHandler,
    subscription,
  };
};
