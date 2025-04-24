import { useState } from 'react';
import axios from 'axios';
import { PaymentFormData } from '../types';

/**
 * Custom hook for handling the Buy Now functionality
 * @returns Object containing the form state and BuyNowHandler function
 */
export const useBuyNowHandler = () => {
  const [form, setForm] = useState<string>('');

  /**
   * Handles the Buy Now action by initiating a payment
   * @param data Payment form data
   */
  const BuyNowHandler = async (data: PaymentFormData): Promise<void> => {
    try {
      const response = await axios.post<string>(
        'http://localhost:4000/get-payment',
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
  };
}; 