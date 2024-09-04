import { Fragment } from "react/jsx-runtime";
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt, { Marker } from '@tomtom-international/web-sdk-maps';
import { createRef, useEffect, useRef, useState } from "react";
import "./MapComponent.css"

type coordinates = { lat: string, lang: string, date: string }


const MapComponent: React.FC<{ coordinates: coordinates | undefined }> = ({ coordinates }) => {
  const mapElement = createRef<HTMLDivElement>();
  const [map, setMap] = useState<any>({});
  const defaultMarker = useRef<Marker>(new tt.Marker({}))

  useEffect(() => {
    if (coordinates) {
      map.setCenter([parseFloat(coordinates.lang), parseFloat(coordinates.lat)]);
      if (defaultMarker) {
        defaultMarker.current.setLngLat([parseFloat(coordinates.lang), parseFloat(coordinates.lat)]).remove().addTo(map)
        var popup = new tt.Popup().setHTML(
          "<b>TN 15 X 1234</b>"
        )
        defaultMarker.current.setPopup(popup).togglePopup()
      }
    }


  }, [coordinates])

  useEffect(() => {
    let map = tt.map({
      key: `${process.env.REACT_APP_TOMTOM_KEY}`,
      container: mapElement.current ?? "mapDiv",
      // center: [0, 0],
      geopoliticalView: 'IN',
      zoom: 16,
    });
    var element = document.createElement("div")
    element.id = "marker"
    var marker = new tt.Marker({ element: element }).setLngLat([(0), (0)])
    defaultMarker.current = marker
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

