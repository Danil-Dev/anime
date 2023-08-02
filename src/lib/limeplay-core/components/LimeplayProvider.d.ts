interface LimeplayProviderContextType {
    playbackRef: React.MutableRefObject<HTMLMediaElement | null>;
    playerRef: React.MutableRefObject<shaka.Player | null>;
    containerRef: React.MutableRefObject<HTMLDivElement | null>;
    player: shaka.Player | null;
    setPlayer: (player: shaka.Player | null) => void;
    playback: HTMLMediaElement | null;
    setPlayback: (playback: HTMLMediaElement | null) => void;
}
declare function useLimeplay(): LimeplayProviderContextType;
declare function LimeplayProvider({ children }: {
    children: React.ReactNode;
}): JSX.Element;

export { LimeplayProvider, useLimeplay };
