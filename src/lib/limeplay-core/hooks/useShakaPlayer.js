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

// src/hooks/useShakaPlayer.ts
var useShakaPlayer_exports = {};
__export(useShakaPlayer_exports, {
  useShakaPlayer: () => useShakaPlayer
});
module.exports = __toCommonJS(useShakaPlayer_exports);
var import_react2 = require("react");
var import_shaka_player = __toESM(require("shaka-player"));

// src/components/LimeplayProvider.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var LimeplayProviderContext = (0, import_react.createContext)(null);
function useLimeplay() {
  const context = (0, import_react.useContext)(LimeplayProviderContext);
  if (!context) {
    throw new Error(
      `useLimeplay hook must be used within a LimeplayProvider`
    );
  }
  return context;
}

// src/hooks/useShakaPlayer.ts
function useShakaPlayer() {
  const { playbackRef, playerRef } = useLimeplay();
  const [error, setError] = (0, import_react2.useState)(null);
  const [isLoaded, setIsLoaded] = (0, import_react2.useState)(false);
  (0, import_react2.useEffect)(() => {
    const errorHandler = (event) => {
      if (event instanceof Event)
        return;
      setError(event);
    };
    if (playbackRef.current) {
      const _player = new import_shaka_player.default.Player(playbackRef.current);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useShakaPlayer
});