import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import TextField from '@material-ui/core/TextField';
import { Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles({
    searchBar: {
        '& .MuiOutlinedInput-root': {
            backgroundColor: '#333333',
            color: 'white',
            width: '90vw',
            borderRadius: '43px',
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
    toolbar: {
        backgroundColor: '#828282',
    },
    logo: {
        color: '#F2C94C',
        fontWeight: 'bold',
    },

});
function HideOnScroll(props) {

    const { children } = props;

    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );

}
const scrollTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

export default function MyAppBar_Mobile(props) {
    const classes = useStyles()
    return (
        <>
            <HideOnScroll {...props}>
                <div style={{ color: 'white' }}>
                    <AppBar position='sticky' color='transparent'>
                        <Toolbar className={classes.toolbar}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={() => {
                                    props.store.openDrawer ? props.store.close_drawer() : props.store.open_drawer()
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.logo}>
                                LOGO
                </Typography>
                        </Toolbar>
                    </AppBar>
                    <Toolbar >
                        <form style={{ margin: '20px auto' }} action='/search'>
                            <TextField
                                name='keyword'
                                label="Search"
                                type="search"
                                variant="outlined"
                                className={classes.searchBar}
                                onClick={scrollTop}
                                onChange={(event) => {
                                    props.store.search_suggestion(event.target.value)
                                }}
                            />
                        </form>
                    </Toolbar>
                </div>
            </HideOnScroll>
        </>
    )
}