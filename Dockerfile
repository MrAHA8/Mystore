
# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY . /app

# Install the application dependencies
# Changed npm install to npm ci to install the dependencies from package-lock.json
# Use npm ci instead of npm install to install the dependencies from package-lock.json which is recommended for production environment
RUN npm ci

# Expose a tcp port for the container
# Added "EXPOSE 3000" to expose port 3000 which is commonly used for Node.js applications
EXPOSE 3000

# Define the entry point for the container
CMD ["npm", "start"]

