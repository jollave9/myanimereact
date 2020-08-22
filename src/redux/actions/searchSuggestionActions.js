import axios from 'axios'

const searchSuggestion = (keyword) => (dispatch) => {
    const url = 'https://myanimeapi.herokuapp.com/api/search?keyword=' + keyword

    axios.get(url)
        .then((res) => res.data)
        .then((data) => dispatch({ type: 'SEARCH_SUGGESTION', payload: data }))
}
export default searchSuggestion