import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";

import { WatchedProduct, PriceHistory } from "../db/entities";
import { AppDataSource } from "../db/data-source";

const app = express();
app.use(cors());
app.use(express.json());

// Serve React build static files
app.use(express.static(path.join(__dirname, "./dist")));


async function ensureDataSourceInitialized() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

app.get("/api/products", async (_req: Request, res: Response) => {
  await ensureDataSourceInitialized();
  const products = await AppDataSource.manager.find(WatchedProduct);
  res.json(products);
});

app.get("/api/history/:productId", async (req: Request, res: Response) => {
  await ensureDataSourceInitialized();
  const history = await AppDataSource.manager.find(PriceHistory, {
    where: { product: { id: Number(req.params.productId) } },
    order: { checkedAt: "DESC" },
  });
  res.json(history);
});

// Fallback to index.html for React Router
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "../web/dist/index.html"));
});

app.listen(3001, "0.0.0.0", () => {
  console.log("API server running on port 3001 and listening on all interfaces");
});
