import React, { useState, useEffect } from 'react';
import { useMainContext } from '../../context/MainContext';

const CustomCursor = () => {
  const { cursor } = useMainContext();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    // Add cursor: none to the body element when component mounts
    document.body.style.cursor = 'none';

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);

    return () => {
      // Reset cursor style when component unmounts
      document.body.style.cursor = 'default';
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        transform: 'translate(0%, 0%)', // Center the cursor
        pointerEvents: 'none', // Prevent the cursor from interfering with clicks
        zIndex: 9999,
      }}
    >
      <img
        src={cursor}
        alt="cursor"
        onMouseDown={() => {
          console.log('mouse down');
          setRotate(true);
        }}
        onMouseUp={() => {
          console.log('mouse up');
          setRotate(false);
        }}
        className={`min-w-12 min-h-12 max-w-12 max-h-12 ${
          rotate ? 'rotate-90' : ''
        }`}
      />
    </div>
  );
};

export default CustomCursor;
