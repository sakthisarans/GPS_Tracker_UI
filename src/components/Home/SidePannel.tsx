import { Fragment } from "react/jsx-runtime";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import SpeedIcon from '@mui/icons-material/Speed';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CloseIcon from '@mui/icons-material/Close';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

import './SidePannel.css'
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useRef, useState } from "react";
import SpeedPannel from "./SidePannelComponents/SpeedPannel";
import DistancePannel from "./SidePannelComponents/DistancePannel";
import { promises } from "dns";
type trackerArrayProp = {trackerId:string,trckerStatus:boolean}


const SidePannel: React.FC<{ trackers: trackerArrayProp[]|undefined }> = ({ trackers }) =>{
    const [pannelState, setPannelState] = useState(true)
    const { collapseSidebar } = useProSidebar();
    useEffect(() => {
        collapseSidebar(pannelState)
    }, [pannelState])


    return (
        <Fragment >
            <Sidebar style={{ height: "100vh", background: "green" }}>
                <Menu
                menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                      if (level === 0) {
                        return {
                          color: disabled ? "#eee" : "#455A64",
                          backgroundColor: active ? "#fff" : undefined,
                          "&:hover": {
                             backgroundColor: "#335B8C !important",
                             color: "white !important",
                             borderRadius: "8px !important",
                             fontWeight: "bold !important"
                           },
                        };
                      }
                    },
                  }}
                >
                    <MenuItem onClick={() => { setPannelState(!pannelState) }}>
                        <span>
                            {pannelState ? <MenuRoundedIcon /> : <CloseIcon />}
                        </span>
                    </MenuItem>
                    {
                        trackers && trackers.length > 0 ?
                            (
                                <SubMenu label="Trackers" icon={<GpsFixedIcon/>}> <MenuItem>{trackers[0].trackerId}</MenuItem> </SubMenu>
                            ) : (<MenuItem icon={<ReportProblemIcon />}> No Tracker Found </MenuItem>)
                    }
                    <SubMenu icon={<SpeedIcon />} label="Speed">
                        <SpeedPannel />
                    </SubMenu>
                    <SubMenu icon={<CallSplitIcon />} label="Range"> <DistancePannel /> </SubMenu>
                </Menu>
            </Sidebar>
        </Fragment>
    )
}

export default SidePannel;