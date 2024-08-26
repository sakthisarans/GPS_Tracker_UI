// import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import SidePannel from "../../components/Home/SidePannel";
import MapComponent from "../../components/Home/MapComponent";
import "./HomePage.css"

function HomePage() {
  // const navigate=useNavigate()
  return (
    <Fragment>
      <div>
        <div className="sidePannel">
          <SidePannel />
        </div>
        <div className="mapContainer">
          <MapComponent />
        </div>

      </div>

    </Fragment>
  )
}

export default HomePage;