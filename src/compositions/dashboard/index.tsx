import * as React from "react"
import "./dashboard.css"
import SessionsWidget from "../sessions";
import ServerStatus from "../serverstatus";
import LeaderboardsWidget from "../leaderboard_widget";
import {Button, Paper} from "@material-ui/core";
import IntroWidget from "../../components/introWidget";
import {useAuthStore} from "../../stores"
import {useUserDataStore} from "../../stores/userdataStore";
import {Container} from "@material-ui/core";


export default function Dashboard() {
    const auth = useAuthStore()
    const user = useUserDataStore()

    return (
        <Container maxWidth={"xl"}>
            <div className="dashboard_container">

                {user.userData?.amax_account
                    ? <></>
                    : (<div className="main_widget_container">
                        <IntroWidget/>
                    </div>)
                }
                <div className="column1_container">
                    <SessionsWidget/>
                </div>
                <div className="column2_container">
                    <LeaderboardsWidget/>
                </div>
                <div className="column3_container">
                    <ServerStatus/>
                    {user.userData?.amax_account
                        ? <div style={{marginTop: 200}}>
                            <iframe src="https://discord.com/widget?id=840455397818630175&theme=dark" width="350"
                                    height="500"
                                    allowTransparency={true} frameBorder="0"
                                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"/>
                        </div >
                        : <div style={{marginTop: 120}}>
                        <iframe src="https://discord.com/widget?id=840455397818630175&theme=dark" width="350"
                                  height="500"
                                  allowTransparency={true} frameBorder="0"
                                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"/>
                                  </div >
                    }

                </div>
            </div>
        </Container>
    )
}