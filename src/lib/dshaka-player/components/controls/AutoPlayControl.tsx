import {ToggleButton} from "@/lib/dshaka-player/components/ToggleButton/ToggleButton";
import {useState} from "react";
import {useAutoplay, useToggleAutoplay} from "@/store/player/hooks";


export function AutoPlayControl() {

    const autoplay = useAutoplay()
    const toggleAutoplay = useToggleAutoplay()



    return(
        <>
            <ToggleButton checked={autoplay} onClick={()=> toggleAutoplay()}/>
        </>
    )
}