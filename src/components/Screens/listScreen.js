import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebaseConfig'; // Acceder a Firebase
import { doc, getDoc, getDocs, collection, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore'; // Importar arrayRemove para eliminar elementos de un arreglo
import { useHistory } from 'react-router-dom'; // Para redirigir entre rutas
import './ListScreen.css'; // Archivo de estilos
import FSection from '../FSection'; // Mantengo el footer tal como solicitaste
import VideoCard from '../CartaDeVideo.js'; // VideoCard sigue igual
import { Picker } from '@react-native-picker/picker'; // Usamos un componente similar en web

export default function ListScreen() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [userVideos, setUserVideos] = useState([]);  // Inicializamos como un array vacío
  const [userLists, setUserLists] = useState([]);    // Inicializamos como un array vacío
  const [selectedList, setSelectedList] = useState('');
  const [favoriteVideos, setFavoriteVideos] = useState([]); // Estado para los videos favoritos
  const [loading, setLoading] = useState(true);  // Estado para manejar la carga
  const history = useHistory(); // Para manejar redirección

  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          // Obtener las listas del usuario
          const listsCollectionRef = collection(db, 'userSaves', currentUser.uid, 'lists');
          const listsSnapshot = await getDocs(listsCollectionRef);

          if (!listsSnapshot.empty) {
            const lists = listsSnapshot.docs.map(doc => doc.id); // Obtén los nombres de las listas
            setUserLists(lists);
          } else {
            setUserLists([]);
          }

          // Obtener los videos guardados por el usuario
          const userDocRef = doc(db, 'userSaves', currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserVideos(userDocSnap.data().videos || []);
            setFavoriteVideos(userDocSnap.data().favorites || []);
          } else {
            setUserVideos([]);
            setFavoriteVideos([]);
          }

        } catch (error) {
          console.error('Error al obtener los datos:', error);
          setErrorMsg('Hubo un error al cargar los videos y listas.');
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

  const handleListChange = (event) => {
    setSelectedList(event.target.value);
  };

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
      console.error('Error al marcar video como favorito:', error);
      setErrorMsg('Hubo un error al guardar el video como favorito.');
    }
  };

  const handlePress = (id) => {
    if (id === 1) {
      history.push("/new-video");
    } else if (id === 2) {
      history.push("/favourites");
    } else if (id === 3) {
      history.push("/user");
    }
  };

  if (loading) {
    return <div className="loading-container"><p>Cargando...</p></div>;
  }

  return (
    <div className="list-screen-container">
      {/* Sección del título con gradiente */}
      <div className="gradient-background">
        <h1 className="title-text">VideoListApp</h1>
        <p className="subtitle-text">Lista de Videos</p>
      </div>

      {/* Selector de lista */}
      <div className="list-selector-container">
        <label>Selecciona una lista para ver los videos:</label>
        {userLists.length > 0 ? (
          <select value={selectedList} onChange={handleListChange} className="list-selector">
            {userLists.map((list, index) => (
              <option key={index} value={list}>{list}</option>
            ))}
          </select>
        ) : (
          <p>No tienes listas creadas.</p>
        )}
      </div>

      {/* Lista de videos */}
      <div className="video-list-container">
        {userVideos.length > 0 ? (
          [...userVideos].reverse().map((video, index) => (
            <VideoCard
              key={index}
              videoUrl={video.url}
              title={video.title}
              createdAt={video.createdAt}
              description={video.description}
              onToggleFavorite={() => toggleFavorite(video)}
              isFavorite={favoriteVideos.some(fav => fav.url === video.url)}
            />
          ))
        ) : (
          <p>No tienes videos guardados en esta lista.</p>
        )}
      </div>

      {/* Sección inferior (Footer) */}
      <div className="footer-container">
        <FSection currentSection={1} onPress={handlePress} />
      </div>
    </div>
  );
}
