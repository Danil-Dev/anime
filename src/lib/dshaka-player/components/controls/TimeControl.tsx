
import styles from './controls.module.scss'
import {buildTimeString} from "@/lib/dshaka-player/utils/buildTimeString";
import {useTimeline} from "@/lib/dshaka-player/hooks/useTimeline";

export function TimeControl() {

    const {currentTime, duration} = useTimeline({
        updateInterval: 250
    })

    return(
        <div className={styles.control_time}>
            <span>{buildTimeString(currentTime, duration > 3600)}</span>
            <span> / </span>
            <span>{buildTimeString(duration, duration > 3600 )}</span>
        </div>
    )
}