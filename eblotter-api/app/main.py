from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.db.base import Base, engine
from app.api import deals, allocations, brokers, portfolios
from app.db.seed import seed_all


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager for startup and shutdown events."""
    # Startup
    print("🚀 Starting eBlotter API...")
    
    # Create database tables
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created")

    # Seed database with initial data
    try:
        seed_all()
    except Exception as e:
        print(f"⚠️  Seeding note: {e}")

    print("✅ eBlotter API started successfully!")
    yield

    # Shutdown
    print("👋 Shutting down eBlotter API...")


# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    lifespan=lifespan,
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
