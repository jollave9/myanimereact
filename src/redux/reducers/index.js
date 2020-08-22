import { combineReducers } from 'redux'
import drawerReducer from './drawer'
import searchSuggestion from './searchSuggestion'

const reducers = combineReducers({
    openDrawer: drawerReducer,
    searchSuggestion
})
export default reducers