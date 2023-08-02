import {
  useLimeplay
} from "./chunk-WUIGF72E.mjs";
import {
  use_state_ref_default
} from "./chunk-OUCN7IQ4.mjs";

// src/hooks/useVolume.ts
import { useCallback, useEffect, useState } from "react";
import { clamp } from "lodash";
function useVolume({
  initialVolume,
  // Do not provide default value as playback.volume will be used
  syncMuteState = true
} = {}) {
  const { playbackRef } = useLimeplay();
  const playback = playbackRef.current;
  const [volume, setVolume] = useState(initialVolume != null ? initialVolume : playback.volume);
  const [muted, setMuted, mutedRef] = use_state_ref_default(playback.muted);
  const [lastVolume, setLastVolume, lastVolumeRef] = use_state_ref_default(initialVolume);
  const toggleMute = () => {
    playback.muted = !playback.muted;
  };
  const updateCurrentVolume = useCallback((vol) => {
    if (playback.readyState === 0 || Number.isNaN(vol))
      return;
    vol = clamp(vol, 0, 1);
    playback.volume = vol;
  }, []);
  useEffect(() => {
    const volumeEventHandler = () => {
      if (syncMuteState) {
        if (playback.muted !== mutedRef.current) {
          setMuted(playback.muted);
          if (playback.muted === true) {
            setVolume(0);
          } else {
            setVolume(lastVolumeRef.current);
          }
        } else if (playback.muted === true && playback.volume > 0) {
          playback.muted = false;
          setMuted(false);
          setVolume(playback.volume);
        } else if (playback.volume === 0) {
          playback.muted = true;
          setMuted(true);
          setVolume(playback.volume);
        } else {
          setVolume(playback.volume);
        }
      } else if (!syncMuteState) {
        if (playback.muted !== mutedRef.current) {
          setMuted(playback.muted);
          if (playback.muted === false && playback.volume === 0) {
            setVolume(lastVolumeRef.current);
          }
        } else {
          setVolume(playback.volume);
          if (playback.volume === 0) {
            setMuted(true);
          }
        }
      }
      if (playback.volume > 0) {
        setLastVolume(playback.volume);
      }
    };
    const events = ["volumechange"];
    events.forEach((event) => {
      playback.addEventListener(event, volumeEventHandler);
    });
    return () => {
      if (playback) {
        events.forEach((event) => {
          playback.removeEventListener(event, volumeEventHandler);
        });
      }
    };
  }, [syncMuteState]);
  return {
    volume,
    muted,
    lastVolume,
    toggleMute,
    updateCurrentVolume
  };
}

export {
  useVolume
};