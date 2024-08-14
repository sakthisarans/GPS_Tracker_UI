// import { Fragment } from "react/jsx-runtime";
import '@tomtom-international/web-sdk-maps/dist/maps.css'
// import tt from '@tomtom-international/web-sdk-maps';
// import { useEffect, useRef, useState } from "react";

function MapComponent () {
    // const mapElement = useRef<HTMLDivElement>();

    // const [mapLongitude, setMapLongitude] = useState(-121.91599);
    // const [mapLatitude, setMapLatitude] = useState(37.36765);
    // const [mapZoom, setMapZoom] = useState(13);
    // const [map, setMap] = useState({});
    // useEffect(() => {
    //     let map = tt.map({
    //       key: `${process.env.REACT_APP_TOMTOM_KEY}`,
    //       container:"map",
    //       center: [mapLongitude, mapLatitude],
    //       zoom: mapZoom
    //     });
    
    //     setMap(map);
    //     return () => map.remove();
    //   }, [mapLatitude,mapLongitude,mapZoom]);
    // return(
    //     <Fragment>
    //         <div className="map">
    //         <div ref={mapElement} className="map" id="map" />
    //         </div>
    //     </Fragment>
    // )
    return (<p>map</p>)
}

export default MapComponent;

