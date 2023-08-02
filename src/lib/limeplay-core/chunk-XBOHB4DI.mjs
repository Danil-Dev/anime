// src/hooks/useTimelineHover.ts
import {
  useGesture
} from "@use-gesture/react";
import { clamp } from "lodash";
import { useState } from "react";
function useTimelineHover({
  sliderHandlerConfig,
  ref,
  onSlideStart,
  onSlide,
  onSlideEnd
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [value, setValue] = useState(0);
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
    newValue = clamp(newValue, min, max);
    setValue(newValue);
    return newValue;
  };
  useGesture(
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

export {
  useTimelineHover
};