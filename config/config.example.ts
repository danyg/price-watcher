import { Config } from "../types";

const config: Config = {
  watchedProducts: [
    {
      name: "TV",
      url: "https://www.amazon.es/Samsung-Pulgadas-Xcelerator-Colores-certificados/dp/B0F225ZVVW",
      selectorWithPrice:
        "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center.aok-relative > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay",
      targetPrice: 1200,
    },
  ],
  notificationOutputs: [
    {
      type: "webhook",
      url: "http://webhook.site/your-webhook-url",
      extraPayload: {
        title: "Price Drop Alert",
      },
      messageTemplate:
        "Price drop alert for {productName}: now {currentPrice}, below {thresholdPrice}. See {url}",
      messageKey: "content",
    },
  ],
  location: {
    latitude: 40.4168,
    longitude: -3.7038,
    timezone: "Europe/Madrid",
    languageHeader: "es-ES,es;q=0.9",
  },
};

export default config;
