import { Fragment } from "react/jsx-runtime";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import SpeedIcon from '@mui/icons-material/Speed';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CloseIcon from '@mui/icons-material/Close';


import './SidePannel.css'
import { useEffect, useRef, useState } from "react";
type trackerArrayProp = [{
    trackerId:string;
    trackerState:boolean
  }]


function SidePannel({ trackers }: []|trackerArrayProp|any) {
    const [pannelState,setPannelState] = useState(true)
    const { collapseSidebar } = useProSidebar();
    useEffect(()=>{
        collapseSidebar(pannelState)
    },[pannelState])

    return (
        <Fragment >
            <Sidebar style={{height:"100vh",background: "green"}}>
            <Menu>
            <MenuItem onClick={()=>{setPannelState(!pannelState)}}>
                <span>
                    {pannelState? <MenuRoundedIcon />:<CloseIcon/>}
                </span>
                </MenuItem>
                {
                    trackers > 0 ?
                        (<SubMenu label="Charts">
                            <MenuItem> Pie charts </MenuItem>
                            <MenuItem> Line charts </MenuItem>
                        </SubMenu>) : (<MenuItem icon={<ReportProblemIcon/>}> No Tracker Found </MenuItem>)
                }
                <MenuItem icon={<SpeedIcon />}> Speed </MenuItem>
            </Menu>
            </Sidebar>
        </Fragment>
    )
}

export default SidePannel;