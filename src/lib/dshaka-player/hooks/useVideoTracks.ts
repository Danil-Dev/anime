import {useShaka} from "@/lib/dshaka-player/components/ShakaProvider";
import {useCallback, useEffect, useRef, useState} from "react";
import useStateRef from "react-usestateref";

export interface UseVideoTracksConfig{
    onSelect?: (selectedTrack: shaka.extern.Track) => void
}
export function useVideoTracks({onSelect}: UseVideoTracksConfig = {}) {

    const {player} = useShaka()
    const loadMode = useRef(player.getLoadMode());
    const [tracks, setTracks] = useState<shaka.extern.Track[]>([])
    const [selectedTrack, setSelectedTrack, selectedTrackRef] = useStateRef<shaka.extern.Track | null>(null)
    const [isAuto, setIsAuto, isAutoRef ] = useStateRef(false)
    const previousTrack = useRef<shaka.extern.Track | null>(null);

    function setAutoMode() {
        const config = {
            abr: {
                enabled: true,
            },
        };

        player.configure(config);
        setIsAuto(true);
    }

    const selectTrack = useCallback(
        (track: shaka.extern.Track) => {
            const config = {
                abr: {
                    enabled: false,
                },
            };

            player.configure(config);
            setIsAuto(false);


            if (
                previousTrack.current &&
                selectedTrackRef.current
            ) {
                // const currTrack = player.
                if (
                    previousTrack.current.bandwidth <
                    selectedTrackRef.current.bandwidth
                ) {

                    player.selectVariantTrack(track, true, 0);
                } else {
                    player.selectVariantTrack(track, true, 0);
                }
            } else {
                player.selectVariantTrack(
                    track, true, 0
                )
            }

            if (onSelect && typeof onSelect === 'function'){
                onSelect(track)
            }
        },
        [setIsAuto]
    );

    const updateQualityHandler = useCallback(() => {
        const currentConfig = player.getConfiguration()
        let currentTracks = player.getVariantTracks();
        const currentSelectedTrack = currentTracks.find((track) => track.active)

        if (currentConfig.abr.enabled !== isAutoRef.current){
            setIsAuto(currentConfig.abr.enabled)
        }

        if (currentSelectedTrack) {
            currentTracks = currentTracks.filter(
                (track) =>
                    track.language === currentSelectedTrack.language &&
                    track.channelsCount === currentSelectedTrack.channelsCount
            );
        }

        currentTracks = currentTracks.filter((track, idx) => {
            const otherIdx = player.isAudioOnly()
                ? currentTracks.findIndex((t) => t.bandwidth === track.bandwidth)
                : currentTracks.findIndex((t) => t.height === track.height);
            return otherIdx === idx;
        });

        if (player.isAudioOnly()) {
            currentTracks.sort((a, b) => a.bandwidth - b.bandwidth);
        } else {
            currentTracks.sort((a, b) => a.height - b.height);
        }

        setSelectedTrack((prevTrack) => {

                    previousTrack.current = prevTrack

            return currentSelectedTrack || null
        })

        setTracks(currentTracks)




    }, [])

    useEffect(() => {
        if (player) {
            const _config = player.getConfiguration()
            updateQualityHandler()
            setIsAuto(_config.abr.enabled)
        }
    }, [updateQualityHandler, loadMode, setIsAuto]);

    useEffect(() => {
        const events = [
            'variantchanged',
            'abrstatuschanged',
            'trackschanged',
            'adaptation',
        ];

        events.forEach((event) => {
            player.addEventListener(event, updateQualityHandler);
        });

        return () => {
            if (player) {
                events.forEach((event) => {
                    player.removeEventListener(event, updateQualityHandler);
                });
            }
        };
    }, [updateQualityHandler]);


    return {
        tracks,
        selectedTrack,
        isAuto,
        selectTrack,
        setAutoMode
    } as const
}