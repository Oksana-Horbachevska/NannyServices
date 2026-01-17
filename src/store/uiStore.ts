import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UiState {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;

  openLogin: () => void;
  openRegister: () => void;
  closeAll: () => void;
}

export const useUiStore = create<UiState>()(
  devtools(
    (set) => ({
      isLoginOpen: false,
      isRegisterOpen: false,
      openLogin: () => set({ isLoginOpen: true }, false, "ui/openLogin"),
      openRegister: () =>
        set({ isRegisterOpen: true }, false, "ui/openRegister"),
      closeAll: () =>
        set(
          { isLoginOpen: false, isRegisterOpen: false },
          false,
          "ui/closeAll"
        ),
    }),
    { name: "UI Store", enabled: true }
  )
);
