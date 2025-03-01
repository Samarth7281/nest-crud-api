FROM node:16

#Create a app directory
WORKDIR /usr/src/app

#Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 3001

CMD [ "npm","run","start:prod" ]