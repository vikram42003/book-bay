let token: string | null = null;

const setToken = (newToken: string | null) => {
  token = newToken;
};

const getToken = (): string | null => {
  return token;
};

export { setToken, getToken };
