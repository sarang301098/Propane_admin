import React from "react";
import { Modal } from "react-bootstrap";
import { TNotificationPayload } from "../../store/notification/notification.types";

interface Prop {
  show: boolean;
  setShow: Function;
  innerHtml: boolean;
  notification: TNotificationPayload | null;
}

const ViewModal: React.FC<Prop> = ({
  show,
  setShow,
  innerHtml,
  notification,
}) => {
  const handleClose = () => setShow(false);
  return (
    <Modal centered show={show}>
      <Modal.Header>
        <h4 className="modal-title">Notification</h4>
        <button className="close" onClick={() => handleClose()}>
          <span aria-hidden="true" className="zmdi zmdi-close"></span>
        </button>
      </Modal.Header>
      <Modal.Body>
        {notification?.description && (
          <div
            dangerouslySetInnerHTML={{ __html: notification?.description }}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ViewModal;
