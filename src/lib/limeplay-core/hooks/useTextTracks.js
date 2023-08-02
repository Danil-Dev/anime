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

// src/hooks/useTextTracks.ts
var useTextTracks_exports = {};
__export(useTextTracks_exports, {
  useTextTracks: () => useTextTracks
});
module.exports = __toCommonJS(useTextTracks_exports);
var import_react4 = require("react");

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

// src/hooks/useAudioTracks.ts
var import_react3 = require("react");
function languageParser(locale) {
  switch (locale) {
    case "mul":
      return "Multiple Languages";
    case "und":
      return "Default";
    case "zxx":
      return "Not applicable";
    default:
      break;
  }
  if (window.Intl && "DisplayNames" in Intl) {
    const userLanguage = navigator.language;
    try {
      const languageNames = new Intl.DisplayNames([userLanguage], {
        type: "language"
      });
      const language2 = languageNames.of(locale);
      return language2.charAt(0).toUpperCase() + language2.slice(1);
    } catch (e) {
      return `Unrecognized (${locale})`;
    }
  }
  const language = shaka.util.LanguageUtils.getBase(locale);
  return `Unrecognized (${locale})`;
}

// src/hooks/useTextTracks.ts
function useTextTracks() {
  const { playerRef, playbackRef } = useLimeplay();
  const player = playerRef.current;
  const [tracks, setTracks] = (0, import_react4.useState)([]);
  const [selectedTrack, setSelectedTrack, selectedTrackRef] = use_state_ref_default(null);
  const previousTrack = (0, import_react4.useRef)(null);
  const [isVisible, setIsVisible] = (0, import_react4.useState)(false);
  const selectTrack = (0, import_react4.useCallback)((track) => {
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
  (0, import_react4.useEffect)(() => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useTextTracks
});