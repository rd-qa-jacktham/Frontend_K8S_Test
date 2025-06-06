# 使用 Node 官方映像来构建 React + Vite 应用
FROM node:18 AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

# 複製源代碼和環境文件
COPY . .

# 設置構建參數
ARG ENVIRONMENT=production
ENV VITE_ENV=${ENVIRONMENT}

# 創建環境特定的 .env 文件
RUN echo "VITE_ENV=${ENVIRONMENT}" > .env.${ENVIRONMENT} && \
    echo "VITE_API_URL=http://localhost:8000" >> .env.${ENVIRONMENT}

# 顯示構建信息
RUN echo "Building for environment: ${ENVIRONMENT}"
RUN echo "Environment file content:"
RUN cat .env.${ENVIRONMENT}

# 執行構建
RUN npm run build -- --mode ${ENVIRONMENT}

# 使用 nginx 提供静态文件
FROM nginx:alpine

WORKDIR /app

# 複製構建產物
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 創建 nginx 配置
RUN mkdir -p /etc/nginx/templates/
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 設置環境變量供 nginx 使用
ENV NGINX_HOST=localhost
ENV NGINX_PORT=80

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
