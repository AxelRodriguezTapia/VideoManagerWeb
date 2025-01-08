import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Asegúrate de importar la configuración de Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './RegisterScreen.css'; // Estilos específicos para la pantalla de registro

export default function RegisterScreen({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Función para manejar el registro
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setErrorMsg("Por favor, ingresa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      // Intentamos crear un nuevo usuario con correo y contraseña
      await createUserWithEmailAndPassword(auth, email, password);
      // Si el registro es exitoso, navegamos a la pantalla de login
      alert('¡Éxito!', 'Cuenta creada con éxito.');
      history.push('/login'); // Redirige a la página de login
    } catch (error) {
      // Si ocurre un error, mostramos un mensaje
      setErrorMsg("Error al crear la cuenta. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2 className="title">Registrarse</h2>

      {/* Mostrar error si existe */}
      {errorMsg && <p className="error-text">{errorMsg}</p>}

      <form onSubmit={handleRegister} className="register-form">
        <input
          type="email"
          className="input"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="input"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          className="input"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Creando cuenta..." : "Registrarse"}
        </button>
      </form>

      <p className="register-link">
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí.</a>
      </p>
    </div>
  );
}
