
export type NotificationMessage = {
  product: string;
  url: string;
  price: number;
  threshold: number;
  message: string;
};

export interface NotificationStrategy {
  send(message: NotificationMessage): Promise<void>;
}

export type NotificationStrategyType = 'webhook';

export interface NotificationOutput {
  type: NotificationStrategyType;
}

export interface WebhookNotificationOutput extends NotificationOutput {
  type: 'webhook';
  url: string;
}
