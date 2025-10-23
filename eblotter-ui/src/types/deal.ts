export interface DealData {
  id: string;
  dealName: string;
  client: string;
  amount: number;
  currency: string;
  status: string;
  startDate: string;
  endDate: string;
  owner: string;
  region: string;
}

export interface DealSearchParams {
  securityDescription?: string;
  securityId?: string;
  tradeStartDate?: string;
  tradeEndDate?: string;
  trader?: string;
}

export interface AllocationData {
  id: string;
  portfolioId: string;
  amount: number;
  status: string;
}
