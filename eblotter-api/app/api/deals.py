from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.base import get_db
from app.models.deal import Deal
from app.schemas.deal import DealCreate, DealUpdate, DealResponse

router = APIRouter(prefix="/deals", tags=["deals"])


@router.get("/", response_model=List[DealResponse])
def get_deals(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """Get all deals."""
    deals = db.query(Deal).offset(skip).limit(limit).all()
    # Convert to frontend-friendly format
    return [DealResponse.from_orm_model(deal) for deal in deals]


@router.get("/{deal_id}", response_model=DealResponse)
def get_deal(
    deal_id: str,  # Changed to string to match deal_id
    db: Session = Depends(get_db),
):
    """Get a specific deal by deal_id."""
    deal = db.query(Deal).filter(Deal.deal_id == deal_id).first()
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    return DealResponse.from_orm_model(deal)


@router.post("/", response_model=DealResponse, status_code=status.HTTP_201_CREATED)
def create_deal(
    deal: DealCreate,
    db: Session = Depends(get_db),
):
    """Create a new deal."""
    # Check if deal_id already exists
    existing_deal = db.query(Deal).filter(Deal.deal_id == deal.deal_id).first()
    if existing_deal:
        raise HTTPException(status_code=400, detail="Deal ID already exists")

    db_deal = Deal(**deal.model_dump())
    db.add(db_deal)
    db.commit()
    db.refresh(db_deal)
    return DealResponse.from_orm_model(db_deal)


@router.put("/{deal_id}", response_model=DealResponse)
def update_deal(
    deal_id: str,  # Changed to string to match deal_id
    deal: DealUpdate,
    db: Session = Depends(get_db),
):
    """Update a deal."""
    db_deal = db.query(Deal).filter(Deal.deal_id == deal_id).first()
    if not db_deal:
        raise HTTPException(status_code=404, detail="Deal not found")

    update_data = deal.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_deal, field, value)

    db.commit()
    db.refresh(db_deal)
    return DealResponse.from_orm_model(db_deal)


@router.delete("/{deal_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_deal(
    deal_id: str,  # Changed to string to match deal_id
    db: Session = Depends(get_db),
):
    """Delete a deal."""
    db_deal = db.query(Deal).filter(Deal.deal_id == deal_id).first()
    if not db_deal:
        raise HTTPException(status_code=404, detail="Deal not found")

    db.delete(db_deal)
    db.commit()
    return None
