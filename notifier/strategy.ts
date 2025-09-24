import config from "../config/config";

import { NotificationOutput, NotificationStrategy, WebhookNotificationOutput } from "./types";
import { strategiesByType } from "./strategies/";

export function getNotificationStrategies(): NotificationStrategy[] {
  return config.notificationOutputs.map((output: NotificationOutput) => {
    if (!output.type)  throw new Error("Notification output type is required");
    if (!(output.type in strategiesByType))  throw new Error(`Unsupported notification type: ${output.type}`);
    
    const Strategy = strategiesByType[output.type];
    if (output.type === "webhook") {
      return new Strategy(output);
    }
    throw new Error("Unknown notification type");
  });
}
