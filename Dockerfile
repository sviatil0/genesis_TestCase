FROM node:9-slim
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm i coinbase express lowdb nodemailer nodemon swagger-jsdoc swagger-ui-express
COPY . /app
CMD ["npm","start"]