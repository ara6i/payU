import PayU from "payu-websdk";

export const payu_key: string = "mPs1j7";
export const payu_salt: string = "hVdYQjtvgH9SjwnsooMXnH3oxKCQr8yO";
export const payu_environment: string = "PROD";

// create a client
const payuClient = new PayU(
  {
    key: payu_key,
    salt: payu_salt,
  },
  payu_environment
);

interface PayData {
  payuClient: PayU;
  payu_key: string;
  payu_salt: string;
}

export const PayData: PayData = {
  payuClient,
  payu_key,
  payu_salt,
};
