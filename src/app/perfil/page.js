'use client';

import React, { useState, useEffect } from 'react';
import { auth } from '../lib/firebaseConfig'; 
import { useRouter } from 'next/navigation';

export default function UserScreen() {
  const [userEmail, setUserEmail] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [menuOpen, setMenuOpen] = useState(false); // Estado del menú desplegable
  const router = useRouter();

  const handleLogout = () => {
    auth.signOut().then(() => {
      alert('Has cerrado sesión correctamente');
      router.push('/login'); 
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
      alert('Hubo un error al cerrar sesión');
    });
  };

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email || 'No disponible');
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>Cargando...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '0px' }}>
      {/* Barra de navegación con menú desplegable */}
      <nav style={{
        backgroundColor: '#3498db',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>VideoListApp</div>
        <div className="menu">
          <button
            onClick={() => setMenuOpen(!menuOpen)} // Alternar visibilidad del menú
            style={{
              padding: '10px',
              background: 'none',
              border: '1px solid white',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            ☰
          </button>
          {menuOpen && (
            <div style={{
              position: 'absolute',
              top: '50px',
              right: '20px',
              backgroundColor: '#3498db',
              border: '1px solid white',
              borderRadius: '5px',
              zIndex: 100,
            }}>
              <button
                onClick={() => {
                  router.push('/dashboard');
                  setMenuOpen(false);
                }}
                style={{
                  display: 'block',
                  padding: '10px',
                  color: 'white',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                Inicio
              </button>
              <button
                onClick={() => {
                  router.push('/favorites');
                  setMenuOpen(false);
                }}
                style={{
                  display: 'block',
                  padding: '10px',
                  color: 'white',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                Favoritos
              </button>
            </div>
          )}
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

      {/* Sección principal */}
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              backgroundColor: '#e74c3c',
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

      {/* Pie de página o sección adicional */}
      <div style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        {/* Opciones o contenido adicional */}
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
