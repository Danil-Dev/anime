
import {useTimeline} from "@/lib/dshaka-player/hooks/useTimeline";
import {Box} from "@chakra-ui/layout";
import {Slider, SliderFilledTrack, SliderThumb, SliderTrack, Tooltip} from "@chakra-ui/react";
import {useState} from "react";
import {buildTimeString} from "@/lib/dshaka-player/utils/buildTimeString";


export function TimelineControl() {

    const {currentTime, updateCurrentTime, seekRange, buffer, duration} = useTimeline({
        updateInterval: 250
    })
    const [showTooltip, setShowTooltip] = useState(false)






    return(
        <>
            {/*<div className={styles.control_timeline_wrapper}>*/}
            {/*    <div className={styles.control_timeline}>*/}
            {/*        <RangeSlider min={0} max={duration} step={0.1} loading={buffer}  value={currentTime} onChange={updateCurrentTime}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <Box
                position={'absolute'}
                left={0}
                bottom={'46px'}
                width={'100%'}
                zIndex={101}
            >
                <Slider
                  defaultValue={currentTime}
                  min={0} max={duration}
                  step={0.1}
                  onChange={updateCurrentTime}
                  value={currentTime}
                  id='slider'
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                    <SliderTrack background={'sliderBackground'}>
                        <SliderFilledTrack bg={'yellow.100'}/>
                    </SliderTrack>
                    <Tooltip
                        hasArrow
                        bg={'backgroundFloating'}
                        color={'white'}
                        placement={'top'}
                        isOpen={showTooltip}
                        label={buildTimeString(currentTime, duration > 3600)}
                    >
                        <SliderThumb/>
                    </Tooltip>
                </Slider>
            </Box>

        </>

    )
}