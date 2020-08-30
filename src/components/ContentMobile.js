import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'

// pagination not yet available
export default function ContentMobile(props) {
    //kapoy ug buwag sa store ug sa exact props
    // console.log(props.store.location.pathname)
    const styles = {
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
        },
        h4: {
            width: '110px',
            height: '40px',
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'Montserrat,sans-serif',
            marginLeft: '50px',
            marginBottom: '0',
            marginTop: '5px',
        }
    }

    const [state, setState] = useState({
        isLoading: true,
        data: []
    })
    useEffect(() => {
        // const url = props.store.location.pathname !== '/' ? `http://192.168.1.111:5000/api${props.store.location.pathname}` : `http://192.168.1.111:5000/api/recently-added-sub`
        const url = `https://myanimeapi.herokuapp.com/api/${props.store.match.params.content}`

        axios.get(url)
            .then((res) => setState({
                isLoading: false,
                data: res.data
            }))
            .catch(e => console.log(e))

    }, [props.store.match.params.content])


    return (
        <>
            {
                state.isLoading && <h1 style={{ color: 'white' }}>LOADING...</h1>
            }
            <h4 style={styles.h4}>{props.store.match.params.content.replace(/-/g, ' ').toUpperCase()}</h4>
            <ul style={styles.ul}>
                {state.data && state.data.map((x, i) => {
                    return (
                        <a style={styles.a} key={'a:' + i} href={'/anime/' + x.name.replace('?', '')} >
                            <li style={styles.li} key={'li:' + i}>
                                <img style={styles.img} key={'img:' + i} src={x.img} alt={x.name} />
                                <p style={styles.p} key={'p:' + i}>{x.name}</p>
                            </li>
                        </a>
                    )
                })}
            </ul>
            <h4>INSERT PAGINATION</h4>

        </>
    )
}