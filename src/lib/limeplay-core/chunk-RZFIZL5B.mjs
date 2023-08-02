import {
  languageParser
} from "./chunk-XKF2W67U.mjs";
import {
  useLimeplay
} from "./chunk-WUIGF72E.mjs";
import {
  use_state_ref_default
} from "./chunk-OUCN7IQ4.mjs";

// src/hooks/useTextTracks.ts
import { useCallback, useEffect, useRef, useState } from "react";
function useTextTracks() {
  const { playerRef, playbackRef } = useLimeplay();
  const player = playerRef.current;
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack, selectedTrackRef] = use_state_ref_default(null);
  const previousTrack = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const selectTrack = useCallback((track) => {
    player.selectTextTrack(track.track);
    player.setTextTrackVisibility(true);
  }, []);
  const toggleVisibility = () => {
    player.setTextTrackVisibility(!isVisible);
  };
  const trackHandler = () => {
    console.log("trackHandler");
    const currTracks = player.getTextTracks();
    let currSelectedTrack = null;
    const uniqueTracks = /* @__PURE__ */ new Set();
    const subtitleTracks = [];
    currTracks.forEach((track) => {
      if (!uniqueTracks.has(track.language)) {
        uniqueTracks.add(track.language);
        subtitleTracks.push({
          track,
          display: languageParser(track.language),
          roles: new Set(track.roles),
          language: track.language
        });
      } else {
        const existingTrack = subtitleTracks.find(
          (audioTrack) => audioTrack.language === track.language
        );
        track.roles.forEach((role) => existingTrack.roles.add(role));
      }
    });
    currTracks.forEach((track) => {
      if (track.active) {
        currSelectedTrack = subtitleTracks.find(
          (audioTrack) => audioTrack.language === track.language
        );
      }
    });
    setSelectedTrack((prevTrack) => {
      previousTrack.current = prevTrack;
      return currSelectedTrack != null ? currSelectedTrack : null;
    });
    setTracks(subtitleTracks);
    setIsVisible(player.isTextTrackVisible());
  };
  useEffect(() => {
    const events = ["texttrackvisibility", "textchanged", "trackschanged"];
    events.forEach((event) => {
      player.addEventListener(event, trackHandler);
    });
    return () => {
      if (player) {
        events.forEach((event) => {
          player.removeEventListener(event, trackHandler);
        });
      }
    };
  }, [trackHandler]);
  return {
    tracks,
    selectedTrack,
    isVisible,
    selectTrack,
    toggleVisibility
  };
}

export {
  useTextTracks
};
