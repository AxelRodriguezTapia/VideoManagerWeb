'use client';

import { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebaseConfig'; // Asegúrate de importar la configuración de Firebase
import { getDocs, collection, doc, getDoc,setDoc,arrayUnion,arrayRemove } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import VideoCard from '../components/VideoCard'; // Asegúrate de tener este componente

export default function Dashboard() {
  const [userVideos, setUserVideos] = useState([]); // Videos de la lista seleccionada
  const [userLists, setUserLists] = useState([]); // Listas del usuario
  const [selectedList, setSelectedList] = useState(''); // Lista seleccionada
  const [errorMsg, setErrorMsg] = useState(null); // Mensaje de error
  const [favoriteVideos, setFavoriteVideos] = useState([]); // Estado para los videos favoritos
  const router = useRouter();

  const currentUser = auth.currentUser; // Usuario autenticado

  // Obtener datos del usuario
  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          // Obtener las listas del usuario
          const listsCollectionRef = collection(db, 'userSaves', currentUser.uid, 'lists');
          const listsSnapshot = await getDocs(listsCollectionRef);

          if (!listsSnapshot.empty) {
            const lists = listsSnapshot.docs.map(doc => doc.id); // Obtener los nombres de las listas
            setUserLists(lists);
          } else {
            setUserLists([]);
          }
        } catch (error) {
          console.error('Error al obtener las listas:', error);
          setErrorMsg('Hubo un error al cargar las listas.');
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

  // Obtener los videos de la lista seleccionada
  useEffect(() => {
    const fetchVideosFromList = async () => {
      if (!selectedList) return;

      try {
        const listDocRef = doc(db, 'userSaves', currentUser.uid, 'lists', selectedList);
        const listDocSnap = await getDoc(listDocRef);

        if (listDocSnap.exists()) {
          const listData = listDocSnap.data();
          const videos = listData.videos || []; // Obtener los videos de la lista

          setUserVideos(videos);
        } else {
          setUserVideos([]);
          setErrorMsg('No se encontraron videos en esta lista.');
        }
      } catch (error) {
        console.error('Error al obtener los videos:', error);
        setErrorMsg('Hubo un error al cargar los videos de la lista.');
      }
    };

    fetchVideosFromList();
    
  }, [selectedList]); // Este useEffect se ejecuta cada vez que cambia selectedList
  

  // Cuando se selecciona una lista, se actualiza selectedList
  const handleListChange = (value) => {
    setSelectedList(value); // Actualizar selectedList
  };
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
            onClick={() => router.push('/favorites')} // Redirige a la página de inicio
            style={{ marginRight: '10px', padding: '10px', background: 'none', border: '1px solid white', color: 'white', cursor: 'pointer' }}
          >
            Favorites
          </button>
          <button
            onClick={() => router.push('/perfil')} // Redirige a la página de perfil
            style={{ marginRight: '10px', padding: '10px', background: 'none', border: '1px solid white', color: 'white', cursor: 'pointer' }}
          >
            Perfil
          </button>
          <button
            onClick={() => router.push('/newVideo')} // Redirige a la página de nuevo video
            style={{ padding: '10px', background: 'none', border: '1px solid white', color: 'white', cursor: 'pointer' }}
          >
            Nuevo Video
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
        <h1>VideoListApp</h1>
        <p>Lista de Videos</p>
      </div>

      {/* Selector de listas */}
      <div style={{ marginBottom: '20px' }}>
        <label>Selecciona una lista para ver los videos:</label>
        {userLists.length > 0 ? (
          <select
            onChange={(e) => handleListChange(e.target.value)}
            value={selectedList}
            style={{ padding: '10px', fontSize: '16px', width: '100%' }}
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

      {/* Mostrar videos de la lista seleccionada */}
      <div style={{ marginBottom: '20px' }}>
        {userVideos.length > 0 ? (
          userVideos.map((video, index) => (
            <VideoCard
          key={index}
          videoUrl={video.url}
          title={video.title}
          createdAt={video.createdAt}
          description={video.description}
          onToggleFavorite={() => toggleFavorite(video)}  // Usamos esta función de toggle para los favoritos
          isFavorite={favoriteVideos.some(fav => fav.url === video.url)}  // Comprobamos si el video está en favoritos
        />
          ))
        ) : (
          <p>No hay videos en esta lista.</p>
        )}
      </div>
    </div>
  );
}