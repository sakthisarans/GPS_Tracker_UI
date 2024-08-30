import { MenuItem, SubMenu } from "react-pro-sidebar";
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
type trackerArrayProp = { trackerId: string, trckerStatus: boolean }


const TrackerList: React.FC<{ trackers: trackerArrayProp[] | undefined }> = ({ trackers }) => {
    const setTrackerState=(id:string)=>{
        trackers?.forEach(x=>{
            if(x.trackerId===id){
                x.trckerStatus=true
            }else{
                x.trckerStatus=false
            }
        })
    }
    return (
        <SubMenu label="Trackers" icon={<GpsFixedIcon />}>
            {trackers?.map(x => {
                return <MenuItem onClick={()=>{setTrackerState(x.trackerId)}}> {x.trackerId} </MenuItem>
            })}
        </SubMenu>
    )
}

export default TrackerList;