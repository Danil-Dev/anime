var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/hooks/useVolume.ts
var useVolume_exports = {};
__export(useVolume_exports, {
  useVolume: () => useVolume
});
module.exports = __toCommonJS(useVolume_exports);
var import_react3 = require("react");
var import_lodash = require("lodash");

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

// src/hooks/useVolume.ts
function useVolume({
  initialVolume,
  // Do not provide default value as playback.volume will be used
  syncMuteState = true
} = {}) {
  const { playbackRef } = useLimeplay();
  const playback = playbackRef.current;
  const [volume, setVolume] = (0, import_react3.useState)(initialVolume != null ? initialVolume : playback.volume);
  const [muted, setMuted, mutedRef] = use_state_ref_default(playback.muted);
  const [lastVolume, setLastVolume, lastVolumeRef] = use_state_ref_default(initialVolume);
  const toggleMute = () => {
    playback.muted = !playback.muted;
  };
  const updateCurrentVolume = (0, import_react3.useCallback)((vol) => {
    if (playback.readyState === 0 || Number.isNaN(vol))
      return;
    vol = (0, import_lodash.clamp)(vol, 0, 1);
    playback.volume = vol;
  }, []);
  (0, import_react3.useEffect)(() => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useVolume
});
