import React from "react";
import { Modal } from "react-bootstrap";
import CustomMap from "./Map";

interface Prop {
  showMap: boolean;
  fetchLatLong: NodeJS.Timer | undefined;
  setShowMap: Function;
  markers: null | { lat: number | string; lng: number | string }[];
}

const LiveLocation: React.FC<Prop> = ({
  showMap,
  fetchLatLong,
  setShowMap,
  markers,
}) => {
  return (
    <Modal
      centered
      size="lg"
      show={showMap}
      onHide={() => {
        fetchLatLong && clearInterval(fetchLatLong);
        setShowMap(false);
      }}
    >
      <Modal.Header>
        <h4 className="modal-title">Truck Location</h4>
        <button
          className="close"
          onClick={() => {
            fetchLatLong && clearInterval(fetchLatLong);
            setShowMap(false);
          }}
        >
          <span aria-hidden="true" className="zmdi zmdi-close"></span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <CustomMap markers={markers ? markers : []} />
      </Modal.Body>
    </Modal>
  );
};

export default LiveLocation;
