import apiClient from './api';
import { PortfolioData } from '@/types/portfolio';

export const portfolioService = {
  // Get all portfolios
  getAll: async (): Promise<PortfolioData[]> => {
    const response = await apiClient.get<PortfolioData[]>('/api/v1/portfolios');
    return response.data;
  },

  // Get portfolio by ID
  getById: async (id: string): Promise<PortfolioData> => {
    const response = await apiClient.get<PortfolioData>(`/api/v1/portfolios/${id}`);
    return response.data;
  },

  // Create new portfolio
  create: async (portfolio: Omit<PortfolioData, 'id'>): Promise<PortfolioData> => {
    const response = await apiClient.post<PortfolioData>('/api/v1/portfolios', portfolio);
    return response.data;
  },

  // Update portfolio
  update: async (id: string, portfolio: Partial<PortfolioData>): Promise<PortfolioData> => {
    const response = await apiClient.put<PortfolioData>(`/api/v1/portfolios/${id}`, portfolio);
    return response.data;
  },

  // Delete portfolio
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/v1/portfolios/${id}`);
  },
};
