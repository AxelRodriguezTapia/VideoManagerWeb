'use client';

import React, { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebaseConfig'; // Asegúrate de importar la configuración de Firebase
import { doc, setDoc, updateDoc, arrayUnion, collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function NewVideoPage() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [newListName, setNewListName] = useState('');
  const [userLists, setUserLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUserLists = async () => {
      try {
        if (currentUser) {
          const listsCollectionRef = collection(db, 'userSaves', currentUser.uid, 'lists');
          const listsSnapshot = await getDocs(listsCollectionRef);
          
          if (!listsSnapshot.empty) {
            const lists = listsSnapshot.docs.map(doc => doc.id);
            setUserLists(lists);
          } else {
            setUserLists([]);
          }
        }
      } catch (error) {
        console.error('Error al obtener las listas: ', error);
      }
    };

    fetchUserLists();
  }, [currentUser]);

  const handleCreateList = async () => {
    if (!newListName) {
      alert('Por favor ingresa un nombre para la lista.');
      return;
    }

    try {
      const listRef = doc(db, 'userSaves', currentUser.uid, 'lists', newListName);
      await setDoc(listRef, { videos: [] });

      setUserLists(prevLists => [...prevLists, newListName]);
      setSelectedList(newListName);
      setNewListName('');
      alert('¡Lista creada correctamente!');
    } catch (error) {
      console.error('Error al crear la lista: ', error);
      alert('Hubo un error al crear la lista.');
    }
  };

  const handleSave = async () => {
    if (!url || !title || !description || !selectedList) {
      alert('Por favor complete todos los campos y seleccione una lista.');
      return;
    }

    setLoading(true);

    try {
      const video = {
        url,
        title,
        description,
        createdAt: new Date().toISOString(),
      };

      const listDocRef = doc(db, 'userSaves', currentUser.uid, 'lists', selectedList);

      await updateDoc(listDocRef, {
        videos: arrayUnion(video),
      });

      alert('¡Video guardado correctamente!');
      router.push('/dashboard'); // Redirige al dashboard (o cualquier otra página)
    } catch (error) {
      console.error('Error al guardar el video: ', error);
      alert('Hubo un error al guardar el video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Barra de navegación superior */}
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
            onClick={() => router.push('/dashboard')} // Redirige a la página de inicio
            style={{ marginRight: '10px', padding: '10px', background: 'none', border: '1px solid white', color: 'white', cursor: 'pointer' }}
          >
            Inicio
          </button>
          <button
            onClick={() => router.push('/perfil')} // Redirige a la página de perfil
            style={{ padding: '10px', background: 'none', border: '1px solid white', color: 'white', cursor: 'pointer' }}
          >
            Perfil
          </button>
        </div>
      </nav>

      {/* Título y gradiente */}
      <div style={{
        background: 'linear-gradient(to right, #3498db, #2980b9, #1abc9c)',
        padding: '20px',
        textAlign: 'center',
        color: 'white',
        marginBottom: '20px'
      }}>
        <h1>Guardar un Nuevo Video</h1>
        <p>Agrega un video a tu lista</p>
      </div>

      {/* Campos del formulario */}
      <div style={{ marginBottom: '20px' }}>
        <label>URL del video:</label>
        <input
          type="text"
          placeholder="URL del video"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: '10px', width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Título del video:</label>
        <input
          type="text"
          placeholder="Título del video"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '10px', width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Descripción del video:</label>
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: '10px', width: '100%' }}
        />
      </div>

      {/* Selector de lista */}
      <div style={{ marginBottom: '20px' }}>
        <label>Selecciona una lista:</label>
        {userLists.length > 0 ? (
          <select
            value={selectedList}
            onChange={(e) => setSelectedList(e.target.value)}
            style={{ padding: '10px', width: '100%' }}
          >
            <option value="" disabled>Selecciona una lista</option>
            {userLists.map((list, index) => (
              <option key={index} value={list}>{list}</option>
            ))}
          </select>
        ) : (
          <p>No tienes listas creadas.</p>
        )}
      </div>

      {/* Crear nueva lista */}
      <div style={{ marginBottom: '20px' }}>
        <label>O crea una nueva lista:</label>
        <input
          type="text"
          placeholder="Nombre de la nueva lista"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          style={{ padding: '10px', width: '100%' }}
        />
        <button
          onClick={handleCreateList}
          style={{
            padding: '10px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            marginTop: '10px',
          }}
        >
          Crear nueva lista
        </button>
      </div>

      {/* Botón para guardar el video */}
      <button
        onClick={handleSave}
        disabled={loading}
        style={{
          padding: '10px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          width: '100%',
        }}
      >
        {loading ? 'Guardando...' : 'Guardar Video'}
      </button>
    </div>
  );
}
