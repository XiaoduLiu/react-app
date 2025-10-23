from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.base import get_db
from app.models.deal import Portfolio
from app.schemas.deal import PortfolioCreate, PortfolioUpdate, PortfolioResponse

router = APIRouter(prefix="/portfolios", tags=["portfolios"])


@router.get("/", response_model=List[PortfolioResponse])
def get_portfolios(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all portfolios."""
    portfolios = db.query(Portfolio).offset(skip).limit(limit).all()
    return portfolios


@router.get("/{portfolio_id}", response_model=PortfolioResponse)
def get_portfolio(portfolio_id: int, db: Session = Depends(get_db)):
    """Get a specific portfolio by ID."""
    portfolio = db.query(Portfolio).filter(Portfolio.id == portfolio_id).first()
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return portfolio


@router.post("/", response_model=PortfolioResponse, status_code=status.HTTP_201_CREATED)
def create_portfolio(portfolio: PortfolioCreate, db: Session = Depends(get_db)):
    """Create a new portfolio."""
    # Check if portfolio_id already exists
    existing_portfolio = db.query(Portfolio).filter(Portfolio.portfolio_id == portfolio.portfolio_id).first()
    if existing_portfolio:
        raise HTTPException(status_code=400, detail="Portfolio ID already exists")

    db_portfolio = Portfolio(**portfolio.model_dump())
    db.add(db_portfolio)
    db.commit()
    db.refresh(db_portfolio)
    return db_portfolio


@router.put("/{portfolio_id}", response_model=PortfolioResponse)
def update_portfolio(
    portfolio_id: int,
    portfolio: PortfolioUpdate,
    db: Session = Depends(get_db)
):
    """Update a portfolio."""
    db_portfolio = db.query(Portfolio).filter(Portfolio.id == portfolio_id).first()
    if not db_portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")

    update_data = portfolio.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_portfolio, field, value)

    db.commit()
    db.refresh(db_portfolio)
    return db_portfolio


@router.delete("/{portfolio_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_portfolio(portfolio_id: int, db: Session = Depends(get_db)):
    """Delete a portfolio."""
    db_portfolio = db.query(Portfolio).filter(Portfolio.id == portfolio_id).first()
    if not db_portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")

    db.delete(db_portfolio)
    db.commit()
    return None
