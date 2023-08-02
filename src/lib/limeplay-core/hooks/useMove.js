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

// src/hooks/useMove.ts
var useMove_exports = {};
__export(useMove_exports, {
  useSliderMove: () => useSliderMove
});
module.exports = __toCommonJS(useMove_exports);
var import_lodash = require("lodash");
function useSliderMove(event, callback, props) {
  const { min, max, step, orientation: o9n, dir, inverted, disabled } = props;
  if (disabled)
    return null;
  const clientPosition = o9n === "vertical" ? event.clientY : event.clientX;
  const rect = event.currentTarget.getBoundingClientRect();
  const sliderSize = o9n === "vertical" ? rect.height : rect.width;
  const sliderPosition = o9n === "vertical" ? rect.top : rect.left;
  const relativePosition = clientPosition - sliderPosition;
  const percentage = relativePosition / sliderSize;
  let newValue = percentage * (max - min) + min;
  if (inverted || dir === "rtl" && o9n === "horizontal")
    newValue = max - newValue + min;
  newValue = (0, import_lodash.clamp)(newValue, min, max);
  return newValue;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useSliderMove
});