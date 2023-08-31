import {Box, HStack} from "@chakra-ui/layout";
import { useEffect, useRef} from "react";
import {usePlayback} from "@/lib/dshaka-player/hooks/usePlayback";
import {AbsoluteCenter, Fade, Grid, GridItem, Text, useDisclosure} from "@chakra-ui/react";
import {ChevronsLeft, ChevronsRight} from "react-feather";
import {useTimeline} from "@/lib/dshaka-player/hooks/useTimeline";
import {useHotkeys} from "@mantine/hooks";
import useStateRef from "react-usestateref";
import {isMobile} from "react-device-detect";
interface EventsControlProps {
  isHiddenControls?: boolean,
  handleViewControl?: () => void

}
enum TabSide{
  LEFT = 'left',
  RIGHT = 'right'
}

export function EventsControl({isHiddenControls, handleViewControl}: EventsControlProps) {

  const containerRef = useRef<HTMLDivElement | null>(null)
  const lastTapRef = useRef<number>(0)
  const timeOutRef = useRef(null)
  const tapTimeoutRef = useRef(null)

  const {togglePlayback, isPlaying} = usePlayback()
  const { updateCurrentTime, getCurrentTime} = useTimeline({
    updateInterval: 250
  })


  const [changeValue, setChangeValue, changeValueRef] = useStateRef<number>(0)
  const {isOpen: isForward, onOpen:onOpenForward, onClose: OnCloseForward} = useDisclosure()
  const {isOpen: isBack, onOpen:onOpenBack, onClose: onCloseBack} = useDisclosure()
  const handleChangeTime = (value: number) => {


    if (value > 0) {
      onOpenForward()

      if (timeOutRef.current) window.clearTimeout(timeOutRef.current)

      const currTime = getCurrentTime()
      setChangeValue(changeValueRef.current + value)
      updateCurrentTime(currTime + value)
      timeOutRef.current = window.setTimeout(() => {
        OnCloseForward()
        setChangeValue(0)
      }, 500)
    }else{
      onOpenBack()

      if (timeOutRef.current) window.clearTimeout(timeOutRef.current)

      const currTime = getCurrentTime()
      setChangeValue(changeValueRef.current + value)
      updateCurrentTime(currTime + value)
      timeOutRef.current = window.setTimeout(() => {
        onCloseBack()
      }, 500)
    }
  }



  const handleTap = (e: TouchEvent) => {
    // e.preventDefault()
    const now = new Date().getTime()
    const DOUBLE_TAP_DELAY = 300
    if (lastTapRef.current && (now - lastTapRef.current) < DOUBLE_TAP_DELAY) {



      if(containerRef.current){
        if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current)
        const tabSide = e.touches[0].clientX < containerRef.current.clientWidth / 2 ? TabSide.LEFT : TabSide.RIGHT
          if (tabSide === TabSide.LEFT) {
            handleChangeTime (-10)
          } else if( tabSide === TabSide.RIGHT ){
            handleChangeTime(10)
          }
          lastTapRef.current = null
      }
    }else{
      tapTimeoutRef.current = setTimeout(() => {
        console.log ('singleTap', isHiddenControls)
        if (isHiddenControls && (isMobile && !isPlaying)){
          togglePlayback()
        }
        else if (isHiddenControls){
          handleViewControl()
        }
        else{
          togglePlayback()
        }


      }, DOUBLE_TAP_DELAY)

    }
    lastTapRef.current = now

  }
  const handleClick = () => {
    if (!isMobile){
      togglePlayback()
    }
  }


  useHotkeys([
    ['ArrowRight', () => handleChangeTime(10)],
    ['ArrowLeft', () => handleChangeTime(-10)],
  ])

  useEffect(() => {
    if (containerRef.current){
      containerRef.current.addEventListener('touchstart',handleTap)
      containerRef.current.addEventListener('click', handleClick)
    }
    return () => {
      if (containerRef.current){
        containerRef.current.removeEventListener('touchstart',handleTap)
        containerRef.current.removeEventListener('click', handleClick)
      }
    }
  }, [isHiddenControls])

  return(
    <Box
        ref={containerRef}
        position={'absolute'}
        w={'100%'}
        h={'100%'}
        top={0}
        left={0}
        zIndex={100}
    >
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
          position={'relative'}
          zIndex={95}
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
                  <Text fontSize={'18px'} m={0}>{changeValueRef.current} Seconds</Text>
                  <ChevronsRight size={24}/>
                </HStack>
              </AbsoluteCenter>
            </Box>
          </Fade>
        </GridItem>
      </Grid>

    </Box>
  )
}