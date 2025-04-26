import { Request, Response } from "express";
import crypto from "crypto";
import { razorpayService } from '../services/razorpayService';
import { SubscriptionCreateOptions } from '../types/razorpay';
import { razorpay_key_secret } from '../config/razorpay.config';

interface SubscriptionRequest {
  amount: number;
  currency: string;
  period: string;
  interval: number;
  customer: {
    name: string;
    email: string;
    contact: string;
  };
  notes?: {
    [key: string]: string;
  };
}

interface SubscriptionResponse {
  success: boolean;
  subscription?: any;
  error?: string;
}

export const createSubscription = async (req: Request, res: Response) => {
  try {
    console.log('Received subscription request:', req.body);
    
    // Extract customer data from the request
    const { customer, notes } = req.body;
    
    if (!req.body.planId) {
      return res.status(400).json({ error: 'Plan ID is required' });
    }

    // Calculate timestamps - set start_at to 5 minutes in the future to ensure it's not past
    const currentTime = Math.floor(Date.now() / 1000);
    const startAt = currentTime + 300; // Start 5 minutes from now
    const expireBy = startAt + (30 * 24 * 60 * 60); // 30 days from start time

    const subscriptionOptions: SubscriptionCreateOptions = {
      plan_id: req.body.planId,
      customer_notify: 1,
      total_count: 12, // 12 months subscription
      quantity: 1,
      start_at: startAt,
      expire_by: expireBy,
      notify_info: {
        notify_phone: customer?.contact || '9876543210',
        notify_email: customer?.email || 'test@example.com'
      }
    };

    console.log('Creating subscription with options:', subscriptionOptions);
    const subscription = await razorpayService.createSubscription(subscriptionOptions);
    res.json(subscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
};

export const getSubscription = async (req: Request, res: Response) => {
  try {
    const subscriptionId = req.params.subscriptionId;
    const subscription = await razorpayService.getSubscription(subscriptionId);
    res.json(subscription);
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ error: 'Failed to fetch subscription' });
  }
};

export const verifySubscription = async (req: Request, res: Response) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature
    } = req.body;

    console.log('Verifying subscription payment:', {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature
    });

    // Validate required fields
    if (!razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    // Verify the signature
    const body = razorpay_payment_id + "|" + razorpay_subscription_id;
    const expectedSignature = crypto
      .createHmac("sha256", razorpay_key_secret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is successful and verified
      // Get subscription details
      const subscription = await razorpayService.getSubscription(razorpay_subscription_id);
      
      // Here you would typically update your database to mark the subscription as active
      // For example: await db.subscriptions.update({ id: razorpay_subscription_id }, { status: 'active' });
      
      res.json({
        success: true,
        message: "Payment verified successfully",
        subscription
      });
    } else {
      console.error('Invalid signature. Expected:', expectedSignature, 'Received:', razorpay_signature);
      res.status(400).json({
        success: false,
        error: "Invalid signature"
      });
    }
  } catch (error) {
    console.error("Error verifying subscription:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to verify subscription"
    });
  }
};

export const cancelSubscription = async (req: Request, res: Response) => {
  try {
    const subscriptionId = req.params.subscriptionId;
    const subscription = await razorpayService.cancelSubscription(subscriptionId);
    res.json(subscription);
  } catch (error) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
}; 