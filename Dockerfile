# Version of node to use v20.14.0
FROM node:20

# Directory to save image
WORKDIR /app

# Install app dependecies 
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]