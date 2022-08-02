FROM node:9-slim
WORKDIR /app
COPY package.json .
RUN npm install && npm ci && npm cache clean --force
COPY . .
CMD ["npm","start"]