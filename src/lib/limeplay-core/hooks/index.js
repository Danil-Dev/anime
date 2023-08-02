var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// ../../node_modules/.pnpm/o9n@2.1.1/node_modules/o9n/index.js
var require_o9n = __commonJS({
  "../../node_modules/.pnpm/o9n@2.1.1/node_modules/o9n/index.js"(exports, module2) {
    "use strict";
    function getOrientation() {
      if (typeof window === "undefined")
        return void 0;
      var screen2 = window.screen;
      var orientation2;
      if (typeof window.ScreenOrientation === "function" && screen2.orientation instanceof ScreenOrientation && typeof screen2.orientation.addEventListener == "function" && screen2.orientation.onchange === null && typeof screen2.orientation.type === "string") {
        orientation2 = screen2.orientation;
      } else {
        orientation2 = createOrientation();
      }
      return orientation2;
    }
    module2.exports = {
      orientation: getOrientation(),
      getOrientation,
      install: function install() {
        var screen2 = window.screen;
        if (typeof window.ScreenOrientation === "function" && screen2.orientation instanceof ScreenOrientation) {
          return screen2.orientation;
        }
        window.screen.orientation = orientation;
        return orientation;
      }
    };
    function createOrientation() {
      var orientationMap = {
        "90": "landscape-primary",
        "-90": "landscape-secondary",
        "0": "portrait-primary",
        "180": "portrait-secondary"
      };
      function ScreenOrientation2() {
      }
      var or = new ScreenOrientation2();
      var found = findDelegate(or);
      ScreenOrientation2.prototype.addEventListener = delegate(
        "addEventListener",
        found.delegate,
        found.event
      );
      ScreenOrientation2.prototype.dispatchEvent = delegate(
        "dispatchEvent",
        found.delegate,
        found.event
      );
      ScreenOrientation2.prototype.removeEventListener = delegate(
        "removeEventListener",
        found.delegate,
        found.event
      );
      ScreenOrientation2.prototype.lock = getLock();
      ScreenOrientation2.prototype.unlock = getUnlock();
      Object.defineProperties(or, {
        onchange: {
          get: function() {
            return found.delegate["on" + found.event] || null;
          },
          set: function(cb) {
            found.delegate["on" + found.event] = wrapCallback(cb, or);
          }
        },
        type: {
          get: function() {
            var screen2 = window.screen;
            return screen2.msOrientation || screen2.mozOrientation || orientationMap[window.orientation + ""] || (getMql().matches ? "landscape-primary" : "portrait-primary");
          }
        },
        angle: {
          value: 0
        }
      });
      return or;
    }
    function delegate(fnName, delegateContext, eventName) {
      var that = this;
      return function delegated() {
        var args = Array.prototype.slice.call(arguments);
        var actualEvent = args[0].type ? args[0].type : args[0];
        if (actualEvent !== "change") {
          return;
        }
        if (args[0].type) {
          args[0] = getOrientationChangeEvent(eventName, args[0]);
        } else {
          args[0] = eventName;
        }
        var wrapped = wrapCallback(args[1], that);
        if (fnName === "addEventListener") {
          addTrackedListener(args[1], wrapped);
        }
        if (fnName === "removeEventListener") {
          removeTrackedListener(args[1]);
        }
        args[1] = wrapped;
        return delegateContext[fnName].apply(delegateContext, args);
      };
    }
    var trackedListeners = [];
    var originalListeners = [];
    function addTrackedListener(original, wrapped) {
      var idx = originalListeners.indexOf(original);
      if (idx > -1) {
        trackedListeners[idx] = wrapped;
      } else {
        originalListeners.push(original);
        trackedListeners.push(wrapped);
      }
    }
    function removeTrackedListener(original) {
      var idx = originalListeners.indexOf(original);
      if (idx > -1) {
        originalListeners.splice(idx, 1);
        trackedListeners.splice(idx, 1);
      }
    }
    function wrapCallback(cb, orientation2) {
      var idx = originalListeners.indexOf(cb);
      if (idx > -1) {
        return trackedListeners[idx];
      }
      return function wrapped(evt) {
        if (evt.target !== orientation2) {
          defineValue(evt, "target", orientation2);
        }
        if (evt.currentTarget !== orientation2) {
          defineValue(evt, "currentTarget", orientation2);
        }
        if (evt.type !== "change") {
          defineValue(evt, "type", "change");
        }
        cb(evt);
      };
    }
    function getLock() {
      var err = "lockOrientation() is not available on this device.";
      var delegateFn;
      var screen2 = window.screen;
      if (typeof screen2.msLockOrientation == "function") {
        delegateFn = screen2.msLockOrientation.bind(screen2);
      } else if (typeof screen2.mozLockOrientation == "function") {
        delegateFn = screen2.mozLockOrientation.bind(screen2);
      } else {
        delegateFn = function() {
          return false;
        };
      }
      return function lock(lockType) {
        var Promise2 = window.Promise;
        if (delegateFn(lockType)) {
          return Promise2.resolve(lockType);
        } else {
          return Promise2.reject(new Error(err));
        }
      };
    }
    function getUnlock() {
      var screen2 = window.screen;
      return screen2.orientation && screen2.orientation.unlock.bind(screen2.orientation) || screen2.msUnlockOrientation && screen2.msUnlockOrientation.bind(screen2) || screen2.mozUnlockOrientation && screen2.mozUnlockOrientation.bind(screen2) || function unlock() {
        return;
      };
    }
    function findDelegate(orientation2) {
      var events = [
        "orientationchange",
        "mozorientationchange",
        "msorientationchange"
      ];
      for (var i = 0; i < events.length; i++) {
        if (screen["on" + events[i]] === null) {
          return {
            delegate: screen,
            event: events[i]
          };
        }
      }
      if (typeof window.onorientationchange != "undefined") {
        return {
          delegate: window,
          event: "orientationchange"
        };
      }
      return {
        delegate: createOwnDelegate(orientation2),
        event: "change"
      };
    }
    function getOrientationChangeEvent(name, props) {
      var orientationChangeEvt;
      try {
        orientationChangeEvt = new Event(name, props);
      } catch (e) {
        orientationChangeEvt = { type: "change" };
      }
      return orientationChangeEvt;
    }
    function createOwnDelegate(orientation2) {
      var ownDelegate = /* @__PURE__ */ Object.create({
        addEventListener: function addEventListener(evt, cb) {
          if (!this.listeners[evt]) {
            this.listeners[evt] = [];
          }
          if (this.listeners[evt].indexOf(cb) === -1) {
            this.listeners[evt].push(cb);
          }
        },
        dispatchEvent: function dispatchEvent(evt) {
          if (!this.listeners[evt.type]) {
            return;
          }
          this.listeners[evt.type].forEach(function(fn) {
            fn(evt);
          });
          if (typeof orientation2.onchange == "function") {
            orientation2.onchange(evt);
          }
        },
        removeEventListener: function removeEventListener(evt, cb) {
          if (!this.listeners[evt]) {
            return;
          }
          var idx = this.listeners[evt].indexOf(cb);
          if (idx > -1) {
            this.listeners[evt].splice(idx, 1);
          }
        }
      });
      ownDelegate.listeners = {};
      var mql = getMql();
      if (mql && typeof mql.matches === "boolean") {
        mql.addListener(function() {
          ownDelegate.dispatchEvent(getOrientationChangeEvent("change"));
        });
      }
      return ownDelegate;
    }
    function getMql() {
      if (typeof window.matchMedia != "function") {
        return {};
      }
      return window.matchMedia("(orientation: landscape)");
    }
    function defineValue(obj, key, val) {
      Object.defineProperty(obj, key, {
        value: val
      });
    }
  }
});

