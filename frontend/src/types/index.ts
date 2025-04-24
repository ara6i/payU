/**
 * Product interface representing an item in the e-commerce store
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

/**
 * Payment form data interface for initiating payments
 */
export interface PaymentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  amount: number;
  productInfo: string;
}

/**
 * Payment response interface from the backend
 */
export interface PaymentResponse {
  txnid: string;
  amount: number;
  productInfo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  key: string;
  hash: string;
  formHtml: string;
}

/**
 * Payment status interface for payment verification
 */
export interface PaymentStatus {
  txnid: string;
  status: 'success' | 'failure' | 'pending';
  message: string;
  amount?: number;
  bankRefNum?: string;
  paymentMode?: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}
