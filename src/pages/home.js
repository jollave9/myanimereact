import React from 'react';
import { useMediaQuery } from '@material-ui/core'
import MyAppBarMobile from '../components/MyAppBarMobile'
import MyDrawerMobile from '../components/MyDrawerMobile'
import MyDrawerDesktop from '../components/MyDrawerDesktop'
import ScrollToTopButton from '../components/ScrollToTopButton'
import MyAppBarDesktop from '../components/MyAppBarDesktop';
import SearchSuggestionMobile from '../components/SearchSuggestionMobile';
import SearchSuggestionDesktop from '../components/SearchSuggestionDesktop';
import ContentMobile from '../components/ContentMobile';
import ContentDesktop from '../components/ContentDesktop';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import * as drawerActions from '../redux/actions/drawerActions'
import searchSuggestion from '../redux/actions/searchSuggestionActions'

const useStyles = makeStyles({
    searchBar: {
        '& .MuiOutlinedInput-root': {
            backgroundColor: '#333333',
            color: 'white',
            width: '60vw',
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#F2C94C',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'white',
            marginTop: '-5px',
            '&.Mui-focused': {
                color: '#F2C94C'
            }
        },
        '& .MuiOutlinedInput-input': {
            padding: '12px 10px',
        }

    },
    btn: {
        height: '43px',
        width: '43px',
        cursor: 'pointer'
    }
})

function HomeTest(props) {
    const isMobile = useMediaQuery('(max-width:900px)')
    //bug: opening drawer triggers useMediaQuery
    // console.log(isMobile)
    const classes = useStyles()

    const scrollTop = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    return (
        <>
            {isMobile ?
                <>
                    <MyAppBarMobile store={props} />
                    <MyDrawerMobile store={props} />
                    <SearchSuggestionMobile store={props} />
                    <ContentMobile store={props} />
                </>
                :
                <>
                    <MyAppBarDesktop store={props} />
                    <MyDrawerDesktop store={props} />
                    <form style={{ margin: '90px 0 0 250px' }} action='/search'>
                        <TextField
                            name='keyword'
                            label="Search"
                            type="search"
                            variant="outlined"
                            className={classes.searchBar}
                            onClick={scrollTop}
                            onChange={(event) => {
                                props.search_suggestion(event.target.value)
                            }}
                        />
                        <button type='submit' className={classes.btn}><i className='fa fa-search'></i></button>
                    </form>
                    <SearchSuggestionDesktop store={props} />
                    <ContentDesktop store={props} />
                    <h1>test</h1>

                </>

            }
            <ScrollToTopButton />
        </>
    );
}
const mapStateToProps = (state) => {
    return ({
        openDrawer: state.openDrawer,
        searchSuggestion: state.searchSuggestion
    })
}
const mapDispatchToProps = (dispatch) => {
    return ({
        open_drawer: () => dispatch(drawerActions.OPEN_DRAWER),
        close_drawer: () => dispatch(drawerActions.CLOSE_DRAWER),
        search_suggestion: (keyword) => dispatch(searchSuggestion(keyword))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTest)
