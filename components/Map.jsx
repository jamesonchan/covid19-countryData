import React, { useState, useRef, useEffect } from "react";
import ReactMapGL, { FlyToInterpolator, Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";
import { useRecoilState } from "recoil";
import { countryInfoState } from "../atoms/CountryInfoAtom";

function Map() {
  const [countryInfo] = useRecoilState(countryInfoState);
  const [selectedCountry, setSelectedCountry] = useState({});

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

  const buttonRef = useRef(null);
  const popupRef = useRef(null);

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
    buttonRef.current.click();
  }, [center.latitude, center.longitude]);

  useEffect(() => {
    const timer = setTimeout(()=>{
      popupRef?.current?.click()
    },5100)
    return ()=>clearTimeout(timer)
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
              <p
                ref={popupRef}
                onClick={() => setSelectedCountry(result)}
                className="cursor-pointer text-2xl animate-bounce"
                aria-label="pin"
              >
                📌
              </p>
            </Marker>
            {/* popup */}
            {selectedCountry.longitude === result.longitude ? (
              <Popup
                onClose={() => setSelectedCountry({})}
                offsetLeft={-5}
                offsetTop={-20}
                closeOnClick={true}
                latitude={result.latitude}
                longitude={result.longitude}
                tipSize={5}
                className="popup"
              >
                <div className="p-5 w-[240px] text-white font-semibold">
                  <h1 className="text-sm  text-center">
                    {result.country} ({result.code})
                  </h1>
                  <p>Case confirmed : {result.confirmed}</p>
                  <p>Deaths : {result.deaths}</p>
                  <p>Recovered : {result.recovered}</p>
                </div>
              </Popup>
            ) : (
              false
            )}
          </div>
        ))}
      </ReactMapGL>
      <button className="hidden" ref={buttonRef} onClick={goToCountry}>
        Go to country
      </button>
    </>
  );
}

export default Map;
