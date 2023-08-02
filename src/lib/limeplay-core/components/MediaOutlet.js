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

// src/components/MediaOutlet.tsx
var MediaOutlet_exports = {};
__export(MediaOutlet_exports, {
  MediaOutlet: () => MediaOutlet
});
module.exports = __toCommonJS(MediaOutlet_exports);
var import_react2 = __toESM(require("react"));

// src/utils/composeRefs.tsx
var React = __toESM(require("react"));
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => refs.forEach((ref) => setRef(ref, node));
}
function useComposedRefs(...refs) {
  return React.useCallback(composeRefs(...refs), refs);
}

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

// src/components/MediaOutlet.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var MediaOutlet = (0, import_react2.forwardRef)(
  ({ children }, forwardedRef) => {
    const { playbackRef, playerRef } = useLimeplay();
    const composedRefs = useComposedRefs(forwardedRef, playbackRef);
    console.log("[ MediaOutlet ] rendered");
    (0, import_react2.useLayoutEffect)(() => {
      if (import_react2.default.Children.count(children) !== 1) {
        throw new Error(
          "MediaOutlet must have a single child as HTMLMediaElement"
        );
      }
      if (!import_react2.default.isValidElement(children)) {
        throw new Error(
          "MediaOutlet must have a single child as HTMLMediaElement"
        );
      }
      return () => {
        playbackRef.current = null;
        playerRef.current = null;
      };
    }, [children]);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: import_react2.default.cloneElement(children, {
      ref: composedRefs
    }) });
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MediaOutlet
});