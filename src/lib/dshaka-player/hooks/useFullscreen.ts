import {useShaka} from "@/lib/dshaka-player/components/ShakaProvider";
import {useCallback, useEffect, useState} from "react";
import screenfull from "screenfull";
import useStateRef from "react-usestateref";

export function useFullscreen(){

    const {video, container} = useShaka()
    const [isFullScreen, setIsFullScreen, isFullScreenRef] = useStateRef(false);
    const [isFullscreenSupported, setIsFullscreenSupported] = useState(false)

    async function enterFullscreen() {
        try {
            if (document.pictureInPictureElement){
                await document.exitPictureInPicture()
            }

            if (screenfull.isEnabled && container){
                await screenfull.request(container, {
                    navigationUI: 'hide'
                })
                // video.style.width = 'auto'
            }

        } catch (error) {
            console.log('[useFullscreen]: Error', error)
        }
    }

    function exitFullscreen() {
        if (screenfull.isEnabled){
            screenfull.exit()
        }
    }

    function toggleFullscreen(){
        if (isFullScreen){
            exitFullscreen()
        } else {
            enterFullscreen()
        }
    }

    const fullscreenEventHandler = useCallback(
        (_event: Event) => {
            if (screenfull.isEnabled)
                setIsFullScreen(screenfull.isFullscreen ?? false)
        },
        []
    )

    useEffect(() => {
        function checkFullScreenSupport() {
            if (screenfull.isEnabled) {
                return true;
            }
            return false;
        }
        setIsFullscreenSupported(checkFullScreenSupport())

        function checkSupport_() {
            setIsFullscreenSupported(checkFullScreenSupport());
        }

        // https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1628805-webkitsupportsfullscreen
        // On iOS, Native Video Fullscreen support can only be detected after the video has loaded.
        video.addEventListener('loadedmetadata', checkSupport_);
        video.addEventListener('loadeddata', checkSupport_);

        fullscreenEventHandler({} as Event);

        return() => {
            video.removeEventListener('loadedmetadata', checkSupport_)
            video.removeEventListener('loadeddata', checkSupport_)
        }
    }, []);

    useEffect(() => {
        if (screenfull.isEnabled){
            screenfull.on('change', fullscreenEventHandler)
        }

        return () => {
            if (screenfull.isEnabled){
                screenfull.off('change', fullscreenEventHandler)
            }
        }
    }, [fullscreenEventHandler]);


    return {
        isFullScreen,
        enterFullscreen,
        exitFullscreen,
        toggleFullscreen,
        isFullscreenSupported
    }

}