import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Usamos FontAwesome para los íconos en la web

// Componente VideoCard para mostrar el video
export default function VideoCard({ videoUrl, title, description, createdAt, onToggleFavorite, isFavorite }) {
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

  return (
    <div style={{ margin: '20px', position: 'relative' }}>
      {/* Botón de favorito en la esquina superior derecha */}
      <button
        onClick={onToggleFavorite}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
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
