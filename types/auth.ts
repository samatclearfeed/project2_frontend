export type user = {
  userId: string;
  name: string;
  email: string;
};

export type creds = {
  email: string;
  password: string;
};

export type newUser = {
  name: string;
} & creds;

export type authContext = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: user | undefined;
  token: string | undefined;
  register: (userData: newUser) => void;
  login: (cred: creds) => void;
  logout: () => void;
};

// API_RESPONSE
export type getUserRes = {
  message: string;
  user: user;
};

export type signInRes = {
  message: string;
  token: string;
};
