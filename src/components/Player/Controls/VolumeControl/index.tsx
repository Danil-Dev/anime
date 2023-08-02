import {useTimelineDrag, useVolume} from "@/lib/limeplay-core/";
import {useRef} from "react";
import {OnSliderHandlerProps} from '../TimelineControl'
import * as Slider from '@radix-ui/react-slider';
import styles from './volumeControl.module.scss'
import {Volume1, Volume2, VolumeX} from "react-feather";
export function VolumeControl () {


    const {muted, volume, toggleMute, updateCurrentVolume} = useVolume()

    return (
        <div className={styles.volume_control}>
            <button type={'button'} className={styles.volume_control_icon}>
                <VolumeIcon volume={volume} muted={muted}/>
            </button>
            <VolumeSlider volume={volume} updateVolume={updateCurrentVolume}/>

        </div>
    )
}

function VolumeIcon({volume, muted}: {volume: number, muted: boolean}) {
    if (volume === 0 || muted) return <VolumeX size={24}/>
    if (volume < 0.5) return <Volume1 size={24}/>
    return <Volume2 size={24}/>
}


function VolumeSlider ({
    volume,
    updateVolume
}: {
    volume: number;
    updateVolume: (volume: number) => void;
}) {

    const elementRef = useRef<HTMLDivElement>(null)

    const config : OnSliderHandlerProps = {
        min: 0,
        max: 1,
        step: 0.1,
        skipSize: 0.5,
        orientation: 'horizontal',
        disabled: false,
        dir: 'ltr',
        inverted: false
    }

    const {isSliding, value} = useTimelineDrag({
        sliderHandlerConfig: config,
        onSlide: updateVolume,
        ref: elementRef,
        initialValue: volume
    })

    return (
        <Slider.Root
            tabIndex={0}
            value={[isSliding? value: volume]}
            ref={elementRef}
            className={styles.volume_slider_root}
            {...config}
        >
            <Slider.Track className={styles.volume_slider_track}>
                <Slider.Range className={styles.volume_slider_range}/>
            </Slider.Track>
            <Slider.Thumb className={styles.volume_slider_thumb}/>

        </Slider.Root>
    )
}