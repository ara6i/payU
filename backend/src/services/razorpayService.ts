import Razorpay from 'razorpay';
import { SubscriptionCreateOptions, SubscriptionResponse } from '../types/razorpay';
import { razorpay_key_id, razorpay_key_secret } from '../config/razorpay.config';

class RazorpayService {
  private razorpay: Razorpay;

  constructor() {
    if (!razorpay_key_id || !razorpay_key_secret) {
      throw new Error('Razorpay configuration is missing');
    }
    
    this.razorpay = new Razorpay({
      key_id: razorpay_key_id,
      key_secret: razorpay_key_secret
    });
  }

  async createSubscription(options: SubscriptionCreateOptions): Promise<SubscriptionResponse> {
    try {
      const subscription = await this.razorpay.subscriptions.create(options);
      return subscription as SubscriptionResponse;
    } catch (error) {
      console.error('Error in createSubscription:', error);
      throw error;
    }
  }

  async getSubscription(subscriptionId: string): Promise<SubscriptionResponse> {
    try {
      const subscription = await this.razorpay.subscriptions.fetch(subscriptionId);
      return subscription as SubscriptionResponse;
    } catch (error) {
      console.error('Error in getSubscription:', error);
      throw error;
    }
  }

  async cancelSubscription(subscriptionId: string): Promise<SubscriptionResponse> {
    try {
      const subscription = await this.razorpay.subscriptions.cancel(subscriptionId);
      return subscription as SubscriptionResponse;
    } catch (error) {
      console.error('Error in cancelSubscription:', error);
      throw error;
    }
  }
}

// Create and export a single instance
const razorpayService = new RazorpayService();
export { razorpayService }; 