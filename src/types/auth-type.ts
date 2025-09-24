export interface User {
  id: string | number;
  username: string;
  email?: string;
}

export interface AuthType {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;

  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
