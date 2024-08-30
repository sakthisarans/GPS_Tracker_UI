import { useRef } from 'react';
import './TrackerStatus.css'

function TrackerStatus() {
    const isOnline = useRef<boolean>(false)
    return (
        <div className='trackerStatus'>
            <div className='onlineStatus'>
                <span hidden={isOnline.current} className="badge offline">
                    <i className="fas fa-circle"></i> Offline
                </span>
                <span hidden={!isOnline.current} className="badge">
                    <i  className="fas fa-circle"></i> Online
                </span>
                <span className="lastOnline">Last Online</span>
            </div>
            
        </div>)
}

export default TrackerStatus;