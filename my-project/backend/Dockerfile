FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# 設置默認環境為 production
ARG APP_ENV=production
ENV APP_ENV=${APP_ENV}

# 顯示當前環境
RUN echo "Building for environment: ${APP_ENV}"

CMD ["gunicorn", "app.main:app", "-k", "uvicorn.workers.UvicornWorker", "-c", "gunicorn_config.py"] 