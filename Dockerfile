# Sử dụng base image Node.js mới nhất
FROM node:20-alpine

# Sao chép file package.json trước để tận dụng cache
WORKDIR /app
COPY package*.json .
RUN npm install

# Sao chép toàn bộ mã nguồn và build dự án
COPY . .
RUN npm install -g pm2
RUN npm run build

EXPOSE 5000

# Lệnh mặc định khi container khởi chạy
CMD ["npm", "start"]