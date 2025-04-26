declare module 'razorpay' {
  export interface RazorpayOptions {
    key_id: string;
    key_secret: string;
  }

  export interface SubscriptionCreateOptions {
    plan_id: string;
    customer_notify: number;
    total_count: number;
    quantity: number;
    start_at?: number;
    expire_by?: number;
    customer_details: {
      name: string;
      email: string;
      contact: string;
    };
    notify_info: {
      notify_phone?: string;
      notify_email?: string;
    };
    notes?: Record<string, string>;
  }

  export interface SubscriptionResponse {
    id: string;
    entity: string;
    status: string;
    plan_id: string;
    customer_notify: boolean;
    total_count: number;
    paid_count: number;
    quantity: number;
    notes: Record<string, string>;
    created_at: number;
    started_at: number;
    expire_by: number;
    short_url: string;
    has_scheduled_changes: boolean;
    change_id: string | null;
  }

  export class Razorpay {
    constructor(options: RazorpayOptions);
    subscriptions: {
      create(options: SubscriptionCreateOptions): Promise<SubscriptionResponse>;
      fetch(subscriptionId: string): Promise<SubscriptionResponse>;
      cancel(subscriptionId: string): Promise<SubscriptionResponse>;
    };
  }
} 