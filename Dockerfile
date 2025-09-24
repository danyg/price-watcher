FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install -g tsx pm2 && npm install && cd web && npm install && npm run build && cd ..
EXPOSE 3001
COPY pm2.config.js ./pm2.config.js
CMD ["sh", "-c", "crond && pm2-runtime pm2.config.js"]
