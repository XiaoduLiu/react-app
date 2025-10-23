import apiClient from './api';
import { DealData, DealSearchParams } from '@/types/deal';

export const dealService = {
  // Get all deals
  getAll: async (): Promise<DealData[]> => {
    const response = await apiClient.get<DealData[]>('/deals/');
    return response.data;
  },

  // Get deal by ID
  getById: async (id: string): Promise<DealData> => {
    const response = await apiClient.get<DealData>(`/deals/${id}/`);
    return response.data;
  },

  // Search deals
  search: async (params: DealSearchParams): Promise<DealData[]> => {
    const response = await apiClient.get<DealData[]>('/deals/search/', { params });
    return response.data;
  },

  // Create new deal
  create: async (deal: Omit<DealData, 'id'>): Promise<DealData> => {
    const response = await apiClient.post<DealData>('/deals/', deal);
    return response.data;
  },

  // Update deal
  update: async (id: string, deal: Partial<DealData>): Promise<DealData> => {
    const response = await apiClient.put<DealData>(`/deals/${id}/`, deal);
    return response.data;
  },

  // Delete deal
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/deals/${id}/`);
  },
};
