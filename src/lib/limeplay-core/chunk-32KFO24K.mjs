// src/utils/index.ts
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

export {
  on,
  off
};