"""Environment configuration for MCP Server."""

from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    environment: str = "development"

    # CORS
    cors_origins: str = "http://localhost:3000,http://localhost:3002,https://personal-portfolio-7z7k.vercel.app"

    # OpenAI
    openai_api_key: str = ""

    # Email (Resend)
    resend_api_key: str = ""
    owner_email: str = ""

    # WhatsApp (Twilio)
    twilio_account_sid: str = ""
    twilio_auth_token: str = ""
    twilio_whatsapp_from: str = "whatsapp:+14155238886"
    owner_whatsapp: str = ""

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

    @property
    def cors_origins_list(self) -> list[str]:
        """Parse CORS origins as a list."""
        return [origin.strip() for origin in self.cors_origins.split(",")]


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
