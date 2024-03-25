# Use the official Node.js image as the base  
FROM node:16-alpine

# Set the working directory inside the container  
WORKDIR /app

# Copy package.json and package-lock.json to the container  
COPY package*.json ./

RUN npm config set legacy-peer-deps true

# Install dependencies  
RUN npm install

RUN npm install -g serve

# Copy the app source code to the container  
COPY . .

# Build the Next.js app  
RUN npm run build

# Start the app  
CMD ["serve", "-s", "build", "-l", "3000"]