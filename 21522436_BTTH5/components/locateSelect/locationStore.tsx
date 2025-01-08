import { create as createStore } from 'zustand';

type LocationType = {
  latitude: number;
  longitude: number;
  title: string;
};

type LocationStore = {
  selectedLocation: LocationType | null;
  setSelectedLocation: (location: LocationType | null) => void;
};

export const useLocationStore = createStore<LocationStore>((set) => ({
  selectedLocation: null,
  setSelectedLocation: (location) => set({ selectedLocation: location }),
}));