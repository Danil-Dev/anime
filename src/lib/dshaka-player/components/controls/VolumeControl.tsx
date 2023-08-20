import styles from './controls.module.scss'
import {Volume1, Volume2, VolumeX} from "react-feather";
import {RangeSlider} from "@/lib/dshaka-player/components/RangeSlider";
import {useVolume} from "@/lib/dshaka-player/hooks/useVolume";
import {useAppDispatch} from "@/store/hooks";
import {updateVolume} from "@/store/player/reducer";
import {useHotkeys} from "@mantine/hooks";
import {clamp} from "lodash";


export function VolumeControl() {

    const {volume, updateCurrentVolume} = useVolume()
    const dispatch = useAppDispatch()
    const handleVolumeChange = (vol: number) => {
        console.log('handleVolumeChange', vol)
        updateCurrentVolume(vol)
        dispatch(updateVolume(clamp(vol, 0, 1)))
    }
    useHotkeys([
        ['m', () => handleVolumeChange(0)],
        ['ArrowUp', () => handleVolumeChange(volume + 0.1)],
        ['ArrowDown', () => handleVolumeChange(volume - 0.1)],
    ])


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
                    onChange={handleVolumeChange}
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