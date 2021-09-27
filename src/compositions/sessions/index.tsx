import * as React from "react"
import "./sessions_item.css";
import {useAuthStore} from "../../stores";
import {MePlayerData} from "../appbar";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import SessionItem from "../../components/session_item";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            alignItems: "flex-end",
            margin: 15,
            minWidth: 400,
            // height: 636,
            /* Blue/700 (2 L) */
            // background: "#304254",

            /* Blue/600 */
            // border: "1px solid #3E5270",
            // boxSizing: "border-box",
            // borderRadius: 8,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        spinner: {
            display: 'flex',
            marginLeft: "calc(50% - 25px)",
            marginTop: "50%",
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        }
    }),
);

export interface SessionsData {
    data: Session[];
}

export interface Session {
    sessionId:      string;
    ownerId:        number;
    ownerHash:      string;
    totalSlots:     number;
    gameType:       string;
    availableSlots: number;
    isPublic:       number;
    isInProgress:   number;
    players_list:   PlayersList[];
}

export interface PlayersList {
    playerId:     number;
    bdPlayerName: string;
    statLevel:    number;
    statLegend:   number;
}

export default function SessionsWidget() {
    const classes = useStyles();
    let [session_data, setData] = React.useState<SessionsData | undefined>(undefined);
    let [dataRequested, setRequestStatus] = React.useState(false);

    const RenderSessions = () => {
        if (dataRequested) {
            return session_data.data.map(session_data =>
                <SessionItem key={session_data.sessionId} data = {session_data}/>
            )
        } else {
            return (
                <div className={classes.spinner}>
                <CircularProgress />
            </div>

            )
        }
    }

    // Lucas:
    // Functions passed to useEffect cannot be async.
    React.useEffect(() => {
        async function getSessionsData() {
            const resp = await fetch("http://127.0.0.1:8000/sessions", {

                method: 'GET',

                headers: {
                    'content-type': 'application/json;charset=UTF-8'
                },
            })
            setData(await resp.json())
            setRequestStatus(true)
        }

        getSessionsData().catch(() => {
        })
    }, [])



    return (
        <>
            <a className="session_item_name">Active sessions</a>
        <div className={classes.root}>

            <RenderSessions/>
        </div>
        </>

    )
}