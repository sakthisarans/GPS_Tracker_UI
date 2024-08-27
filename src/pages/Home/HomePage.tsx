// import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import SidePannel from "../../components/Home/SidePannel";
import MapComponent from "../../components/Home/MapComponent";
import "./HomePage.css"
import { useEffect, useState } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";

type trackerArrayProp = {trackerId:string,trckerStatus:boolean}

function HomePage() {
  const [trackerArray,setTrackerArray]=useState<trackerArrayProp[]>()
  useEffect(()=>{
  setTrackerArray([{trackerId:"1234",trckerStatus:true},{trackerId:"12345",trckerStatus:false}])
  },[])


  useEffect(()=>{
    console.log("trackerStsteChanged")
  },[JSON.stringify(trackerArray)])
  return (
    <Fragment>
      <div>
        <div className="sidePannel">
        <ProSidebarProvider>
          <SidePannel trackers={trackerArray}/>
        </ProSidebarProvider>
        </div>
        <div className="mapContainer">
          <MapComponent />
        </div>

      </div>

    </Fragment>
  )
}

export default HomePage;