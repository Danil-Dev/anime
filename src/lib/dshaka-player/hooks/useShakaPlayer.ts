import {MutableRefObject, useEffect, useRef, useState} from "react";
import {useShaka} from "@/lib/dshaka-player/components/ShakaProvider";
// @ts-ignore
import shaka from "shaka-player";


export function useShakaPlayer() {
    const {video, setPlayer, player} = useShaka()

    const [error, setError] = useState<shaka.util.Error | null>()
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    console.log('[ShakaPlayerHook]: Hooked', video)

    useEffect(() => {

        console.log('[ShakaPlayerHook]: Mounting with props', video)

        const errorHandler = (event: shaka.util.Error | Event) => {
            console.log('[ShakaPlayerHook]: Error', event)
            if (event instanceof Event) return;
            setError(event)
        }

        if (video){
            console.log('[ShakaPlayerHook]: VideoElement found, start create Player')
            const _player = new shaka.Player(video)
            console.log('[ShakaPlayerHook]: Player created', _player)
            setPlayer(_player)
            _player.addEventListener('error', errorHandler)
            setIsLoaded(true)
        }

        return ()=> {
            console.log('[ShakaPlayerHook]: Unmount', video, player)
            setIsLoaded(false)
            setError(null)
            if(player){
                player.destroy()
                setPlayer(null)
            }
        }

    }, [video]);


    return {
        error,
        isLoaded,
        player,
        video
    }
}