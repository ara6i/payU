import { Request, Response } from "express";
import { PayData } from "../config/payu.config";
import crypto from "crypto";
import axios from "axios";

interface PaymentRequest {
  amount: number;
  product: any;
  firstname: string;
  email: string;
  mobile: string | number;
}

export const initiatePayment = async (
  req: Request<{}, {}, PaymentRequest>,
  res: Response
) => {
  try {
    const txn_id = "PAYU_MONEY_" + Math.floor(Math.random() * 8888888);
    const { amount, product, firstname, email, mobile } = req.body;

    const udf1 = "";
    const udf2 = "";
    const udf3 = "";
    const udf4 = "";
    const udf5 = "";

    const hashString = `${
      PayData.payu_key
    }|${txn_id}|${amount}|${JSON.stringify(
      product
    )}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${
      PayData.payu_salt
    }`;

    // Calculate the hash
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    const data = await PayData.payuClient.paymentInitiate({
      isAmountFilledByCustomer: false,
      txnid: txn_id,
      amount: amount,
      currency: "INR",
      productinfo: JSON.stringify(product),
      firstname: firstname,
      email: email,
      phone: mobile,
      surl: `http://localhost:${process.env.PORT}/verify/${txn_id}`,
      furl: `http://localhost:${process.env.PORT}/verify/${txn_id}`,
      hash,
    });

    res.send(data);
  } catch (error: any) {
    res.status(400).send({
      msg: error.message,
      stack: error.stack,
    });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  const verified_Data = await PayData.payuClient.verifyPayment(
    req.params.txnid
  );
  const data = verified_Data.transaction_details[req.params.txnid];

  res.redirect(`http://localhost:5173/payment/${data.status}/${data.txnid}`);
};

export const createSubscription = async (req: Request, res: Response) => {
  try {
    const txn_id = "PAYU_MONEY_" + Math.floor(Math.random() * 8888888);
    const { amount, product, firstname, email, phone, si_details } = req.body;

    const udf1 = "";
    const udf2 = "";
    const udf3 = "";
    const udf4 = "";
    const udf5 = "";

    const hashString = `${
      PayData.payu_key
    }|${txn_id}|${amount}|${JSON.stringify(
      product
    )}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${
      PayData.payu_salt
    }`;

    // Calculate the hash
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    const response = await axios.post("https://secure.payu.in/_payment", null, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        key: PayData.payu_key,
        txnid: txn_id,
        amount,
        firstname,
        email,
        phone,
        productinfo: JSON.stringify(product),
        si: 4,
        surl: `http://localhost:${process.env.PORT}/verify/${txn_id}`,
        furl: `http://localhost:${process.env.PORT}/verify/${txn_id}`,
        si_details,
        hash,
      },
    });

    res
      .status(200)
      .json({
        message: "Subscription created successfully",
        data: response.data,
      });
  } catch (error: any) {
    console.error("Error creating subscription:", error);
    res
      .status(500)
      .json({ message: "Failed to create subscription", error: error.message });
  }
};
