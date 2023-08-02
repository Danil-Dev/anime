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

// src/hooks/useTimelineHover.ts
var useTimelineHover_exports = {};
__export(useTimelineHover_exports, {
  useTimelineHover: () => useTimelineHover
});
module.exports = __toCommonJS(useTimelineHover_exports);
var import_react = require("@use-gesture/react");
var import_lodash = require("lodash");
var import_react2 = require("react");
function useTimelineHover({
  sliderHandlerConfig,
  ref,
  onSlideStart,
  onSlide,
  onSlideEnd
}) {
  const [isHovering, setIsHovering] = (0, import_react2.useState)(false);
  const [isMoving, setIsMoving] = (0, import_react2.useState)(false);
  const [value, setValue] = (0, import_react2.useState)(0);
  const { disabled } = sliderHandlerConfig;
  const dragHandler = ({
    type,
    active,
    xy: [ox, oy],
    event,
    ctrlKey,
    shiftKey
  }) => {
    const {
      min,
      max,
      step = 5,
      skipStep = 30,
      orientation: o9n = "horizontal",
      dir = "ltr",
      inverted = false
    } = sliderHandlerConfig;
    setIsHovering(active);
    const { height, width, top, left } = ref.current.getBoundingClientRect();
    let newValue = value;
    if (event instanceof PointerEvent) {
      const clientPosition = o9n === "vertical" ? oy : ox;
      const sliderSize = o9n === "vertical" ? height : width;
      const sliderPosition = o9n === "vertical" ? top : left;
      const relativePosition = clientPosition - sliderPosition;
      const percentage = relativePosition / sliderSize;
      newValue = percentage * (max - min) + min;
      if (inverted || dir === "rtl" && o9n === "horizontal")
        newValue = max - newValue + min;
      switch (type) {
        case "pointerenter":
          onSlideStart == null ? void 0 : onSlideStart(newValue);
          break;
        case "pointermove":
          onSlide == null ? void 0 : onSlide(newValue);
          break;
        case "pointerup":
          onSlideEnd == null ? void 0 : onSlideEnd(newValue);
          break;
        default:
          break;
      }
    }
    newValue = (0, import_lodash.clamp)(newValue, min, max);
    setValue(newValue);
    return newValue;
  };
  (0, import_react.useGesture)(
    {
      onHover: dragHandler,
      onMove: dragHandler
    },
    {
      target: ref,
      enabled: !disabled
    }
  );
  return {
    value,
    isHovering
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useTimelineHover
});
