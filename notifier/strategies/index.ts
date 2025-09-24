import { NotificationStrategy, NotificationStrategyType } from "../types";
import { WebhookNotification } from "./WebhookNotification";

export const strategiesByType: Record<
  NotificationStrategyType,
  new (...args: any[]) => NotificationStrategy
> = {
  webhook: WebhookNotification
};
