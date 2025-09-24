import express, { Request, Response } from "express";
import cors from "cors";

import { WatchedProduct, PriceHistory } from "../db/entities";
import { AppDataSource } from "../db/data-source";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/products", async (_req: Request, res: Response) => {
  await AppDataSource.initialize();
  const products = await AppDataSource.manager.find(WatchedProduct);
  res.json(products);
});

app.get("/api/history/:productId", async (req: Request, res: Response) => {
  await AppDataSource.initialize();
  const history = await AppDataSource.manager.find(PriceHistory, {
    where: { product: { id: Number(req.params.productId) } },
    order: { checkedAt: "DESC" },
  });
  res.json(history);
});

app.listen(3001, () => {
  console.log("API server running on port 3001");
});
