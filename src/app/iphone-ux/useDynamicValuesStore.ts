import { create } from 'zustand';
import { BASE_IMAGE_SIZE, BASE_ITEMS_PER_ROW } from './constants';

interface DynamicValuesStore {
  IMAGE_SIZE: number;
  ITEMS_PER_ROW: number;
  setIMAGE_SIZE: (IMAGE_SIZE: number) => void;
  setITEMS_PER_ROW: (ITEMS_PER_ROW: number) => void;
}


export const useDynamicValuesStore = create<DynamicValuesStore>((set, get) => ({
  IMAGE_SIZE: BASE_IMAGE_SIZE,
  ITEMS_PER_ROW:BASE_ITEMS_PER_ROW,
  setIMAGE_SIZE: (IMAGE_SIZE) => set({ IMAGE_SIZE }),
  setITEMS_PER_ROW: (ITEMS_PER_ROW) => set({ ITEMS_PER_ROW }),
}));
