import {MutableRefObject, useEffect, useRef, useState} from "react";
import {useShaka} from "@/lib/dshaka-player/components/ShakaProvider";
// @ts-ignore
import shaka from "shaka-player";
import log from "loglevel";


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

            const castProxy = new shaka.cast.CastProxy(
                video,
                _player,
                '320B2F0E',
                true
            )

            console.log('castProxy', castProxy)
            console.log(castProxy.canCast())

            // castProxy.cast().then(res => console.log)

            // @ts-ignore
            window.castProxy = castProxy

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