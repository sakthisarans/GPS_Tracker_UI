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

type trackerArrayProp = {trackerId:string,trckerStatus:boolean}

function HomePage() {
  const [trackerArray,setTrackerArray]=useState<trackerArrayProp[]>()
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BASE_URL}/tracker/emqx/user/trackerlist`).then(res=>{
      if(res && res.status===200&&res.data.length>0){
        setTrackerArray(res.data)
      }
    }).catch()
  },[])


  useEffect(()=>{
    console.log("trackerStsteChanged")
  },[trackerArray])
  return (
    <Fragment>
      <div>
        <div className="sidePannel">
        <ProSidebarProvider>
          <SidePannel trackers={trackerArray}/>
        </ProSidebarProvider>
        </div>
        <div className="trackerStatus">
          <TrackerStatus />
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