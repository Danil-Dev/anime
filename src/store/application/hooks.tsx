import {PlayerLayoutType, updatePlayerLayout} from "@/store/application/reducer";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {useCallback} from "react";

export function usePlayerLayoutType(): PlayerLayoutType{
    return useAppSelector((state) => state.application.player_layout)
}

export function useTogglePlayerLayout() : () => void {
    const layout = usePlayerLayoutType()
    const dispatch = useAppDispatch()
    return  useCallback( () => {
        const player = document.getElementById('limeplay-player')
        console.log(player)
        if (layout === PlayerLayoutType.NORMAl){
            player.classList.add('player_wide')
        }
        else{
            player.classList.remove('player_wide')
        }
        dispatch(updatePlayerLayout(layout === PlayerLayoutType.NORMAl ? PlayerLayoutType.WIDE : PlayerLayoutType.NORMAl))
    }, [dispatch, layout])
}