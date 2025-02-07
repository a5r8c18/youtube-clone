import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from '../utils/appSlice';
import { GrNext, GrPrevious } from 'react-icons/gr';

// Definición de la lista de etiquetas de los botones
const buttonList = ["All", "Javascript", "Java", "Live", "Music", "Songs", "Vlogs", "Trending", "Programming", "News", "Technology", "Cricket", "Comedy", "Thriller", "New to you", "Computer Programming", "Netlify", "Coding"];

// Componente ButtonList
const ButtonList = () => {
  // Estado para rastrear el botón actualmente activo
  const [active, setActive] = useState("All");
  // Estados para controlar la visibilidad de los botones de desplazamiento
  const [showNext, setShowNext] = useState(true);
  const [showPrevious, setShowPrevious] = useState(false);
  // Referencia al contenedor del desplazamiento
  const scrollContainerRef = useRef(null);
  // Obtener la función dispatch desde Redux
  const dispatch = useDispatch();

  // Función para manejar los clics en los botones
  const videoByTag = (tag) => {
    // Si el botón clicado no está ya activo
    if (active !== tag) {
      // Despacha una acción para establecer la categoría en el store de Redux
      dispatch(setCategory(tag));
      // Actualiza el estado activo al botón clicado
      setActive(tag);
    }
  }

  // Función para desplazar hacia la derecha
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 150;
      updateScrollButtons();
    }
  }

  // Función para desplazar hacia la izquierda
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 150;
      updateScrollButtons();
    }
  }

  // Función para actualizar la visibilidad de los botones de desplazamiento
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowPrevious(scrollLeft > 0);
      setShowNext(scrollLeft < scrollWidth - clientWidth);
    }
  }

  // Efecto para actualizar los botones de desplazamiento al montar el componente
  useEffect(() => {
    updateScrollButtons();
  }, []);

  return (
    <div className='flex items-center w-full my-1'>
      {/* Icono para desplazar hacia la izquierda */}
      {showPrevious && (
        <button onClick={scrollLeft} className='p-2'>
          <GrPrevious size="24px" />
        </button>
      )}
      {/* Contenedor para la lista de botones con desplazamiento horizontal */}
      <div ref={scrollContainerRef} className='flex overflow-x-auto scrollbar-hide w-full' onScroll={updateScrollButtons}>
        {
          // Itera sobre el array buttonList para crear botones
          buttonList.map((buttonName, index) => {
            return (
              // Cada botón envuelto en un div con una clave única
              <div key={index}>
                <button 
                  onClick={() => { videoByTag(buttonName) }} 
                  className={`${active === buttonName ? "bg-slate-900 text-white dark:bg-gray-700" : "bg-gray-200 dark:bg-gray-800 dark:text-white"} w-fit font-medium mx-1 cursor-pointer px-3 py-2 rounded-lg`}
                >
                  {/* Etiqueta del botón */}
                  <span className="whitespace-nowrap">{buttonName}</span>
                </button>
              </div>
            )
          })
        }
      </div>
      {/* Icono para desplazar hacia la derecha */}
      {showNext && (
        <button onClick={scrollRight} className='p-2'>
          <GrNext size="24px" />
        </button>
      )}
    </div>
  )
}

// Exporta el componente ButtonList como exportación predeterminada
export default ButtonList;

