# Use Node.js
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the project files
COPY . .

# Expose the development server port
EXPOSE 5173

# Start the development server
CMD ["sh", "-c", "npm run preview -- --host 0.0.0.0 --port $PORT"]