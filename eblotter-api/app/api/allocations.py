from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.base import get_db
from app.models.deal import Allocation
from app.schemas.deal import AllocationCreate, AllocationUpdate, AllocationResponse

router = APIRouter(prefix="/allocations", tags=["allocations"])


@router.get("/", response_model=List[AllocationResponse])
def get_allocations(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all allocations."""
    allocations = db.query(Allocation).offset(skip).limit(limit).all()
    return allocations


@router.get("/{allocation_id}", response_model=AllocationResponse)
def get_allocation(allocation_id: int, db: Session = Depends(get_db)):
    """Get a specific allocation by ID."""
    allocation = db.query(Allocation).filter(Allocation.id == allocation_id).first()
    if not allocation:
        raise HTTPException(status_code=404, detail="Allocation not found")
    return allocation


@router.post("/", response_model=AllocationResponse, status_code=status.HTTP_201_CREATED)
def create_allocation(allocation: AllocationCreate, db: Session = Depends(get_db)):
    """Create a new allocation."""
    db_allocation = Allocation(**allocation.model_dump())
    db.add(db_allocation)
    db.commit()
    db.refresh(db_allocation)
    return db_allocation


@router.put("/{allocation_id}", response_model=AllocationResponse)
def update_allocation(
    allocation_id: int,
    allocation: AllocationUpdate,
    db: Session = Depends(get_db)
):
    """Update an allocation."""
    db_allocation = db.query(Allocation).filter(Allocation.id == allocation_id).first()
    if not db_allocation:
        raise HTTPException(status_code=404, detail="Allocation not found")

    update_data = allocation.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_allocation, field, value)

    db.commit()
    db.refresh(db_allocation)
    return db_allocation


@router.delete("/{allocation_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_allocation(allocation_id: int, db: Session = Depends(get_db)):
    """Delete an allocation."""
    db_allocation = db.query(Allocation).filter(Allocation.id == allocation_id).first()
    if not db_allocation:
        raise HTTPException(status_code=404, detail="Allocation not found")

    db.delete(db_allocation)
    db.commit()
    return None
