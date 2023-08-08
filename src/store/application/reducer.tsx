import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum PlayerLayoutType{
    NORMAl,
    WIDE
}

export interface ApplicationState {
    player_layout: PlayerLayoutType
}

const initialState: ApplicationState = {
    player_layout: PlayerLayoutType.WIDE
}

const applicationSlide = createSlice({
    name: 'application',
    initialState,
    reducers: {
        updatePlayerLayout(state, action : PayloadAction<PlayerLayoutType>){
            state.player_layout = action.payload
        }
    }
})
export const {updatePlayerLayout} = applicationSlide.actions

export default applicationSlide.reducer