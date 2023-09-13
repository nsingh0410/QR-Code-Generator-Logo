# Use the official Nginx image as the base image
FROM nginx

# Copy your Nginx configuration files into the container
COPY ./nginx-config/my-qr-code-api.conf /etc/nginx/conf.d/my-qr-code-api.conf

# Expose port 80 to allow incoming HTTP traffic
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]


# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy your application files into the container
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Specify the command to start your Node.js application
CMD ["node", "app.js"]