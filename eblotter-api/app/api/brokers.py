from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.base import get_db
from app.models.deal import Broker
from app.schemas.deal import BrokerCreate, BrokerUpdate, BrokerResponse

router = APIRouter(prefix="/brokers", tags=["brokers"])


@router.get("/", response_model=List[BrokerResponse])
def get_brokers(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all brokers."""
    brokers = db.query(Broker).offset(skip).limit(limit).all()
    return brokers


@router.get("/{broker_id}", response_model=BrokerResponse)
def get_broker(broker_id: int, db: Session = Depends(get_db)):
    """Get a specific broker by ID."""
    broker = db.query(Broker).filter(Broker.id == broker_id).first()
    if not broker:
        raise HTTPException(status_code=404, detail="Broker not found")
    return broker


@router.post("/", response_model=BrokerResponse, status_code=status.HTTP_201_CREATED)
def create_broker(broker: BrokerCreate, db: Session = Depends(get_db)):
    """Create a new broker."""
    # Check if broker_id already exists
    existing_broker = db.query(Broker).filter(Broker.broker_id == broker.broker_id).first()
    if existing_broker:
        raise HTTPException(status_code=400, detail="Broker ID already exists")

    db_broker = Broker(**broker.model_dump())
    db.add(db_broker)
    db.commit()
    db.refresh(db_broker)
    return db_broker


@router.put("/{broker_id}", response_model=BrokerResponse)
def update_broker(
    broker_id: int,
    broker: BrokerUpdate,
    db: Session = Depends(get_db)
):
    """Update a broker."""
    db_broker = db.query(Broker).filter(Broker.id == broker_id).first()
    if not db_broker:
        raise HTTPException(status_code=404, detail="Broker not found")

    update_data = broker.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_broker, field, value)

    db.commit()
    db.refresh(db_broker)
    return db_broker


@router.delete("/{broker_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_broker(broker_id: int, db: Session = Depends(get_db)):
    """Delete a broker."""
    db_broker = db.query(Broker).filter(Broker.id == broker_id).first()
    if not db_broker:
        raise HTTPException(status_code=404, detail="Broker not found")

    db.delete(db_broker)
    db.commit()
    return None
