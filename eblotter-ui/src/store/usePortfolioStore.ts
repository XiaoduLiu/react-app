import { create } from 'zustand';
import { PortfolioData } from '@/types/portfolio';
import { portfolioService } from '@/services/portfolioService';

interface PortfolioState {
  portfolios: PortfolioData[];
  selectedPortfolio: PortfolioData | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchPortfolios: () => Promise<void>;
  fetchPortfolioById: (id: string) => Promise<void>;
  createPortfolio: (portfolio: Omit<PortfolioData, 'id'>) => Promise<void>;
  updatePortfolio: (id: string, portfolio: Partial<PortfolioData>) => Promise<void>;
  deletePortfolio: (id: string) => Promise<void>;
  setSelectedPortfolio: (portfolio: PortfolioData | null) => void;
  clearError: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  portfolios: [],
  selectedPortfolio: null,
  isLoading: false,
  error: null,

  fetchPortfolios: async () => {
    set({ isLoading: true, error: null });
    try {
      const portfolios = await portfolioService.getAll();
      set({ portfolios, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch portfolios', isLoading: false });
      console.error('Error fetching portfolios:', error);
    }
  },

  fetchPortfolioById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const portfolio = await portfolioService.getById(id);
      set({ selectedPortfolio: portfolio, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch portfolio', isLoading: false });
      console.error('Error fetching portfolio:', error);
    }
  },

  createPortfolio: async (portfolio: Omit<PortfolioData, 'id'>) => {
    set({ isLoading: true, error: null });
    try {
      const newPortfolio = await portfolioService.create(portfolio);
      set((state) => ({
        portfolios: [...state.portfolios, newPortfolio],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to create portfolio', isLoading: false });
      console.error('Error creating portfolio:', error);
      throw error;
    }
  },

  updatePortfolio: async (id: string, portfolio: Partial<PortfolioData>) => {
    set({ isLoading: true, error: null });
    try {
      const updatedPortfolio = await portfolioService.update(id, portfolio);
      set((state) => ({
        portfolios: state.portfolios.map((p) => (p.id === id ? updatedPortfolio : p)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update portfolio', isLoading: false });
      console.error('Error updating portfolio:', error);
      throw error;
    }
  },

  deletePortfolio: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await portfolioService.delete(id);
      set((state) => ({
        portfolios: state.portfolios.filter((p) => p.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete portfolio', isLoading: false });
      console.error('Error deleting portfolio:', error);
      throw error;
    }
  },

  setSelectedPortfolio: (portfolio: PortfolioData | null) => {
    set({ selectedPortfolio: portfolio });
  },

  clearError: () => {
    set({ error: null });
  },
}));
