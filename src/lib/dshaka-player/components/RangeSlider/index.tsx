import {useEffect, useRef, useState} from "react";
import styles from './rangeSlider.module.scss'
import variables from '@styles/variables.module.scss'
interface RangeSliderProps{
    min: number,
    max: number,
    step: number,
    value: number,
    loading?: number,
    onChange: (value: number) => void,
    onInput?: (value: number) => void,
    color?: string,
    showThumb?: boolean
}

export function RangeSlider({min, max, step, value, loading, onChange, color=variables.primaryColor, showThumb=false, onInput}: RangeSliderProps){

    const rangeRef = useRef<HTMLInputElement>(null)

    const [progress, setProgress] = useState<number>(value)

    useEffect(() => {
        if (rangeRef.current){

            const range = rangeRef.current
            const handleInputProgress = () => {
                console.log('change progress', range.valueAsNumber)

                let currentProgress = range.valueAsNumber * 100 / max

                console.log(currentProgress)


                setProgress(currentProgress)

                if (onInput){
                    console.log(range.value)
                    onInput(+range.value)
                }
            }

            const handleChangeProgress = () => {
                console.log('[RangeSlider]: handle change', range, range.value)
                onChange(range.valueAsNumber)
            }

            range.addEventListener('input', handleInputProgress)
            range.addEventListener('change', handleChangeProgress)

            return () => {
                if (range){
                    range.removeEventListener('input', handleInputProgress)
                    range.removeEventListener('change', handleChangeProgress)
                }
            }


        }
    }, [max]);

    useEffect(() => {

        if (rangeRef.current){
            rangeRef.current.value = `${value}`
            const currentProgress = value * 100 / max
            setProgress(currentProgress)
        }
    }, [value]);

    return(
        <div className={styles.slider_wrapper}>
            <input type="range" min={min} max={max} step={step} defaultValue={value} ref={rangeRef} className={styles.slider_item}/>
            <div className={styles.slider_progress} style={{width: `${progress}%`, background: color}}></div>
            {loading && <div className={styles.slider_loading} style={{width: `${loading}%`}}></div>}
        </div>
    )
}