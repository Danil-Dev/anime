import styles from './controls.module.scss'
import {Volume1, Volume2, VolumeX} from "react-feather";
import {RangeSlider} from "@/lib/dshaka-player/components/RangeSlider";
import {useVolume} from "@/lib/dshaka-player/hooks/useVolume";


export function VolumeControl() {

    const {volume, updateCurrentVolume} = useVolume()


    return(
        <div className={styles.control_volume}>
            <button type={'button'}>
                <VolumeIcon volume={volume}/>
            </button>
            <div className={styles.control_volume_slider}>
                <RangeSlider
                    min={0}
                    max={1}
                    step={0.1}
                    value={volume}
                    color={'#fff'}
                    onChange={updateCurrentVolume}
                    onInput={updateCurrentVolume}
                />
            </div>
        </div>
    )
}

function VolumeIcon({volume}: {volume: number}) {
    if (volume === 0 ) return <VolumeX size={24}/>
    if (volume < 0.5) return <Volume1 size={24}/>
    return <Volume2 size={24}/>
}