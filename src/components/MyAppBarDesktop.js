import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

    toolbar: {
        backgroundColor: '#828282',
    },
    logo: {
        color: '#F2C94C',
        fontWeight: 'bold',
    },

});

export default function MyAppBarDesktop(props) {
    const classes = useStyles()
    // console.log(props.store)
    return (
        <>

            <div style={{ color: 'white' }}>
                <AppBar color='transparent' position='fixed'>
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

            </div>


        </>
    )
}