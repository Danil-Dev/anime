import {MutableRefObject, useEffect, useRef, useState} from "react";
import {useShaka} from "@/lib/dshaka-player/components/ShakaProvider";
// @ts-ignore
import shaka from "shaka-player";


export function useShakaPlayer() {
    const {video, setPlayer, player, setVideo} = useShaka()

    const [error, setError] = useState<shaka.util.Error | null>()
    const [isLoaded, setIsLoaded] = useState<boolean>(false)



    useEffect(() => {

        shaka.polyfill.installAll()
        const errorHandler = (event: shaka.util.Error | Event) => {

            console.log('errorHandler', event)
            if (event instanceof Event) return;
            setError(event)
        }


        if (video && shaka){
            const _player = new shaka.Player(video)
            setPlayer(_player)
            _player.addEventListener('error', errorHandler)
            setIsLoaded(true)
        }

        return ()=> {
            setIsLoaded(false)
            setError(null)
            if(player){

                console.log('playerDestroy', )
                const _playerCurr = player
                _playerCurr.removeEventListener('error', errorHandler)
                _playerCurr.destroy()
                setVideo(null)
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