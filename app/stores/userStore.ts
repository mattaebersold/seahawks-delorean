import { create } from 'zustand';

// using a "name" string as a test

interface UserState {
  name: string | null;
  hydrate: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: null,

  hydrate: () => {
    const storedName = localStorage.getItem("name");

    set({
      name: storedName,
    });
  },

  setName: (name: string) => {
    localStorage.setItem("name", name);
    set({ name });
  },

}));
