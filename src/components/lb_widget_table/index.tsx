import * as React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PlayerBar from "../player_bar";
import SvgIcon from "@material-ui/core/SvgIcon";

const { AMAX_API_URL } = process.env;

interface Column {
    id: 'pos' | 'playername' | 'value';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

export interface LeaderboardData {
    data: LeaderboardRecord[];
}

export interface LeaderboardRecord {
    PlayerId:        number;
    bdPlayerName:    string;
    statLevel:       number;
    statFans:        number;
    statRaceTime:    number;
    statDriverScore: number;
    statTop3:        number;
    statRaces:       number;
    statFirst:       number;
    statHits:        number;
    statFired:       number;
    statWrecked:     number;
    statLegend:      number;
    statLegendTime:  number;
    editedAt:        Date;
}

const columns: Column[] = [
    { id: 'pos', label: 'Pos.', minWidth: 10 },
    { id: 'playername', label: 'Player', minWidth: 100 },
    {
        id: 'value',
        label: 'Value',
        minWidth: 10,
        align: 'center',
    }
];

interface Data {
    name: string;
    code: string;
    population: number;
    size: number;
    density: number;
}

function createData(name: string, code: string, population: number, size: number): Data {
    const density = population / size;
    return { name, code, population, size, density };
}

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    datacell: {
        borderBottom: "none"
    }
});

function GetCellData({sortTypeName,playerData}:{sortTypeName: string, playerData: LeaderboardRecord}) {
    const classes = useStyles();
    switch (sortTypeName) {
        case 'sortType':
            return <TableCell className={classes.datacell}  align="right">{playerData.statFans}</TableCell>
        case 'statDriverScore':
            return <TableCell className={classes.datacell}  align="right">{playerData.statDriverScore}</TableCell>
        case 'statLegend':
            return <TableCell className={classes.datacell}  align="right">{playerData.statLegend}</TableCell>
        default:
            return <TableCell className={classes.datacell}  align="right">{playerData.statFans}</TableCell>
    }
}

export default function StickyHeadTable({sortType}:{sortType: string}) {
    const classes = useStyles();
    const [serverLeaderboardData,setserverStatusData] = React.useState<LeaderboardData | undefined>(undefined);
    const [severLeaderboardDataFlag,setLeaderboardDataFlag] = React.useState(false)

    React.useEffect(() => {
        async function getServerData() {
            const resp = await fetch(AMAX_API_URL + "/leaderboards/multiplayer"+"?sortby=" + sortType, {

                method: 'GET',

                headers: {
                    'content-type': 'application/json;charset=UTF-8'
                },
            })
            setserverStatusData(await resp.json())
            setLeaderboardDataFlag(true)
        }

        getServerData().catch(() => {
        })
    }, [])

    const TableBodyData = () => {
        if (severLeaderboardDataFlag) {

                const temp = serverLeaderboardData.data.map((row,index) =>
                    <TableRow  key={row.PlayerId}>
                        <TableCell className={classes.datacell} component="th" scope="row">
                            {index+1}
                        </TableCell>
                        <TableCell className={classes.datacell} component="th" scope="row" align="center">
                            <PlayerBar player_name={row.bdPlayerName} place={0} legend={row.statLegend} level={row.statLevel}/>
                        </TableCell>
                        <GetCellData sortTypeName={sortType} playerData={row}/>
                    </TableRow>

                )
            console.log(temp)
            return (temp)

        } else {
            return(
            <a>Loading</a>
            )
        }
    }

    return (

                <Table stickyHeader padding="none" size="small" aria-label="sticky table">
                    <TableBody>
                        <TableBodyData/>
                    </TableBody>
                </Table>

    );
}
