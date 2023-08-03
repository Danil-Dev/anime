import {useLimeplay, usePlayback, useShakaPlayer} from "@/lib/limeplay-core/";
import {useEffect, useState} from "react";
import {ControlsOverlay} from "@/components/Player/Controls/ControlsOverlay";
import styles from './playerOutlet.module.scss'
import {PlayerLoader} from "@/components/Player/Controls/Loader";
import {usePlayerLayoutType} from "@/store/application/hooks";


export function PlayerOutlet ({url}: {url: string}) {

    const {playerRef, isLoaded, error, playbackRef} = useShakaPlayer()
    const {setPlayback, setPlayer, player, playback} = useLimeplay()
    const type = usePlayerLayoutType()

    if (error) {
        const onErrorHandler = (event: any) => {
            if (event.code && event.severity) {
                return `Shaka Player failed with an Error Code: ${event.code} :: Severity: ${event.severity}`;
            }
            return `Shaka Player failed with an Error: ${event.message}`;
        };

        console.log('[OVERLAY] : Error', onErrorHandler(error));
        // throw new Error(onErrorHandler(error));
    }

    useEffect(() => {
        console.log('[OVERLAY] : Mounting PlayerOutlet', url, playerRef, playbackRef, player, playback);
        const currentPlayer = player || playerRef.current

        // @ts-ignore
        window.player = currentPlayer
        setPlayer(currentPlayer)
        setPlayback(playback || playbackRef.current)

        console.log('[OVERLAY]: Current player', currentPlayer)
        if ((currentPlayer && currentPlayer.getLoadMode() !== 0)){
                const localConfig = {
                    abr: {enabled: true},
                    manifest: {dash: {ignoreMinBufferTime: true} },
                    streaming: {
                        useNativeHlsOnSafari: true
                    }
                }
                currentPlayer.configure(localConfig)

                console.log("[URL]", url)

                currentPlayer.load(url).then(() => {
                    console.log('[OVERLAY] : Loaded url video')

                }).catch(error => {
                    console.log('[OVERLAY]: Error', error)
                })
            // @ts-ignore
            window.player = currentPlayer
            setPlayer(currentPlayer)
            setPlayback(playback || playbackRef.current)

        }
        return () => {
            console.log('[OVERLAY] : Unmounting PlayerOutlet');
        };
    }, [isLoaded,player, playback, url, playerRef, playbackRef, setPlayer, setPlayback, type]);
    console.log('[check]', playbackRef, playerRef)

    if (!isLoaded) return <h1>Not loaded</h1>
    // if (playbackRef.current) return <>No playback</>
    // if (playerRef.current) return <h1>No Player ref</h1>



    return (
        <div className={styles.player_overlay_wrapper}>
            <PlayerLoader/>
            <ControlsOverlay/>
        </div>
    )
}