// src/hooks/index.ts
var hooks_exports = {};
__export(hooks_exports, {
  languageParser: () => languageParser,
  useAudioTracks: () => useAudioTracks,
  useBufferInfo: () => useBufferInfo,
  useFullScreen: () => useFullScreen,
  useLoading: () => useLoading,
  useOrientation: () => useOrientation,
  usePiP: () => usePiP,
  usePlayback: () => usePlayback,
  useShakaPlayer: () => useShakaPlayer,
  useSliderEvents: () => useSliderEvents,
  useTextTracks: () => useTextTracks,
  useTimeline: () => useTimeline,
  useTimelineDrag: () => useTimelineDrag,
  useTimelineHover: () => useTimelineHover,
  useVideoTracks: () => useVideoTracks,
  useVolume: () => useVolume
});
module.exports = __toCommonJS(hooks_exports);

// src/hooks/useLoading.ts
var import_react3 = require("react");

// src/components/LimeplayProvider.tsx
var import_react2 = require("react");

// src/utils/get-percentage.ts
function getPercentage(time, total, PRECISION = 3) {
  return Math.round(time / total * 100 * 10 ** PRECISION) / 10 ** PRECISION;
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

// src/components/LimeplayProvider.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var LimeplayProviderContext = (0, import_react2.createContext)(null);
function useLimeplay() {
  const context = (0, import_react2.useContext)(LimeplayProviderContext);
  if (!context) {
    throw new Error(
      `useLimeplay hook must be used within a LimeplayProvider`
    );
  }
  return context;
}

// src/hooks/useLoading.ts
function useLoading() {
  const [isLoading, setIsLoading] = (0, import_react3.useState)(false);
  const { playerRef } = useLimeplay();
  const player = playerRef.current;
  (0, import_react3.useEffect)(() => {
    const loadingEventHandler = () => {
      const isBuffering = player.isBuffering();
      setIsLoading(isBuffering);
    };
    const events = ["buffering", "loading"];
    events.forEach((event) => {
      player.addEventListener(event, loadingEventHandler);
    });
    return () => {
      if (player) {
        events.forEach((event) => {
          player.removeEventListener(event, loadingEventHandler);
        });
      }
    };
  }, []);
  return {
    isLoading
  };
}

// src/hooks/useVolume.ts
var import_react4 = require("react");
var import_lodash = require("lodash");
function useVolume({
  initialVolume,
  // Do not provide default value as playback.volume will be used
  syncMuteState = true
} = {}) {
  const { playbackRef } = useLimeplay();
  const playback = playbackRef.current;
  const [volume, setVolume] = (0, import_react4.useState)(initialVolume != null ? initialVolume : playback.volume);
  const [muted, setMuted, mutedRef] = use_state_ref_default(playback.muted);
  const [lastVolume, setLastVolume, lastVolumeRef] = use_state_ref_default(initialVolume);
  const toggleMute = () => {
    playback.muted = !playback.muted;
  };
  const updateCurrentVolume = (0, import_react4.useCallback)((vol) => {
    if (playback.readyState === 0 || Number.isNaN(vol))
      return;
    vol = (0, import_lodash.clamp)(vol, 0, 1);
    playback.volume = vol;
  }, []);
  (0, import_react4.useEffect)(() => {
    const volumeEventHandler = () => {
      if (syncMuteState) {
        if (playback.muted !== mutedRef.current) {
          setMuted(playback.muted);
          if (playback.muted === true) {
            setVolume(0);
          } else {
            setVolume(lastVolumeRef.current);
          }
        } else if (playback.muted === true && playback.volume > 0) {
          playback.muted = false;
          setMuted(false);
          setVolume(playback.volume);
        } else if (playback.volume === 0) {
          playback.muted = true;
          setMuted(true);
          setVolume(playback.volume);
        } else {
          setVolume(playback.volume);
        }
      } else if (!syncMuteState) {
        if (playback.muted !== mutedRef.current) {
          setMuted(playback.muted);
          if (playback.muted === false && playback.volume === 0) {
            setVolume(lastVolumeRef.current);
          }
        } else {
          setVolume(playback.volume);
          if (playback.volume === 0) {
            setMuted(true);
          }
        }
      }
      if (playback.volume > 0) {
        setLastVolume(playback.volume);
      }
    };
    const events = ["volumechange"];
    events.forEach((event) => {
      playback.addEventListener(event, volumeEventHandler);
    });
    return () => {
      if (playback) {
        events.forEach((event) => {
          playback.removeEventListener(event, volumeEventHandler);
        });
      }
    };
  }, [syncMuteState]);
  return {
    volume,
    muted,
    lastVolume,
    toggleMute,
    updateCurrentVolume
  };
}

// src/hooks/useTimeline.ts
var import_react5 = __toESM(require("react"));
var import_clamp = __toESM(require("lodash/clamp"));
function useTimeline({
  updateInterval = 250,
  isSlidingRef = import_react5.default.createRef()
} = {}) {
  const { playbackRef, playerRef } = useLimeplay();
  const playback = playbackRef.current;
  const player = playerRef.current;
  const currentTimerId = (0, import_react5.useRef)(-1);
  const [currentTime, setCurrentTime] = (0, import_react5.useState)(0);
  const [duration, setDuration, durationRef] = use_state_ref_default(0);
  const [currentProgress, setCurrentProgress] = (0, import_react5.useState)(0);
  const [isLive, setIsLive, isLiveRef] = use_state_ref_default(false);
  const [liveLatency, setLiveLatency] = (0, import_react5.useState)(0);
  const [seekRange, setSeekRange, seekRangeRef] = use_state_ref_default({
    start: 0,
    end: 0
  });
  const updateCurrentTime = (0, import_react5.useCallback)((time) => {
    if (playback.readyState === 0 || Number.isNaN(time))
      return;
    const _seekRange = player.seekRange();
    time = (0, import_clamp.default)(time, _seekRange.start, _seekRange.end);
    playback.currentTime = time;
    setCurrentTime(time);
  }, []);
  (0, import_react5.useEffect)(() => {
    const updateSeekHandler = () => {
      clearInterval(currentTimerId.current);
      currentTimerId.current = window.setInterval(() => {
        if (playback.readyState === 0)
          return;
        const currentSeekRange = player.seekRange();
        if (player.isLive()) {
          setSeekRange(currentSeekRange);
          setCurrentTime(playback.currentTime);
          const currentDuration = currentSeekRange.end - currentSeekRange.start;
          if (durationRef.current !== currentDuration)
            setDuration(currentDuration);
          let localProgress = 100 - (currentSeekRange.end - playback.currentTime) / currentDuration * 100;
          localProgress = (0, import_clamp.default)(localProgress, 0, 100);
          if (!isSlidingRef.current)
            setCurrentProgress(localProgress);
          setLiveLatency(currentSeekRange.end - playback.currentTime);
        } else {
          if (durationRef.current !== playback.duration)
            setDuration(playback.duration);
          setSeekRange(player.seekRange());
          setCurrentTime(playback.currentTime);
          const localProgress = playback.currentTime / playback.duration * 100;
          if (!isSlidingRef.current)
            setCurrentProgress(localProgress);
        }
        if (isLiveRef.current !== player.isLive()) {
          setIsLive(player.isLive());
        }
      }, updateInterval);
    };
    const events = ["trackschanged", "manifestparsed"];
    events.forEach((event) => {
      playback.addEventListener(event, updateSeekHandler);
    });
    updateSeekHandler();
    return () => {
      if (playback) {
        events.forEach((event) => {
          playback.removeEventListener(event, updateSeekHandler);
        });
      }
      clearInterval(currentTimerId.current);
    };
  }, [updateInterval]);
  return {
    currentTime,
    duration,
    currentProgress,
    seekRange,
    isLive,
    liveLatency,
    updateCurrentTime
  };
}

// src/hooks/useTimelineDrag.ts
var import_react6 = require("@use-gesture/react");
var import_lodash2 = require("lodash");
var import_react7 = require("react");
function useTimelineDrag({
  sliderHandlerConfig,
  ref,
  onSlideStart,
  onSlide,
  onSlideEnd,
  initialValue = 0
}) {
  const [isSliding, setIsSliding] = (0, import_react7.useState)(false);
  const [value, setValue] = (0, import_react7.useState)(initialValue);
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
      orientation: o9n2 = "horizontal",
      dir = "ltr",
      inverted = false
    } = sliderHandlerConfig;
    const { height, width, top, left } = ref.current.getBoundingClientRect();
    let newValue = value;
    if (event instanceof PointerEvent) {
      const clientPosition = o9n2 === "vertical" ? oy : ox;
      const sliderSize = o9n2 === "vertical" ? height : width;
      const sliderPosition = o9n2 === "vertical" ? top : left;
      const relativePosition = clientPosition - sliderPosition;
      const percentage = relativePosition / sliderSize;
      newValue = percentage * (max - min) + min;
      if (inverted || dir === "rtl" && o9n2 === "horizontal")
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
      const isInverted = inverted || dir === "rtl" && o9n2 === "horizontal";
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
    newValue = (0, import_lodash2.clamp)(newValue, min, max);
    setValue(newValue);
    setIsSliding(active);
    return newValue;
  };
  (0, import_react6.useDrag)(dragHandler, {
    target: ref,
    enabled: !disabled
  });
  return {
    value,
    isSliding
  };
}

