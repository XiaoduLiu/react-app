from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.db.base import Base, engine
from app.api import deals, allocations, brokers, portfolios

# Uncomment when Azure Auth is configured:
# from app.core.auth import azure_scheme


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager for startup and shutdown events."""
    # Startup
    # Create database tables
    Base.metadata.create_all(bind=engine)

    # Uncomment when Azure Auth is configured:
    # await azure_scheme.openid_config.load_config()

    yield

    # Shutdown
    # Add any cleanup code here if needed
    pass


# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    lifespan=lifespan,
    # Uncomment when Azure Auth is configured:
    # swagger_ui_oauth2_redirect_url='/oauth2-redirect',
    # swagger_ui_init_oauth={
    #     'usePkceWithAuthorizationCodeGrant': True,
    #     'clientId': settings.OPENAPI_CLIENT_ID,
    # },
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(deals.router, prefix=settings.API_PREFIX)
app.include_router(allocations.router, prefix=settings.API_PREFIX)
app.include_router(brokers.router, prefix=settings.API_PREFIX)
app.include_router(portfolios.router, prefix=settings.API_PREFIX)


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": f"Welcome to {settings.APP_NAME}",
        "version": settings.APP_VERSION,
        "docs": "/docs",
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}
