'use client'
import {IEpisodeData} from "@/services/Anime";
import styles from './player.module.scss'
import {usePlayerLayoutType, useTogglePlayerLayout} from "@/store/application/hooks";
import {PlayerLayoutType} from "@/store/application/reducer";
import {LimeplayProvider, MediaOutlet, useLimeplay} from "@/lib/limeplay-core/";
import {ErrorBoundary} from "@sentry/nextjs";
import {ErrorPlayer} from "@/components/Player/Controls/ErrorPlayer";
import {PlayerOutlet} from "@/components/Player/Controls/PlayerOutlet";

enum SetupsModal {
    NONE,
    ALL,
    QUALITY,
    SPEED

}

export const VideoPlayer = ({episode}: { episode: IEpisodeData }) => {

    const layout = usePlayerLayoutType()
    const togglePlayerLayout = useTogglePlayerLayout()

    // const {playerRef, playbackRef} = useLimeplay()

    // console.log('Check', playbackRef, playerRef)


    return (


            <div id={'limeplay-player'} className={ styles.player}>
                <LimeplayProvider>
                    <ErrorBoundary fallback={ErrorPlayer}>

                        <PlayerOutlet url={episode.video}/>
                        <MediaOutlet>
                            <video controls={false} className={styles.player_video_wrapper} ></video>
                        </MediaOutlet>
                    </ErrorBoundary>
                </LimeplayProvider>
            </div>




    )
}


