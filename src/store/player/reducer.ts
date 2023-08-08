import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum PlayerLayoutType{
    NORMAL,
    WIDE
}

export interface PlayerState {
    track: number | 'auto',
    volume: number,
    speed: number,
    layout: PlayerLayoutType,
    autoplay: boolean
}

const initialState: PlayerState = {
    track: "auto",
    volume: 1,
    speed: 1,
    layout: PlayerLayoutType.NORMAL,
    autoplay: false
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        updateTrack(state, action: PayloadAction<number | 'auto'>){
            state.track = action.payload
        },
        updateSpeed(state, action: PayloadAction<number>){
            state.speed = action.payload
        },
        updateVolume(state , action: PayloadAction<number>){
            state.volume = action.payload
        },
        updateLayout(state , action: PayloadAction<PlayerLayoutType>){
            state.layout = action.payload
        },
        updatePlayer(state , action: PayloadAction<PlayerState>){

            console.log('update Player state', action.payload)
            Object.keys(action.payload).forEach(key => {
                state[key] = action.payload[key];
            });
        },
        toggleAutoplay(state){
            state.autoplay = !state.autoplay
        }
    }
})

export const {
    updateTrack,
    updateVolume,
    updateSpeed,
    updateLayout,
    updatePlayer,
    toggleAutoplay
} = playerSlice.actions

export default playerSlice.reducer