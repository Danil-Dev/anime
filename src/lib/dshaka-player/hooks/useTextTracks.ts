import {useShaka} from "@/lib/dshaka-player/components/ShakaProvider";
import {useCallback, useEffect, useRef, useState} from "react";
import useStateRef from "react-usestateref";
import {languageParser} from "@/lib/dshaka-player/utils/langParser";
import log from "loglevel";

interface SubtitleTrack {
  track: shaka.extern.Track;
  display: string;
  roles: Set<string>;
  language: string;
}

interface UseTextTrackConfig {
  onSelect?: (selectedTextTrack: string) => void;
}

export function useTextTracks({onSelect}: UseTextTrackConfig = {}) {
  const {player} = useShaka();
  const [tracks, setTracks] = useState<SubtitleTrack[]>([]);
  const [selectedTrack, setSelectedTrack, selectedTrackRef] =
    useStateRef<SubtitleTrack | null>(null);
  const previousTrack = useRef<SubtitleTrack | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const selectTrack = useCallback((track: SubtitleTrack) => {


    player.selectTextTrack(track.track);
    player.setTextTrackVisibility(true);
    if (onSelect && typeof onSelect === 'function') {
      onSelect(track.track.language);
    }
    console.log (player.isTextTrackVisible())
  }, []);

  const offSubtitle = () => {
    player.setTextTrackVisibility(false);
  }

  const toggleVisibility = () => {
    player.setTextTrackVisibility(!isVisible);
  };

  const trackHandler = () => {
    const currTracks = player.getTextTracks();
    let currSelectedTrack = null;
    const uniqueTracks = new Set<string>();

    const subtitleTracks: SubtitleTrack[] = [];

    // CHECKME: Better sort tracks first based on channelCount or maybe no in the end callback just takes language

    currTracks.forEach((track) => {
      if (!uniqueTracks.has(track.language)) {
        uniqueTracks.add(track.language);

        subtitleTracks.push({
          track,
          display: languageParser(track.language),
          roles: new Set(track.roles),
          language: track.language,
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
      return currSelectedTrack ?? null;
    });

    setTracks(subtitleTracks);
    setIsVisible(player.isTextTrackVisible());
  };

  useEffect(() => {
    const events = ['texttrackvisibility', 'textchanged', 'trackschanged'];

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
    toggleVisibility,
    offSubtitle
  } as const;
}