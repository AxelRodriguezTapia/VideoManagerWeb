'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../lib/firebaseConfig'; // Asegúrate de que la ruta sea correcta

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Redirigir al dashboard si el login es exitoso
    } catch (err) {
      setError('Error al iniciar sesión');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none' }}>
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
