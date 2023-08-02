import "../chunk-32KFO24K.mjs";
import "../chunk-5GRUAHHG.mjs";
import {
  use_state_ref_default
} from "../chunk-OUCN7IQ4.mjs";
import "../chunk-JAH6KKI6.mjs";
import "../chunk-47P3ZNHN.mjs";
import "../chunk-XALKSG2U.mjs";

// src/components/TimelineProvider.tsx
import { createContext, useContext, useState } from "react";
import { jsx } from "react/jsx-runtime";
var LimeplayTimelineProviderContext = createContext(void 0);
function useLimeplayTimeline() {
  const context = useContext(LimeplayTimelineProviderContext);
  if (!context) {
    throw new Error(
      `useLimeplayTimeline hook must be used within a LimeplayTimelineProvider`
    );
  }
  return context;
}
function LimeplayTimelineProvider({
  children
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration, durationRef] = use_state_ref_default(0);
  const [isSeeking, setIsSeeking, isSeekingRef] = use_state_ref_default(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [seekRange, setSeekRange, seekRangeRef] = use_state_ref_default({
    start: 0,
    end: 0
  });
  const providerValue = {
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    durationRef,
    isSeeking,
    setIsSeeking,
    isSeekingRef,
    currentProgress,
    setCurrentProgress,
    seekRange,
    setSeekRange,
    seekRangeRef
  };
  return /* @__PURE__ */ jsx(LimeplayTimelineProviderContext.Provider, { value: providerValue, children });
}
export {
  LimeplayTimelineProvider,
  useLimeplayTimeline
};
