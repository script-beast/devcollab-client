import React, { createContext, useContext } from "react";

type userType = {
  id: string;
  username: string;
  email: string;
  avatar: string;
};

type AuthContextType = {
  user: userType | null;
  login: (token: string, userData: userType) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<userType | null>(null);

  React.useEffect(() => {
    const cachedUser = localStorage.getItem("devC-user");

    if (!cachedUser) {
      return;
    }

    try {
      const parsed = JSON.parse(cachedUser) as userType;
      setUser(parsed);
    } catch {
      localStorage.removeItem("devC-user");
    }
  }, []);

  const login = (token: string, userData: userType) => {
    localStorage.setItem("devC-token", token);
    localStorage.setItem("devC-user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("devC-token");
    localStorage.removeItem("devC-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth };
export default AuthProvider;
