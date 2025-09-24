import "reflect-metadata";
import puppeteer, { Page } from "puppeteer";
import config from "../config/config";
import { AppDataSource } from "../db/data-source";
import * as DB from "../db/entities";
import { notifyPriceDrop } from "../notifier/notifyPriceDrop";

import { WatchedProduct } from "../types";
import { toPrice } from "./toPrice";

export async function scrapeAndStore() {
  await AppDataSource.initialize();

  log("root", "Launching browser...");
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--disable-extensions",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  });
  const page = await browser.newPage();

  // Set browser to report Spain as location and language
  const context = browser.defaultBrowserContext();

  await page.setGeolocation({
    latitude: config.location.latitude,
    longitude: config.location.longitude,
  }); // Madrid, Spain
  await page.setExtraHTTPHeaders({
    "Accept-Language": config.location.languageHeader,
  });
  await page.emulateTimezone(config.location.timezone);

  const getElementValue = getElementValueCreator(page);

  for (const product of config.watchedProducts) {
    await context.overridePermissions(new URL(product.url).origin, [
      "geolocation",
    ]);

    log(`scraping|${product.name}`, `navigating to page...`);
    await page.goto(product.url, { waitUntil: "networkidle2" });

    log(`scraping|${product.name}`, `waiting for price...`);
    await waitForPrice(page, product);

    const priceText = await getElementValue(product.selectorWithPrice);
    log(`scraping|${product.name}`, `price raw is ${priceText}`);

    const currentPrice = toPrice(priceText);
    log(`scraping|${product.name}`, `current price is ${currentPrice}`);
    await persistHistory(product, currentPrice);

    log(
      `scraping|${product.name}`,
      `checking against threshold ${product.targetPrice}...`
    );
    if (currentPrice <= product.targetPrice) {
      log(`scraping|${product.name}`, `sending notification...`);
      await notifyPriceDrop(product, currentPrice);
    }
    log(`scraping|${product.name}`, `done!`);
  }
  await browser.close();
}

if (require.main === module) {
  scrapeAndStore().catch((err) => {
    console.error("Error during scraping:", err);
    process.exit(1);
  });
}

const log = (context: string, ...args: any[]) => {
  console.log(`[${new Date().toISOString()}] Scraper<${context}>: `, ...args);
};

async function persistHistory(product: WatchedProduct, currentPrice: number) {
  log(`scraping|${product.name}`, `persisting history into db...`);
  let productEntity = await AppDataSource.manager.findOneBy(DB.WatchedProduct, {
    name: product.name,
  });
  if (!productEntity) {
    productEntity = AppDataSource.manager.create(DB.WatchedProduct, product);
    await AppDataSource.manager.save(productEntity);
  }
  const history = AppDataSource.manager.create(DB.PriceHistory, {
    product: productEntity,
    price: currentPrice,
  });
  await AppDataSource.manager.save(history);
  log(`scraping|${product.name}`, `history persisted into db.`);
}

async function waitForPrice(page: Page, product: WatchedProduct) {
  let lastValue = "null";
  let currentValue = "false";
  const getElementValue = getElementValueCreator(page);
  do {
    lastValue = await getElementValue(product.selectorWithPrice);
    await wait(250);
    currentValue = await getElementValue(product.selectorWithPrice);
  } while (currentValue !== lastValue);
}

const getElementValueCreator =
  (page: Page) =>
  (selector: string): Promise<string> =>
    page
      .locator(selector)
      .map((t) => t.textContent)
      .wait();

const wait = (t: number) => new Promise((r) => setTimeout(r, t));
