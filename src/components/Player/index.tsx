'use client'
import {IEpisodeData} from "@/services/Anime";
import styles from './player.module.scss'
import {usePlayerLayoutType, useTogglePlayerLayout} from "@/store/application/hooks";
import {PlayerLayoutType} from "@/store/application/reducer";
import {LimeplayProvider, MediaOutlet} from "@/lib/limeplay-core/dist";
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





    function formatDuration(duration : number) {

        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return hours > 0
            ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
            : `${formattedMinutes}:${formattedSeconds}`;
    }

    return (
        <div className={layout === PlayerLayoutType.NORMAl ? styles.player : styles.player_wide} >
            {/*<h1>{episode.title}</h1>*/}
            <div id={'limeplay-player'}>
                <LimeplayProvider>
                    <ErrorBoundary fallback={ErrorPlayer}>
                        <PlayerOutlet/>
                        <MediaOutlet>
                            <video controls={false} className={styles.player_video_wrapper} ></video>
                        </MediaOutlet>
                    </ErrorBoundary>
                </LimeplayProvider>
            </div>

        </div>


    )
}