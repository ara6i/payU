export interface PayUConfig {
  key: string;
  salt: string;
}

export interface PaymentInitiateParams {
  isAmountFilledByCustomer: boolean;
  txnid: string;
  amount: number;
  currency: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string | number;
  surl: string;
  furl: string;
  hash: string;
}

export interface TransactionDetails {
  status: string;
  amt: string;
  txnid: string;
  mode: string;
  error_Message: string;
  addedon: string;
}

export interface VerifiedPaymentResponse {
  transaction_details: {
    [key: string]: TransactionDetails;
  };
}

export interface PayData {
  payuClient: any; // Using any here as the PayU SDK doesn't provide TypeScript types
  payu_key: string;
  payu_salt: string;
} 