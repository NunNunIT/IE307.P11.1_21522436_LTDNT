import { createContext, PropsWithChildren, useContext, useState } from "react";

interface CameraContextType {
  photoUri: string | null;
  setPhotoUri: (uri: string | null) => void;
}

const CameraContext = createContext<CameraContextType | null>(null);

export const useCamera = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error('useCamera must be used within a CameraProvider');
  }

  return context;
}

export const CameraProvider = ({ children }: PropsWithChildren) => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  return (
    <CameraContext.Provider value={{ photoUri, setPhotoUri }}>
      {children}
    </CameraContext.Provider>
  )
}