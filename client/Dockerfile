# It uses node:18-alpine as the base image for the frontend React.js application
FROM node:18-alpine

# Creating the working directory named `app`
WORKDIR /client

# Copying all the tools and dependencies in the package.json file to the working directory `app`
COPY package*.json ./

#Copying all the application source code and files to the working directory `app`
COPY . .

#Installing all the tools and dependencies in the container
RUN npm install

#Exposing the container to run on this port 3000
EXPOSE 8000

#Command to start the Docker container for the frontend React.js application
CMD ["npm", "run", "dev"]