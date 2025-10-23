from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from app.data.json_store import JSONStore, get_json_store
from app.schemas.deal import DealCreate, DealUpdate, DealResponse

router = APIRouter(prefix="/deals", tags=["deals"])


@router.get("/", response_model=List[DealResponse])
def get_deals(
    skip: int = 0,
    limit: int = 100,
    store: JSONStore = Depends(get_json_store),
):
    """Get all deals."""
    deals = store.get_deals()
    # Apply pagination
    paginated_deals = deals[skip : skip + limit]
    # Convert to frontend-friendly format
    return [
        DealResponse(
            id=deal["deal_id"],
            dealName=deal["deal_name"],
            client=deal.get("client", ""),
            amount=deal.get("amount", 0),
            currency="USD",
            status=deal.get("status", "Pending"),
            startDate=deal["start_date"] if "start_date" in deal else "",
            endDate=deal["end_date"] if "end_date" in deal else "",
            owner=deal.get("owner", ""),
            region="North America",
        )
        for deal in paginated_deals
    ]


@router.get("/{deal_id}", response_model=DealResponse)
def get_deal(
    deal_id: str,
    store: JSONStore = Depends(get_json_store),
):
    """Get a specific deal by deal_id."""
    deal = store.get_deal(deal_id)
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    return DealResponse(
        id=deal["deal_id"],
        dealName=deal["deal_name"],
        client=deal.get("client", ""),
        amount=deal.get("amount", 0),
        currency="USD",
        status=deal.get("status", "Pending"),
        startDate=deal["start_date"] if "start_date" in deal else "",
        endDate=deal["end_date"] if "end_date" in deal else "",
        owner=deal.get("owner", ""),
        region="North America",
    )


@router.post("/", response_model=DealResponse, status_code=status.HTTP_201_CREATED)
def create_deal(
    deal: DealCreate,
    store: JSONStore = Depends(get_json_store),
):
    """Create a new deal."""
    # Check if deal_id already exists
    existing_deal = store.get_deal(deal.deal_id)
    if existing_deal:
        raise HTTPException(status_code=400, detail="Deal ID already exists")

    deal_data = deal.model_dump()
    created_deal = store.create_deal(deal_data)
    return DealResponse(
        id=created_deal["deal_id"],
        dealName=created_deal["deal_name"],
        client=created_deal.get("client", ""),
        amount=created_deal.get("amount", 0),
        currency="USD",
        status=created_deal.get("status", "Pending"),
        startDate=created_deal["start_date"] if "start_date" in created_deal else "",
        endDate=created_deal["end_date"] if "end_date" in created_deal else "",
        owner=created_deal.get("owner", ""),
        region="North America",
    )


@router.put("/{deal_id}", response_model=DealResponse)
def update_deal(
    deal_id: str,
    deal: DealUpdate,
    store: JSONStore = Depends(get_json_store),
):
    """Update a deal."""
    existing_deal = store.get_deal(deal_id)
    if not existing_deal:
        raise HTTPException(status_code=404, detail="Deal not found")

    # Merge existing data with updates
    update_data = deal.model_dump(exclude_unset=True)
    updated_data = {**existing_deal, **update_data}

    updated_deal = store.update_deal(deal_id, updated_data)
    return DealResponse(
        id=updated_deal["deal_id"],
        dealName=updated_deal["deal_name"],
        client=updated_deal.get("client", ""),
        amount=updated_deal.get("amount", 0),
        currency="USD",
        status=updated_deal.get("status", "Pending"),
        startDate=updated_deal["start_date"] if "start_date" in updated_deal else "",
        endDate=updated_deal["end_date"] if "end_date" in updated_deal else "",
        owner=updated_deal.get("owner", ""),
        region="North America",
    )


@router.delete("/{deal_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_deal(
    deal_id: str,
    store: JSONStore = Depends(get_json_store),
):
    """Delete a deal."""
    if not store.delete_deal(deal_id):
        raise HTTPException(status_code=404, detail="Deal not found")
    return None
