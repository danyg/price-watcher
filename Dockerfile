FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install -g tsx && npm install
CMD ["sh", "-c", "crond && tsx scheduler/cron.ts"]
