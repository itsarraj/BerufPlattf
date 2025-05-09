import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: 'user' | 'recruiter' | null;
  companyId: number | null;
  userId: number | null;
  setTokens: (access: string, refresh: string) => void;
  logout: () => void;
}

export const AuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  role: null,
  companyId: null,
  userId: null,

  setTokens: (access, refresh) => {
    const decoded = jwtDecode<{ id: string; role: 'user' | 'recruiter' }>(access);

    set({
      accessToken: access,
      refreshToken: refresh,
      role: decoded.role,
      userId: parseInt(decoded.id),
      companyId: decoded.role === 'recruiter'
        ? AuthStore.getState().companyId
        : null
    });
  },

  logout: () => {
    set({
      accessToken: null,
      refreshToken: null,
      role: null,
      companyId: null,
      userId: null
    });
  }
}));