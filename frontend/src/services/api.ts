import axios from 'axios';
import { PaymentFormData, PaymentResponse, PaymentStatus } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Initiates a payment with PayU
 * @param data - The payment form data
 * @returns Promise with payment response containing the form HTML
 */
export const initiatePayment = async (data: PaymentFormData): Promise<PaymentResponse> => {
  try {
    const response = await api.post<PaymentResponse>('/payments/initiate', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to initiate payment');
    }
    throw error;
  }
};

/**
 * Verifies the payment status with PayU
 * @param txnid - The transaction ID from PayU
 * @returns Promise with payment status
 */
export const verifyPayment = async (txnid: string): Promise<PaymentStatus> => {
  try {
    const response = await api.get<PaymentStatus>(`/payments/verify/${txnid}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to verify payment');
    }
    throw error;
  }
}; 