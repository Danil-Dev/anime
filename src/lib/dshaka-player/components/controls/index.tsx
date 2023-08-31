import styles  from './controls.module.scss'
import {PlaybackControl} from "@/lib/dshaka-player/components/controls/PlaybackControl";
import {TimelineControl} from "@/lib/dshaka-player/components/controls/TimelineControl";
import {VolumeControl} from "@/lib/dshaka-player/components/controls/VolumeControl";
import {TimeControl} from "@/lib/dshaka-player/components/controls/TimeControl";
import {FullscreenControl} from "@/lib/dshaka-player/components/controls/FullscreenControl";
import {SettingsControl} from "@/lib/dshaka-player/components/controls/SettingsControl";
import {VideoController} from "@/lib/dshaka-player/components/controls/VideoController";
import {useState} from "react";
import {AutoPlayControl} from "@/lib/dshaka-player/components/controls/AutoPlayControl";
import {SkipControl} from "@/lib/dshaka-player/components/controls/SkipControl";
import {EventsControl} from "@/lib/dshaka-player/components/controls/EventsControl";
import {isMobile} from "react-device-detect";

import {Box, Flex} from "@chakra-ui/layout";
import {usePlayback} from "@/lib/dshaka-player/hooks/usePlayback";
import {useTimeout} from "@mantine/hooks";

interface ControlsOverlayProps{
    intro: string,
    end: number,
    onEnd?: () => void,
    isLastEpisode?: boolean
}

export function ControlsOverlay({intro, end, onEnd, isLastEpisode}: ControlsOverlayProps){

    const [isHiddenControl, setIsHiddenControl] = useState<boolean>(true)
    const {isPlaying} = usePlayback()

    const {start: startTimeout, clear} = useTimeout(() => setIsHiddenControl(true), 4000)
    const handleMouseMove = () => {
        if (isHiddenControl){
            setIsHiddenControl(false)
            setTimeout(() => {
                setIsHiddenControl(true)
            }, 4000)
        }
    }
    const handleViewControl = () => {
        if (isHiddenControl){
            setIsHiddenControl(false)
            startTimeout()
        }
    }



    return(
      <Box
        position={'absolute'}
        top={0}
        left={0}
        w={'100%'}
        h={'100%'}
        zIndex={5}
        overflow={"hidden"}
        cursor={isHiddenControl ? 'none' : 'unset'}
        onMouseMove={handleMouseMove}
      >
            <EventsControl isHiddenControls={isHiddenControl} handleViewControl={handleViewControl}/>
          <Box
            visibility={!isPlaying && isMobile ? 'visible': isHiddenControl ? 'hidden' : 'visible'}
            opacity={!isPlaying && isMobile? 1 :isHiddenControl ? 0 : 1}
            transition={'visibility 0s, opacity 0.5s linear'}
          >
                <SkipControl intro={intro} end={end} onEnd={onEnd} isLastEpisode={isLastEpisode}/>
                <VideoController/>

                    <TimelineControl/>
              <Flex
                position={'absolute'}
                bottom={'8px'}
                left={'0'}
                height={'36px'}
                p={'0 12px'}
                w={'100%'}
                alignItems={'center'}
                justifyContent={'space-between'}
                zIndex={101}
              >
                    <Flex>
                        <PlaybackControl/>
                        <VolumeControl/>
                        <TimeControl/>
                    </Flex>

                    <Flex>
                        <AutoPlayControl/>
                        <SettingsControl/>
                        <FullscreenControl/>
                    </Flex>
              </Flex>
          </Box>

      </Box>

    )
}