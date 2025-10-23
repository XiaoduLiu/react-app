"""Seed data for eBlotter application."""
from datetime import date
from sqlalchemy.orm import Session
from app.models.deal import Deal, Broker, Portfolio
from app.db.base import SessionLocal


def seed_deals(db: Session) -> None:
    """Seed initial deal data."""
    # Check if deals already exist
    existing_deals = db.query(Deal).count()
    if existing_deals > 0:
        print(f"Database already has {existing_deals} deals. Skipping seed.")
        return

    deals = [
        Deal(
            deal_id="DD001",
            deal_name="Project Alpha",
            client="ABC Corp",
            amount=500000.00,
            status="Active",
            start_date=date(2024, 1, 15),
            end_date=date(2024, 12, 31),
            owner="John Doe",
        ),
        Deal(
            deal_id="DD002",
            deal_name="Project Beta",
            client="XYZ Inc",
            amount=750000.00,
            status="Pending",
            start_date=date(2024, 2, 1),
            end_date=date(2025, 1, 31),
            owner="Jane Smith",
        ),
        Deal(
            deal_id="DD003",
            deal_name="Project Gamma",
            client="Tech Solutions",
            amount=320000.00,
            status="Active",
            start_date=date(2024, 3, 10),
            end_date=date(2024, 11, 30),
            owner="Bob Johnson",
        ),
        Deal(
            deal_id="DD004",
            deal_name="Project Delta",
            client="Global Services",
            amount=920000.00,
            status="Completed",
            start_date=date(2023, 6, 1),
            end_date=date(2024, 5, 31),
            owner="Alice Brown",
        ),
        Deal(
            deal_id="DD005",
            deal_name="Project Epsilon",
            client="Innovation Labs",
            amount=280000.00,
            status="Active",
            start_date=date(2024, 4, 1),
            end_date=date(2024, 10, 31),
            owner="Charlie Wilson",
        ),
        Deal(
            deal_id="DD006",
            deal_name="Project Zeta",
            client="Digital Media",
            amount=650000.00,
            status="Pending",
            start_date=date(2024, 5, 15),
            end_date=date(2025, 2, 28),
            owner="Diana Prince",
        ),
    ]

    db.add_all(deals)
    db.commit()
    print(f"✅ Seeded {len(deals)} deals")


def seed_brokers(db: Session) -> None:
    """Seed initial broker data."""
    existing_brokers = db.query(Broker).count()
    if existing_brokers > 0:
        print(f"Database already has {existing_brokers} brokers. Skipping seed.")
        return

    brokers = [
        Broker(
            broker_id="BRK001",
            broker_name="Goldman Sachs",
            status="Active",
        ),
        Broker(
            broker_id="BRK002",
            broker_name="Morgan Stanley",
            status="Active",
        ),
        Broker(
            broker_id="BRK003",
            broker_name="JP Morgan",
            status="Active",
        ),
        Broker(
            broker_id="BRK004",
            broker_name="Bank of America",
            status="Inactive",
        ),
        Broker(
            broker_id="BRK005",
            broker_name="Citigroup",
            status="Active",
        ),
    ]

    db.add_all(brokers)
    db.commit()
    print(f"✅ Seeded {len(brokers)} brokers")


def seed_portfolios(db: Session) -> None:
    """Seed initial portfolio data."""
    existing_portfolios = db.query(Portfolio).count()
    if existing_portfolios > 0:
        print(f"Database already has {existing_portfolios} portfolios. Skipping seed.")
        return

    portfolios = [
        Portfolio(
            portfolio_id="PF001",
            portfolio_name="Growth Portfolio",
            manager="Sarah Johnson",
            strategy="Growth",
            inception_date=date(2020, 1, 15),
            aum=15000000.00,
            benchmark="S&P 500",
            risk_profile="High",
            performance=12.5,
        ),
        Portfolio(
            portfolio_id="PF002",
            portfolio_name="Value Fund",
            manager="Michael Chen",
            strategy="Value",
            inception_date=date(2019, 6, 1),
            aum=25000000.00,
            benchmark="Russell 2000",
            risk_profile="Medium",
            performance=8.3,
        ),
        Portfolio(
            portfolio_id="PF003",
            portfolio_name="Balanced Portfolio",
            manager="Emily Rodriguez",
            strategy="Balanced",
            inception_date=date(2021, 3, 10),
            aum=18000000.00,
            benchmark="60/40 Mix",
            risk_profile="Medium",
            performance=9.7,
        ),
        Portfolio(
            portfolio_id="PF004",
            portfolio_name="Conservative Fund",
            manager="David Kim",
            strategy="Income",
            inception_date=date(2018, 9, 1),
            aum=30000000.00,
            benchmark="Barclays Agg",
            risk_profile="Low",
            performance=4.2,
        ),
        Portfolio(
            portfolio_id="PF005",
            portfolio_name="Emerging Markets",
            manager="Lisa Wang",
            strategy="Growth",
            inception_date=date(2022, 1, 1),
            aum=12000000.00,
            benchmark="MSCI EM",
            risk_profile="Very High",
            performance=15.8,
        ),
        Portfolio(
            portfolio_id="PF006",
            portfolio_name="Technology Fund",
            manager="James Anderson",
            strategy="Sector Focus",
            inception_date=date(2020, 7, 15),
            aum=20000000.00,
            benchmark="NASDAQ 100",
            risk_profile="High",
            performance=18.2,
        ),
    ]

    db.add_all(portfolios)
    db.commit()
    print(f"✅ Seeded {len(portfolios)} portfolios")


def seed_all() -> None:
    """Seed all data."""
    print("🌱 Starting database seeding...")
    db = SessionLocal()
    try:
        seed_deals(db)
        seed_brokers(db)
        seed_portfolios(db)
        print("✅ Database seeding completed successfully!")
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_all()
