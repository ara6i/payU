import PayU from 'payu-websdk';

const payu_key: string = process.env.MERCHANT_KEY || '';
const payu_salt: string = process.env.MERCHANT_SALT || '';

// create a client
const payuClient = new PayU({
  key: payu_key,
  salt: payu_salt
}, process.env.PAYU_ENVIRONMENT);

interface PayData {
  payuClient: PayU;
  payu_key: string;
  payu_salt: string;
}

export const PayData: PayData = {
  payuClient,
  payu_key,
  payu_salt
}; 