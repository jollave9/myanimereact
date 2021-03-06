import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Toolbar } from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        '& .MuiDrawer-paper': {
            backgroundColor: '#333333',
        }
    },
    li: {
        color: '#F2F2F2',
        fontFamily: 'Montserrat, sans-serif',
        // fontWeight: 'bold'
    },
    logo: {
        color: '#F2C94C',
        fontWeight: 'bold',
        marginRight: '45%',

    },
    divider: {
        background: 'white'
    },
    a: {
        textDecoration: 'none',
    },
    listContainer: {
        width: '140px',
        height: '54px',
        margin: '25px 0'
    }
})


export default function MyDrawerMobile(props) {

    const classes = useStyles()
    let isMobile = useMediaQuery('(max-width:900px)')
    // console.log(isMobile)
    return (
        // There's a warning in strict mode that material-ui haven't fixed yet (https://stackoverflow.com/questions/61115871/finddomnode-error-on-react-material-ui-select-menu)

        <Drawer
            open={(props.store.openDrawer && isMobile)}
            variant="temporary"
            anchor="left"
            className={classes.root}
            onClick={(event) => {
                event.target.className === 'MuiBackdrop-root' && props.store.close_drawer()
            }}
        >
            <>
                <div style={{ color: 'white' }}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.logo}>
                            LOGO
                </Typography>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="close drawer"
                            onClick={props.store.close_drawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider className={classes.divider} />
                </div>
                <ul style={{ listStyle: 'none', margin: '0', padding: '0 30px' }}>
                    <div className={classes.listContainer}>
                        <a className={classes.a} href='/home/recently-added-sub'>
                            <li className={classes.li}>RECENTLY ADDED SUB</li>
                        </a>
                    </div>
                    <div className={classes.listContainer}>
                        <a className={classes.a} href='/home/recently-added-raw'>
                            <li className={classes.li}>RECENTLY ADDED RAW</li>
                        </a>
                    </div>
                    <div className={classes.listContainer}>
                        <a className={classes.a} href='/home/recently-added-dub'>
                            <li className={classes.li}>RECENTLY ADDED DUB</li>
                        </a>
                    </div>
                    <div className={classes.listContainer}>
                        <a className={classes.a} href='/home/movies'>
                            <li className={classes.li}>ANIME MOVIES</li>
                        </a>
                    </div>
                    <div className={classes.listContainer}>
                        <a className={classes.a} href='/home/new-season'>
                            <li className={classes.li}>NEW SEASON</li>
                        </a>
                    </div>
                    <div className={classes.listContainer}>
                        <a className={classes.a} href='/home/popular'>
                            <li className={classes.li}>POPULAR ANIME</li>
                        </a>
                    </div>
                    <div className={classes.listContainer}>
                        <a className={classes.a} href='/home/ongoing-series'>
                            <li className={classes.li}>ONGOING SERIES</li>
                        </a>
                    </div>
                </ul>
            </>
        </Drawer >
    )
}