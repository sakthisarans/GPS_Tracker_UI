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

type trackerArrayProp = { trackerId: string, trackerStatus: boolean }

type coordinates = {lat:string,lang:string,date:string}

function HomePage() {
  const [trackerArray, setTrackerArray] = useState<trackerArrayProp[]>()
  const [isOnline, setIsOnline] = useState<boolean>(false)
  const [coordinates,setCoordinates]=useState<coordinates|undefined>()
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/tracker/emqx/user/trackerlist`).then(res => {
      if (res && res.status === 200 && res.data.length > 0) {
        setTrackerArray(res.data)
      }
    }).catch()
  }, [])

  const fetchData = () => {
    if (trackerArray) {

      const activeTrackers=trackerArray.filter(x=> x.trackerStatus)
      const activeTrackerIds = activeTrackers[0].trackerId
      axios.get(`${process.env.REACT_APP_BASE_URL}/tracker/emqx/user/getlatestcoordinates`, {
        params: {
          trackerId: `${activeTrackerIds}`
        }
      }).then(res => {
        if (res.status === 200) {
          setIsOnline(res.data.trackerStatus.online)
          setCoordinates(res.data.coordinates)
        }
      }).catch(err => {
        alert(err)
      })
    }
  }

  useEffect(() => {
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, [trackerArray])
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
          <MapComponent coordinates={coordinates} />
        </div>
      </div>
    </Fragment>
  )
}

export default HomePage;