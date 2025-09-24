
import axios from "axios";
import { NotificationMessage, NotificationStrategy, WebhookNotificationOutput } from "../types";

export class WebhookNotification implements NotificationStrategy {
  private url: string;
  
  constructor(config: WebhookNotificationOutput) {
    this.url = config.url;
  }

  async send(message: NotificationMessage): Promise<void> {
    await axios.post(this.url, message);
  }
}
