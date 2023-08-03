import {FC, ReactElement} from "react";
import useShakaPlayer from "@/lib/dshaka-player/hooks/useShakaPlayer";

interface DShakaPlayerProps{
    src: string,
    children: ReactElement
}

const DShakaPlayer: FC<DShakaPlayerProps> = ({src, children}) => {

    const {videoRef, playerRef} = useShakaPlayer(src)

    console.log(videoRef, playerRef)

    return(
        <div>
            <video ref={videoRef} controls={false} width={'100%'}></video>
            {children}
        </div>
    )

}

export default DShakaPlayer