from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.base import get_db
from app.models.deal import Deal
from app.schemas.deal import DealCreate, DealUpdate, DealResponse
# Uncomment when Azure Auth is configured:
# from app.core.auth import get_current_user

router = APIRouter(prefix="/deals", tags=["deals"])


@router.get("/", response_model=List[DealResponse])
def get_deals(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    # user = Depends(get_current_user)  # Uncomment to enable Azure Auth
):
    """Get all deals."""
    deals = db.query(Deal).offset(skip).limit(limit).all()
    return deals


@router.get("/{deal_id}", response_model=DealResponse)
def get_deal(
    deal_id: int,
    db: Session = Depends(get_db),
    # user = Depends(get_current_user)  # Uncomment to enable Azure Auth
):
    """Get a specific deal by ID."""
    deal = db.query(Deal).filter(Deal.id == deal_id).first()
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    return deal


@router.post("/", response_model=DealResponse, status_code=status.HTTP_201_CREATED)
def create_deal(
    deal: DealCreate,
    db: Session = Depends(get_db),
    # user = Depends(get_current_user)  # Uncomment to enable Azure Auth
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
    return db_deal


@router.put("/{deal_id}", response_model=DealResponse)
def update_deal(
    deal_id: int,
    deal: DealUpdate,
    db: Session = Depends(get_db),
    # user = Depends(get_current_user)  # Uncomment to enable Azure Auth
):
    """Update a deal."""
    db_deal = db.query(Deal).filter(Deal.id == deal_id).first()
    if not db_deal:
        raise HTTPException(status_code=404, detail="Deal not found")

    update_data = deal.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_deal, field, value)

    db.commit()
    db.refresh(db_deal)
    return db_deal


@router.delete("/{deal_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_deal(
    deal_id: int,
    db: Session = Depends(get_db),
    # user = Depends(get_current_user)  # Uncomment to enable Azure Auth
):
    """Delete a deal."""
    db_deal = db.query(Deal).filter(Deal.id == deal_id).first()
    if not db_deal:
        raise HTTPException(status_code=404, detail="Deal not found")

    db.delete(db_deal)
    db.commit()
    return None
