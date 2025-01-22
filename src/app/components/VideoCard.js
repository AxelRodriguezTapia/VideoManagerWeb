import React from 'react';
import { FaHeart, FaRegHeart, FaTrashAlt } from 'react-icons/fa'; // Usamos FontAwesome para los íconos en la web
import { doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../lib/firebaseConfig'; // Asegúrate de tener la configuración de Firebase

// Componente VideoCard para mostrar el video
export default function VideoCard({ videoUrl, title, description, createdAt, onToggleFavorite, isFavorite, videoId, selectedList,reloadList }) {
  const isYouTubeLong = videoUrl.includes('youtube.com/watch'); // URL larga de YouTube
  const isYouTubeShort = videoUrl.includes('youtu.be/'); // URL corta de YouTube
  const isInstagram = videoUrl.includes('instagram.com/p');
  const isTiktok = videoUrl.includes('tiktok.com/');

  // Extraer videoId para URL larga de YouTube
  const videoIdLong = isYouTubeLong ? videoUrl.split('v=')[1] : null;

  // Extraer videoId para URL corta de YouTube
  const videoIdShort = isYouTubeShort ? videoUrl.split('/').pop().split('?')[0] : null;

  const instagramUrl = isInstagram ? videoUrl : null;

  // Generar URL de incrustación para TikTok
  const tiktokEmbedUrl = isTiktok
    ? `https://www.tiktok.com/embed/${videoUrl.split('/video/')[1]}`
    : null;

 // Función para eliminar el video con confirmación
const handleDeleteVideo = async () => {
  if (!selectedList) {
    alert('No se seleccionó ninguna lista.');
    return;
  }

  // Mostrar ventana de confirmación
  const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este video?');

  if (confirmDelete) {
    try {
      const listDocRef = doc(db, 'userSaves', auth.currentUser.uid, 'lists', selectedList);
      
      // Elimina el video del array de la lista en Firebase
      await updateDoc(listDocRef, {
        videos: arrayRemove({ url: videoUrl, title, description, createdAt }),
      });

      alert('¡Video eliminado correctamente!');
      // Llamamos a reloadList para recargar la lista de videos
      if (reloadList) {
        reloadList();  // Ejecuta la función que recarga la lista de videos
      }
    } catch (error) {
      console.error('Error al eliminar el video: ', error);
      alert('Hubo un error al eliminar el video.');
    }
  }
};
  return (
    <div style={{ margin: '20px', position: 'relative' }}>
      {/* Botón de favorito en la esquina superior derecha */}
      <button
        onClick={onToggleFavorite}
        style={{
          position: 'absolute',
          top: '10px',
          right: '50px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {isFavorite ? (
          <FaHeart size={30} color="red" />
        ) : (
          <FaRegHeart size={30} color="gray" />
        )}
      </button>

      {/* Botón de papelera para eliminar el video */}
      <button
        onClick={handleDeleteVideo}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <FaTrashAlt size={30} color="red" />
      </button>

      {/* Título y descripción */}
      <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{title}</h3>
      <p>{description}</p>

      {/* Fecha de creación */}
      {createdAt && (
        <p style={{ fontSize: '14px', color: 'gray', marginTop: '5px' }}>
          Fecha de creación: {new Date(createdAt).toLocaleDateString()}
        </p>
      )}

      {/* Reproducir video de YouTube (largo o corto) */}
      {isYouTubeLong || isYouTubeShort ? (
        <iframe
          title="video"
          src={`https://www.youtube.com/embed/${videoIdLong || videoIdShort}`}
          width="100%"
          height="315"
          style={{ marginTop: '10px' }}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : isInstagram ? (
        <iframe
          title="video"
          src={instagramUrl}
          width="100%"
          height="580"
          style={{ marginTop: '10px' }}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : isTiktok ? (
        <iframe
          title="video"
          src={tiktokEmbedUrl}
          width="100%"
          height="580"
          style={{ marginTop: '10px' }}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <p>El enlace no es compatible.</p>
      )}
    </div>
  );
}
