FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose the port the backend runs on
EXPOSE 5000

# Start the application using the dev script
CMD ["npm", "run", "dev"]
