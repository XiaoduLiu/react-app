from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from app.data.json_store import JSONStore, get_json_store
from app.schemas.deal import AllocationCreate, AllocationUpdate, AllocationResponse

router = APIRouter(prefix="/allocations", tags=["allocations"])


@router.get("/", response_model=List[AllocationResponse])
def get_allocations(
    skip: int = 0,
    limit: int = 100,
    store: JSONStore = Depends(get_json_store)
):
    """Get all allocations."""
    allocations = store.get_allocations()
    # Apply pagination
    paginated_allocations = allocations[skip : skip + limit]
    return [AllocationResponse(**allocation) for allocation in paginated_allocations]


@router.get("/{allocation_id}", response_model=AllocationResponse)
def get_allocation(allocation_id: int, store: JSONStore = Depends(get_json_store)):
    """Get a specific allocation by ID."""
    allocation = store.get_allocation(allocation_id)
    if not allocation:
        raise HTTPException(status_code=404, detail="Allocation not found")
    return AllocationResponse(**allocation)


@router.post("/", response_model=AllocationResponse, status_code=status.HTTP_201_CREATED)
def create_allocation(allocation: AllocationCreate, store: JSONStore = Depends(get_json_store)):
    """Create a new allocation."""
    allocation_data = allocation.model_dump()
    created_allocation = store.create_allocation(allocation_data)
    return AllocationResponse(**created_allocation)


@router.put("/{allocation_id}", response_model=AllocationResponse)
def update_allocation(
    allocation_id: int,
    allocation: AllocationUpdate,
    store: JSONStore = Depends(get_json_store)
):
    """Update an allocation."""
    existing_allocation = store.get_allocation(allocation_id)
    if not existing_allocation:
        raise HTTPException(status_code=404, detail="Allocation not found")

    # Merge existing data with updates
    update_data = allocation.model_dump(exclude_unset=True)
    updated_data = {**existing_allocation, **update_data}

    updated_allocation = store.update_allocation(allocation_id, updated_data)
    return AllocationResponse(**updated_allocation)


@router.delete("/{allocation_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_allocation(allocation_id: int, store: JSONStore = Depends(get_json_store)):
    """Delete an allocation."""
    if not store.delete_allocation(allocation_id):
        raise HTTPException(status_code=404, detail="Allocation not found")
    return None
