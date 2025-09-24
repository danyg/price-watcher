import { scrapeAndStore } from '../scraper/scraper';
import { getNotificationStrategies } from '../notifier/strategy';
import config from '../config/config';

async function runWatcher() {
  // Scrape and store prices
  await scrapeAndStore();
}

runWatcher();
