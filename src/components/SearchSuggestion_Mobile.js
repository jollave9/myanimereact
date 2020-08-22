import React from 'react';

export default function SearchSuggestion_Mobile(props) {
    const styles = {
        ul: {
            display: 'flex',
            listStyle: 'none',
            overflowX: 'auto',
            margin: '0',
            msOverflowStyle: 'none',  /* Internet Explorer 10+ */
            scrollbarWidth: 'none',  /* Firefox */
            '&::WebkitScrollbar': {
                display: 'none'  /* Safari and Chrome */
            },
        },
        img: {
            width: '100%',
            height: '209px',
            background: 'black'
        },
        p: {
            color: 'white',
            fontFamily: 'Montserrat, sans-serif',
        },
        a: {
            textDecoration: 'none',
            margin: '10px'
        },
        li: {
            width: '188px',
        }
    }
    return (
        <>
            <ul style={styles.ul}>
                {props.store.searchSuggestion.data && props.store.searchSuggestion.data.map((x, i) => {
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
        </>
    )
}