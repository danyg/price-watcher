import puppeteer from "puppeteer";
import config from "../config/config";
import { AppDataSource } from "../db/data-source";
import { WatchedProduct, PriceHistory } from "../db/entities";
import { notifyPriceDrop } from "../notifier/notifyPriceDrop";

export async function scrapeAndStore() {
  await AppDataSource.initialize();
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (const product of config.watchedProducts) {
    await page.goto(product.url, { waitUntil: "networkidle2" });
    const priceText = await page.$eval(
      product.selectorWithPrice,
      (el: Element) => el.textContent || ""
    );
    const price = parseFloat(
      priceText.replace(/[^\d.,]/g, "").replace(",", ".")
    );

    let productEntity = await AppDataSource.manager.findOneBy(WatchedProduct, {
      url: product.url,
    });
    if (!productEntity) {
      productEntity = AppDataSource.manager.create(WatchedProduct, product);
      await AppDataSource.manager.save(productEntity);
    }
    const history = AppDataSource.manager.create(PriceHistory, {
      product: productEntity,
      price,
    });
    await AppDataSource.manager.save(history);

    if (price <= product.targetPrice) {
      await notifyPriceDrop(product, price);
    }
  }
  await browser.close();
}
