export interface AuthType {
  username: string;
  email: string;
  password: string;
}

export interface AuthState extends AuthType {
  user: AuthType | null;
  isLoading: boolean;
  error: string | null;
  setAuth: (user: AuthType | null) => void;
  login: (credentials: AuthType) => Promise<void>;
  logout: () => void;
}
