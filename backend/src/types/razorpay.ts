export interface SubscriptionCreateOptions {
  plan_id: string;
  customer_notify: number;
  total_count: number;
  quantity: number;
  start_at: number;
  expire_by: number;
  notify_info: {
    notify_phone: string;
    notify_email: string;
  };
}

export interface SubscriptionResponse {
  id: string;
  entity: string;
  status: string;
  plan_id: string;
  customer_notify: number;
  total_count: number;
  paid_count: number;
  quantity: number;
  start_at: number;
  expire_by: number;
  short_url: string;
  has_scheduled_changes: boolean;
  change_schedule: any;
  created_at: number;
  customer_notes: {
    [key: string]: string;
  };
  notify_info: {
    notify_phone: string;
    notify_email: string;
  };
} 