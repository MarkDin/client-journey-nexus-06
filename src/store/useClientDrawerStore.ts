import { create } from 'zustand';

interface ClientDrawerState {
    customerCode: string | null;
    isOpen: boolean;
    openDrawer: (customerCode: string) => void;
    closeDrawer: () => void;
}

export const useClientDrawerStore = create<ClientDrawerState>((set) => ({
    customerCode: null,
    isOpen: false,
    openDrawer: (customerCode: string) => set({ customerCode, isOpen: true }),
    closeDrawer: () => set({ isOpen: false, customerCode: null }),
})); 