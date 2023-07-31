import {PlayerLayoutType, updatePlayerLayout} from "@/store/application/reducer";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {useCallback} from "react";

export function usePlayerLayoutType(): PlayerLayoutType{
    return useAppSelector((state) => state.application.player_layout)
}

export function useTogglePlayerLayout() : () => void {
    const layout = usePlayerLayoutType()
    const dispatch = useAppDispatch()
    return  useCallback( () => dispatch(updatePlayerLayout(layout === PlayerLayoutType.NORMAl ? PlayerLayoutType.WIDE : PlayerLayoutType.NORMAl)), [dispatch, layout])
}