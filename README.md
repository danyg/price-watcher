
# Price Watcher

A TypeScript-based product price monitoring tool with Puppeteer, TypeORM, and React UI. Designed with SOLID principles, international price parsing, Docker support, and modern frontend.

## Features
- Scrapes product prices from configurable URLs using Puppeteer
- Stores price history in SQLite via TypeORM
- Notifies when prices drop below thresholds
- REST API for product and price history
- React frontend with Material UI and Recharts (line chart)
- International price format support (e.g., US/European)
- Dockerized for easy deployment
- PM2 process manager support
- Jest tests for robust price parsing

## Project Structure
```
app/                # Backend, API, scraper, notifier, db
	scraper/          # Puppeteer scraper, price parsing
	db/               # TypeORM entities, data source
	notifier/         # Notification strategies
	web/              # Express API server, static serving
config/             # Configuration and types
web/                # React frontend (Vite, Material UI, Recharts)
	src/              # React components
	public/           # Static assets
package.json        # Root scripts, Docker build
Dockerfile          # Containerization
```

## Getting Started

### 1. Install dependencies
```zsh
npm install
cd web && npm install
```

### 2. Configure products
Edit `config/config.ts` to set product URLs, thresholds, and notification settings.

### 3. Run the backend API
```zsh
npm run api
```

### 4. Run the React frontend
```zsh
cd web
npm run dev
```

### 5. Scrape prices (manual or scheduled)
```zsh
npm run scrape
```

### 6. Run tests
```zsh
npm test
```

### 7. Build and run with Docker
```zsh
docker build -t price-watcher .
docker run -p 3000:3000 price-watcher
```

### 8. Run with PM2
```zsh
npm run pm2
```

## API Endpoints
- `GET /api/products` — List products
- `GET /api/products/:name/history` — Price history for a product
- `POST /api/scrape` — Trigger price scrape

## Frontend
- Modern React UI with Material UI components
- Line chart of price history (Recharts)
- Product list and details

## International Price Parsing
Handles both US (e.g., `1,234.56`) and European (e.g., `1.234,56`) formats. See `scraper/toPrice.ts` and tests in `scraper/toPrice.test.ts`.

## Testing
- Jest + ts-jest for TypeScript tests
- Run all tests: `npm test`
- Price parsing tests: `npm test -- scraper/toPrice.test.ts`

## Docker
- Build: `docker build -t price-watcher .`
- Run: `docker run -p 3000:3000 price-watcher`

## PM2
- Start: `npm run pm2`

## Troubleshooting

When developing inside jsdevcontainer you might need to install some deps for chrome to work:

```zsh
sudo apt-get install ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils
```

## License
MIT

