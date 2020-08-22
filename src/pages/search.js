import React from 'react';
import { useState, useEffect } from 'react'
import { useMediaQuery } from '@material-ui/core'
import axios from 'axios'
import MyAppBarMobile from '../components/MyAppBarMobile'
import MyDrawerMobile from '../components/MyDrawerMobile'
import MyDrawerDesktop from '../components/MyDrawerDesktop'
import ScrollToTopButton from '../components/ScrollToTopButton'
import MyAppBarDesktop from '../components/MyAppBarDesktop';
import SearchSuggestionMobile from '../components/SearchSuggestionMobile';
import SearchSuggestionDesktop from '../components/SearchSuggestionDesktop';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import * as drawerActions from '../redux/actions/drawerActions'
import searchSuggestion from '../redux/actions/searchSuggestionActions'

function Search(props) {
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
    const styles_Desktop = {
        ul: {
            listStyle: 'none',
            padding: '0',
            marginLeft: props.openDrawer ? '0' : '200px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            position: 'static'

        },
        img: {
            width: '100%',
            height: '291px',
            background: 'black'
        },
        p: {
            margin: '0',
            padding: '6px',
            fontFamily: 'Montserrat, sans-serif',
            color: '#F2C94C',
            fontWeight: 'bold',
            textAlign: 'center'

        },
        a: {
            textDecoration: 'none',
            margin: '10px',
        },
        li: {
            width: '258px',
            margin: 'auto',
            background: '#333333'
        }
    }
    const styles_Mobile = {
        ul: {
            listStyle: 'none',
            padding: '0',
            margin: '0'
        },
        img: {
            width: '100%',
            height: '310px',
            background: 'black'
        },
        p: {
            margin: '0',
            padding: '6px',
            fontFamily: 'Montserrat, sans-serif',
            color: '#F2C94C',
            fontWeight: 'bold',
            textAlign: 'center'

        },
        a: {
            textDecoration: 'none',
            margin: '10px',
        },
        li: {
            width: '292px',
            margin: 'auto',
            background: '#333333'
        }
    }
    const [state, setState] = useState([])

    useEffect(() => {
        const url = 'http://192.168.1.111:5000/api/search'

        axios.get(url + props.location.search)
            .then((res) => res.data)
            .then((data) => setState(data))

    }, [props.location.search])

    const isMobile = useMediaQuery('(max-width:900px)')
    //bug: opening drawer triggers useMediaQuery
    // console.log(isMobile)
    console.log(props)

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
                    <ul style={styles_Mobile.ul}>
                        {state.map((x, i) => {
                            return (
                                <a style={styles_Mobile.a} key={'a:' + i} href={'/anime/' + x.name} >
                                    <li style={styles_Mobile.li} key={'li:' + i}>
                                        <img style={styles_Mobile.img} key={'img:' + i} src={x.img} alt={x.name} />
                                        <p style={styles_Mobile.p} key={'p:' + i}>{x.name}</p>
                                    </li>
                                </a>
                            )
                        })}
                    </ul>
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
                    <ul style={styles_Desktop.ul}>
                        {state.map((x, i) => {
                            return (
                                <a style={styles_Desktop.a} key={'a:' + i} href={'/anime/' + x.name} >
                                    <li style={styles_Desktop.li} key={'li:' + i}>
                                        <img style={styles_Desktop.img} key={'img:' + i} src={x.img} alt={x.name} />
                                        <p style={styles_Desktop.p} key={'p:' + i}>{x.name}</p>
                                    </li>
                                </a>
                            )
                        })}
                    </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Search)
