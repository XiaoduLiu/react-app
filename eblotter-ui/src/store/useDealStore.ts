import { create } from 'zustand';
import { DealData } from '@/types/deal';
import { dealService } from '@/services/dealService';

interface DealState {
  deals: DealData[];
  selectedDeal: DealData | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchDeals: () => Promise<void>;
  fetchDealById: (id: string) => Promise<void>;
  createDeal: (deal: Omit<DealData, 'id'>) => Promise<void>;
  updateDeal: (id: string, deal: Partial<DealData>) => Promise<void>;
  deleteDeal: (id: string) => Promise<void>;
  setSelectedDeal: (deal: DealData | null) => void;
  clearError: () => void;
}

export const useDealStore = create<DealState>((set) => ({
  deals: [],
  selectedDeal: null,
  isLoading: false,
  error: null,

  fetchDeals: async () => {
    set({ isLoading: true, error: null });
    try {
      const deals = await dealService.getAll();
      set({ deals, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch deals', isLoading: false });
      console.error('Error fetching deals:', error);
    }
  },

  fetchDealById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const deal = await dealService.getById(id);
      set({ selectedDeal: deal, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch deal', isLoading: false });
      console.error('Error fetching deal:', error);
    }
  },

  createDeal: async (deal: Omit<DealData, 'id'>) => {
    set({ isLoading: true, error: null });
    try {
      const newDeal = await dealService.create(deal);
      set((state) => ({
        deals: [...state.deals, newDeal],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to create deal', isLoading: false });
      console.error('Error creating deal:', error);
      throw error;
    }
  },

  updateDeal: async (id: string, deal: Partial<DealData>) => {
    set({ isLoading: true, error: null });
    try {
      const updatedDeal = await dealService.update(id, deal);
      set((state) => ({
        deals: state.deals.map((d) => (d.id === id ? updatedDeal : d)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update deal', isLoading: false });
      console.error('Error updating deal:', error);
      throw error;
    }
  },

  deleteDeal: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await dealService.delete(id);
      set((state) => ({
        deals: state.deals.filter((d) => d.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete deal', isLoading: false });
      console.error('Error deleting deal:', error);
      throw error;
    }
  },

  setSelectedDeal: (deal: DealData | null) => {
    set({ selectedDeal: deal });
  },

  clearError: () => {
    set({ error: null });
  },
}));
