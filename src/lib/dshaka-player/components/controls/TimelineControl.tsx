import {RangeSlider} from "@/lib/dshaka-player/components/RangeSlider";

import {useTimeline} from "@/lib/dshaka-player/hooks/useTimeline";
import styles from './controls.module.scss'

export function TimelineControl() {

    const {currentTime, updateCurrentTime, seekRange, buffer} = useTimeline({
        updateInterval: 250
    })


    return(
        <div className={styles.control_timeline}>
            <RangeSlider min={0} max={seekRange.end} step={0.1} loading={buffer}  value={currentTime} onChange={updateCurrentTime}/>
        </div>
    )
}