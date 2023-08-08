import application from './application/reducer'
import watch from './watch/reducer'
import player from './player/reducer'
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    application: application,
    watch: watch,
    player: player
})

export default rootReducer