# Single-stage build for React Vite application using Node.js

FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port 4173 (Vite preview default port)
EXPOSE 4173

# Start the application using Vite preview
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
