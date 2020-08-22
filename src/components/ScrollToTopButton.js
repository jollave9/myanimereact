import React from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';

function ScrollTop(props) {
    const { children } = props;

    const trigger = useScrollTrigger({ disableHysteresis: true });

    const handleClick = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    return (
        // There's a warning in strict mode that material-ui haven't fixed yet (https://stackoverflow.com/questions/61115871/finddomnode-error-on-react-material-ui-select-menu)

        <Zoom in={trigger}>
            <div onClick={handleClick}>
                {children}
            </div>
        </Zoom>
    );
}

export default function ScrollToTopButton(props) {
    const style = {
        position: 'fixed',
        bottom: '60px',
        right: '40px',
        zIndex: '1200',
        backgroundColor: '#F2C94C',
        color: 'black',
        width: '60px',
        height: '60px',
        border: 'none',
        borderRadius: '50%',
        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'
    }
    return (
        <ScrollTop {...props}>
            <button style={style}><i className="fa fa-chevron-up"></i></button>
        </ScrollTop>
    )
}