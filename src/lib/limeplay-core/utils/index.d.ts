export { default as getPercentage } from './get-percentage.js';
export { default as getDuration } from './get-duration.js';
export { default as useStateRef } from './use-state-ref.js';
export { logger } from './logger.js';
import 'shaka-player';
import 'react';
import 'loglevel';

type EventMapFor<Target> = Target extends Window ? WindowEventMap : Target extends Document ? DocumentEventMap : Target extends HTMLElement ? HTMLElementEventMap : Target extends EventTarget ? {
    [key: string]: Event;
} : never;
declare const on: <T extends Window | EventTarget | Document | HTMLElement, K extends keyof EventMapFor<T> & string>(target: T, eventNames: K | K[], listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void;
declare const off: <T extends Window | EventTarget | Document | HTMLElement, K extends keyof EventMapFor<T> & string>(target: T, eventNames: K | K[], listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void;

export { off, on };
