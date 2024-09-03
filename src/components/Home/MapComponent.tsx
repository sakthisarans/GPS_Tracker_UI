import { Fragment } from "react/jsx-runtime";
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';
import { createRef, useEffect, useRef, useState } from "react";
import "./MapComponent.css"

type coordinates = { lat: string, lang: string, date: string }


const MapComponent: React.FC<{ coordinates: coordinates | undefined }> = ({ coordinates }) => {
  console.log(coordinates)
  const mapElement = createRef<HTMLDivElement>();
  const [map, setMap] = useState<any>({});
  const popupRef = useRef(null);

  useEffect(() => {
    if (coordinates) {
      map.setCenter([parseFloat(coordinates.lang), parseFloat(coordinates.lat)]);
      var element = document.createElement("div")
      element.id = "marker"
      var marker = new tt.Marker({ element: element }).setLngLat([parseFloat(coordinates.lang), parseFloat(coordinates.lat)]).addTo(map)
      var popup = new tt.Popup().setHTML(
        "<b>TN 15 X 1234</b>"
      )
      marker.setPopup(popup).togglePopup()
    }


  }, [coordinates])

  useEffect(() => {
    let map = tt.map({
      key: `${process.env.REACT_APP_TOMTOM_KEY}`,
      container: mapElement.current ?? "mapDiv",
      center: [0, 0],
      zoom: 16,
    });


    setMap(map);
    return () => map.remove();


  }, []);

  return (
    <Fragment>
      <div ref={mapElement} className="mapDiv" />
    </Fragment>
  )
}

export default MapComponent;

