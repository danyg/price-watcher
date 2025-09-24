import { WatchedProduct } from '../types';
import { getNotificationStrategies } from '../notifier/strategy';

export async function notifyPriceDrop(product: WatchedProduct, price: number) {
  const strategies = getNotificationStrategies();
  for (const strategy of strategies) {
    await strategy.send({
      product: product.name,
      url: product.url,
      price,
      threshold: product.targetPrice,
      message: `Price dropped to ${price} (threshold: ${product.targetPrice})`
    });
  }
}
