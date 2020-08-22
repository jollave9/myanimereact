import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {
    const [state, setState] = useState({
        list: [],
    })

    const [keyword, setKeyword] = useState("")
    const [styles, setStyle] = useState({
        search: {
            width: '40vw',
            fontSize: '1.7em',
            color: 'white',
            backgroundColor: '#2b2b2b',
            margin: '10px 0 0 10px',
            border: '1px solid #5e5d5d',
            borderRadius: '20px',
            padding: '20px'
        },
        li: {
            marginBottom: '3px',
            backgroundColor: 'black',
            padding: '5px'
        },
        ul: {
            listStyle: 'none',
            fontSize: '1.3em',
            padding: '0',
        },
        div: {
            backgroundColor: '#2b2b2b',
            position: 'fixed',
            width: '100vw',
            height: '100vh'
        }
    }
    )
    const handleChange = (e) => {

        const { value } = e.target
        setKeyword(value)

    }

    useEffect(() => {
        axios.get('http://192.168.1.111:5000/api/search?keyword=' + keyword)
            .then((res) => res.data)
            .then((data) => setState({
                list: data
            }))
        // console.log(keyword, state.list)

    }, [keyword])

    return (
        <div style={styles.div}>
            <form action="search" >
                <input
                    type="text"
                    name="keyword"
                    placeholder='Search'
                    value={keyword}
                    onChange={handleChange}
                    style={styles.search} />
                <input type="submit" />
            </form>
            <ul style={styles.ul}>
                {state.list && state.list.map((x, i) =>
                    <a key={'a:' + i + x.name} href={'/search?keyword=' + x.name} style={{ textDecoration: 'none', color: 'white' }}>
                        <li key={'li:' + i + x.name} style={styles.li}>{x.name}</li>
                    </a>)
                }
            </ul>
        </div >
    );
}

export default Home;
