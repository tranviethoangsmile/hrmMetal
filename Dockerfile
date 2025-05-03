# Sử dụng base image Node.js mới nhất
FROM node:20-alpine
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install
RUN npm install -g pm2
RUN npm run build
EXPOSE 5000
# Lệnh mặc định khi container khởi chạy
CMD ["npm", "start"]