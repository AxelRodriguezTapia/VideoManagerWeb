'use client';

import React, { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebaseConfig'; // Asegúrate de importar la configuración de Firebase
import { doc, getDoc, setDoc, arrayRemove, arrayUnion } from 'firebase/firestore'; // Para obtener y actualizar datos en Firestore
import VideoCard from '../components/VideoCard'; // Asegúrate de tener este componente
import { useRouter } from 'next/navigation';

export default function FavouriteScreen() {
  const [favoriteVideos, setFavoriteVideos] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  
  const currentUser = auth.currentUser;
  const router = useRouter();  // Aquí estamos usando useRouter()

  // Función para obtener los videos favoritos del usuario
  useEffect(() => {
    const fetchFavoriteVideos = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'userSaves', currentUser.uid); // Referencia al documento del usuario
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setFavoriteVideos(userDocSnap.data().favorites || []); // Obtener los videos favoritos
          } else {
            setFavoriteVideos([]); // Si no tiene favoritos, establecer array vacío
          }
        } catch (error) {
          console.error('Error al obtener los videos favoritos:', error);
          setErrorMsg('Hubo un error al cargar los videos favoritos.');
        }
      }
    };

    fetchFavoriteVideos();
  }, [currentUser]);

  // Función para agregar/quitar un video de favoritos
  const toggleFavorite = async (video) => {
    const userDocRef = doc(db, 'userSaves', currentUser.uid);
    const isFavorite = favoriteVideos.some(fav => fav.url === video.url); // Verificar si el video ya es favorito

    try {
      if (isFavorite) {
        // Si el video ya es favorito, lo eliminamos
        await setDoc(userDocRef, {
          favorites: arrayRemove(video) // Usamos arrayRemove para eliminar el video del arreglo
        }, { merge: true });
        
        // Actualizamos el estado local, eliminando el video de favoritos
        setFavoriteVideos(prevState => prevState.filter(fav => fav.url !== video.url));
      } else {
        // Si el video no es favorito, lo agregamos
        await setDoc(userDocRef, {
          favorites: arrayUnion(video) // Usamos arrayUnion para agregar el video al arreglo
        }, { merge: true });
        
        // Actualizamos el estado local, agregando el video a favoritos
        setFavoriteVideos(prevState => [...prevState, video]);
      }
    } catch (error) {
      console.error('Error al actualizar los favoritos:', error);
      setErrorMsg('Hubo un error al actualizar los favoritos.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>      
    {/* Barra de navegación superior con botones */}
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
            onClick={() => router.push('/dashboard')} // Redirige a la lista de videos
            style={{ marginRight: '10px', padding: '10px', background: 'none', border: '1px solid white', color: 'white', cursor: 'pointer' }}
          >
            Inicio
          </button>
          <button
            onClick={() => router.push('/perfil')} // Redirige a perfil
            style={{ padding: '10px', background: 'none', border: '1px solid white', color: 'white', cursor: 'pointer' }}
          >
            Perfil
          </button>
        </div>
      </nav>

      {/* Sección del título con gradiente */}
      <div style={{
        background: 'linear-gradient(to right, #3498db, #2980b9, #1abc9c)', // Gradiente azul-verde
        padding: '20px',
        textAlign: 'center',
        borderBottom: '2px solid #2c3e50',
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#fff',
          paddingBottom: '10px',
          marginTop: '30px',
        }}>
          VideoListApp
        </h1>
        <h2 style={{
          fontSize: '20px',
          color: '#fff',
        }}>
          Lista de Favoritos
        </h2>
      </div>

      {/* Lista de videos favoritos */}
      <div style={{ marginBottom: '20px' }}>
          {favoriteVideos.length > 0 ? (
            favoriteVideos.map((video, index) => (
              <div style={{ marginBottom: '20px' }}>
                {/* VideoCard muestra el contenido del video */}
                <VideoCard
                  videoUrl={video.url}
                  title={video.title}
                  createdAt={video.createdAt}
                  description={video.description}
                  onToggleFavorite={() => toggleFavorite(video)}  // Usamos esta función de toggle para los favoritos
                  isFavorite={favoriteVideos.some(fav => fav.url === video.url)}  // Comprobamos si el video está en favoritos
                />
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', marginTop: '20px' }}>No tienes videos favoritos.</p>
          )}
        </div>
    </div>
  );
}
