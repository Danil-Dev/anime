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

// src/hooks/useSliderEvents.ts
var useSliderEvents_exports = {};
__export(useSliderEvents_exports, {
  useSliderEvents: () => useSliderEvents
});
module.exports = __toCommonJS(useSliderEvents_exports);
var import_react = require("@use-gesture/react");
var import_lodash = require("lodash");
var import_react2 = require("react");
function useSliderEvents({
  sliderHandlerConfig,
  ref,
  initialValue = 0,
  onDragStart,
  onDrag,
  onDragEnd,
  onPointerEnter,
  onPointerMove,
  onPointerLeave
}) {
  const [isSliding, setIsSliding] = (0, import_react2.useState)(false);
  const [isHovering, setIsHovering] = (0, import_react2.useState)(false);
  const [isInside, setIsInside] = (0, import_react2.useState)(false);
  const [isKeying, setIsKeying] = (0, import_react2.useState)(false);
  const [value, setValue] = (0, import_react2.useState)(initialValue);
  const { disabled } = sliderHandlerConfig;
  const dragHandler = ({
    type,
    active,
    xy: [ox, oy],
    event,
    moving,
    dragging,
    hovering,
    ctrlKey,
    shiftKey,
    values,
    overflow,
    movement,
    offset
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
        case "pointerdown":
          onDragStart == null ? void 0 : onDragStart(newValue);
          break;
        case "pointermove": {
          onDrag == null ? void 0 : onDrag(newValue);
          onPointerMove == null ? void 0 : onPointerMove(newValue);
          break;
        }
        case "pointerup":
          onDragEnd == null ? void 0 : onDragEnd(newValue);
          break;
        case "pointerenter":
          onPointerEnter == null ? void 0 : onPointerEnter();
          break;
        case "pointerleave":
          onPointerLeave == null ? void 0 : onPointerLeave();
          break;
        default:
          break;
      }
    }
    if (event instanceof KeyboardEvent) {
      const isInverted = inverted || dir === "rtl" && o9n === "horizontal";
      const stepSize = (shiftKey ? skipStep : step) * (isInverted ? -1 : 1);
      if (active) {
        switch (event.key) {
          case "ArrowLeft":
            newValue -= stepSize;
            break;
          case "ArrowRight":
            newValue += stepSize;
            break;
          case "ArrowUp":
            newValue += stepSize;
            break;
          case "ArrowDown":
            newValue -= stepSize;
            break;
          default:
            break;
        }
      }
    }
    newValue = (0, import_lodash.clamp)(newValue, min, max);
    setValue(newValue);
    setIsSliding(active);
    return newValue;
  };
  const hoverHandler = (0, import_react2.useCallback)(
    ({ hovering, type }) => {
      setIsHovering(hovering);
      switch (type) {
        case "pointerenter":
          onPointerEnter == null ? void 0 : onPointerEnter();
          break;
        case "pointerleave":
          onPointerLeave == null ? void 0 : onPointerLeave();
          break;
        default:
          break;
      }
    },
    [onPointerEnter, onPointerLeave]
  );
  (0, import_react.useGesture)(
    {
      // pointerenter, pointermove, pointerleave
      onDrag: dragHandler,
      onMove: hoverHandler
      // onHover: hoverHandler,
    },
    {
      target: ref,
      enabled: !disabled,
      drag: {
        bounds: {
          left: sliderHandlerConfig.min,
          right: sliderHandlerConfig.max
        }
      }
    }
  );
  return {
    value,
    isSliding,
    isHovering,
    isInside
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useSliderEvents
});
