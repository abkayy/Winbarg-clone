import imageCompression from 'browser-image-compression';

export const optimizeImage = async (imageFile: File, maxSizeMB: number = 1, maxWidthOrHeight: number = 1920): Promise<File> => {
  const options = {
    maxSizeMB: maxSizeMB,
    maxWidthOrHeight: maxWidthOrHeight,
    useWebWorker: false,
  };
  
  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    console.error("Error optimizing image:", error);
    // fallback to original if optimization fails
    return imageFile;
  }
};
