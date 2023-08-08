import {useShaka} from "@/lib/dshaka-player/components/ShakaProvider";
import {useCallback, useEffect, useRef, useState} from "react";
import clamp from "lodash/clamp";
import useStateRef from 'react-usestateref'
export interface UseTimelineConfig{
    updateInterval?: number
}
interface SeekRange {
    start: number;
    end: number;
}

export function useTimeline({updateInterval = 250}: UseTimelineConfig){

    const {video, player} = useShaka()

    const [currentTime, setCurrentTime] = useState<number>(0)
    const [currentProgress, setCurrentProgress] = useState<number>(0)
    const [duration, setDuration, durationRef] = useStateRef<number>(0)
    const [buffer, setBuffer] = useState<number>(0)
    const [seekRange, setSeekRange] = useState<SeekRange>({
        start: 0,
        end: 0
    })
    const timerId = useRef<number>(-1)

    const updateCurrentTime = useCallback((time: number) => {

        if (video.readyState === 0 || Number.isNaN(time)) return;
        const _seekRange = player.seekRange()
        time = clamp(time, _seekRange.start, _seekRange.end)

        video.currentTime = time

        setCurrentTime(time)
    }, [])

    useEffect(() => {
        const updateSeekRange = () => {
            clearInterval(timerId.current)

            timerId.current = window.setInterval(() => {
                if (video.readyState === 0) return;

                if (durationRef.current !== video.duration)
                    setDuration(video.duration);
                setSeekRange(player.seekRange())
                setCurrentTime(video.currentTime)


                const bufferInfo = player.getBufferedInfo()
                const videoBuffer = bufferInfo.video
                if (videoBuffer && videoBuffer.length > 0 ){
                    setBuffer(videoBuffer[0].end * 100 / video.duration)
                }

            }, updateInterval)
        }



        const events = ['trackschanged', 'manifestparsed', 'buffering']

        events.forEach((event) => {
            video.addEventListener(event, updateSeekRange)
        })

        updateSeekRange()

        return () => {
            if (video){
                events.forEach((event) => {
                    video.removeEventListener(event, updateSeekRange)
                })
            }
        }
    }, [updateInterval]);





    return {
        currentTime,
        duration,
        currentProgress,
        seekRange,
        buffer,
        updateCurrentTime
    }
}