import {useLimeplay, useShakaPlayer} from "@/lib/limeplay-core/dist";
import {useEffect} from "react";
import {ControlsOverlay} from "@/components/Player/Controls/ControlsOverlay";
import styles from './playerOutlet.module.scss'

export function PlayerOutlet () {

    const {playerRef, isLoaded, error, playbackRef} = useShakaPlayer()
    const {setPlayback, setPlayer} = useLimeplay()

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
        console.log('[OVERLAY] : Mounting PlayerOutlet');
        if (playerRef.current && playerRef.current.getLoadMode() !== 0 ) {

            const localConfig = {
                abr: {enabled: true},
                manifest: {dash: {ignoreMinBufferTime: true} },
                streaming: {
                    useNativeHlsOnSafari: true
                }
            }
            playerRef.current.configure(localConfig)

            const url = 'https://customer-8a7vcp9ynbyjxc8a.cloudflarestream.com/dc0b226d30c3c6917b36958081bb3e02/manifest/video.mpd'

            playerRef.current.load(url).then(() => {
                console.log('[OVERLAY] : Loaded url video')
                // @ts-ignore
                window.player = playerRef.current
                setPlayer(playerRef.current)
                setPlayback(playbackRef.current)
            })
        }
        return () => {
            console.log('[OVERLAY] : Unmounting PlayerOutlet');
        };
    }, [isLoaded, setPlayback, setPlayer]);

    if (!isLoaded) return <h1>Not loaded</h1>
    return (
        <div className={styles.player_overlay_wrapper}>
            <ControlsOverlay/>
        </div>
    )
}