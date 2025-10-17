# Use an official Node.js runtime as a parent image
FROM node:20-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy the rest of your application's source code
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Define the command to run your app
CMD [ "npm", "start" ]
