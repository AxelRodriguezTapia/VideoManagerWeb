import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig'; // Importar configuración de Firebase
import { useHistory } from 'react-router-dom'; // Para redirigir entre rutas
import './UserScreen.css'; // Archivo de estilos para la pantalla de usuario
import FSection from '../FSection'; // Asumiendo que este componente también es compatible con la web

export default function UserScreen() {
  const [userEmail, setUserEmail] = useState(null); // Para almacenar el correo electrónico del usuario
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const history = useHistory(); // Para manejar redirección

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email || 'No disponible');
    }
    setLoading(false); // Terminar el estado de carga
  }, []);

  // Función para hacer logout
  const handleLogout = () => {
    auth.signOut().then(() => {
      alert('Has cerrado sesión correctamente');
      history.push('/login'); // Redirigir a la pantalla de login
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
      alert('Hubo un error al cerrar sesión');
    });
  };

  const handlePress = (id) => {
    console.log("Han clicado al botón " + id);
    if (id === 1) {
      history.push("/list");
    } else if (id === 2) {
      history.push("/favourites");
    } else if (id === 3) {
      history.push("/user");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="user-screen-container">
      {/* Sección superior con gradiente */}
      <div className="gradient-background">
        <div className="header-container">
          <div>
            <h1 className="title-text">VideoListApp</h1>
            <p className="subtitle-text">Bienvenido, {userEmail}</p>
          </div>

          {/* Botón de Logout */}
          <button className="logout-text" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>

      {/* Sección principal (puedes agregar más contenido aquí) */}
      <div className="content-container">
        {/* Agregar contenido aquí según lo necesites */}
      </div>

      {/* Sección inferior */}
      <div className="footer-container">
        <FSection currentSection={3} onPress={handlePress} />
      </div>
    </div>
  );
}
