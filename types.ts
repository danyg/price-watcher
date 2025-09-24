import { NotificationOutput } from "./notifier/types";

export type WatchedProduct = {
  name: string,
  url: string,
  selectorWithPrice: string,
  targetPrice: number
};


export type Config = {
  watchedProducts: WatchedProduct[];
  notificationOutputs: NotificationOutput[];
};
