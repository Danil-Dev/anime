import "../chunk-XALKSG2U.mjs";

// src/hooks/useMove.ts
import { clamp } from "lodash";
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
  newValue = clamp(newValue, min, max);
  return newValue;
}
export {
  useSliderMove
};