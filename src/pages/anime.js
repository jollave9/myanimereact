import React, { useState, useEffect } from 'react'
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

function Anime(props) {
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

    const [state, setState] = useState({
        isLoading: true,
        data: {}
    })
    const split = props.match.params.name.split(/[^\w\d]/)
    const removedEmptyString = split.filter((x) => {
        return x !== ""
    })
    const filteredName = removedEmptyString.join('-')

    // console.log(filteredName)
    // console.log(props.match.params)
    // const filteredName = props.match.params.name.replace(/[^\w\s-]/g, '').replace(/\s/g, '-')
    // console.log(filteredName)
    useEffect(() => {
        const url = 'https://myanimeapi.herokuapp.com/api/anime/' + filteredName

        axios.get(url)
            .then((res) => setState({ isLoading: false, data: res.data }))
            .catch(e => console.log(e))
    }, [filteredName])

    const isMobile = useMediaQuery('(max-width:900px)')
    //bug: opening drawer triggers useMediaQuery
    // console.log(isMobile)

    const classes = useStyles()

    const scrollTop = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    const styles_Mobile = {

        img: {

            display: 'block',
            width: '280px',
            height: '380px',
            margin: '0 auto',

        },
        div: {
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.7em',
            color: 'white',
            width: '85%',
            margin: '10px auto',
            padding: '10px',
            backgroundColor: 'black'
        },
        a: {
            textDecoration: 'none',
            background: '#F2C94C',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 'bold',
            padding: '20px',
            textAlign: 'center',
            color: 'black'

        },
        episodes: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridGap: '5px',
            width: '85%',
            margin: '5px auto'
        }
    }
    const styles_Desktop = {

        img: {

            width: '280px',
            height: '350px',

        },
        div: {
            width: '661px',
            height: '310px',
            backgroundColor: 'black',
            color: 'white',
            fontFamily: 'Montserrat, sans-serif',
            // fontSize: '1em',
            marginLeft: props.openDrawer ? '50px' : '10px',
            padding: '20px',
            overflowY: 'auto'
        },
        a: {
            textDecoration: 'none',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 'bold',
            margin: '10px 0',
        },
        episodes: {
            display: 'flex',
            marginLeft: props.openDrawer ? '180px' : '250px',//bali pa ang logic
            overflowX: 'auto'
        },
        imgAndPcontainer: {
            display: 'flex',
            marginLeft: props.openDrawer ? '180px' : '250px',//bali pa ang logic
            marginBottom: '10px',
            marginTop: '20px'

        },
        episodeDiv: {
            width: '100px',
            height: '105px',
            backgroundImage: `url('${state.data.img}')`,
            backgroundSize: 'cover',
            marginRight: '10px',
            position: 'relative',
        },
        span: {
            backgroundColor: 'rgba(0,0,0,0.9)',
            color: 'white',
            display: 'block',
            width: '90px',
            padding: '10px 5px',
            position: 'absolute',
            bottom: '0px'
        }
    }
    return (
        <>
            {isMobile ?
                <>
                    <MyAppBarMobile store={props} />
                    <MyDrawerMobile store={props} />
                    <SearchSuggestionMobile store={props} />

                    {state.isLoading && <h1 style={{ color: 'white' }}>LOADING...</h1>}

                    <img src={state.data.img} style={styles_Mobile.img} alt='anime' />
                    <div dangerouslySetInnerHTML={{ __html: state.data.description }} style={styles_Mobile.div}></div>
                    <div style={styles_Mobile.episodes}>
                        {state.data.episodes && state.data.episodes.map((x, i) => {
                            return (
                                <a key={i} style={styles_Mobile.a} href={`/video/${x.replace('?', '')}`}>{state.data.episodes.length - i}</a>
                            )
                        })}
                    </div>
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
                    {
                        state.isLoading && <h1 style={{ color: 'white', marginLeft: props.openDrawer ? '0' : '200px' }}>LOADING ...</h1>
                    }
                    <div style={styles_Desktop.imgAndPcontainer}>
                        <img src={state.data.img} style={styles_Desktop.img} alt='anime' />
                        <div dangerouslySetInnerHTML={{ __html: state.data.description }} style={styles_Desktop.div}></div>
                    </div>
                    <div style={styles_Desktop.episodes}>
                        {state.data.episodes && state.data.episodes.map((x, i) => {
                            return (
                                <a key={i} style={styles_Desktop.a} href={`/video/${x.replace('?', '')}`}>
                                    <div style={styles_Desktop.episodeDiv}>
                                        <span style={styles_Desktop.span}>{state.data.episodes.length - i}</span>
                                    </div>
                                </a>
                            )
                        })}
                    </div>

                </>

            }
            <ScrollToTopButton />
        </>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Anime)
