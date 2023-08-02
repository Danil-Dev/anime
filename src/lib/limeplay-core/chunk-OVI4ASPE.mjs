import {
  useLimeplay
} from "./chunk-WUIGF72E.mjs";
import {
  use_state_ref_default
} from "./chunk-OUCN7IQ4.mjs";

// src/hooks/useTimeline.ts
import React, { useCallback, useEffect, useRef, useState } from "react";
import clamp from "lodash/clamp";
function useTimeline({
  updateInterval = 250,
  isSlidingRef = React.createRef()
} = {}) {
  const { playbackRef, playerRef } = useLimeplay();
  const playback = playbackRef.current;
  const player = playerRef.current;
  const currentTimerId = useRef(-1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration, durationRef] = use_state_ref_default(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isLive, setIsLive, isLiveRef] = use_state_ref_default(false);
  const [liveLatency, setLiveLatency] = useState(0);
  const [seekRange, setSeekRange, seekRangeRef] = use_state_ref_default({
    start: 0,
    end: 0
  });
  const updateCurrentTime = useCallback((time) => {
    if (playback.readyState === 0 || Number.isNaN(time))
      return;
    const _seekRange = player.seekRange();
    time = clamp(time, _seekRange.start, _seekRange.end);
    playback.currentTime = time;
    setCurrentTime(time);
  }, []);
  useEffect(() => {
    const updateSeekHandler = () => {
      clearInterval(currentTimerId.current);
      currentTimerId.current = window.setInterval(() => {
        if (playback.readyState === 0)
          return;
        const currentSeekRange = player.seekRange();
        if (player.isLive()) {
          setSeekRange(currentSeekRange);
          setCurrentTime(playback.currentTime);
          const currentDuration = currentSeekRange.end - currentSeekRange.start;
          if (durationRef.current !== currentDuration)
            setDuration(currentDuration);
          let localProgress = 100 - (currentSeekRange.end - playback.currentTime) / currentDuration * 100;
          localProgress = clamp(localProgress, 0, 100);
          if (!isSlidingRef.current)
            setCurrentProgress(localProgress);
          setLiveLatency(currentSeekRange.end - playback.currentTime);
        } else {
          if (durationRef.current !== playback.duration)
            setDuration(playback.duration);
          setSeekRange(player.seekRange());
          setCurrentTime(playback.currentTime);
          const localProgress = playback.currentTime / playback.duration * 100;
          if (!isSlidingRef.current)
            setCurrentProgress(localProgress);
        }
        if (isLiveRef.current !== player.isLive()) {
          setIsLive(player.isLive());
        }
      }, updateInterval);
    };
    const events = ["trackschanged", "manifestparsed"];
    events.forEach((event) => {
      playback.addEventListener(event, updateSeekHandler);
    });
    updateSeekHandler();
    return () => {
      if (playback) {
        events.forEach((event) => {
          playback.removeEventListener(event, updateSeekHandler);
        });
      }
      clearInterval(currentTimerId.current);
    };
  }, [updateInterval]);
  return {
    currentTime,
    duration,
    currentProgress,
    seekRange,
    isLive,
    liveLatency,
    updateCurrentTime
  };
}

export {
  useTimeline
};
