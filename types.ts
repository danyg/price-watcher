import { NotificationOutput } from "./notifier/types";

export type WatchedProduct = {
  name: string;
  url: string;
  selectorWithPrice: string;
  targetPrice: number;
  cookies?: Readonly<Record<string, string>>;
};

export type Config = {
  watchedProducts: WatchedProduct[];
  notificationOutputs: NotificationOutput[];
  location: {
    latitude: number;
    longitude: number;
    timezone: string;
    languageHeader: string;
  };
};
