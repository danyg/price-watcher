
export type NotificationValues = {
  product: string;
  url: string;
  currentPrice: number;
  threshold: number;
};

export interface NotificationStrategy {
  send(message: NotificationValues): Promise<void>;
}

export type NotificationStrategyType = 'webhook';

export interface BaseNotificationOutput {
  type: NotificationStrategyType;
}

export interface WebhookNotificationOutput extends BaseNotificationOutput {
  type: 'webhook';
  url: string;
  extraPayload?: Record<string, any>;
  messageTemplate?: string;
  messageKey?: string;
}

export type NotificationOutput = BaseNotificationOutput | WebhookNotificationOutput;
