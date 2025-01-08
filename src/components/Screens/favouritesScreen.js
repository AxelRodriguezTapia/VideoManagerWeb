import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebaseConfig'; // Importar Firebase
import { doc, getDoc, setDoc, arrayRemove, arrayUnion } from 'firebase/firestore'; // Para obtener y actualizar datos en Firestore
import FSection from '../FSection';
import VideoCard from '../CartaDeVideo'; // Importar VideoCard para mostrar los videos
import Icon from 'react-native-vector-icons/FontAwesome'; // Para los íconos de corazón
import { LinearGradient } from 'expo-linear-gradient'; // Importa LinearGradient

export default function FavouriteScreen({ navigation }) {
  const [favoriteVideos, setFavoriteVideos] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  
  const currentUser = auth.currentUser;

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

  const handlePress = (id) => {
    console.log("Han clicado al botón " + id);
    if (id == 1) {
      navigation.navigate("listScreen");
    } else if (id == 2) {
      navigation.navigate("favouriteScreen");
    } else if (id == 3) {
      navigation.navigate("userScreen");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Sección del título con gradiente */}
      <LinearGradient
        colors={['#3498db', '#2980b9', '#1abc9c']}  // Definimos el gradiente azul-verde
        style={{ padding: 20, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#2c3e50' }}
      >
        <Text style={{
          fontSize: 28,              // Aumentamos el tamaño del texto
          fontWeight: 'bold',        // Hacemos el texto en negrita
          color: '#fff',             // Cambiamos el color a blanco
          textAlign: 'center',
          paddingBottom: 10,
          marginTop:30,
        }}>
          VideoListApp
        </Text>
        <Text style={{
          fontSize: 20,              // Tamaño más grande para mejor legibilidad
          color: '#fff',             // Mantener el color blanco
          textAlign: 'center',
        }}>
          Lista de Favoritos
        </Text>
      </LinearGradient>

      {/* Lista de videos favoritos */}
      <View style={{ flex: 7, width: '100%' }}>
        <ScrollView>
          {favoriteVideos.length > 0 ? (
            favoriteVideos.map((video, index) => (
              <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                {/* VideoCard muestra el contenido del video */}
                <VideoCard
                  videoUrl={video.url}
                  title={video.title}
                  createdAt={video.createdAt}
                  description={video.description}
                  onToggleFavorite={() => toggleFavorite(video)}  // Usamos esta función de toggle para los favoritos
                  isFavorite={favoriteVideos.some(fav => fav.url === video.url)}  // Comprobamos si el video está en favoritos
                />
              </View>
            ))
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No tienes videos favoritos.</Text>
          )}
        </ScrollView>
      </View>

      {/* Sección inferior */}
      <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center', padding: 0 }}>
        <FSection currentSection={2} onPress={handlePress} />
      </View>
    </View>
  );
}
