import {
  useLimeplay
} from "./chunk-WUIGF72E.mjs";

// src/hooks/useShakaPlayer.ts
import { useEffect, useState } from "react";
import shaka from "shaka-player";
function useShakaPlayer() {
  const { playbackRef, playerRef } = useLimeplay();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const errorHandler = (event) => {
      if (event instanceof Event)
        return;
      setError(event);
    };
    if (playbackRef.current) {
      const _player = new shaka.Player(playbackRef.current);
      playerRef.current = _player;
      _player.addEventListener("error", errorHandler);
      setIsLoaded(true);
    }
    return () => {
      setIsLoaded(false);
      setError(null);
      if (playbackRef.current) {
        const _player = playerRef.current;
        _player.removeEventListener("error", errorHandler);
        _player.destroy();
        playbackRef.current = null;
      }
    };
  }, []);
  return {
    playerRef,
    playbackRef,
    error,
    isLoaded
  };
}

export {
  useShakaPlayer
};
