import {useShaka} from "@/lib/dshaka-player/components/ShakaProvider";
import {useCallback, useEffect, useRef, useState} from "react";



export function useAudioTracks(){
  const {player} = useShaka()

  const [audioTracks, setAudioTracks] = useState([])


  const selectAudioTrack = useCallback(
    (audioTrackId: string)=> {
      player.selectVariantsByLabel(audioTrackId)
    },
    []
  )

  const updateAudioHandler = () => {
    const audioTags = player.getAudioLanguages()
    const tracks = player.getVariantTracks()
    let audioTracksByLabel: string[] = []
    for (const audio of audioTags){
      audioTracksByLabel.push(tracks.find((track) => track.language === audio).label)
    }
    setAudioTracks(audioTracksByLabel)
  }


  useEffect(() => {
    const events = [
      'variantchanged',
      'abrstatuschanged',
      'trackschanged',
      'adaptation',
    ];

    events.forEach((event) => {
      player.addEventListener(event, updateAudioHandler);
    });

    return () => {
      if (player) {
        events.forEach((event) => {
          player.removeEventListener(event, updateAudioHandler);
        });
      }
    };
  }, [updateAudioHandler]);


  return {
    audioTracks,
    selectAudioTrack
  } as const
}