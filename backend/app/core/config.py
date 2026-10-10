from pydantic_settings import BaseSettings, SettingsConfigDict
class Settings(BaseSettings):
    database_url: str = "sqlite:///./aurora.db"
    jwt_secret: str = "development-only-change-this-secret-before-deploying"
    access_token_minutes: int = 20
    cors_origins: str = "http://localhost:3000"
    demo_mode: bool = True
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
settings = Settings()