// src/hooks/useTimelineHover.ts
var import_react8 = require("@use-gesture/react");
var import_lodash3 = require("lodash");
var import_react9 = require("react");
function useTimelineHover({
  sliderHandlerConfig,
  ref,
  onSlideStart,
  onSlide,
  onSlideEnd
}) {
  const [isHovering, setIsHovering] = (0, import_react9.useState)(false);
  const [isMoving, setIsMoving] = (0, import_react9.useState)(false);
  const [value, setValue] = (0, import_react9.useState)(0);
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
      orientation: o9n2 = "horizontal",
      dir = "ltr",
      inverted = false
    } = sliderHandlerConfig;
    setIsHovering(active);
    const { height, width, top, left } = ref.current.getBoundingClientRect();
    let newValue = value;
    if (event instanceof PointerEvent) {
      const clientPosition = o9n2 === "vertical" ? oy : ox;
      const sliderSize = o9n2 === "vertical" ? height : width;
      const sliderPosition = o9n2 === "vertical" ? top : left;
      const relativePosition = clientPosition - sliderPosition;
      const percentage = relativePosition / sliderSize;
      newValue = percentage * (max - min) + min;
      if (inverted || dir === "rtl" && o9n2 === "horizontal")
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
    newValue = (0, import_lodash3.clamp)(newValue, min, max);
    setValue(newValue);
    return newValue;
  };
  (0, import_react8.useGesture)(
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

// src/hooks/useSliderEvents.ts
var import_react10 = require("@use-gesture/react");
var import_lodash4 = require("lodash");
var import_react11 = require("react");
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
  const [isSliding, setIsSliding] = (0, import_react11.useState)(false);
  const [isHovering, setIsHovering] = (0, import_react11.useState)(false);
  const [isInside, setIsInside] = (0, import_react11.useState)(false);
  const [isKeying, setIsKeying] = (0, import_react11.useState)(false);
  const [value, setValue] = (0, import_react11.useState)(initialValue);
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
      orientation: o9n2 = "horizontal",
      dir = "ltr",
      inverted = false
    } = sliderHandlerConfig;
    const { height, width, top, left } = ref.current.getBoundingClientRect();
    let newValue = value;
    if (event instanceof PointerEvent) {
      const clientPosition = o9n2 === "vertical" ? oy : ox;
      const sliderSize = o9n2 === "vertical" ? height : width;
      const sliderPosition = o9n2 === "vertical" ? top : left;
      const relativePosition = clientPosition - sliderPosition;
      const percentage = relativePosition / sliderSize;
      newValue = percentage * (max - min) + min;
      if (inverted || dir === "rtl" && o9n2 === "horizontal")
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
      const isInverted = inverted || dir === "rtl" && o9n2 === "horizontal";
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
    newValue = (0, import_lodash4.clamp)(newValue, min, max);
    setValue(newValue);
    setIsSliding(active);
    return newValue;
  };
  const hoverHandler = (0, import_react11.useCallback)(
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
  (0, import_react10.useGesture)(
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

// src/hooks/usePiP.ts
var import_react12 = require("react");
function usePiP({
  onError,
  onExit,
  onEnter,
  onChange,
  onResize
} = {}) {
  const { playbackRef, playerRef } = useLimeplay();
  const playback = playbackRef.current;
  const player = playerRef.current;
  const [isPiPActive, setIsPiPActive, isPiPActiveRef] = use_state_ref_default(false);
  const [isPiPSupported, setIsPiPSupported] = (0, import_react12.useState)(false);
  const [isPiPAllowed, setIsPiPAllowed] = (0, import_react12.useState)(false);
  const [pipWindow, setPipWindow] = (0, import_react12.useState)(
    null
  );
  const pipError = (error) => {
    if (onError && typeof onError === "function") {
      onError(error);
    }
  };
  const togglePiP = async () => {
    if (!document.pictureInPictureElement) {
      playback.requestPictureInPicture().then((_pipWindow) => {
        setPipWindow(_pipWindow);
        if (onEnter && typeof onEnter === "function") {
          onEnter();
        }
        _pipWindow.addEventListener("resize", (event) => {
          if (onResize && typeof onResize === "function") {
            onResize(event);
          }
        });
      }).catch(pipError);
    } else {
      document.exitPictureInPicture().then(() => {
        setPipWindow(null);
        if (onExit && typeof onExit === "function") {
          onExit();
        }
      }).catch(pipError);
    }
  };
  (0, import_react12.useEffect)(() => {
    if (!document.pictureInPictureEnabled) {
      setIsPiPSupported(false);
      return void 0;
    }
    if (!playback.disablePictureInPicture) {
      setIsPiPAllowed(true);
    }
    setIsPiPSupported(true);
    if (document.pictureInPictureElement) {
      if (document.pictureInPictureElement !== playback) {
        document.exitPictureInPicture();
      } else {
        setIsPiPActive(true);
      }
    }
    const pipEventHandler = (_event) => {
      if (document.pictureInPictureElement) {
        setIsPiPActive(true);
      } else {
        setIsPiPActive(false);
      }
      if (onChange && typeof onChange === "function") {
        onChange(_event);
      }
    };
    const trackChangeHandler = async () => {
      if (player.isAudioOnly() && isPiPActiveRef.current) {
        await togglePiP();
      }
    };
    const events = ["enterpictureinpicture", "leavepictureinpicture"];
    events.forEach((event) => {
      playback.addEventListener(event, pipEventHandler);
    });
    if (player) {
      player.addEventListener("trackschanged", trackChangeHandler);
    }
    return () => {
      if (playback) {
        events.forEach((event) => {
          playback.removeEventListener(event, pipEventHandler);
        });
      }
      if (player) {
        player.removeEventListener("trackschanged", trackChangeHandler);
      }
    };
  }, [onChange, onResize]);
  return {
    isPiPActive,
    isPiPSupported,
    isPiPAllowed,
    pipWindow,
    togglePiP
  };
}

// src/hooks/useVideoTracks.ts
var import_react13 = require("react");
function useVideoTracks({
  clearBufferOnChange = "auto",
  safeMargin = 0
}) {
  const { playerRef } = useLimeplay();
  const player = playerRef.current;
  const loadMode = (0, import_react13.useRef)(player == null ? void 0 : player.getLoadMode());
  const [tracks, setTracks] = (0, import_react13.useState)([]);
  const [selectedTrack, setSelectedTrack, selectedTrackRef] = use_state_ref_default(null);
  const [isAuto, setIsAuto, isAutoRef] = use_state_ref_default(false);
  const previousTrack = (0, import_react13.useRef)(null);
  function setAutoMode() {
    const config = {
      abr: {
        enabled: true
      }
    };
    player.configure(config);
    setIsAuto(true);
  }
  const selectTrack = (0, import_react13.useCallback)(
    (track) => {
      const config = {
        abr: {
          enabled: false
        }
      };
      player.configure(config);
      setIsAuto(false);
      if (clearBufferOnChange === "auto" && previousTrack.current && selectedTrackRef.current) {
        if (previousTrack.current.bandwidth < selectedTrackRef.current.bandwidth) {
          player.selectVariantTrack(track, true, safeMargin);
        } else {
          player.selectVariantTrack(track, false, safeMargin);
        }
      } else {
        player.selectVariantTrack(
          track,
          Boolean(clearBufferOnChange),
          safeMargin
        );
      }
    },
    [clearBufferOnChange, safeMargin, setIsAuto]
  );
  const updateQualityHandler = (0, import_react13.useCallback)(() => {
    const currConfig = player.getConfiguration();
    let currTracks = player.getVariantTracks();
    const currSelectedTrack = currTracks.find((track) => track.active);
    if (currConfig.abr.enabled !== isAutoRef.current) {
      setIsAuto(currConfig.abr.enabled);
    }
    if (currSelectedTrack) {
      currTracks = currTracks.filter(
        (track) => track.language === currSelectedTrack.language && track.channelsCount === currSelectedTrack.channelsCount
      );
    }
    currTracks = currTracks.filter((track, idx) => {
      const otherIdx = player.isAudioOnly() ? currTracks.findIndex((t) => t.bandwidth === track.bandwidth) : currTracks.findIndex((t) => t.height === track.height);
      return otherIdx === idx;
    });
    if (player.isAudioOnly()) {
      currTracks.sort((a, b) => a.bandwidth - b.bandwidth);
    } else {
      currTracks.sort((a, b) => a.height - b.height);
    }
    setSelectedTrack((prevTrack) => {
      previousTrack.current = prevTrack;
      return currSelectedTrack || null;
    });
    setTracks(currTracks);
  }, []);
  (0, import_react13.useEffect)(() => {
    if (player) {
      const _config = player.getConfiguration();
      updateQualityHandler();
      setIsAuto(_config.abr.enabled);
    }
  }, [updateQualityHandler, loadMode.current, setIsAuto]);
  (0, import_react13.useEffect)(() => {
    const events = [
      "variantchanged",
      "abrstatuschanged",
      "trackschanged",
      "adaptation"
    ];
    events.forEach((event) => {
      player.addEventListener(event, updateQualityHandler);
    });
    return () => {
      if (player) {
        events.forEach((event) => {
          player.removeEventListener(event, updateQualityHandler);
        });
      }
    };
  }, [updateQualityHandler]);
  return {
    tracks,
    selectedTrack,
    isAuto,
    selectTrack,
    setAutoMode
  };
}

// src/hooks/useAudioTracks.ts
var import_react14 = require("react");
function languageParser(locale) {
  switch (locale) {
    case "mul":
      return "Multiple Languages";
    case "und":
      return "Default";
    case "zxx":
      return "Not applicable";
    default:
      break;
  }
  if (window.Intl && "DisplayNames" in Intl) {
    const userLanguage = navigator.language;
    try {
      const languageNames = new Intl.DisplayNames([userLanguage], {
        type: "language"
      });
      const language2 = languageNames.of(locale);
      return language2.charAt(0).toUpperCase() + language2.slice(1);
    } catch (e) {
      return `Unrecognized (${locale})`;
    }
  }
  const language = shaka.util.LanguageUtils.getBase(locale);
  return `Unrecognized (${locale})`;
}
function useAudioTracks() {
  const { playerRef } = useLimeplay();
  const player = playerRef.current;
  const [tracks, setTracks] = (0, import_react14.useState)([]);
  const [selectedTrack, setSelectedTrack, selectedTrackRef] = use_state_ref_default(null);
  const previousTrack = (0, import_react14.useRef)(null);
  const selectTrack = (0, import_react14.useCallback)(
    (track, role, channelsCount) => {
      role = role != null ? role : track.roles[0];
      channelsCount = channelsCount != null ? channelsCount : track.channels[0];
      player.selectAudioLanguage(track.language, role, channelsCount);
    },
    []
  );
  const updateQualityHandler = (0, import_react14.useCallback)(() => {
    const currTracks = player.getVariantTracks();
    let currSelectedTrack = null;
    const uniqueTracks = /* @__PURE__ */ new Set();
    const audioTracks = [];
    currTracks.forEach((track) => {
      if (!uniqueTracks.has(track.language)) {
        uniqueTracks.add(track.language);
        audioTracks.push({
          track,
          display: languageParser(track.language),
          roles: new Set(track.roles),
          channels: /* @__PURE__ */ new Set([track.channelsCount]),
          language: track.language
        });
      } else {
        const existingTrack = audioTracks.find(
          (audioTrack) => audioTrack.language === track.language
        );
        track.roles.forEach((role) => existingTrack.roles.add(role));
        existingTrack.channels.add(track.channelsCount);
      }
    });
    currTracks.forEach((track) => {
      if (track.active) {
        currSelectedTrack = audioTracks.find(
          (audioTrack) => audioTrack.language === track.language
        );
      }
    });
    setSelectedTrack((prevTrack) => {
      previousTrack.current = prevTrack;
      return currSelectedTrack != null ? currSelectedTrack : null;
    });
    setTracks(audioTracks);
  }, []);
  (0, import_react14.useEffect)(() => {
    const events = [
      "variantchanged",
      "abrstatuschanged",
      "trackschanged",
      "adaptation"
    ];
    events.forEach((event) => {
      player.addEventListener(event, updateQualityHandler);
    });
    return () => {
      if (player) {
        events.forEach((event) => {
          player.removeEventListener(event, updateQualityHandler);
        });
      }
    };
  }, [updateQualityHandler]);
  return {
    tracks,
    selectedTrack,
    selectTrack
  };
}

// src/hooks/useBufferInfo.ts
var import_react15 = require("react");
function useBufferInfo({ updateInterval = 1e3 } = {}) {
  const [bufferInfo, setBufferInfo] = (0, import_react15.useState)([]);
  const currentTimerId = (0, import_react15.useRef)(-1);
  const { playbackRef, playerRef } = useLimeplay();
  const player = playerRef.current;
  const playback = playbackRef.current;
  (0, import_react15.useEffect)(() => {
    const updateSeekHandler = () => {
      clearInterval(currentTimerId.current);
      currentTimerId.current = window.setInterval(() => {
        const [buffer] = player.getBufferedInfo().total;
        const seekRange = player.seekRange();
        const seekRangeSize = seekRange.end - seekRange.start;
        if (player.getBufferFullness() && buffer) {
          const clampedBufferStart = Math.max(
            buffer.start,
            seekRange.start
          );
          const clampedBufferEnd = Math.min(
            buffer.end,
            seekRange.end
          );
          const bufferStartDistance = clampedBufferStart - seekRange.start;
          const bufferEndDistance = clampedBufferEnd - seekRange.start;
          const bufferWidth = getPercentage(
            bufferEndDistance - bufferStartDistance,
            seekRangeSize
          );
          const bufferStartPosition = getPercentage(
            bufferStartDistance,
            seekRangeSize
          );
          setBufferInfo([
            {
              start: bufferStartDistance,
              end: bufferEndDistance,
              width: bufferWidth,
              startPosition: bufferStartPosition
            }
          ]);
        }
      }, updateInterval);
    };
    const events = ["trackschanged", "manifestparsed"];
    events.forEach((event) => {
      playback.addEventListener(event, updateSeekHandler);
    });
    updateSeekHandler();
    return () => {
      if (playback) {
        events.forEach((event) => {
          playback.removeEventListener(event, updateSeekHandler);
        });
      }
      clearInterval(currentTimerId.current);
    };
  }, [updateInterval]);
  return {
    bufferInfo
  };
}

// src/hooks/useFullScreen.ts
var import_react16 = require("react");

// ../../node_modules/.pnpm/screenfull@6.0.2/node_modules/screenfull/index.js
var methodMap = [
  [
    "requestFullscreen",
    "exitFullscreen",
    "fullscreenElement",
    "fullscreenEnabled",
    "fullscreenchange",
    "fullscreenerror"
  ],
  // New WebKit
  [
    "webkitRequestFullscreen",
    "webkitExitFullscreen",
    "webkitFullscreenElement",
    "webkitFullscreenEnabled",
    "webkitfullscreenchange",
    "webkitfullscreenerror"
  ],
  // Old WebKit
  [
    "webkitRequestFullScreen",
    "webkitCancelFullScreen",
    "webkitCurrentFullScreenElement",
    "webkitCancelFullScreen",
    "webkitfullscreenchange",
    "webkitfullscreenerror"
  ],
  [
    "mozRequestFullScreen",
    "mozCancelFullScreen",
    "mozFullScreenElement",
    "mozFullScreenEnabled",
    "mozfullscreenchange",
    "mozfullscreenerror"
  ],
  [
    "msRequestFullscreen",
    "msExitFullscreen",
    "msFullscreenElement",
    "msFullscreenEnabled",
    "MSFullscreenChange",
    "MSFullscreenError"
  ]
];
var nativeAPI = (() => {
  if (typeof document === "undefined") {
    return false;
  }
  const unprefixedMethods = methodMap[0];
  const returnValue = {};
  for (const methodList of methodMap) {
    const exitFullscreenMethod = methodList == null ? void 0 : methodList[1];
    if (exitFullscreenMethod in document) {
      for (const [index, method] of methodList.entries()) {
        returnValue[unprefixedMethods[index]] = method;
      }
      return returnValue;
    }
  }
  return false;
})();
var eventNameMap = {
  change: nativeAPI.fullscreenchange,
  error: nativeAPI.fullscreenerror
};
var screenfull = {
  // eslint-disable-next-line default-param-last
  request(element = document.documentElement, options) {
    return new Promise((resolve, reject) => {
      const onFullScreenEntered = () => {
        screenfull.off("change", onFullScreenEntered);
        resolve();
      };
      screenfull.on("change", onFullScreenEntered);
      const returnPromise = element[nativeAPI.requestFullscreen](options);
      if (returnPromise instanceof Promise) {
        returnPromise.then(onFullScreenEntered).catch(reject);
      }
    });
  },
  exit() {
    return new Promise((resolve, reject) => {
      if (!screenfull.isFullscreen) {
        resolve();
        return;
      }
      const onFullScreenExit = () => {
        screenfull.off("change", onFullScreenExit);
        resolve();
      };
      screenfull.on("change", onFullScreenExit);
      const returnPromise = document[nativeAPI.exitFullscreen]();
      if (returnPromise instanceof Promise) {
        returnPromise.then(onFullScreenExit).catch(reject);
      }
    });
  },
  toggle(element, options) {
    return screenfull.isFullscreen ? screenfull.exit() : screenfull.request(element, options);
  },
  onchange(callback) {
    screenfull.on("change", callback);
  },
  onerror(callback) {
    screenfull.on("error", callback);
  },
  on(event, callback) {
    const eventName = eventNameMap[event];
    if (eventName) {
      document.addEventListener(eventName, callback, false);
    }
  },
  off(event, callback) {
    const eventName = eventNameMap[event];
    if (eventName) {
      document.removeEventListener(eventName, callback, false);
    }
  },
  raw: nativeAPI
};
Object.defineProperties(screenfull, {
  isFullscreen: {
    get: () => Boolean(document[nativeAPI.fullscreenElement])
  },
  element: {
    enumerable: true,
    get: () => {
      var _a;
      return (_a = document[nativeAPI.fullscreenElement]) != null ? _a : void 0;
    }
  },
  isEnabled: {
    enumerable: true,
    // Coerce to boolean in case of old WebKit.
    get: () => Boolean(document[nativeAPI.fullscreenEnabled])
  }
});
if (!nativeAPI) {
  screenfull = { isEnabled: false };
}
var screenfull_default = screenfull;

// src/hooks/useFullScreen.ts
function useFullScreen({
  elementRef,
  onError,
  onExit,
  onEnter,
  onChange
} = {}) {
  const { playbackRef } = useLimeplay();
  const playback = playbackRef.current;
  const [isFullScreen, setIsFullScreen, isFullScreenRef] = use_state_ref_default(false);
  const [isFullScreenSupported, setIsFullScreenSupported] = (0, import_react16.useState)(false);
  async function enterFullScreen() {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      }
      if (screenfull_default.isEnabled) {
        await screenfull_default.request(elementRef.current, {
          navigationUI: "hide"
        });
      } else if (playback && playback.webkitSupportsFullscreen) {
        playback.webkitEnterFullscreen();
      }
      if (onEnter && typeof onEnter === "function") {
        onEnter();
      }
    } catch (error) {
      if (onError && typeof onError === "function") {
        onError(error);
      }
    }
  }
  function exitFullScreen() {
    if (screenfull_default.isEnabled) {
      screenfull_default.exit();
    } else if (playback && playback.webkitSupportsFullscreen) {
      playback.webkitExitFullscreen();
    }
    if (onExit && typeof onExit === "function") {
      onExit();
    }
  }
  function toggleFullScreen() {
    if (isFullScreenRef.current) {
      exitFullScreen();
    } else {
      enterFullScreen();
    }
  }
  const fullscreenEventHandler = (0, import_react16.useCallback)(
    (_event) => {
      var _a;
      if (screenfull_default.isEnabled) {
        setIsFullScreen((_a = screenfull_default.isFullscreen) != null ? _a : false);
      } else if (playback && playback.webkitSupportsFullscreen) {
        setIsFullScreen(playback.webkitDisplayingFullscreen);
      }
      if (onChange && typeof onChange === "function") {
        onChange(_event);
      }
    },
    [onChange]
  );
  (0, import_react16.useEffect)(() => {
    function checkFullScreenSupport() {
      if (screenfull_default.isEnabled) {
        return true;
      }
      if (playback && playback.webkitSupportsFullscreen) {
        return true;
      }
      return false;
    }
    setIsFullScreenSupported(checkFullScreenSupport());
    function checkSupport_() {
      setIsFullScreenSupported(checkFullScreenSupport());
    }
    playback.addEventListener("loadedmetadata", checkSupport_);
    playback.addEventListener("loadeddata", checkSupport_);
    fullscreenEventHandler({});
    return () => {
      playback.removeEventListener("loadedmetadata", checkSupport_);
      playback.removeEventListener("loadeddata", checkSupport_);
    };
  }, []);
  (0, import_react16.useEffect)(() => {
    if (screenfull_default.isEnabled) {
      screenfull_default.on("change", fullscreenEventHandler);
      if (onError && typeof onError === "function") {
        screenfull_default.on("error", onError);
      }
    }
    if (playback && playback.webkitSupportsFullscreen) {
      playback.addEventListener(
        "webkitfullscreenchange",
        fullscreenEventHandler
      );
    }
    return () => {
      if (screenfull_default.isEnabled) {
        screenfull_default.off("change", fullscreenEventHandler);
        if (onError && typeof onError === "function") {
          screenfull_default.off("error", onError);
        }
      }
      if (playback && playback.webkitSupportsFullscreen) {
        playback.removeEventListener(
          "webkitfullscreenchange",
          fullscreenEventHandler
        );
      }
    };
  }, [onError, onChange, fullscreenEventHandler]);
  return {
    isFullScreen,
    enterFullScreen,
    exitFullScreen,
    toggleFullScreen,
    isFullScreenSupported,
    api: screenfull_default
  };
}

