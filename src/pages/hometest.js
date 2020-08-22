import React from 'react';
import { useState, useEffect } from 'react'
import { useMediaQuery } from '@material-ui/core'
import SearchTest from './searchtest'
import MyAppBar_Mobile from '../components/MyAppBar_Mobile'
import MyDrawer_Mobile from '../components/MyDrawer_Mobile'
import MyDrawer_Desktop from '../components/MyDrawer_Desktop'
import ScrollToTopButton from '../components/ScrollToTopButton'
import MyAppBar_Desktop from '../components/MyAppBar_Desktop';
import SearchSuggestion_Mobile from '../components/SearchSuggestion_Mobile';
import SearchSuggestion_Desktop from '../components/SearchSuggestion_Desktop';
import Content_Mobile from '../components/Content_Mobile';
import Content_Desktop from '../components/Content_Desktop';
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
    const isMobile = useMediaQuery('(max-width:410px)')
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
                    <MyAppBar_Mobile store={props} />
                    <MyDrawer_Mobile store={props} />
                    <SearchSuggestion_Mobile store={props} />
                    <Content_Mobile store={props} />
                </>
                :
                <>
                    <MyAppBar_Desktop store={props} />
                    <MyDrawer_Desktop store={props} />
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
                    <SearchSuggestion_Desktop store={props} />
                    <Content_Desktop store={props} />
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
