// locationStore.ts
import { create as createStore } from 'zustand';

export type LocationType = {
  latitude: number;
  longitude: number;
  title: string;
};

type LocationStore = {
  selectedLocation: LocationType | null;
  setSelectedLocation: (location: LocationType | null) => void;
  clearLocation: () => void;
};

export const useLocationStore = createStore<LocationStore>((set) => ({
  selectedLocation: null,
  setSelectedLocation: (location) => {
    console.log("Setting location:", location); // Debug log
    set({ selectedLocation: location });
  },
  clearLocation: () => set({ selectedLocation: null }),
}));