declare module 'payu-websdk' {
  interface PayUConfig {
    key: string;
    salt: string;
  }

  interface PaymentInitiateParams {
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

  interface TransactionDetails {
    status: string;
    amt: string;
    txnid: string;
    mode: string;
    error_Message: string;
    addedon: string;
  }

  interface VerifiedPaymentResponse {
    transaction_details: {
      [key: string]: TransactionDetails;
    };
  }

  class PayU {
    constructor(config: PayUConfig, environment?: string);
    paymentInitiate(params: PaymentInitiateParams): Promise<any>;
    verifyPayment(txnid: string): Promise<VerifiedPaymentResponse>;
  }

  export default PayU;
} 