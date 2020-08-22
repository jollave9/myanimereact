const searchSuggestion = (state = {}, { type, payload }) => {
    switch (type) {
        case 'SEARCH_SUGGESTION':
            return {
                ...state,
                data: payload
            }
        default: return state
    }
}
export default searchSuggestion