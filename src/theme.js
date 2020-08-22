import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
        gray1: {
            main: '#333333'
        },
        gray2: {
            main: '#4F4F4F'
        },
        gray3: {
            main: '#828282'
        },
        gray5: {
            main: '#E0E0E0'
        },
        gray6: {
            main: '#F2F2F2'
        },
        yellow: {
            main: '#F2C94C'
        }
    },
});

export default theme