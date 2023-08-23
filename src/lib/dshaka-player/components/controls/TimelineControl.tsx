import {RangeSlider} from "@/lib/dshaka-player/components/RangeSlider";

import {useTimeline} from "@/lib/dshaka-player/hooks/useTimeline";
import styles from './controls.module.scss'
import {AbsoluteCenter, Fade, Grid, GridItem, Text, useDisclosure} from "@chakra-ui/react";
import {Box, HStack} from "@chakra-ui/layout";
import {useHotkeys} from "@mantine/hooks";
import {useRef, useState} from "react";
import {ChevronsLeft, ChevronsRight} from "react-feather";

export function TimelineControl() {

    const {currentTime, updateCurrentTime, seekRange, buffer, duration} = useTimeline({
        updateInterval: 250
    })


    const timeOutRef = useRef(null)

    const [changeValue, setChangeValue] = useState<number>(0)
    const {isOpen: isForward, onOpen:onOpenForward, onClose: OnCloseForward} = useDisclosure()
    const {isOpen: isBack, onOpen:onOpenBack, onClose: onCloseBack} = useDisclosure()

    useHotkeys([
        ['ArrowRight', () => handleChangeTime(10)],
        ['ArrowLeft', () => handleChangeTime(-10)],
    ])

    const handleChangeTime = (value: number) => {

        if (value > 0) {
            onOpenForward()
            setChangeValue(changeValue + value)

            console.log('start changeValue', changeValue + value)

            updateCurrentTime(currentTime + value)

            if (timeOutRef.current) clearTimeout(timeOutRef.current)

            timeOutRef.current = setTimeout(() => {
                OnCloseForward()

                console.log('end changeValue', changeValue + value)

                setChangeValue(0)

            }, 600)
        } else {
            onOpenBack()
            setChangeValue(changeValue + value)

            console.log('start changeValue', changeValue + value)
            console.log(`change from ${currentTime} to ${currentTime + value}`, value)
            updateCurrentTime(currentTime + value)

            if (timeOutRef.current) clearTimeout(timeOutRef.current)

            timeOutRef.current = setTimeout(() => {
                onCloseBack()

                console.log('end changeValue', changeValue + value)

                setChangeValue(0)

            }, 600)
        }

    }


    return(
        <>
            <div className={styles.control_timeline_wrapper}>
                <div className={styles.control_timeline}>
                    <RangeSlider min={0} max={duration} step={0.1} loading={buffer}  value={currentTime} onChange={updateCurrentTime}/>
                </div>
            </div>

            {/*<div className={styles.control_timeline_animation}>*/}
            {/*    <div className={styles.control_timeline_animation_back}></div>*/}
            {/*    <div className={styles.control_timeline_animation_forward}>*/}
            {/*        <span> Skip 10sec</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <Grid
                templateColumns='repeat(2, 1fr)'
                position='absolute'
                w='100%'
                h='100%'
                top='0'
                left='0'
            >
                <GridItem
                    sx={{
                        '& > div': {
                            h: '100%',
                        }
                    }}
                >
                    <Fade in={isBack}>
                        <Box
                            position={'relative'}
                            w='100%'
                            h='100%'
                            overflow='hidden'
                            _before={{
                                content: '""',
                                position: 'absolute',
                                top: '50%',
                                right: '0',
                                w: '200%',
                                h: '200%',
                                transform: 'translateY(-50%)',
                                bgColor: 'backgroundInteractiveFloating',
                                borderRightRadius: '50%',
                            }}
                        >
                            <AbsoluteCenter>
                                <HStack>
                                    <ChevronsLeft size={24}/>
                                    <Text fontSize={'18px'} m={0}>{changeValue * -1} Seconds</Text>
                                </HStack>

                            </AbsoluteCenter>
                        </Box>
                    </Fade>
                </GridItem>
                <GridItem
                    sx={{
                        '& > div': {
                            h: '100%',
                        }
                    }}
                >
                    <Fade in={isForward}>
                        <Box
                            position={'relative'}
                            w='100%'
                            h='100%'
                            _before={{
                                content: '""',
                                position: 'absolute',
                                top: '50%',
                                left: '0',
                                w: '200%',
                                h: '200%',
                                transform: 'translateY(-50%)',
                                bgColor: 'backgroundInteractiveFloating',
                                borderLeftRadius: '50%',
                            }}
                        >
                            <AbsoluteCenter>
                                <HStack>
                                    <Text fontSize={'18px'} m={0}>{changeValue} Seconds</Text>
                                    <ChevronsRight size={24}/>
                                </HStack>
                            </AbsoluteCenter>
                        </Box>
                    </Fade>
                </GridItem>
            </Grid>
        </>

    )
}