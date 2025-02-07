import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from 'react-avatar';

// Define el componente VideoCart que acepta las props 'item' y 'viewCount'
const VideoCart = ({ item, viewCount }) => {
  // Declara una variable de estado 'ytIcon' para almacenar la URL del icono del canal de YouTube
  const [ytIcon, setYtIcon] = useState('');

  // Hook useEffect para ejecutar efectos secundarios, en este caso, obtener el icono del canal de YouTube
  useEffect(() => {
    // Define una función asíncrona para obtener el icono del canal de YouTube
    const getYoutubeChannelName = async () => {
      try {
        // Realiza una solicitud GET a la API de YouTube para obtener los detalles del canal
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${item.snippet.channelId}&key=YOUR_API_KEY`);
        // Establece la URL del icono obtenida en la variable de estado 'ytIcon'
        setYtIcon(res.data.items[0].snippet.thumbnails.high.url);
      } catch (error) {
        // Registra cualquier error que ocurra durante la solicitud
        console.log(error);
      }
    };

    // Llama a la función para obtener el icono del canal de YouTube
    getYoutubeChannelName();
  }, [item.snippet.channelId]); // El efecto se ejecutará de nuevo si 'item.snippet.channelId' cambia

  return (
    // Contenedor principal para la tarjeta de video con algunas clases de estilo
    <div className='w-94 cursor-pointer my-2 dark:bg-gray-800 dark:text-white rounded-xl'>
      {/* Imagen del video con esquinas redondeadas */}
      <img className='rounded-xl w-full' src={item.snippet.thumbnails.medium.url} alt="ytvideo" />
      <div>
        <div className='flex mt-2'>
          {/* Muestra el icono del canal usando el componente Avatar */}
          <Avatar src={ytIcon} size={35} round={true} />
          <div className='ml-2'>
            {/* Muestra el título del video, el nombre del canal y el recuento de vistas */}
            <h1 className='font-bold dark:text-white'>{item.snippet.title}</h1>
            <p className='text-sm text-gray-500 dark:text-gray-400'>{item.snippet.channelTitle}</p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>{viewCount} views</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exporta el componente VideoCart como la exportación predeterminada
export default VideoCart;




