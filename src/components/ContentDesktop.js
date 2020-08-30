import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'

// pagination not yet available
export default function ContentDesktop(props) {
    //kapoy ug buwag sa store ug sa exact props
    // console.log(props.store)
    const styles = {
        ul: {
            listStyle: 'none',
            padding: '0',
            marginLeft: props.store.openDrawer ? '0' : '200px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            position: 'static',
            marginTop: '0',
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
        },
        h3: {
            width: '140px',
            height: '54px',
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'Montserrat,sans-serif',
            marginLeft: props.store.openDrawer ? '0' : '220px',
            marginTop: '40px',
            marginBottom: '0'
        }
    }

    const [state, setState] = useState({
        isLoading: true,
        data: []
    })

    useEffect((prevState) => {

        // const url = props.store.match.params.content ?
        //     `http://192.168.1.111:5000/api/${props.store.match.params.content}`
        //     : `http://192.168.1.111:5000/api/recently-added-sub`


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
                state.isLoading && <h1 style={{ color: 'white', marginLeft: props.store.openDrawer ? '0' : '200px' }}>LOADING ...</h1>
            }
            <h3 style={styles.h3}>{props.store.match.params.content.replace(/-/g, ' ').toUpperCase()}</h3>
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
            <h1 style={{ marginLeft: '200px' }}>INSERT PAGINATION</h1>

        </>
    )
}