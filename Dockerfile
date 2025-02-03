FROM node:20-alpine

LABEL author="cuoicuoi1000@gmail.com"

WORKDIR /app

COPY package*.json yarn.lock ./

RUN corepack enable

RUN corepack prepare yarn@4.5.0 --activate

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]

# docker build -t ddung203/savetext .
# docker run -d -p 3000:3000 ddung203/savetext:latest
