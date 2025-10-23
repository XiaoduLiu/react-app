# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies

```bash
cd eblotter-api
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure Environment (Optional for Development)

For quick testing with SQLite (no configuration needed):
```bash
# Create a basic .env file
echo "DATABASE_URL=sqlite:///./eblotter.db" > .env
```

For full setup with Azure AD:
```bash
cp .env.example .env
# Edit .env and add your Azure AD credentials
```

### 3. Run the Server

**Option A: Using the startup script**
```bash
./run.sh
```

**Option B: Manual start**
```bash
uvicorn app.main:app --reload --port 8000
```

## 📚 Access the API

Once running, visit:
- **Interactive API Docs**: http://localhost:8000/docs
- **API Root**: http://localhost:8000
- **Health Check**: http://localhost:8000/health

## 🧪 Test the API

### Using the Interactive Docs
1. Open http://localhost:8000/docs
2. Expand any endpoint (e.g., `POST /api/v1/deals`)
3. Click "Try it out"
4. Fill in the request body:
   ```json
   {
     "deal_id": "D001",
     "deal_name": "Test Deal",
     "client": "Test Client",
     "amount": 100000,
     "status": "Active",
     "owner": "John Doe"
   }
   ```
5. Click "Execute"

### Using curl

**Create a Deal:**
```bash
curl -X POST "http://localhost:8000/api/v1/deals/" \
  -H "Content-Type: application/json" \
  -d '{
    "deal_id": "D001",
    "deal_name": "Test Deal",
    "client": "Test Client",
    "amount": 100000,
    "status": "Active",
    "owner": "John Doe"
  }'
```

**Get All Deals:**
```bash
curl http://localhost:8000/api/v1/deals/
```

**Create an Allocation:**
```bash
curl -X POST "http://localhost:8000/api/v1/allocations/" \
  -H "Content-Type: application/json" \
  -d '{
    "desc_of_security": "Corporate Bond",
    "allocation_type": "Pro Rata",
    "deal_allocation": 50000,
    "trader": "Trader A",
    "broker": "Broker A"
  }'
```

## 📖 Available Endpoints

All endpoints are prefixed with `/api/v1`:

### Deals
- `GET /deals` - List all deals
- `POST /deals` - Create a deal
- `GET /deals/{id}` - Get deal by ID
- `PUT /deals/{id}` - Update deal
- `DELETE /deals/{id}` - Delete deal

### Allocations
- `GET /allocations` - List all allocations
- `POST /allocations` - Create an allocation
- `GET /allocations/{id}` - Get allocation by ID
- `PUT /allocations/{id}` - Update allocation
- `DELETE /allocations/{id}` - Delete allocation

### Brokers
- `GET /brokers` - List all brokers
- `POST /brokers` - Create a broker
- `GET /brokers/{id}` - Get broker by ID
- `PUT /brokers/{id}` - Update broker
- `DELETE /brokers/{id}` - Delete broker

### Portfolios
- `GET /portfolios` - List all portfolios
- `POST /portfolios` - Create a portfolio
- `GET /portfolios/{id}` - Get portfolio by ID
- `PUT /portfolios/{id}` - Update portfolio
- `DELETE /portfolios/{id}` - Delete portfolio

## 🔧 Next Steps

1. **Enable Azure AD Authentication**
   - See README.md for Azure AD setup instructions
   - Uncomment authentication code in `app/main.py` and route files

2. **Connect to PostgreSQL**
   - Update `DATABASE_URL` in `.env`
   - Install PostgreSQL driver is already in requirements.txt

3. **Run Tests**
   ```bash
   pytest
   ```

4. **Integrate with Frontend**
   - Update frontend API base URL to `http://localhost:8000/api/v1`
   - Configure CORS origins in `.env` if needed

## 💡 Tips

- Database tables are automatically created on startup
- Use SQLite for development (no setup required)
- Interactive docs auto-update with code changes when using `--reload`
- Check logs in terminal for debugging

For detailed documentation, see [README.md](README.md)
