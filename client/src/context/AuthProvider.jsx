import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
  const saved = localStorage.getItem('auth');
  if (saved) {
    const parsed = JSON.parse(saved);
    setUser(parsed.user);
    setToken(parsed.token);
  }
}, []);


  const login = (user, token) => {
    setUser(user);
    setToken(token);

    localStorage.setItem('auth', JSON.stringify({ user, token }));

    // Auto logout when token expires
    const decoded = jwtDecode(token);
    const expiry = decoded.exp * 1000;
    const timeout = expiry - Date.now();

    if (timeout > 0) {
      setTimeout(() => {
        logout();
        toast('Session expired. Please log in again.', { icon: '⚠️' });
      }, timeout);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
