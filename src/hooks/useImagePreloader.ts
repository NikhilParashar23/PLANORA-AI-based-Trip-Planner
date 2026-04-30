import { useEffect, useState } from 'react';

export const useImagePreloader = (images: string[]) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
      setLoaded(true);
      return;
    }

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setLoaded(true);
        }
      };
    });
  }, [images]);

  return loaded;
};
