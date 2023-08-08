'use client'
import {createContext, MutableRefObject, ReactNode, useContext, useMemo, useRef} from "react";
import useState from 'react-usestateref'

interface ShakaProviderContextType{
    video: HTMLVideoElement | null;
    player: shaka.Player | null;
    setPlayer: (player: shaka.Player | null) => void;
    setVideo: (video: HTMLVideoElement | null) => void;
    videoRef: MutableRefObject<HTMLMediaElement | null>;
    playerRef: MutableRefObject<shaka.Player | null>;
    container: HTMLDivElement | null;
    containerRef: MutableRefObject<HTMLDivElement | null>;
    setContainer: (container: HTMLDivElement|null) => void
}

const ShakaProviderContext = createContext<ShakaProviderContextType | null>(null)

export function useShaka() {
    const context = useContext(ShakaProviderContext)
    if (!context){
        throw new Error(
            `useShaka hook must be used on ShakaProvider`
        )
    }

    return context
}

export function ShakaProvider({ children } : { children: ReactNode}) {
    const [video, setVideo, videoRef] = useState<HTMLVideoElement | null>(null)
    const [player, setPlayer, playerRef] = useState<shaka.Player | null>(null)
    const [container, setContainer, containerRef] = useState<HTMLDivElement>(null)

    const defaultContext = {
        video, player, videoRef, playerRef, setPlayer, setVideo, container, containerRef, setContainer
    }

    return(
        <ShakaProviderContext.Provider value={defaultContext}>
            {children}
        </ShakaProviderContext.Provider>
    )
}