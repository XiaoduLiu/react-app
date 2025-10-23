import { create } from 'zustand';
import { BrokerData } from '@/types/broker';
import { brokerService } from '@/services/brokerService';

interface BrokerState {
  brokers: BrokerData[];
  selectedBroker: BrokerData | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchBrokers: () => Promise<void>;
  fetchBrokerById: (id: string) => Promise<void>;
  searchBrokersByName: (name: string) => Promise<void>;
  createBroker: (broker: Omit<BrokerData, 'id'>) => Promise<void>;
  updateBroker: (id: string, broker: Partial<BrokerData>) => Promise<void>;
  deleteBroker: (id: string) => Promise<void>;
  setSelectedBroker: (broker: BrokerData | null) => void;
  clearError: () => void;
}

export const useBrokerStore = create<BrokerState>((set) => ({
  brokers: [],
  selectedBroker: null,
  isLoading: false,
  error: null,

  fetchBrokers: async () => {
    set({ isLoading: true, error: null });
    try {
      const brokers = await brokerService.getAll();
      set({ brokers, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch brokers', isLoading: false });
      console.error('Error fetching brokers:', error);
    }
  },

  fetchBrokerById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const broker = await brokerService.getById(id);
      set({ selectedBroker: broker, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch broker', isLoading: false });
      console.error('Error fetching broker:', error);
    }
  },

  searchBrokersByName: async (name: string) => {
    set({ isLoading: true, error: null });
    try {
      const brokers = await brokerService.searchByName(name);
      set({ brokers, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to search brokers', isLoading: false });
      console.error('Error searching brokers:', error);
    }
  },

  createBroker: async (broker: Omit<BrokerData, 'id'>) => {
    set({ isLoading: true, error: null });
    try {
      const newBroker = await brokerService.create(broker);
      set((state) => ({
        brokers: [...state.brokers, newBroker],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to create broker', isLoading: false });
      console.error('Error creating broker:', error);
      throw error;
    }
  },

  updateBroker: async (id: string, broker: Partial<BrokerData>) => {
    set({ isLoading: true, error: null });
    try {
      const updatedBroker = await brokerService.update(id, broker);
      set((state) => ({
        brokers: state.brokers.map((b) => (b.id === id ? updatedBroker : b)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update broker', isLoading: false });
      console.error('Error updating broker:', error);
      throw error;
    }
  },

  deleteBroker: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await brokerService.delete(id);
      set((state) => ({
        brokers: state.brokers.filter((b) => b.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete broker', isLoading: false });
      console.error('Error deleting broker:', error);
      throw error;
    }
  },

  setSelectedBroker: (broker: BrokerData | null) => {
    set({ selectedBroker: broker });
  },

  clearError: () => {
    set({ error: null });
  },
}));
