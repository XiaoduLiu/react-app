from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from app.data.json_store import JSONStore, get_json_store
from app.schemas.deal import BrokerCreate, BrokerUpdate, BrokerResponse

router = APIRouter(prefix="/brokers", tags=["brokers"])


@router.get("/", response_model=List[BrokerResponse])
def get_brokers(
    skip: int = 0,
    limit: int = 100,
    store: JSONStore = Depends(get_json_store)
):
    """Get all brokers."""
    brokers = store.get_brokers()
    # Apply pagination
    paginated_brokers = brokers[skip : skip + limit]
    return [BrokerResponse(**broker) for broker in paginated_brokers]


@router.get("/{broker_id}", response_model=BrokerResponse)
def get_broker(broker_id: str, store: JSONStore = Depends(get_json_store)):
    """Get a specific broker by broker_id."""
    broker = store.get_broker(broker_id)
    if not broker:
        raise HTTPException(status_code=404, detail="Broker not found")
    return BrokerResponse(**broker)


@router.post("/", response_model=BrokerResponse, status_code=status.HTTP_201_CREATED)
def create_broker(broker: BrokerCreate, store: JSONStore = Depends(get_json_store)):
    """Create a new broker."""
    # Check if broker_id already exists
    existing_broker = store.get_broker(broker.broker_id)
    if existing_broker:
        raise HTTPException(status_code=400, detail="Broker ID already exists")

    broker_data = broker.model_dump()
    created_broker = store.create_broker(broker_data)
    return BrokerResponse(**created_broker)


@router.put("/{broker_id}", response_model=BrokerResponse)
def update_broker(
    broker_id: str,
    broker: BrokerUpdate,
    store: JSONStore = Depends(get_json_store)
):
    """Update a broker."""
    existing_broker = store.get_broker(broker_id)
    if not existing_broker:
        raise HTTPException(status_code=404, detail="Broker not found")

    # Merge existing data with updates
    update_data = broker.model_dump(exclude_unset=True)
    updated_data = {**existing_broker, **update_data}

    updated_broker = store.update_broker(broker_id, updated_data)
    return BrokerResponse(**updated_broker)


@router.delete("/{broker_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_broker(broker_id: str, store: JSONStore = Depends(get_json_store)):
    """Delete a broker."""
    if not store.delete_broker(broker_id):
        raise HTTPException(status_code=404, detail="Broker not found")
    return None
