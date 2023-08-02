var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/hooks/useTimeline.ts
var useTimeline_exports = {};
__export(useTimeline_exports, {
  useTimeline: () => useTimeline
});
module.exports = __toCommonJS(useTimeline_exports);
var import_react3 = __toESM(require("react"));
var import_clamp = __toESM(require("lodash/clamp"));

// src/utils/use-state-ref.ts
var import_react = require("react");
var isFunction = (setStateAction) => typeof setStateAction === "function";
var useStateRef = (initialState) => {
  const [state, setState] = (0, import_react.useState)(initialState);
  const ref = (0, import_react.useRef)(state);
  const dispatch = (0, import_react.useCallback)(
    (setStateAction) => {
      ref.current = isFunction(setStateAction) ? setStateAction(ref.current) : setStateAction;
      setState(ref.current);
    },
    []
  );
  return [state, dispatch, ref];
};
var use_state_ref_default = useStateRef;

// src/components/LimeplayProvider.tsx
var import_react2 = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var LimeplayProviderContext = (0, import_react2.createContext)(null);
function useLimeplay() {
  const context = (0, import_react2.useContext)(LimeplayProviderContext);
  if (!context) {
    throw new Error(
      `useLimeplay hook must be used within a LimeplayProvider`
    );
  }
  return context;
}

// src/hooks/useTimeline.ts
function useTimeline({
  updateInterval = 250,
  isSlidingRef = import_react3.default.createRef()
} = {}) {
  const { playbackRef, playerRef } = useLimeplay();
  const playback = playbackRef.current;
  const player = playerRef.current;
  const currentTimerId = (0, import_react3.useRef)(-1);
  const [currentTime, setCurrentTime] = (0, import_react3.useState)(0);
  const [duration, setDuration, durationRef] = use_state_ref_default(0);
  const [currentProgress, setCurrentProgress] = (0, import_react3.useState)(0);
  const [isLive, setIsLive, isLiveRef] = use_state_ref_default(false);
  const [liveLatency, setLiveLatency] = (0, import_react3.useState)(0);
  const [seekRange, setSeekRange, seekRangeRef] = use_state_ref_default({
    start: 0,
    end: 0
  });
  const updateCurrentTime = (0, import_react3.useCallback)((time) => {
    if (playback.readyState === 0 || Number.isNaN(time))
      return;
    const _seekRange = player.seekRange();
    time = (0, import_clamp.default)(time, _seekRange.start, _seekRange.end);
    playback.currentTime = time;
    setCurrentTime(time);
  }, []);
  (0, import_react3.useEffect)(() => {
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
          localProgress = (0, import_clamp.default)(localProgress, 0, 100);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useTimeline
});