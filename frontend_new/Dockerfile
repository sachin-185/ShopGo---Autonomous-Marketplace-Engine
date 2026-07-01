FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Expose the port Vite runs on (5173 by default)
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]
