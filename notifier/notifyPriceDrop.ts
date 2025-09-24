import { WatchedProduct } from '../types';
import { getNotificationStrategies } from '../notifier/strategy';

export async function notifyPriceDrop(product: WatchedProduct, currentPrice: number) {
  const strategies = getNotificationStrategies();
  for (const strategy of strategies) {
    await strategy.send({
      productName: product.name,
      url: product.url,
      currentPrice,
      thresholdPrice: product.targetPrice
    });
  }
}
