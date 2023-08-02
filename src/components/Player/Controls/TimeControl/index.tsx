import {useLimeplay, useTimeline} from "@/lib/limeplay-core/";
import {CurrentTime} from "@/components/Player/Controls/TimeControl/CurrentTime";
import styles from './timeControl.module.scss'
import {buildTimeString} from "@/components/Player/Controls/TimelineControl/utils";

export function TimeControl () {
    const {playerRef} = useLimeplay()
    const player = playerRef.current
    const { isLive, duration, currentTime, liveLatency } = useTimeline({
        updateInterval: 250
    })

    return(
        <div className={styles.time_control}>
            <CurrentTime isLive={isLive} player={player} duration={duration} currentTime={currentTime} liveLatency={liveLatency}/>
            <span> / </span>
            <span>{buildTimeString(duration, duration > 3600)}</span>
        </div>
    )

}

