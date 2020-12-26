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
import VideoPlayer from 'react-video-js-player';



function Video(props) {

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

    const [vid_src, setVid_src] = useState({
        isLoading: true,
        src: ''
    })
    const [anime, setState] = useState({
        isLoading: true,
        data: {}
    })
    const [iframe_src, setIframe_src] = useState({
        isLoading: true,
        src: ''
    })

    // const filteredNameEpisode = props.match.params.name_episode.replace(/[^\w\s]/g, '').replace(/\s/g, '-')
    const split = props.match.params.name_episode.split(/[^\w\d]/)
    const removedEmptyString = split.filter((x) => {
        return x !== ""
    })
    const filteredNameEpisode = removedEmptyString.join('-')
    const filteredName = filteredNameEpisode.slice(0, filteredNameEpisode.lastIndexOf('Episode') - 1)

    // console.log(filteredNameEpisode)
    // console.log(filteredName)

    useEffect(() => {
        const url = 'https://myanimeapi.herokuapp.com/api/video-src/' + filteredNameEpisode

        axios.get(url)
            .then((res) => res.data)
            .then((data) => setVid_src({
                isLoading: false,
                src: data
            }))


        axios.get('https://myanimeapi.herokuapp.com/api/anime/' + filteredName)
            .then((res) => setState({ isLoading: false, data: res.data }))
            .catch(e => console.log(e))

        axios.get('https://myanimeapi.herokuapp.com/api/iframe/' + filteredNameEpisode)
            .then((res) => res.data)
            .then((data) => setIframe_src({
                isLoading: false,
                src: 'https://' + data
            }))

    }, [filteredNameEpisode, filteredName])

    const isMobile = useMediaQuery('(max-width:900px)')
    //bug: opening drawer triggers useMediaQuery
    // console.log(isMobile)


    const classes = useStyles()

    const scrollTop = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    const styles_Mobile = {
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
        },
        download: {
            background: '#F2C94C',
            color: 'black',
            textDecoration: 'none',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '10px',
            borderRadius: '10px',
            display: 'block',
            margin: '20px'
        }
    }
    const styles_Desktop = {
        div: {
            marginLeft: '250px'
        },
        a: {
            textDecoration: 'none',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 'bold',
        },
        episodeDiv: {
            width: '110px',
            height: '115px',
            backgroundImage: `url('${anime.data.img}')`,
            backgroundSize: 'cover',
            marginBottom: '10px',
            position: 'relative',
        },
        span: {
            backgroundColor: 'rgba(0,0,0,0.9)',
            color: 'white',
            display: 'block',
            width: '100px',
            padding: '10px 5px',
            position: 'absolute',
            bottom: '0px'
        },
        episodes: {
            height: '450px',
            overflowY: 'auto',
            marginLeft: '10px'
        },
        download: {
            textDecoration: 'none',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 'bold',
            marginLeft: '250px',
            width: '100px',
            height: '50px',
            background: '#F2C94C',
            color: 'black',
            textAlign: 'center',
            padding: '10px',
            borderRadius: '10px',
        }
    }
    console.log(vid_src.src)
    console.log(iframe_src.src)


    return (
        <>
            {isMobile ?
                <>
                    <MyAppBarMobile store={props} />
                    <MyDrawerMobile store={props} />
                    <SearchSuggestionMobile store={props} />
                    {(vid_src.isLoading || iframe_src.isLoading) && <h1 style={{ color: 'white' }}>LOADING...</h1>}

                    {
                        vid_src.src &&
                            vid_src.src.search('https://storage.googleapis.com') !== -1 ?
                            (
                                <VideoPlayer
                                    controls={true}
                                    src={vid_src.src}
                                    poster={anime.data.img}
                                    fluid={false}
                                    width={document.documentElement.clientWidth}
                                    height={document.documentElement.clientWidth}
                                />
                            )
                            :
                            (
                                iframe_src.src &&
                                <>
                                    <iframe title='iframe' src={iframe_src.src} width={document.documentElement.clientWidth} height={document.documentElement.clientWidth * 0.7} allowFullScreen={true} frameBorder="0" marginWidth="0" marginHeight="0" scrolling="no"></iframe>
                                    <p style={{ margin: '0' }}>if the video won't play you can choose another server</p>
                                </>
                            )
                    }
                    <h3>{filteredNameEpisode}</h3>
                    <a style={styles_Mobile.download} href={vid_src.src}>Download</a>

                    {anime.isLoading && <h1 style={{ color: 'white' }}>LOADING...</h1>}

                    <div style={styles_Mobile.episodes}>
                        {
                            anime.data.episodes && anime.data.episodes.map((x, i) => {
                                // console.log(x)
                                return (
                                    <a key={`a:${i}`} href={`/video/${x}`} style={styles_Mobile.a}>
                                        {anime.data.episodes.length - i}
                                    </a>
                                )
                            })
                        }
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
                        (vid_src.isLoading || iframe_src.isLoading) && <h1 style={{ color: 'white', marginLeft: props.openDrawer ? '0' : '200px' }}>LOADING VIDEO ...</h1>
                    }
                    <div style={{ display: 'flex', margin: '15px 0' }}>

                        {
                            vid_src.src &&
                                vid_src.src.search('https://storage.googleapis.com') !== -1 ?
                                (
                                    <div style={styles_Desktop.div}>
                                        <VideoPlayer
                                            controls={true}
                                            src={vid_src.src}
                                            poster={anime.img}
                                            width="900"
                                            height="450"
                                        />
                                    </div>)
                                :
                                (
                                    iframe_src.src &&
                                    <div style={styles_Desktop.div}>
                                        <iframe title='iframe' src={iframe_src.src} width="900" height="500" allowFullScreen={true} frameBorder="0" marginWidth="0" marginHeight="0" scrolling="no"></iframe>
                                        <p style={{ margin: '0' }}>if the video won't play you can choose another server</p>
                                    </div>
                                )
                        }
                        {
                            anime.isLoading && <h1 style={{ color: 'white', marginLeft: props.openDrawer ? '0' : '200px' }}>LOADING EPISODES ...</h1>
                        }
                        <div style={styles_Desktop.episodes}>
                            {
                                anime.data.episodes && anime.data.episodes.map((x, i) => {
                                    // console.log(x)
                                    return (
                                        <a key={`a:${i}`} href={`/video/${x}`} style={styles_Desktop.a}>
                                            <div style={styles_Desktop.episodeDiv}>
                                                <span style={styles_Desktop.span}>{anime.data.episodes.length - i}</span>
                                            </div>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/* <h3>{filteredNameEpisode}</h3> */}
                    <a style={styles_Desktop.download} href={vid_src.src}>Download</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Video)
