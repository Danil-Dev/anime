var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useShaka } from "@/lib/dshaka-player/components/ShakaProvider";
import { useCallback, useEffect, useState } from "react";
import screenfull from "screenfull";
import useStateRef from "react-usestateref";
export function useFullscreen() {
    const { video, container } = useShaka();
    const [isFullScreen, setIsFullScreen, isFullScreenRef] = useStateRef(false);
    const [isFullscreenSupported, setIsFullscreenSupported] = useState(false);
    function enterFullscreen() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (document.pictureInPictureElement) {
                    yield document.exitPictureInPicture();
                }
                if (screenfull.isEnabled && container) {
                    yield screenfull.request(container, {
                        navigationUI: 'hide'
                    });
                    // video.style.width = 'auto'
                }
            }
            catch (error) {
                console.log('[useFullscreen]: Error', error);
            }
        });
    }
    function exitFullscreen() {
        if (screenfull.isEnabled) {
            screenfull.exit();
        }
    }
    function toggleFullscreen() {
        if (isFullScreen) {
            exitFullscreen();
        }
        else {
            enterFullscreen();
        }
    }
    const fullscreenEventHandler = useCallback((_event) => {
        var _a;
        if (screenfull.isEnabled)
            setIsFullScreen((_a = screenfull.isFullscreen) !== null && _a !== void 0 ? _a : false);
    }, []);
    useEffect(() => {
        function checkFullScreenSupport() {
            if (screenfull.isEnabled) {
                return true;
            }
            return false;
        }
        setIsFullscreenSupported(checkFullScreenSupport());
        function checkSupport_() {
            setIsFullscreenSupported(checkFullScreenSupport());
        }
        // https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1628805-webkitsupportsfullscreen
        // On iOS, Native Video Fullscreen support can only be detected after the video has loaded.
        video.addEventListener('loadedmetadata', checkSupport_);
        video.addEventListener('loadeddata', checkSupport_);
        fullscreenEventHandler({});
        return () => {
            video.removeEventListener('loadedmetadata', checkSupport_);
            video.removeEventListener('loadeddata', checkSupport_);
        };
    }, []);
    useEffect(() => {
        if (screenfull.isEnabled) {
            screenfull.on('change', fullscreenEventHandler);
        }
        return () => {
            if (screenfull.isEnabled) {
                screenfull.off('change', fullscreenEventHandler);
            }
        };
    }, [fullscreenEventHandler]);
    return {
        isFullScreen,
        enterFullscreen,
        exitFullscreen,
        toggleFullscreen,
        isFullscreenSupported
    };
}
