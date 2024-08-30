import { useRef } from 'react';
import './TrackerStatus.css'
import { jsx } from '@emotion/react';

type statusPrope={
    isOnline:boolean
}
function TrackerStatus({isOnline}:statusPrope):JSX.Element {
    // const isOnline = useRef<boolean>(false)
    return (
        <div className='trackerStatus'>
            <div className='onlineStatus'>
                <span hidden={isOnline} className="badge offline">
                    <i className="fas fa-circle"></i> Offline
                </span>
                <span hidden={!isOnline} className="badge">
                    <i  className="fas fa-circle"></i> Online
                </span>
                {/* <span className="lastOnline">Last Online</span> */}
            </div>
            
        </div>)
}

export default TrackerStatus;