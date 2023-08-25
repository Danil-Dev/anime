import {useShaka} from "@/lib/dshaka-player/components/ShakaProvider";
import {useCallback, useEffect, useRef, useState} from "react";
import useStateRef from "react-usestateref";
import {useVideoTracks} from "@/lib/dshaka-player/hooks/useVideoTracks";


export function useAudioTracks(){
  const {player} = useShaka()

  const [audioTracks, setAudioTracks] = useState([])


  const {selectedTrack} = useVideoTracks()
  const selectAudioTrack = useCallback(
      (audioTrackId: string)=> {
        // console.log(audioTrackId)
        // let currentTracks = player.getVariantTracks();
        //   const currentSelectedTrack = currentTracks.find((track) => track.active)
        //
        // console.log('video Track ', currentSelectedTrack)
        //
        // if (currentSelectedTrack){
        //   const audioTrack = currentTracks.find((track) => track.originalAudioId === audioTrackId && track.height === currentSelectedTrack.height)
        //   console.log(audioTrack)
        //   player.selectVariantTrack(audioTrack, true, 0)
        // }
        player.selectVariantsByLabel(audioTrackId)




      },
    []
  )

  useEffect(() => {

  }, [])


  return {
    selectAudioTrack
  } as const
}