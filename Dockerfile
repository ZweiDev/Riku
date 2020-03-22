FROM node:10

ENV PORT="9813"
ENV SHIRO_URL="https://api.thepublictransport.de/shiro/"

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 9813
CMD [ "yarn", "run", "prod" ]
