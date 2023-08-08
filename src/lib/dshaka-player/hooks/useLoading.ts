import {useEffect, useState} from "react";
import {useShaka} from "@/lib/dshaka-player/components/ShakaProvider";


export function useLoading() {

    const [isLoading, setIsLoading] = useState(false)
    const {player} = useShaka()

    useEffect(() => {
        const loadingEventHandler = () => {
            const isBuffering = player.isBuffering()
            setIsLoading(isBuffering)
        }

        const events = ['buffering', 'loading']

        events.forEach( event => {
            player.addEventListener(event, loadingEventHandler)
        })

        return () => {
            if(player){
                events.forEach(event => {
                    player.removeEventListener(event, loadingEventHandler)
                })
            }
        }
    }, []);

    return {
        isLoading
    } as const
}