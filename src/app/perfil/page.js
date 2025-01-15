'use client';

import React, { useState, useEffect } from 'react';
import { auth } from '../lib/firebaseConfig'; // Importa la configuración de Firebase
import { useRouter } from 'next/navigation';

export default function UserScreen() {
  const [userEmail, setUserEmail] = useState(null);  // Almacenar el correo electrónico del usuario
  const [loading, setLoading] = useState(true);  // Estado de carga
  const router = useRouter();  // Usar router para la navegación

  // Función de logout
  const handleLogout = () => {
    auth.signOut().then(() => {
      alert('Has cerrado sesión correctamente');
      router.push('/login');  // Redirige a la pantalla de inicio de sesión
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
      alert('Hubo un error al cerrar sesión');
    });
  };

  // Obtención del correo electrónico del usuario
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email || 'No disponible');  // Establece el correo del usuario
    }
    setLoading(false);  // Finaliza la carga
  }, []);

  // Cargar mensaje de "Cargando..." mientras el estado de usuario se obtiene
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>Cargando...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Barra de navegación con botones */}
      <nav style={{
        backgroundColor: '#3498db',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>VideoListApp</div>
        <div>
          <button
            onClick={() => router.push('/dashboard')} // Redirige al listado de videos
            style={{ marginRight: '10px', padding: '10px', background: 'none', border: '1px solid white', color: 'white', cursor: 'pointer' }}
          >
            Inicio
          </button>
          <button
            onClick={() => router.push('/favorites')} // Redirige a favoritos
            style={{ marginRight: '10px', padding: '10px', background: 'none', border: '1px solid white', color: 'white', cursor: 'pointer' }}
          >
            Favoritos
          </button>
        </div>
      </nav>

      {/* Encabezado con gradiente */}
      <div style={{
        background: 'linear-gradient(to right, #3498db, #2980b9, #1abc9c)',
        padding: '20px',
        textAlign: 'center',
        color: 'white',
        marginBottom: '20px',
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>VideoListApp</h1>
        <h2 style={{ fontSize: '20px' }}>Bienvenido, {userEmail}</h2>
      </div>

      {/* Sección del contenido principal */}
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              backgroundColor: '#e74c3c',  // Rojo para resaltar el logout
              color: 'white',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Sección inferior */}
      <div style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        {/* Puedes agregar más opciones o componentes aquí, si lo deseas */}
      </div>
    </div>
  );
}

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  loadingText: {
    fontSize: '20px',
    color: '#3498db',
  },
};
