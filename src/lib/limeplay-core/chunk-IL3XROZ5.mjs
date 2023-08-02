import {
  useComposedRefs
} from "./chunk-VO5SLTMK.mjs";
import {
  useLimeplay
} from "./chunk-WUIGF72E.mjs";

// src/components/MediaOutlet.tsx
import React, { forwardRef, useLayoutEffect } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
var MediaOutlet = forwardRef(
  ({ children }, forwardedRef) => {
    const { playbackRef, playerRef } = useLimeplay();
    const composedRefs = useComposedRefs(forwardedRef, playbackRef);
    console.log("[ MediaOutlet ] rendered");
    useLayoutEffect(() => {
      if (React.Children.count(children) !== 1) {
        throw new Error(
          "MediaOutlet must have a single child as HTMLMediaElement"
        );
      }
      if (!React.isValidElement(children)) {
        throw new Error(
          "MediaOutlet must have a single child as HTMLMediaElement"
        );
      }
      return () => {
        playbackRef.current = null;
        playerRef.current = null;
      };
    }, [children]);
    return /* @__PURE__ */ jsx(Fragment, { children: React.cloneElement(children, {
      ref: composedRefs
    }) });
  }
);

export {
  MediaOutlet
};
