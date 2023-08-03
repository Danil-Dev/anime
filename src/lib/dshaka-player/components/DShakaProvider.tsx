import {createContext, FC, MutableRefObject, ReactNode, RefObject} from "react";


interface DShakaProviderProps{
    children: ReactNode
}

interface DShakaPlayerContextType {
    videoRef: MutableRefObject<HTMLVideoElement | null>;
    playerRef: MutableRefObject<shaka.Player | null>; // Тип может быть изменён в зависимости от вашего плеера
}

const DShakaPlayerContext = createContext<DShakaPlayerContextType | null>(null);

