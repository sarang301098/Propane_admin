/* eslint-disable no-undef */
import React, { useState } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  // DirectionsRenderer,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { BarsLoader } from "../loader/Loader";

// {
//   componentDidMount() {
//     const DirectionsService = new window.google.maps.DirectionsService();
//     DirectionsService.route(
//       {
//         origin: new window.google.maps.LatLng(41.85073, -87.65126),
//         destination: new window.google.maps.LatLng(41.85258, -87.65141),
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           this.setState({
//             directions: result,
//           });
//         } else {
//           console.error(`error fetching directions ${result}`);
//         }
//       }
//     );
//   },
// }

const CustomMap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    // "https://maps.googleapis.com/maps/api/js?key=AIzaSyAVD4PVxr93LUcy49_CDVxjCTC5CwHv5rM&v=3.exp&libraries=drawing",
    loadingElement: <BarsLoader />,
    containerElement: <div style={{ height: "500px", width: "auto" }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <GoogleMap
      googleMaps={props.googleMaps}
      defaultZoom={15}
      defaultCenter={
        props?.markers?.length
          ? {
              lat: props?.markers[0].lat,
              lng: props?.markers[0].lng,
            }
          : { lat: 22.9937, lng: 72.5016 }
      }
    >
      {/* <DirectionsRenderer
        directions={[
          { lat: 22.9937, lng: 72.5016 },
          { lat: 23.0362, lng: 72.5811 },
        ]}
      /> */}
      {props?.markers?.length &&
        props?.markers?.map(
          (marker, index) =>
            marker?.lat &&
            marker?.lng && (
              <Marker
                animation={google.maps.Animation.DROP}
                position={{ lat: marker?.lat, lng: marker?.lng }}
                onClick={() => setShowInfo(true)}
                key={index}
              >
                {showInfo && (
                  <InfoWindow onCloseClick={() => setShowInfo(false)}>
                    <div
                      style={{
                        backgroundColor: `black`,
                        opacity: 0.75,
                        padding: `12px`,
                      }}
                    >
                      Hello, Taipei!
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            )
        )}
    </GoogleMap>
  );
});

export default CustomMap;
