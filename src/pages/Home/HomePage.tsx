// import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import SidePannel from "../../components/Home/SidePannel";
import MapComponent from "../../components/Home/MapComponent";
import "./HomePage.css"
import { useEffect, useState } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import axios from "axios";
import TrackerStatus from "../../components/Home/TrackerStatus/TrackerStatus";
import ProfileBatch from "../../components/Profiles/ProfileBatch";

type trackerArrayProp = { trackerId: string, trckerStatus: boolean }

function HomePage() {
  const [trackerArray, setTrackerArray] = useState<trackerArrayProp[]>()
  const [isOnline, setIsOnline] = useState<boolean>(false)
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/tracker/emqx/user/trackerlist`).then(res => {
      console.log(res)
      if (res && res.status === 200 && res.data.length > 0) {
        setTrackerArray(res.data)
      }
    }).catch()
  }, [])

  const fetchData = () => {
    console.log("c  ")
    if (trackerArray) {
      const activeTrackers = trackerArray.filter(tracker => tracker.trckerStatus);
      const activeTrackerIds = activeTrackers.map(tracker => tracker.trackerId);
      console.log(trackerArray)
      console.log(activeTrackers)
      console.log(activeTrackerIds)
      axios.get(`${process.env.REACT_APP_BASE_URL}/tracker/emqx/user/getlatestcoordinates`, {
        params: {
          trackerId: `${activeTrackerIds}`
        }
      }).then(res => {
        if (res.status === 200) {
          setIsOnline(res.data.trackerStatus.online)
        }
      }).catch(err => {
        alert(err)
      })
    }
  }

  useEffect(() => {
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, [])
  return (
    <Fragment>
      <div>
        <div className="sidePannel">
          <ProSidebarProvider>
            <SidePannel trackers={trackerArray} />
          </ProSidebarProvider>
        </div>
        <div className="trackerStatus">
          <TrackerStatus isOnline={isOnline} />
        </div>
        <div className="profileDiv">
          <ProfileBatch />
        </div>
        <div className="mapContainer">
          <MapComponent />
        </div>

      </div>

    </Fragment>
  )
}

export default HomePage;