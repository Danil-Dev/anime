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

// src/utils/index.tsx
var utils_exports = {};
__export(utils_exports, {
  getDuration: () => getDuration,
  getPercentage: () => getPercentage,
  logger: () => logger,
  off: () => off,
  on: () => on,
  useStateRef: () => use_state_ref_default
});
module.exports = __toCommonJS(utils_exports);

// src/utils/get-percentage.ts
function getPercentage(time, total, PRECISION = 3) {
  return Math.round(time / total * 100 * 10 ** PRECISION) / 10 ** PRECISION;
}

// src/utils/get-duration.ts
function getDuration(player) {
  const seekRange = player.seekRange();
  return seekRange.end - seekRange.start;
}

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

// src/utils/logger.ts
var import_loglevel = __toESM(require("loglevel"));
var logger = import_loglevel.default.getLogger("limeplay-core");
logger.setLevel("DEBUG");

// src/utils/index.tsx
var on = (target, eventNames, listener, options) => {
  if (Array.isArray(eventNames)) {
    eventNames.forEach(
      (eventName) => target.addEventListener(eventName, listener, options)
    );
  } else {
    target.addEventListener(eventNames, listener, options);
  }
};
var off = (target, eventNames, listener, options) => {
  if (Array.isArray(eventNames)) {
    eventNames.forEach(
      (eventName) => target.removeEventListener(eventName, listener, options)
    );
  } else {
    target.removeEventListener(eventNames, listener, options);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDuration,
  getPercentage,
  logger,
  off,
  on,
  useStateRef
});
