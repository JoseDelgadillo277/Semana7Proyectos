import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// eslint-disable-next-line no-unused-vars
const DEMO_USERS = [
  { id: 1, username: 'estudiante1', password: '1234', nombre: 'Carlos Quispe',    rol: 'estudiante', avatar: '🌱' },
  { id: 2, username: 'docente1',    password: '1234', nombre: 'Prof. Ana Torres', rol: 'docente',    avatar: '🌿' },
  { id: 3, username: 'admin',       password: '1234', nombre: 'Administrador',    rol: 'admin',      avatar: '🌳' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (username, password) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      
      if (response.ok && data.user) {
        setUser(data.user);
        setLoading(false);
        return { ok: true, rol: data.user.rol };
      } else {
        setError(data.error || 'Usuario o contraseña incorrectos.');
        setLoading(false);
        return { ok: false };
      }
    } catch (err) {
      setError('Error al conectar con el servidor.');
      setLoading(false);
      return { ok: false };
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);