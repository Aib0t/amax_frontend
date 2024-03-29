import * as React from "react"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';


const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 8,
    },
    colorPrimary: {
        backgroundColor: "#141F2A",

    },
    bar: {
        borderRadius: 8,
        background: "linear-gradient(90deg, rgba(153, 49, 252, 0.75) 0%, rgba(194, 117, 234, 0.75) 95%)",
        boxShadow: "0px 0px 16px 0px #DC04FF99",


    },
}))(LinearProgress);

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth:240,
        minWidth: 0,
        width: "auto"
    },
});

// Wrong. so very wrong.
// export default function CustomizedProgressBars(exp_value: number) {
//     const classes = useStyles();
//     return (
//         <div className={classes.root}>
//             <BorderLinearProgress variant="determinate" value={exp_value} />
//         </div>
//     );
// }

// Fix:
export default function PlayerExpBar({exp_value}: {exp_value: number}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <BorderLinearProgress variant="determinate" value={exp_value} />
        </div>
    );
}
