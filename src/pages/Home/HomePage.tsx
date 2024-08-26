// import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import SidePannel from "../../components/Home/SidePannel";
import MapComponent from "../../components/Home/MapComponent";
import "./HomePage.css"
import { useState } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";

type trackerArrayProp = [{
  trackerId:string;
  trackerState:boolean
}]

function HomePage() {
  const [trackerArray,setTrackerArray]=useState<[]|trackerArrayProp|any >([])
  setTrackerArray([{trackerId:"1234",trackerState:true}])
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