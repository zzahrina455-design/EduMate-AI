import { create } from 'zustand';

// Store Zustand murni untuk Client UI State (Theme, Modal, Filter)
export const useUIStore = create((set) => ({
    isSidebarOpen: true,
    selectedCategory: 'All',
    themeMode: 'light',
    
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    toggleTheme: () => set((state) => ({ themeMode: state.themeMode === 'light' ? 'dark' : 'light' })),
}));