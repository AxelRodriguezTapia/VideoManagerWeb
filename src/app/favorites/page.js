'use client';

import React, { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebaseConfig'; 
import { doc, getDoc, setDoc, arrayRemove, arrayUnion } from 'firebase/firestore'; 
import VideoCard from '../components/VideoCard'; 
import { useRouter } from 'next/navigation';

export default function FavouriteScreen() {
  const [favoriteVideos, setFavoriteVideos] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // Estado del menú desplegable
  
  const currentUser = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    const fetchFavoriteVideos = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'userSaves', currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setFavoriteVideos(userDocSnap.data().favorites || []);
          } else {
            setFavoriteVideos([]);
          }
        } catch (error) {
          console.error('Error al obtener los videos favoritos:', error);
          setErrorMsg('Hubo un error al cargar los videos favoritos.');
        }
      }
    };

    fetchFavoriteVideos();
  }, [currentUser]);

  const toggleFavorite = async (video) => {
    const userDocRef = doc(db, 'userSaves', currentUser.uid);
    const isFavorite = favoriteVideos.some(fav => fav.url === video.url);

    try {
      if (isFavorite) {
        await setDoc(userDocRef, {
          favorites: arrayRemove(video)
        }, { merge: true });
        setFavoriteVideos(prevState => prevState.filter(fav => fav.url !== video.url));
      } else {
        await setDoc(userDocRef, {
          favorites: arrayUnion(video)
        }, { merge: true });
        setFavoriteVideos(prevState => [...prevState, video]);
      }
    } catch (error) {
      console.error('Error al actualizar los favoritos:', error);
      setErrorMsg('Hubo un error al actualizar los favoritos.');
    }
  };

  return (
    <div style={{ padding: '0px' }}>      
      <nav style={{
        backgroundColor: '#3498db',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>VideoListApp</div>
        {/* Botón de menú desplegable para pantallas pequeñas */}
        <div className="mobile-menu">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ padding: '10px', background: 'none', border: '1px solid white', color: 'white', cursor: 'pointer' }}
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
                style={{ display: 'block', padding: '10px', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Inicio
              </button>
              <button
                onClick={() => {
                  router.push('/perfil');
                  setMenuOpen(false);
                }}
                style={{ display: 'block', padding: '10px', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Perfil
              </button>
            </div>
          )}
        </div>
      </nav>

      <div style={{
        background: 'linear-gradient(to right, #3498db, #2980b9, #1abc9c)',
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

      <div style={{ marginBottom: '20px' }}>
        {favoriteVideos.length > 0 ? (
          favoriteVideos.map((video, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <VideoCard
                videoUrl={video.url}
                title={video.title}
                createdAt={video.createdAt}
                description={video.description}
                onToggleFavorite={() => toggleFavorite(video)}
                isFavorite={favoriteVideos.some(fav => fav.url === video.url)}
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
