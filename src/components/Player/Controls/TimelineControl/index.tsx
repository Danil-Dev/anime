import {useRef} from "react";
import {useLimeplay, useSliderEvents, useTimeline} from "@/lib/limeplay-core/";
import styles from './timelineControl.module.scss'
import {CurrentTime} from "@/components/Player/Controls/TimeControl/CurrentTime";
import * as Slider from '@radix-ui/react-slider';
import {ContainerHover} from "@/components/Player/Controls/TimelineControl/ContainerHover";
import {buildTimeString} from "@/components/Player/Controls/TimelineControl/utils";
export type OnSliderHandlerProps = {
    min: number;
    max: number;
    step: number;
    orientation: React.AriaAttributes['aria-orientation'];
    disabled: boolean;
    dir: 'ltr' | 'rtl';
    inverted: boolean;
    skipSize?: number;
};

export function TimelineControl({isHidden}: {isHidden: boolean}) {

    const elementRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)


    const {
        seekRange,
        currentTime,
        updateCurrentTime,
    } = useTimeline({
        updateInterval: 250,
    });


    const config: OnSliderHandlerProps = {
        min: seekRange.start,
        max: seekRange.end,
        step: 1,
        orientation: 'horizontal',
        disabled: false,
        dir: 'ltr',
        inverted: false
    }

    const {isSliding, value} = useSliderEvents({
        sliderHandlerConfig: config,
        onDragEnd: updateCurrentTime,
        ref: elementRef
    })

    return (
        <div className={!isHidden ? styles.timeline_wrapper + ' ' + styles.visible : styles.timeline_wrapper} ref={containerRef}>
            {/*<CurrentTime isLive={isLive} player={player} duration={duration} currentTime={currentTime} liveLatency={liveLatency}/>*/}
            <Slider.Root
                value={[isSliding? value: currentTime]}
                className={styles.timeline_slider_container}
                ref={elementRef}
                {...config}
            >
                <Slider.Track className={styles.timeline_slider_progress_bar}>
                    <Slider.Range className={styles.timeline_slider_duration_bar}/>
                </Slider.Track>
                <Slider.Thumb
                    aria-label={"Seek Time Scrubber"}
                    tabIndex={0}
                    className={styles.timeline_slider_play_head}
                />
                <ContainerHover sliderRef={elementRef} sliderConfig={config}/>
            </Slider.Root>

        </div>
    )
}