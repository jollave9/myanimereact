import { open_drawer, close_drawer } from '../actions/drawerActions'

const drawerReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case open_drawer:
            return payload
        case close_drawer:
            return payload
        default: return state
    }
}
export default drawerReducer