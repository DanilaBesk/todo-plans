import { create } from 'zustand';

type Store = {
  id?: string;
  isOpen: boolean;
};
type Action = {
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useCardModal = create<Store & Action>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
