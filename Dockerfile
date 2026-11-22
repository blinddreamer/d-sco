# Use the official Nginx image
FROM nginx:alpine

# Pull Alpine security fixes not yet in the base image
RUN apk upgrade --no-cache

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy site files into nginx's html directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
