import { useState, useEffect } from 'react';
import './LoadingScreen.css';

function LoadingScreen({ onFinish }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {

    const fadeTimer = setTimeout(() => setFade(true), 800);

    const removeTimer = setTimeout(() => onFinish?.(), 1300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  return (
    <div id="loading" className={fade ? 'fade' : ''}>
      Loading...
    </div>
  );
}

export default LoadingScreen