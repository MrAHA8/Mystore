

# Use the official Node.js image as the base image
# Changed node:18 to node:latest to use the latest version of Node.js
FROM node:latest

# Set the working directory in the container
# No changes needed as the working directory is set correctly
WORKDIR /app

# Copy the application files into the working directory
# No changes needed as the application files are being copied correctly
COPY . /app

# Install the application dependencies
# The error is occurring because package-lock.json is missing and npm is trying to install dependencies from package.json instead
# Changed npm install to npm ci to install the dependencies from package-lock.json
RUN npm ci

# Define the entry point for the container
# No changes needed as the entry point is defined correctly
CMD ["npm", "start"]
