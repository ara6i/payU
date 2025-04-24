import { Request, Response } from 'express';
import { PayData } from '../config/payu.config';
import crypto from 'crypto';

interface PaymentRequest {
  amount: number;
  product: any;
  firstname: string;
  email: string;
  mobile: string | number;
}

export const initiatePayment = async (req: Request<{}, {}, PaymentRequest>, res: Response) => {
  try {
    const txn_id = 'PAYU_MONEY_' + Math.floor(Math.random() * 8888888);
    const { amount, product, firstname, email, mobile } = req.body;

    const udf1 = '';
    const udf2 = '';
    const udf3 = '';
    const udf4 = '';
    const udf5 = '';

    const hashString = `${PayData.payu_key}|${txn_id}|${amount}|${JSON.stringify(product)}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${PayData.payu_salt}`;

    // Calculate the hash
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');

    const data = await PayData.payuClient.paymentInitiate({
      isAmountFilledByCustomer: false,
      txnid: txn_id,
      amount: amount,
      currency: 'INR',
      productinfo: JSON.stringify(product),
      firstname: firstname,
      email: email,
      phone: mobile,
      surl: `http://localhost:${process.env.PORT}/verify/${txn_id}`,
      furl: `http://localhost:${process.env.PORT}/verify/${txn_id}`,
      hash
    });

    res.send(data);
  } catch (error: any) {
    res.status(400).send({
      msg: error.message,
      stack: error.stack
    });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  const verified_Data = await PayData.payuClient.verifyPayment(req.params.txnid);
  const data = verified_Data.transaction_details[req.params.txnid];

  res.redirect(`http://localhost:5173/payment/${data.status}/${data.txnid}`);
}; 