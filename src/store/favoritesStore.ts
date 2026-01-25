import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Nanny } from "../types/nanny";

interface FavoritesState {
  favorites: Nanny[];
  toggleFavorite: (nanny: Nanny) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (nanny) => {
        const { favorites } = get();
        const isExist = favorites.some((fav) => fav.id === nanny.id);

        if (isExist) {
          set({ favorites: favorites.filter((fav) => fav.id !== nanny.id) });
        } else {
          set({ favorites: [...favorites, nanny] });
        }
      },
      isFavorite: (id) => {
        return get().favorites.some((fav) => fav.id === id);
      },
      clearFavorites: () => set({ favorites: [] }),
    }),
    { name: "favorites-storage" },
  ),
);
