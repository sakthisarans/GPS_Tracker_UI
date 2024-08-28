import { Fragment } from "react/jsx-runtime";
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';
import { createRef, useEffect, useState } from "react";
import "./MapComponent.css"

function MapComponent() {
  const mapElement = createRef<HTMLDivElement>();
  const [mapLongitude, ] = useState(80.2705);
  const [mapLatitude, ] = useState(13.0843);
  const [map, setMap] = useState({});

  useEffect(() => {
     
      let map = tt.map({
        key: `${process.env.REACT_APP_TOMTOM_KEY}`,
        container: mapElement.current ?? "mapDiv",
        center: [mapLongitude, mapLatitude],
        zoom: 16,
      });

      var element = document.createElement("div")
      element.id = "marker"
      var marker = new tt.Marker({ element:element }).setLngLat([mapLongitude, mapLatitude]).addTo(map)
      var popup = new tt.Popup().setHTML(
        "<b>TN 15 X 1234</b>"
      )
      marker.setPopup(popup).togglePopup()
      setMap(map);
      return () => map.remove();
    

  }, [mapLatitude, mapLongitude]);

  return (
    <Fragment>
        <div ref={mapElement} className="mapDiv" />
    </Fragment>
  )
}

export default MapComponent;

