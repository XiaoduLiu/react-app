from sqlalchemy import Column, Integer, String, Float, Date, DateTime, Boolean
from sqlalchemy.sql import func
from app.db.base import Base


class Deal(Base):
    """Deal model for eBlotter application."""

    __tablename__ = "deals"

    id = Column(Integer, primary_key=True, index=True)
    deal_id = Column(String(50), unique=True, index=True, nullable=False)
    deal_name = Column(String(200), nullable=False)
    client = Column(String(200))
    amount = Column(Float)
    status = Column(String(50))  # Active, Pending, Completed
    start_date = Column(Date)
    end_date = Column(Date)
    owner = Column(String(100))

    # Audit fields
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Allocation(Base):
    """Allocation model for eBlotter application."""

    __tablename__ = "allocations"

    id = Column(Integer, primary_key=True, index=True)

    # Section 1 fields
    deal_circle = Column(String(100))
    desc_of_security = Column(String(500))
    allocation_type = Column(String(50))  # Pro Rata, Tiered, Priority, Equal, Custom
    circle_date = Column(Date)
    is_add_on = Column(Boolean, default=False)
    circle_notes = Column(String(1000))

    # Section 2 fields
    deal_allocation = Column(Float)
    allocation_date = Column(Date)
    allocation_rounding = Column(Float)
    cusip = Column(String(20))
    trader = Column(String(100))
    broker = Column(String(100))
    execution_date = Column(Date)
    execution_reason = Column(String(100))
    execution_notes = Column(String(1000))

    # Audit fields
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Broker(Base):
    """Broker model for eBlotter application."""

    __tablename__ = "brokers"

    id = Column(Integer, primary_key=True, index=True)
    broker_id = Column(String(50), unique=True, index=True, nullable=False)
    broker_name = Column(String(200), nullable=False)
    status = Column(String(50))  # Active, Inactive

    # Audit fields
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Portfolio(Base):
    """Portfolio model for eBlotter application."""

    __tablename__ = "portfolios"

    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(String(50), unique=True, index=True, nullable=False)
    portfolio_name = Column(String(200), nullable=False)
    manager = Column(String(100))
    strategy = Column(String(100))
    inception_date = Column(Date)
    aum = Column(Float)  # Assets Under Management
    benchmark = Column(String(100))
    risk_profile = Column(String(50))  # Low, Medium, High, Very High
    performance = Column(Float)

    # Audit fields
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
