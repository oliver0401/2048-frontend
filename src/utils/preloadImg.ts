export const preloadImages = (images: string[]) => {
  const imgPromises = images
    .filter(src => src) // Skip loading if src is empty or null
    .map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = src;
      });
    });
  return Promise.all(imgPromises);
};
