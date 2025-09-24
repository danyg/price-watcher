#!/usr/local/bin/tsx

import { scrapeAndStore } from '../scraper/scraper';

async function runWatcher() {
  await scrapeAndStore();
}

runWatcher();
