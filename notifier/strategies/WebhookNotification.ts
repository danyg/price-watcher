import axios from "axios";
import {
  NotificationValues,
  NotificationStrategy,
  WebhookNotificationOutput,
} from "../types";

export class WebhookNotification implements NotificationStrategy {
  private url: string;
  private extraPayload: Record<string, any>;
  private messageTemplate: string;
  private messageKey: string;

  constructor(config: WebhookNotificationOutput) {
    this.url = config.url;
    this.extraPayload = config.extraPayload || {};
    this.messageTemplate =
      config.messageTemplate ||
      "Price drop alert for {product}: now {price}, was {threshold}. See {url}";
    this.messageKey = config.messageKey || "message";
  }

  async send(values: NotificationValues): Promise<void> {
    await axios.post(this.url, {
      //
      ...this.extraPayload,
      [this.messageKey]: this.applyTemplate(values),
    });
  }

  private applyTemplate(values: NotificationValues) {
    return this.messageTemplate.replace(/{(\w+)}/g, (_, key) =>
      isKeyofNotificationMessageAndIsInValues(key, values)
        ? `${values[key]}`
        : `{${key}}`
    );
  }
}

const isKeyofNotificationMessageAndIsInValues = (
  key: string,
  values: NotificationValues
): key is keyof NotificationValues => {
  return (
    ["product", "url", "price", "threshold"].includes(key) &&
    key in values
  );
};
