FROM node:8

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/src/app/

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY server /usr/src/app/server
COPY common /usr/src/app/common

EXPOSE 3000

CMD [ "npm", "run", "start" ]