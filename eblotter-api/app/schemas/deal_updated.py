from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from datetime import date, datetime


# Deal Schemas
class DealBase(BaseModel):
    """Base schema for Deal."""
    deal_id: str = Field(..., serialization_alias="id")
    deal_name: str = Field(..., serialization_alias="dealName")
    client: Optional[str] = None
    amount: Optional[float] = None
    status: Optional[str] = None
    start_date: Optional[date] = Field(None, serialization_alias="startDate")
    end_date: Optional[date] = Field(None, serialization_alias="endDate")
    owner: Optional[str] = None


class DealCreate(DealBase):
    """Schema for creating a Deal."""
    pass


class DealUpdate(BaseModel):
    """Schema for updating a Deal."""
    deal_name: Optional[str] = Field(None, serialization_alias="dealName")
    client: Optional[str] = None
    amount: Optional[float] = None
    status: Optional[str] = None
    start_date: Optional[date] = Field(None, serialization_alias="startDate")
    end_date: Optional[date] = Field(None, serialization_alias="endDate")
    owner: Optional[str] = None


class DealResponse(BaseModel):
    """Schema for Deal response with camelCase for frontend."""
    id: str
    dealName: str
    client: Optional[str] = None
    amount: Optional[float] = None
    currency: str = "USD"
    status: Optional[str] = None
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    owner: Optional[str] = None
    region: str = "North America"

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    @classmethod
    def from_orm_model(cls, deal):
        """Convert ORM model to response schema."""
        return cls(
            id=deal.deal_id,
            dealName=deal.deal_name,
            client=deal.client,
            amount=deal.amount,
            currency="USD",
            status=deal.status,
            startDate=deal.start_date.isoformat() if deal.start_date else None,
            endDate=deal.end_date.isoformat() if deal.end_date else None,
            owner=deal.owner,
            region="North America",
        )


# Keep other schemas unchanged
class AllocationBase(BaseModel):
    """Base schema for Allocation."""
    deal_circle: Optional[str] = None
    desc_of_security: Optional[str] = None
    allocation_type: Optional[str] = None
    circle_date: Optional[date] = None
    is_add_on: bool = False
    circle_notes: Optional[str] = None
    deal_allocation: Optional[float] = None
    allocation_date: Optional[date] = None
    allocation_rounding: Optional[float] = None
    cusip: Optional[str] = None
    trader: Optional[str] = None
    broker: Optional[str] = None
    execution_date: Optional[date] = None
    execution_reason: Optional[str] = None
    execution_notes: Optional[str] = None


class AllocationCreate(AllocationBase):
    """Schema for creating an Allocation."""
    pass


class AllocationUpdate(AllocationBase):
    """Schema for updating an Allocation."""
    pass


class AllocationResponse(AllocationBase):
    """Schema for Allocation response."""
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# Broker Schemas
class BrokerBase(BaseModel):
    """Base schema for Broker."""
    broker_id: str
    broker_name: str
    status: Optional[str] = None


class BrokerCreate(BrokerBase):
    """Schema for creating a Broker."""
    pass


class BrokerUpdate(BaseModel):
    """Schema for updating a Broker."""
    broker_name: Optional[str] = None
    status: Optional[str] = None


class BrokerResponse(BrokerBase):
    """Schema for Broker response."""
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# Portfolio Schemas
class PortfolioBase(BaseModel):
    """Base schema for Portfolio."""
    portfolio_id: str
    portfolio_name: str
    manager: Optional[str] = None
    strategy: Optional[str] = None
    inception_date: Optional[date] = None
    aum: Optional[float] = None
    benchmark: Optional[str] = None
    risk_profile: Optional[str] = None
    performance: Optional[float] = None


class PortfolioCreate(PortfolioBase):
    """Schema for creating a Portfolio."""
    pass


class PortfolioUpdate(BaseModel):
    """Schema for updating a Portfolio."""
    portfolio_name: Optional[str] = None
    manager: Optional[str] = None
    strategy: Optional[str] = None
    inception_date: Optional[date] = None
    aum: Optional[float] = None
    benchmark: Optional[str] = None
    risk_profile: Optional[str] = None
    performance: Optional[float] = None


class PortfolioResponse(PortfolioBase):
    """Schema for Portfolio response."""
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
