import { useState, useEffect } from 'react';
import axios from 'axios';
import { PaymentFormData } from '../types';

/**
 * Custom hook for handling PayU payment functionality
 * @returns Object containing payment form state and payment handler function
 */
export const usePayment = () => {
  const [form, setForm] = useState<string>('');

  useEffect(() => {
    const formData = document.getElementById('payment_post') as HTMLFormElement;
    if (formData) {
      formData.submit();
    }
  }, [form]);

  /**
   * Initiates a payment transaction with PayU
   * @param data Payment form data
   */
  const initiatePayment = async (data: PaymentFormData): Promise<void> => {
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
    initiatePayment
  };
}; 