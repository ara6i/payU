import { Request, Response } from "express";
import { PayData } from "../config/payu.config";
import crypto from "crypto";

interface PaymentRequest {
  amount: number;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string | number;
}

export const initiatePayment = async (
  req: Request<{}, {}, PaymentRequest>,
  res: Response
) => {
  try {
    const txn_id = "PAYU_MONEY_" + Math.floor(Math.random() * 8888888);
    const { amount, productinfo, firstname, email, phone } = req.body;

    const udf1 = "";
    const udf2 = "";
    const udf3 = "";
    const udf4 = "";
    const udf5 = "";
    const si_details = {}; // Empty si_details for regular payments

    // Calculate hash using PayU's formula
    const hashString = `${
      PayData.payu_key
    }|${txn_id}|${amount}|${JSON.stringify(
      productinfo
    )}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${JSON.stringify(
      si_details
    )}|${PayData.payu_salt}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    const data = await PayData.payuClient.paymentInitiate({
      isAmountFilledByCustomer: false,
      txnid: txn_id,
      amount: amount,
      currency: "INR",
      productinfo: productinfo,
      firstname: firstname,
      email: email,
      phone: phone,
      surl: `http://localhost:4000/verify/${txn_id}`,
      furl: `http://localhost:4000/verify/${txn_id}`,
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
    const { amount, productinfo, firstname, email, phone, si_details } =
      req.body;

    console.log("Request Body:", req.body);
    console.log("si_details:", si_details);

    // Format amount to 2 decimal places as string
    const formattedAmount = parseFloat(amount).toFixed(2);
    const formattedPhone = String(phone).padStart(10, "0");

    // Format si_details to match PayU's sample format exactly
    const formattedSiDetails = JSON.stringify({
      billingAmount: formattedAmount,
      billingCurrency: "INR",
      billingCycle: si_details.billingCycle,
      billingInterval: si_details.billingInterval,
      paymentStartDate: si_details.paymentStartDate,
      paymentEndDate: si_details.paymentEndDate,
    });

    // --- Verification Logs Before Hash Calculation ---
    console.log("--- Hash Components ---");
    console.log("1. Key:", PayData.payu_key);
    console.log("2. Txn ID:", txn_id);
    console.log("3. Amount:", formattedAmount);
    console.log("4. Product Info:", productinfo);
    console.log("5. First Name:", firstname);
    console.log("6. Email:", email);
    console.log("7. UDFs + Extra Pipes:", "|||||||||||"); // 5 UDFs + 5 extra = 10 pipes
    console.log("8. SI Details JSON:", formattedSiDetails);
    console.log("9. Salt:", PayData.payu_salt);
    console.log("------------------------");

    // Calculate hash using PayU's formula for subscription
    // Format: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||si_details|salt
    const hashString = `${PayData.payu_key}|${txn_id}|${formattedAmount}|${productinfo}|${firstname}|${email}|||||||||||${formattedSiDetails}|${PayData.payu_salt}`;

    console.log("Hash String:", hashString);

    const hash = crypto.createHash("sha512").update(hashString).digest("hex");
    console.log("Calculated Hash:", hash);

    // Create form data parameters object
    const params = {
        key: PayData.payu_key,
        txnid: txn_id,
        amount: formattedAmount,
        firstname: firstname,
        email: email,
        phone: formattedPhone,
        productinfo: productinfo,
        si: "1",
        api_version: "7",
        surl: `http://localhost:4000/verify/${txn_id}`,
        furl: `http://localhost:4000/verify/${txn_id}`,
        si_details: formattedSiDetails,
        hash: hash
    };

    console.log("Form Params:", params);

    // --- Construct the HTML auto-submitting form --- 
    // Use the production URL unless PayU specifies a different one for SI setup
    const payuUrl = "https://secure.payu.in/_payment"; 
    let htmlForm = `<html>
      <head>
        <title>Redirecting to PayU...</title>
      </head>
      <body onload="document.getElementById('payment_post').submit();">
        <form id="payment_post" action="${payuUrl}" method="post">
    `;

    // Add hidden fields for all parameters
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            htmlForm += `<input type="hidden" name="${key}" value="${params[key as keyof typeof params].replace(/"/g, '&quot;')}" />\n`;
        }
    }

    htmlForm += `
        </form>
        <p>Redirecting to PayU... Please wait.</p>
        <script type="text/javascript">
          document.getElementById('payment_post').submit();
        </script>
      </body>
    </html>`;

    // Send the HTML form back to the frontend
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlForm);

  } catch (error: any) {
    console.error("Error creating subscription:", error);
    res.status(500).json({
      message: "Failed to create subscription",
      error: error.message,
      details: error.response?.data,
    });
  }
};
