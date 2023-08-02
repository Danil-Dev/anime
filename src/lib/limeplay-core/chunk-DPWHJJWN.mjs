// src/hooks/useTimelineDrag.ts
import { useDrag } from "@use-gesture/react";
import { clamp } from "lodash";
import { useState } from "react";
function useTimelineDrag({
  sliderHandlerConfig,
  ref,
  onSlideStart,
  onSlide,
  onSlideEnd,
  initialValue = 0
}) {
  const [isSliding, setIsSliding] = useState(false);
  const [value, setValue] = useState(initialValue);
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
      switch (event.type) {
        case "keydown": {
          onSlideStart == null ? void 0 : onSlideStart(newValue);
          onSlide == null ? void 0 : onSlide(newValue);
          break;
        }
        case "keyup":
          onSlideEnd == null ? void 0 : onSlideEnd(newValue);
          break;
        default:
          break;
      }
    }
    newValue = clamp(newValue, min, max);
    setValue(newValue);
    setIsSliding(active);
    return newValue;
  };
  useDrag(dragHandler, {
    target: ref,
    enabled: !disabled
  });
  return {
    value,
    isSliding
  };
}

export {
  useTimelineDrag
};
