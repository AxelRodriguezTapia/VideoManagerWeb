import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para navegación
import { auth } from '../firebaseConfig'; // Asegúrate de importar la configuración de Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../Styles.css'; // Importa estilos CSS adaptados para web

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate(); // Hook para navegación

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg("Por favor, ingresa un correo y una contraseña");
      return;
    }
    
    setLoading(true);
    setErrorMsg(null);

    try {
      // Intentamos iniciar sesión con email y contraseña
      await signInWithEmailAndPassword(auth, email, password);
      // Si el login es exitoso, navegamos a la siguiente pantalla
      navigate('/list'); // Reemplaza '/list' con la ruta de tu pantalla principal
    } catch (error) {
      // Si ocurre un error, mostramos un mensaje
      setErrorMsg("Error al iniciar sesión. Verifica tus credenciales.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Login</h1>

      {/* Mostrar error si existe */}
      {errorMsg && <p className="errorText">{errorMsg}</p>}

      <input
        className="input"
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="button"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Entrando..." : "Iniciar sesión"}
      </button>
      
      <p 
        className="registerLink"
        onClick={() => navigate('/register')} // Navegar a la pantalla de registro
      >
        ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>.
      </p>
    </div>
  );
}
