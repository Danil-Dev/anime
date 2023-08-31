import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface PlayerState {
    track: number | 'auto',
    volume: number,
    speed: number,
    audio: string,
    subtitle: string | null,
    autoplay: boolean
}

const initialState: PlayerState = {
    track: "auto",
    volume: 1,
    speed: 1,
    autoplay: false,
    audio: 'Amanogawa',
    subtitle: null
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
        updateAudio(state , action: PayloadAction<string>){
            state.audio = action.payload
        },
        updateSubtitle(state , action: PayloadAction<string | null>){
            state.subtitle = action.payload
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
    updatePlayer,
    updateAudio,
    updateSubtitle,
    toggleAutoplay
} = playerSlice.actions

export default playerSlice.reducer