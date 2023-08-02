// @ts-ignore
import shaka from "shaka-player";
import {buildTimeString} from "@/components/Player/Controls/TimelineControl/utils";


export function CurrentTime({
    isLive,
    player,
    duration,
    currentTime,
    liveLatency
} : {
    isLive: boolean;
    player: shaka.Player;
    duration: number;
    currentTime: number;
    liveLatency: number;
}){
    return(
        <span>
            {!isLive && buildTimeString(currentTime, duration > 3600)}
            {isLive && (
                <button
                    onClick={() => {
                        player.goToLive()
                    }}
                >
                    {liveLatency > 5
                        ? `-${buildTimeString(liveLatency, duration > 3600)}`
                        : 'LIVE'
                    }
                </button>
            )}
        </span>
    )
}