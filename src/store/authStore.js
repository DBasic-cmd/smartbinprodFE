import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('userId') || null,
  setToken: (token) => {
    localStorage.setItem('userId', token);
    set({ token });
  },
  logout: () => {
    localStorage.removeItem('userId');
    set({ token: null });
  },
}));

export default useAuthStore;