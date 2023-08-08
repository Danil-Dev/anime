import {PlayerState, toggleAutoplay} from "@/store/player/reducer";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {useCallback} from "react";


export function usePlayerState(): PlayerState{
    return useAppSelector((state) => state.player)
}
export function useAutoplay(){
    return useAppSelector((state) => state.player.autoplay)
}

export function useToggleAutoplay(){
    const dispatch = useAppDispatch()
    return useCallback(() => {
        dispatch(toggleAutoplay())
    }, [dispatch])
}