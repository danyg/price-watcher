FROM node:20-bullseye

# Install dependencies for puppeteer/Chromium
RUN apt-get update
RUN apt-get install -y \
    ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 \
    libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
    libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils \
    libudev1 nano\
    cron && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app/puppeteer-cache
ENV PUPPETEER_CACHE_DIR=/app/puppeteer-cache

WORKDIR /app
RUN mkdir -p /app/web
COPY package.json package-lock.json ./
COPY web/package.json web/package-lock.json ./web/

# Install and build the app
RUN npm install -g tsx pm2 && \
    npm install && \
    cd web && \
    npm install && \
    cd ..
RUN /app/node_modules/puppeteer/install.mjs
RUN ls -lR /app/puppeteer-cache

COPY . /app
RUN cd web; npm run build;

EXPOSE 3001

RUN crontab /app/cronjob

CMD ["sh", "-c", "cron -f & pm2-runtime pm2.config.js"]
