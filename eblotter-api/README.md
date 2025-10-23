# eBlotter API

FastAPI-based backend for the eBlotter application with Azure AD authentication and SQLAlchemy ORM.

## Features

- **FastAPI Framework**: Modern, fast (high-performance) web framework
- **Azure AD Authentication**: Secure authentication using `fastapi-azure-auth`
- **SQLAlchemy ORM**: Database operations with SQLAlchemy 2.0
- **Pydantic Validation**: Request/response validation with Pydantic v2
- **Auto-generated API Documentation**: Interactive docs at `/docs` and `/redoc`
- **CORS Support**: Configured for frontend integration

## Requirements

- Python 3.12+
- PostgreSQL (or SQLite for development)

## Project Structure

```
eblotter-api/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── api/                 # API route handlers
│   │   ├── deals.py
│   │   ├── allocations.py
│   │   ├── brokers.py
│   │   └── portfolios.py
│   ├── core/                # Core configuration
│   │   ├── config.py        # Settings and environment variables
│   │   └── auth.py          # Azure AD authentication
│   ├── db/                  # Database configuration
│   │   └── base.py          # SQLAlchemy setup
│   ├── models/              # SQLAlchemy models
│   │   └── deal.py
│   └── schemas/             # Pydantic schemas
│       └── deal.py
├── requirements.txt         # Python dependencies
├── .env.example            # Example environment variables
└── README.md
```

## Setup Instructions

### 1. Create Virtual Environment

```bash
cd eblotter-api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Copy the example environment file and update with your values:

```bash
cp .env.example .env
```

Edit `.env` and configure:

```env
# Database (use SQLite for quick start)
DATABASE_URL=sqlite:///./eblotter.db

# Azure AD (required for authentication)
AZURE_CLIENT_ID=your-azure-client-id
AZURE_TENANT_ID=your-azure-tenant-id
AZURE_CLIENT_SECRET=your-azure-client-secret
OPENAPI_CLIENT_ID=your-openapi-client-id

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 4. Run the Application

```bash
# Development mode with auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Production mode
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

The API will be available at:
- Main API: http://localhost:8000
- Interactive Docs: http://localhost:8000/docs
- Alternative Docs: http://localhost:8000/redoc

## API Endpoints

### Deals
- `GET /api/v1/deals` - List all deals
- `GET /api/v1/deals/{id}` - Get deal by ID
- `POST /api/v1/deals` - Create new deal
- `PUT /api/v1/deals/{id}` - Update deal
- `DELETE /api/v1/deals/{id}` - Delete deal

### Allocations
- `GET /api/v1/allocations` - List all allocations
- `GET /api/v1/allocations/{id}` - Get allocation by ID
- `POST /api/v1/allocations` - Create new allocation
- `PUT /api/v1/allocations/{id}` - Update allocation
- `DELETE /api/v1/allocations/{id}` - Delete allocation

### Brokers
- `GET /api/v1/brokers` - List all brokers
- `GET /api/v1/brokers/{id}` - Get broker by ID
- `POST /api/v1/brokers` - Create new broker
- `PUT /api/v1/brokers/{id}` - Update broker
- `DELETE /api/v1/brokers/{id}` - Delete broker

### Portfolios
- `GET /api/v1/portfolios` - List all portfolios
- `GET /api/v1/portfolios/{id}` - Get portfolio by ID
- `POST /api/v1/portfolios` - Create new portfolio
- `PUT /api/v1/portfolios/{id}` - Update portfolio
- `DELETE /api/v1/portfolios/{id}` - Delete portfolio

## Azure AD Authentication Setup

### Without Authentication (Development)
The API routes currently have Azure authentication commented out. You can use them directly for development.

### With Azure Authentication (Production)
To enable Azure AD authentication:

1. **Register your application in Azure AD**
   - Go to Azure Portal > Azure Active Directory > App registrations
   - Create a new registration
   - Note the Application (client) ID and Directory (tenant) ID
   - Create a client secret under Certificates & secrets
   - Add API permissions and expose an API

2. **Update environment variables** in `.env`:
   ```env
   AZURE_CLIENT_ID=<your-client-id>
   AZURE_TENANT_ID=<your-tenant-id>
   AZURE_CLIENT_SECRET=<your-client-secret>
   OPENAPI_CLIENT_ID=<your-openapi-client-id>
   ```

3. **Uncomment authentication code**:
   - In `app/main.py`: Uncomment Azure scheme initialization
   - In `app/api/deals.py` (and other route files): Uncomment `user = Depends(get_current_user)` in route functions

## Database Setup

### SQLite (Default - Development)
SQLite is configured by default. The database file will be created automatically when you start the application.

### PostgreSQL (Production)
1. Install PostgreSQL
2. Create a database:
   ```sql
   CREATE DATABASE eblotter_db;
   ```
3. Update `DATABASE_URL` in `.env`:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/eblotter_db
   ```

### Database Migrations (Optional)
For production, consider using Alembic for database migrations:

```bash
# Initialize Alembic
alembic init alembic

# Create migration
alembic revision --autogenerate -m "Initial migration"

# Apply migration
alembic upgrade head
```

## Testing

```bash
# Install test dependencies (already in requirements.txt)
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

## Development

### Adding New Endpoints
1. Create/update model in `app/models/`
2. Create Pydantic schemas in `app/schemas/`
3. Create API routes in `app/api/`
4. Register router in `app/main.py`

### Code Style
Consider using:
- `black` for code formatting
- `flake8` for linting
- `mypy` for type checking

## Deployment

### Using Docker (Recommended)
Create a `Dockerfile`:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t eblotter-api .
docker run -p 8000:8000 --env-file .env eblotter-api
```

## License

Proprietary
