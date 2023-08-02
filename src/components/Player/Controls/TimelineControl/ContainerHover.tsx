import {RefObject} from "react";
import {OnSliderHandlerProps} from "@/components/Player/Controls/TimelineControl/index";
import {useTimelineHover} from "@/lib/limeplay-core/dist";
import styles from './timelineControl.module.scss'

export function ContainerHover({
    sliderRef,
    sliderConfig
}: {
    sliderRef: RefObject<HTMLDivElement>;
    sliderConfig: OnSliderHandlerProps;
}) {

    const {isHovering, value} = useTimelineHover({
        ref: sliderRef,
        sliderHandlerConfig: sliderConfig
    })

    if (isHovering) return null

    return(
        <div
            style={{
                position: 'absolute',
                top: '25%',
                left: `${(value / sliderConfig.max) * 100}%`,
            }}
        >
            {/*<div className={styles.timeline_slider_vertical_bar_hover}/>*/}
            <div className={styles.timeline_slider_vertical_bar_duration_hover}></div>

        </div>
    )
}