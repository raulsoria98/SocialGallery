# It uses node:18-alpine as the base image for the Node.js application
FROM node:18-alpine

# Creating the working directory named `app`
WORKDIR /server

# Copying all the tools and dependencies in the package.json file to the working directory `app`
COPY package*.json ./

# It installs the nodemon package globally for monitoring and watching the backend Express server
RUN npm install -g nodemon

#Copying all the application source code and files to the working directory `app`
COPY . .

#Installing all the tools and dependencies in the container
RUN npm install

#Exposing the container to run on this port 4000
EXPOSE 3001

#Command to start the Docker container for the backed server application
CMD ["npm", "run", "dev"]