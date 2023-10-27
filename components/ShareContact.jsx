import React from "react";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

export default function ShareContact() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 class="title title--h1 first-title title__separate mb-1">
              Leave a Review
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-lg-12 col-md-12 mb-3">
              <lable className="modalFormLable">
                Upload Image (*Prefered size in ration of 100x100)
              </lable>
              <input
                type="file"
                name="image"
                className="form-control"
                accept="image/png, image/gif, image/jpeg"
                style={{ border: "1px solid #ccc" }}
                /* ref={aRef} */
                /* onChange={(e) => setImage(e.target.files[0])} */
              />
            </div>
            <div className="form-group col-lg-6 col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name*"
                required="required"
                autoComplete="on"
                value={Name}
                onChange={(e) => {}}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-lg-6 col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Sub-Title"
                required="required"
                autoComplete="on"
                value={SubTitle}
                onChange={(e) => {}}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-lg-12 col-md-6 mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Phone Number"
                required="required"
                autoComplete="on"
                value={phoneNumber}
                onChange={(e) => {}}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-12 col-md-12 mb-3">
              <textarea
                className="textarea form-control"
                placeholder="Your message*"
                rows="4"
                required="required"
                value={Description}
                onChange={(e) => {}}
              ></textarea>
              <div className="help-block with-errors"></div>
            </div>
            <div className="col-12 col-md-12 order-1 order-md-2 submitbutton">
              <button
                type="submit"
                className="contact-btn mt-0 w-auto"
                style={{ padding: "10px 60px" }}
                onClick={handleSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
