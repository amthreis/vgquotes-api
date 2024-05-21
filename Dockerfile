FROM node:21-slim

WORKDIR /home/matheus/apps/vgquotes/api

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

#RUN npm install -g nodemon

#EXPOSE ${PORT}

CMD [ "npm", "start" ]