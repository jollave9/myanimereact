import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'

function SearchTest(props) {

    const [state, setState] = useState({
        list: [],
    })

    const [keyword, setKeyword] = useState('')

    const [styles, setStyles] = useState({
        ul: {
            display: 'flex',
            listStyle: 'none',
            overflowY: 'auto',
            marginTop: '20px'
        },
        img: {
            width: '20vw',
            height: '50vh',
            background: 'black'
        },
        p: {
            color: 'white'
        },
        a: {
            textDecoration: 'none',
            margin: '10px'
        },
    })

    useEffect(() => {
        if (props.keyword.length > 2)
            setKeyword(props.keyword)
        else
            setState({ list: [] })

    }, [props.keyword])

    useEffect(() => {
        props.isMobile && setStyles(prev => ({
            ...prev,
            img: {
                ...prev.img,
                width: '100px',
                height: '100px'
            }
        }))

    }, [props.isMobile])

    useEffect(() => {
        const url = 'http://192.168.1.111:5000/api/search?keyword=' + keyword

        axios.get(url)
            .then((res) => res.data)
            .then((data) => setState({
                list: data
            }))

    }, [keyword])

    return (
        <div>
            <ul style={styles.ul}>
                {state.list && state.list.map((x, i) => {
                    return (
                        <a style={styles.a} key={'a:' + i} href={'/anime/' + x.name} alt={x.name}>
                            <li style={styles.li} key={'li:' + i}>
                                <img style={styles.img} key={'img:' + i} src={x.img} />
                                <p style={styles.p} key={'p:' + i}>{x.name}</p>
                            </li>
                        </a>
                    )
                })}
            </ul>
        </div>

    );
}

export default SearchTest;
