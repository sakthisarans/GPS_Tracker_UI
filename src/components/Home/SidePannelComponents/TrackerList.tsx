import { MenuItem, SubMenu } from "react-pro-sidebar";
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
type trackerArrayProp = { trackerId: string, trackerStatus: boolean }


const TrackerList: React.FC<{ trackers: trackerArrayProp[] | undefined }> = ({ trackers }) => {
    const setTrackerState=(id:string)=>{
        trackers?.forEach(x=>{
            if(x.trackerId===id){
                x.trackerStatus=true
            }else{
                x.trackerStatus=false
            }
        })
    }
    return (
        <SubMenu label="Trackers" icon={<GpsFixedIcon />}>
            {trackers?.map(x => {
                return <MenuItem key={x.trackerId} onClick={()=>{setTrackerState(x.trackerId)}}> {x.trackerId} </MenuItem>
            })}
        </SubMenu>
    )
}

export default TrackerList;