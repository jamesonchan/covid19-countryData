import React, { useState, useRef, useEffect } from "react";
import ReactMapGL, { FlyToInterpolator, Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";
import { useRecoilState } from "recoil";
import { countryInfoState } from "../atoms/CountryInfoAtom";

function Map() {
  const [countryInfo] = useRecoilState(countryInfoState);
  const coordinates = countryInfo?.map((info) => ({
    latitude: info.latitude,
    longitude: info.longitude,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  const ref = useRef();

  const goToCountry = () => {
    setViewport({
      ...viewport,
      latitude: center ? center.latitude : 37.7577,
      longitude: center ? center.longitude : -122.4376,
      zoom: 3,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  useEffect(() => {
    ref.current.click();
  }, [center.latitude, center.longitude]);

  return (
    <>
      <ReactMapGL
        mapStyle="mapbox://styles/jamesonchan/ckwsq9nlx0wcy14o5lpplcp6n"
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {countryInfo?.map((result) => (
          <div key={result.code}>
            <Marker
              longitude={result.longitude}
              latitude={result.latitude}
              offsetLeft={-20}
              offsetTop={-30}
            >
              <p className='cursor-pointer text-2xl animate-bounce'>📌</p>
            </Marker>
          </div>
        ))}
      </ReactMapGL>
      <button className="hidden" ref={ref} onClick={goToCountry}>
        Go to country
      </button>
    </>
  );
}

export default Map;
