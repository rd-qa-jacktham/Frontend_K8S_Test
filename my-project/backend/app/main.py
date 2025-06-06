import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
from app.config import get_settings
from app.database import test_database_connection

# 加載不同環境的 .env 文件
env = os.getenv('APP_ENV', 'development')
env_file = f".env.{env}"
load_dotenv(dotenv_path=env_file)
print(f"Loading environment from: {env_file}")

app = FastAPI(
    title="Backend API",
    version="1.0.0",
    description=f"Running in {env} environment"
)

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 在生產環境中應該設置為具體的域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 使用環境變量
database_url = os.getenv("DATABASE_URL")
debug_mode = os.getenv("DEBUG", "False").lower() == "true"

# 創建數據庫引擎
engine = create_engine(database_url)

@app.get("/")
async def root():
    settings = get_settings()
    return {
        "message": "Welcome to FastAPI Backend",
        "environment": settings.environment,
        "database_url": settings.database_url.replace(settings.db_password, "****")
    }

@app.get("/config")
async def get_config():
    """
    返回當前環境配置（注意：在生產環境中應該限制這個端點的訪問）
    """
    if env == "production":
        return {
            "environment": env,
            "debug_mode": debug_mode
        }
    return {
        "environment": env,
        "debug_mode": debug_mode,
        "database_url": database_url
    }

@app.get("/db-test")
async def test_db():
    try:
        result = await test_database_connection()
        return {"status": "success", "message": "Database connection successful", "details": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 