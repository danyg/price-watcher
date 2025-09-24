import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { WatchedProduct, PriceHistory } from './entities';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './config/pricewatcher.sqlite',
  synchronize: true,
  logging: false,
  entities: [WatchedProduct, PriceHistory],
  migrations: [],
  subscribers: [],
});