// src/hooks/useOrientation.ts
var import_react17 = require("react");
var import_o9n = __toESM(require_o9n());
function useOrientation({
  onError,
  onLock,
  onUnlock,
  onChange
} = {}) {
  const [orientation2, setOrientation] = (0, import_react17.useState)(
    import_o9n.default.orientation
  );
  const orientationError = (error) => {
    if (onError && typeof onError === "function") {
      onError(error);
    }
  };
  const lockOrientation = (type) => {
    import_o9n.default.orientation.lock(type).then(() => {
      if (onLock && typeof onLock === "function") {
        onLock();
      }
    }).catch(orientationError);
  };
  const unlockOrientation = () => {
    import_o9n.default.orientation.unlock();
    if (onUnlock && typeof onUnlock === "function") {
      onUnlock();
    }
  };
  const toggleOrientation = () => {
    if (import_o9n.default.orientation.angle === 0 || import_o9n.default.orientation.angle === 180) {
      lockOrientation("landscape");
    } else {
      lockOrientation("portrait");
    }
  };
  (0, import_react17.useEffect)(() => {
    const orientationEventHandler = (_event) => {
      setOrientation(import_o9n.default.orientation);
      if (onChange && typeof onChange === "function") {
        onChange(_event);
      }
    };
    import_o9n.default.orientation.addEventListener("change", orientationEventHandler);
    return () => {
      import_o9n.default.orientation.removeEventListener(
        "change",
        orientationEventHandler
      );
    };
  }, [onChange]);
  return {
    orientation: orientation2,
    lockOrientation,
    unlockOrientation,
    toggleOrientation,
    api: import_o9n.default.orientation
  };
}

