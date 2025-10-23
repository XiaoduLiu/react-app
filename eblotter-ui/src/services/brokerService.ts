import apiClient from './api';
import { BrokerData } from '@/types/broker';

export const brokerService = {
  // Get all brokers
  getAll: async (): Promise<BrokerData[]> => {
    const response = await apiClient.get<BrokerData[]>('/brokers');
    return response.data;
  },

  // Get broker by ID
  getById: async (id: string): Promise<BrokerData> => {
    const response = await apiClient.get<BrokerData>(`/brokers/${id}`);
    return response.data;
  },

  // Search brokers by name
  searchByName: async (name: string): Promise<BrokerData[]> => {
    const response = await apiClient.get<BrokerData[]>('/brokers/search', {
      params: { name },
    });
    return response.data;
  },

  // Create new broker
  create: async (broker: Omit<BrokerData, 'id'>): Promise<BrokerData> => {
    const response = await apiClient.post<BrokerData>('/brokers', broker);
    return response.data;
  },

  // Update broker
  update: async (id: string, broker: Partial<BrokerData>): Promise<BrokerData> => {
    const response = await apiClient.put<BrokerData>(`/brokers/${id}`, broker);
    return response.data;
  },

  // Delete broker
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/brokers/${id}`);
  },
};
