import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UiState {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  openLogin: () => void;
  openRegister: () => void;
  closeAll: () => void;
}

export const useUiStore = create<UiState>()(
  devtools(
    (set) => ({
      isMenuOpen: false,
      openMenu: () => set({ isMenuOpen: true }),
      toggleMenu: () =>
        set((state) => {
          const newState = !state.isMenuOpen;
          document.body.style.overflow = newState ? "hidden" : "auto";
          return { isMenuOpen: newState };
        }),

      closeMenu: () => {
        document.body.style.overflow = "auto";
        set({ isMenuOpen: false });
      },

      isLoginOpen: false,
      isRegisterOpen: false,
      openLogin: () => set({ isLoginOpen: true }, false, "ui/openLogin"),
      openRegister: () =>
        set({ isRegisterOpen: true }, false, "ui/openRegister"),
      closeAll: () =>
        set(
          { isLoginOpen: false, isRegisterOpen: false },
          false,
          "ui/closeAll",
        ),
    }),
    { name: "UI Store", enabled: true },
  ),
);