// src/hooks/useShakaPlayer.ts
var import_react18 = require("react");
var import_shaka_player = __toESM(require("shaka-player"));
function useShakaPlayer() {
  const { playbackRef, playerRef } = useLimeplay();
  const [error, setError] = (0, import_react18.useState)(null);
  const [isLoaded, setIsLoaded] = (0, import_react18.useState)(false);
  (0, import_react18.useEffect)(() => {
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

// src/hooks/usePlayback.ts
var import_react19 = require("react");
function usePlayback() {
  const [isPlaying, setIsPlaying] = (0, import_react19.useState)(false);
  const { playbackRef } = useLimeplay();
  const playback = playbackRef.current;
  const [isEnded, setIsEnded] = (0, import_react19.useState)(false);
  const [isRepeat, setIsRepeat] = (0, import_react19.useState)(false);
  const togglePlayback = () => {
    if (!playback.duration)
      return;
    if (playback.paused)
      playback.play();
    else
      playback.pause();
  };
  (0, import_react19.useEffect)(() => {
    const playbackEventHandler = () => setIsPlaying(!playback.paused);
    const events = ["play", "pause", "waiting", "seeking", "seeked"];
    events.forEach((event) => {
      playback.addEventListener(event, playbackEventHandler);
    });
    playbackEventHandler();
    return () => {
      if (playback) {
        events.forEach((event) => {
          playback.removeEventListener(event, playbackEventHandler);
        });
      }
    };
  }, []);
  return {
    isPlaying,
    togglePlayback
  };
}

// src/hooks/useTextTracks.ts
var import_react20 = require("react");
function useTextTracks() {
  const { playerRef, playbackRef } = useLimeplay();
  const player = playerRef.current;
  const [tracks, setTracks] = (0, import_react20.useState)([]);
  const [selectedTrack, setSelectedTrack, selectedTrackRef] = use_state_ref_default(null);
  const previousTrack = (0, import_react20.useRef)(null);
  const [isVisible, setIsVisible] = (0, import_react20.useState)(false);
  const selectTrack = (0, import_react20.useCallback)((track) => {
    player.selectTextTrack(track.track);
    player.setTextTrackVisibility(true);
  }, []);
  const toggleVisibility = () => {
    player.setTextTrackVisibility(!isVisible);
  };
  const trackHandler = () => {
    console.log("trackHandler");
    const currTracks = player.getTextTracks();
    let currSelectedTrack = null;
    const uniqueTracks = /* @__PURE__ */ new Set();
    const subtitleTracks = [];
    currTracks.forEach((track) => {
      if (!uniqueTracks.has(track.language)) {
        uniqueTracks.add(track.language);
        subtitleTracks.push({
          track,
          display: languageParser(track.language),
          roles: new Set(track.roles),
          language: track.language
        });
      } else {
        const existingTrack = subtitleTracks.find(
          (audioTrack) => audioTrack.language === track.language
        );
        track.roles.forEach((role) => existingTrack.roles.add(role));
      }
    });
    currTracks.forEach((track) => {
      if (track.active) {
        currSelectedTrack = subtitleTracks.find(
          (audioTrack) => audioTrack.language === track.language
        );
      }
    });
    setSelectedTrack((prevTrack) => {
      previousTrack.current = prevTrack;
      return currSelectedTrack != null ? currSelectedTrack : null;
    });
    setTracks(subtitleTracks);
    setIsVisible(player.isTextTrackVisible());
  };
  (0, import_react20.useEffect)(() => {
    const events = ["texttrackvisibility", "textchanged", "trackschanged"];
    events.forEach((event) => {
      player.addEventListener(event, trackHandler);
    });
    return () => {
      if (player) {
        events.forEach((event) => {
          player.removeEventListener(event, trackHandler);
        });
      }
    };
  }, [trackHandler]);
  return {
    tracks,
    selectedTrack,
    isVisible,
    selectTrack,
    toggleVisibility
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  languageParser,
  useAudioTracks,
  useBufferInfo,
  useFullScreen,
  useLoading,
  useOrientation,
  usePiP,
  usePlayback,
  useShakaPlayer,
  useSliderEvents,
  useTextTracks,
  useTimeline,
  useTimelineDrag,
  useTimelineHover,
  useVideoTracks,
  useVolume
});