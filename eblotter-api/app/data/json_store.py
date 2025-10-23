"""
JSON-based data store for the eBlotter API.
Provides an in-memory data store loaded from JSON files.
"""
import json
import os
from typing import List, Dict, Any, Optional
from pathlib import Path
from datetime import datetime

class JSONStore:
    """Simple in-memory data store backed by JSON files."""

    def __init__(self):
        self.data_dir = Path(__file__).parent
        self.deals: List[Dict[str, Any]] = []
        self.brokers: List[Dict[str, Any]] = []
        self.portfolios: List[Dict[str, Any]] = []
        self.allocations: List[Dict[str, Any]] = []
        self._next_ids = {
            "deals": 1,
            "brokers": 1,
            "portfolios": 1,
            "allocations": 1
        }
        self.load_data()

    def load_data(self):
        """Load all data from JSON files."""
        self.deals = self._load_json("deals.json")
        self.brokers = self._load_json("brokers.json")
        self.portfolios = self._load_json("portfolios.json")
        self.allocations = self._load_json("allocations.json")

        # Add timestamps to items that don't have them
        now = datetime.now().isoformat()
        for item in self.brokers + self.portfolios + self.allocations:
            if "created_at" not in item:
                item["created_at"] = now
            if "updated_at" not in item:
                item["updated_at"] = now

        # Update next IDs based on existing data
        if self.deals:
            self._next_ids["deals"] = max(d["id"] for d in self.deals) + 1
        if self.brokers:
            self._next_ids["brokers"] = max(b["id"] for b in self.brokers) + 1
        if self.portfolios:
            self._next_ids["portfolios"] = max(p["id"] for p in self.portfolios) + 1
        if self.allocations:
            self._next_ids["allocations"] = max(a["id"] for a in self.allocations) + 1

    def _load_json(self, filename: str) -> List[Dict[str, Any]]:
        """Load data from a JSON file."""
        file_path = self.data_dir / filename
        if not file_path.exists():
            return []

        with open(file_path, 'r') as f:
            return json.load(f)

    def _save_json(self, filename: str, data: List[Dict[str, Any]]):
        """Save data to a JSON file."""
        file_path = self.data_dir / filename
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=2, default=str)

    # Deal operations
    def get_deals(self) -> List[Dict[str, Any]]:
        """Get all deals."""
        return self.deals

    def get_deal(self, deal_id: str) -> Optional[Dict[str, Any]]:
        """Get a deal by deal_id."""
        return next((d for d in self.deals if d["deal_id"] == deal_id), None)

    def create_deal(self, deal_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new deal."""
        deal_data["id"] = self._next_ids["deals"]
        self._next_ids["deals"] += 1
        self.deals.append(deal_data)
        self._save_json("deals.json", self.deals)
        return deal_data

    def update_deal(self, deal_id: str, deal_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update an existing deal."""
        for i, deal in enumerate(self.deals):
            if deal["deal_id"] == deal_id:
                # Preserve the original id
                deal_data["id"] = deal["id"]
                deal_data["deal_id"] = deal_id
                self.deals[i] = deal_data
                self._save_json("deals.json", self.deals)
                return deal_data
        return None

    def delete_deal(self, deal_id: str) -> bool:
        """Delete a deal."""
        original_length = len(self.deals)
        self.deals = [d for d in self.deals if d["deal_id"] != deal_id]
        if len(self.deals) < original_length:
            self._save_json("deals.json", self.deals)
            return True
        return False

    # Broker operations
    def get_brokers(self) -> List[Dict[str, Any]]:
        """Get all brokers."""
        return self.brokers

    def get_broker(self, broker_id: str) -> Optional[Dict[str, Any]]:
        """Get a broker by broker_id."""
        return next((b for b in self.brokers if b["broker_id"] == broker_id), None)

    def create_broker(self, broker_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new broker."""
        broker_data["id"] = self._next_ids["brokers"]
        self._next_ids["brokers"] += 1
        now = datetime.now().isoformat()
        broker_data["created_at"] = now
        broker_data["updated_at"] = now
        self.brokers.append(broker_data)
        self._save_json("brokers.json", self.brokers)
        return broker_data

    def update_broker(self, broker_id: str, broker_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update an existing broker."""
        for i, broker in enumerate(self.brokers):
            if broker["broker_id"] == broker_id:
                broker_data["id"] = broker["id"]
                broker_data["broker_id"] = broker_id
                broker_data["created_at"] = broker.get("created_at", datetime.now().isoformat())
                broker_data["updated_at"] = datetime.now().isoformat()
                self.brokers[i] = broker_data
                self._save_json("brokers.json", self.brokers)
                return broker_data
        return None

    def delete_broker(self, broker_id: str) -> bool:
        """Delete a broker."""
        original_length = len(self.brokers)
        self.brokers = [b for b in self.brokers if b["broker_id"] != broker_id]
        if len(self.brokers) < original_length:
            self._save_json("brokers.json", self.brokers)
            return True
        return False

    # Portfolio operations
    def get_portfolios(self) -> List[Dict[str, Any]]:
        """Get all portfolios."""
        return self.portfolios

    def get_portfolio(self, portfolio_id: str) -> Optional[Dict[str, Any]]:
        """Get a portfolio by portfolio_id."""
        return next((p for p in self.portfolios if p["portfolio_id"] == portfolio_id), None)

    def create_portfolio(self, portfolio_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new portfolio."""
        portfolio_data["id"] = self._next_ids["portfolios"]
        self._next_ids["portfolios"] += 1
        now = datetime.now().isoformat()
        portfolio_data["created_at"] = now
        portfolio_data["updated_at"] = now
        self.portfolios.append(portfolio_data)
        self._save_json("portfolios.json", self.portfolios)
        return portfolio_data

    def update_portfolio(self, portfolio_id: str, portfolio_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update an existing portfolio."""
        for i, portfolio in enumerate(self.portfolios):
            if portfolio["portfolio_id"] == portfolio_id:
                portfolio_data["id"] = portfolio["id"]
                portfolio_data["portfolio_id"] = portfolio_id
                portfolio_data["created_at"] = portfolio.get("created_at", datetime.now().isoformat())
                portfolio_data["updated_at"] = datetime.now().isoformat()
                self.portfolios[i] = portfolio_data
                self._save_json("portfolios.json", self.portfolios)
                return portfolio_data
        return None

    def delete_portfolio(self, portfolio_id: str) -> bool:
        """Delete a portfolio."""
        original_length = len(self.portfolios)
        self.portfolios = [p for p in self.portfolios if p["portfolio_id"] != portfolio_id]
        if len(self.portfolios) < original_length:
            self._save_json("portfolios.json", self.portfolios)
            return True
        return False

    # Allocation operations
    def get_allocations(self) -> List[Dict[str, Any]]:
        """Get all allocations."""
        return self.allocations

    def get_allocation(self, allocation_id: int) -> Optional[Dict[str, Any]]:
        """Get an allocation by id."""
        return next((a for a in self.allocations if a["id"] == allocation_id), None)

    def create_allocation(self, allocation_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new allocation."""
        allocation_data["id"] = self._next_ids["allocations"]
        self._next_ids["allocations"] += 1
        now = datetime.now().isoformat()
        allocation_data["created_at"] = now
        allocation_data["updated_at"] = now
        self.allocations.append(allocation_data)
        self._save_json("allocations.json", self.allocations)
        return allocation_data

    def update_allocation(self, allocation_id: int, allocation_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update an existing allocation."""
        for i, allocation in enumerate(self.allocations):
            if allocation["id"] == allocation_id:
                allocation_data["id"] = allocation_id
                allocation_data["created_at"] = allocation.get("created_at", datetime.now().isoformat())
                allocation_data["updated_at"] = datetime.now().isoformat()
                self.allocations[i] = allocation_data
                self._save_json("allocations.json", self.allocations)
                return allocation_data
        return None

    def delete_allocation(self, allocation_id: int) -> bool:
        """Delete an allocation."""
        original_length = len(self.allocations)
        self.allocations = [a for a in self.allocations if a["id"] != allocation_id]
        if len(self.allocations) < original_length:
            self._save_json("allocations.json", self.allocations)
            return True
        return False


# Global store instance
json_store = JSONStore()


def get_json_store() -> JSONStore:
    """Dependency to get the JSON store instance."""
    return json_store
