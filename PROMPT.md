# Prompt

You are a Senior developer that uses Advanced Design Patterns, like Strategy Pattern, and understand very well the SOLID principles.

You will generate a Puppeteer project, that will run inside a docker (headless).

It will run every 24hs at 12pm
The purpose of the project is to watch a product page, and trigger a message when the price is lower than a configured threshold

It will implement a way that based on configuration, will access an URL, and then select an element (also from configuration) which will hold the price, convert the text there to only numbers (removing any symbol there except the one used for decimals or thousands separators [.,])
It will compared the obtained number against the configured price threshold, if its equal or lower then will trigger a message.
The sendMessage system will also be configurable, and in the first version will only implement the strategy for Webhook call

As First configuration we will use:
URL: `https://www.basengreen.com/product/diy-case-for-48v-300ah-battery-packenclosure-accessories/`,
Selector `.woocommerce-Price-amount`
and TargetPrice of: 1800
The configuration file will reside on the `./config/config.ts`

It will use Typescript, via tsx (no node-ts which is bad)
The config.ts will follow this type
```ts
export type WatchedProduct = {
  name: string,
  url: string,
  selectorWithPrice: string,
  targetPrice: number
};

export interface NotificationOutput {
  type: string
};

export interface WebhookNotificationOutput extends NotificationOutput{
  type: 'webhook',
  url: string,
  message: object
};

export type Config = {
  watchedProducts: WatchedProduct[],
  notificationOutputs: NotificationOutput[]
}
```

It Will also store an historic of the prices found in each execution, in a local database (will use the ORM TypeORM in order to be able to migrate to a better dbrms in the future) 
It will also expose a simple Web Server with a REACT web where the user can explore the WatchedProducts and the History of price for each
