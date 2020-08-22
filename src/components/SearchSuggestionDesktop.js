import React, { useState, useEffect } from 'react';


export default function SearchSuggestionDesktop(props) {

    const [marginTop, setMarginTop] = useState('0')
    const styles = {
        ul: {
            display: 'flex',
            listStyle: 'none',
            overflowX: 'auto',
            marginLeft: props.store.openDrawer ? '0' : '200px',
            marginTop: marginTop,
            marginBottom: '0'
        },
        img: {
            width: '100%',
            height: '230px',
            background: 'black'
        },
        p: {
            color: 'white',
            margin: '0'
        },
        a: {
            textDecoration: 'none',
        },
        li: {
            width: '200px',
            marginRight: '10px'
        }
    }
    useEffect(() => {
        props.store.searchSuggestion.data && props.store.searchSuggestion.data.length ? setMarginTop('20px') : setMarginTop('0')
    }, [props.store.searchSuggestion])
    return (
        <>
            <ul style={styles.ul}>
                {props.store.searchSuggestion.data && props.store.searchSuggestion.data.map((x, i) => {
                    return (
                        <a style={styles.a} key={'a:' + i} href={'/anime/' + x.name} >
                            <li style={styles.li} key={'li:' + i}>
                                <img style={styles.img} key={'img:' + i} src={x.img} alt={x.name} />
                                <p style={styles.p} key={'p:' + i}>{x.name}</p>
                            </li>
                        </a>
                    )
                })}
            </ul>
        </>
    )
}