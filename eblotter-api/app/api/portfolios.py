from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from app.data.json_store import JSONStore, get_json_store
from app.schemas.deal import PortfolioCreate, PortfolioUpdate, PortfolioResponse

router = APIRouter(prefix="/portfolios", tags=["portfolios"])


@router.get("/", response_model=List[PortfolioResponse])
def get_portfolios(
    skip: int = 0,
    limit: int = 100,
    store: JSONStore = Depends(get_json_store)
):
    """Get all portfolios."""
    portfolios = store.get_portfolios()
    # Apply pagination
    paginated_portfolios = portfolios[skip : skip + limit]
    return [PortfolioResponse(**portfolio) for portfolio in paginated_portfolios]


@router.get("/{portfolio_id}", response_model=PortfolioResponse)
def get_portfolio(portfolio_id: str, store: JSONStore = Depends(get_json_store)):
    """Get a specific portfolio by portfolio_id."""
    portfolio = store.get_portfolio(portfolio_id)
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return PortfolioResponse(**portfolio)


@router.post("/", response_model=PortfolioResponse, status_code=status.HTTP_201_CREATED)
def create_portfolio(portfolio: PortfolioCreate, store: JSONStore = Depends(get_json_store)):
    """Create a new portfolio."""
    # Check if portfolio_id already exists
    existing_portfolio = store.get_portfolio(portfolio.portfolio_id)
    if existing_portfolio:
        raise HTTPException(status_code=400, detail="Portfolio ID already exists")

    portfolio_data = portfolio.model_dump()
    created_portfolio = store.create_portfolio(portfolio_data)
    return PortfolioResponse(**created_portfolio)


@router.put("/{portfolio_id}", response_model=PortfolioResponse)
def update_portfolio(
    portfolio_id: str,
    portfolio: PortfolioUpdate,
    store: JSONStore = Depends(get_json_store)
):
    """Update a portfolio."""
    existing_portfolio = store.get_portfolio(portfolio_id)
    if not existing_portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")

    # Merge existing data with updates
    update_data = portfolio.model_dump(exclude_unset=True)
    updated_data = {**existing_portfolio, **update_data}

    updated_portfolio = store.update_portfolio(portfolio_id, updated_data)
    return PortfolioResponse(**updated_portfolio)


@router.delete("/{portfolio_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_portfolio(portfolio_id: str, store: JSONStore = Depends(get_json_store)):
    """Delete a portfolio."""
    if not store.delete_portfolio(portfolio_id):
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return None
