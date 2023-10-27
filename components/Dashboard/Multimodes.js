/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import Api from "@services/Api";
import { toast } from "react-toastify";
import { UpgradeLandingMode } from "@services/Routes";
import { Modal } from "react-bootstrap";

export default function Multimodes({
  APIDATA,
  Data,
  MainData,
  TitleData,
  Appointment,
  active,
  handleClose,
}) {
  const [ShowLoader, setShowLoader] = useState(false);
  const [ActiveProfile, setActiveProfile] = useState(false);
  const [ActiveContact, setActiveContact] = useState(false);
  const [ActiveGoogleReview, setActiveGoogleReview] = useState(false);
  const [ActiveForm, setActiveForm] = useState(false);
  const [ActiveWhatsapp, setActiveWhatsapp] = useState(false);
  const [ActiveShareContact, setActiveShareContact] = useState(false);
  const [ShowAppointment, setShowAppointment] = useState(false);
  const [Active, setActive] = useState(false);

  if (!ActiveProfile && Data?.landing_mode === "profile-preview") {
    setActiveProfile(true);
    setActiveContact(false);
    setActiveGoogleReview(false);
    setActiveForm(false);
    setActiveWhatsapp(false);
    setActiveShareContact(false);
    setActive(false);
    setShowAppointment(false);
  } else if (!ActiveContact && Data?.landing_mode === "save-contact") {
    setActiveProfile(false);
    setActiveContact(true);
    setActiveGoogleReview(false);
    setActiveForm(false);
    setActiveWhatsapp(false);
    setActiveShareContact(false);
    setActive(false);
    setShowAppointment(false);
  } else if (!ActiveForm && Data?.landing_mode === "custom-forms") {
    setActiveProfile(false);
    setActiveContact(false);
    setActiveGoogleReview(false);
    setActiveForm(true);
    setActiveWhatsapp(false);
    setActiveShareContact(false);
    setActive(false);
    setShowAppointment(false);
  } else if (
    !ActiveGoogleReview &&
    Data?.landing_mode === "open-google-review"
  ) {
    setActiveProfile(false);
    setActiveContact(false);
    setActiveGoogleReview(true);
    setActiveForm(false);
    setActiveWhatsapp(false);
    setActiveShareContact(false);
    setActive(false);
    setShowAppointment(false);
  } else if (!ActiveWhatsapp && Data?.landing_mode === "whatsapp") {
    setActiveProfile(false);
    setActiveContact(false);
    setActiveGoogleReview(false);
    setActiveForm(false);
    setActiveWhatsapp(true);
    setActiveShareContact(false);
    setActive(false);
    setShowAppointment(false);
  } else if (!ActiveShareContact && Data?.landing_mode === "share-contact") {
    setActiveProfile(false);
    setActiveContact(false);
    setActiveGoogleReview(false);
    setActiveForm(false);
    setActiveShareContact(true);
    setActiveWhatsapp(false);
    setActive(false);
    setShowAppointment(false);
  } else if (!ShowAppointment && Data?.landing_mode === "appointment") {
    setShowAppointment(true);
    setActiveProfile(false);
    setActiveContact(false);
    setActiveGoogleReview(false);
    setActiveForm(false);
    setActiveShareContact(false);
    setActiveWhatsapp(false);
    setActive(false);
  } else if (!Active && Data?.landing_mode === "enquiry") {
    setActive(true);
    setActiveProfile(false);
    setActiveContact(false);
    setActiveGoogleReview(false);
    setActiveForm(false);
    setActiveShareContact(false);
    setActiveWhatsapp(false);
    setShowAppointment(false);
  }

  const handleLandingMode = async (type) => {
    if (type == "profile-preview") {
      setActiveProfile(true);
      setActiveContact(false);
      setActiveGoogleReview(false);
      setActiveForm(false);
      setActiveWhatsapp(false);
      setActiveShareContact(false);
      setActive(false);
      setShowAppointment(false);
    } else if (type == "save-contact") {
      setActiveProfile(false);
      setActiveContact(true);
      setActiveGoogleReview(false);
      setActiveForm(false);
      setActiveWhatsapp(false);
      setActiveShareContact(false);
      setActive(false);
      setShowAppointment(false);
    } else if (type == "custom-forms") {
      setActiveProfile(false);
      setActiveContact(false);
      setActiveGoogleReview(false);
      setActiveForm(true);
      setActiveWhatsapp(false);
      setActiveShareContact(false);
      setActive(false);
      setShowAppointment(false);
    } else if (type == "open-google-review") {
      setActiveProfile(false);
      setActiveContact(false);
      setActiveGoogleReview(true);
      setActiveForm(false);
      setActiveWhatsapp(false);
      setActiveShareContact(false);
      setActive(false);
      setShowAppointment(false);
    } else if (type == "whatsapp") {
      setActiveProfile(false);
      setActiveContact(false);
      setActiveGoogleReview(false);
      setActiveForm(false);
      setActiveWhatsapp(true);
      setActiveShareContact(false);
      setActive(false);
      setShowAppointment(false);
    } else if (type == "share-contact") {
      setActiveProfile(false);
      setActiveContact(false);
      setActiveGoogleReview(false);
      setActiveForm(false);
      setActiveShareContact(true);
      setActiveWhatsapp(false);
      setActive(false);
      setShowAppointment(false);
    } else if (type == "appointment") {
      setShowAppointment(true);
      setActiveProfile(false);
      setActiveContact(false);
      setActiveGoogleReview(false);
      setActiveForm(false);
      setActiveShareContact(false);
      setActiveWhatsapp(false);
      setActive(false);
    } else if (type == "enquiry") {
      setActive(true);
      setActiveProfile(false);
      setActiveContact(false);
      setActiveGoogleReview(false);
      setActiveForm(false);
      setActiveShareContact(false);
      setActiveWhatsapp(false);
      setShowAppointment(false);
    }
    setShowLoader(true);
    try {
      let payload = {
        landing_mode: type,
      };
      const response = await Api(UpgradeLandingMode, payload);
      if (response.data.status) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        APIDATA();
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setShowLoader(false);
  };

  return (
    <>
      {/* <div
        className="modal fade"
        id="MultimodesModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="MultimodesModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{ borderRadius: "10px" }}>
            <div className="modal-header">
              <h5
                className="title title--h1 first-title title__separate mb-0"
                id="BlogModalTitle"
              >
                Multi Mode Settings
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" style={{ padding: "25px" }}>
              <div>
                <h6 className="text-center mb-2 Varcolor font-weight-normal">
                  Change your default card tap behaviour.
                </h6>
                <ul className="m-0 p-0 multimodes-ul">
                  <li className="d-flex align-items-center justify-content-between mb-2">
                    <h6 className="mb-0">Open Profile</h6>
                    <label className="switch">
                      <input
                        data-status={ActiveProfile}
                        data-active={ActiveProfile}
                        checked={ActiveProfile}
                        type="checkbox"
                        name="hello"
                        onChange={() => handleLandingMode("profile-preview")}
                      />
                      <span className="slider round"></span>
                    </label>
                  </li>
                  <li className="d-flex align-item-center justify-content-between mb-2">
                    <h6 className="mb-0">Open Save Contact</h6>
                    <label className="switch">
                      <input
                        data-status={ActiveContact}
                        data-active={ActiveContact}
                        checked={ActiveContact}
                        type="checkbox"
                        name="hello"
                        onChange={() => handleLandingMode("save-contact")}
                      />
                      <span className="slider round"></span>
                    </label>
                  </li>
                  {Data?.card_google_review !== null ? (
                    <li className="d-flex align-item-center justify-content-between mb-2">
                      <h6 className="mb-0">Open Google Review Page</h6>
                      <label className="switch">
                        <input
                          data-status={ActiveGoogleReview}
                          data-active={ActiveGoogleReview}
                          checked={ActiveGoogleReview}
                          type="checkbox"
                          onChange={() =>
                            handleLandingMode("open-google-review")
                          }
                        />
                        <span className="slider round"></span>
                      </label>
                    </li>
                  ) : (
                    ""
                  )}
                  {Data?.whatsapp_number !== null ? (
                    <li className="d-flex align-item-center justify-content-between mb-2">
                      <h6 className="mb-0">Open Whatsapp</h6>
                      <label className="switch">
                        <input
                          data-status={ActiveWhatsapp}
                          data-active={ActiveWhatsapp}
                          checked={ActiveWhatsapp}
                          type="checkbox"
                          onChange={() => handleLandingMode("whatsapp")}
                        />
                        <span className="slider round"></span>
                      </label>
                    </li>
                  ) : (
                    ""
                  )}
                  <li className="d-flex align-item-center justify-content-between mb-2">
                    <h6 className="mb-0">Open Share Contact</h6>
                    <label className="switch">
                      <input
                        data-status={ActiveShareContact}
                        data-active={ActiveShareContact}
                        checked={ActiveShareContact}
                        type="checkbox"
                        onChange={() => handleLandingMode("share-contact")}
                      />
                      <span className="slider round"></span>
                    </label>
                  </li>
                  <li className="d-flex align-item-center justify-content-between mb-2">
                    <h6 className="mb-0">Open Appointment</h6>
                    <label className="switch">
                      <input
                        data-status={ShowAppointment}
                        data-active={ShowAppointment}
                        checked={ShowAppointment}
                        type="checkbox"
                        onChange={() => handleLandingMode("appointment")}
                      />
                      <span className="slider round"></span>
                    </label>
                  </li>
                  <li className="d-flex align-item-center justify-content-between mb-2">
                    <h6 className="mb-0">Open Review</h6>
                    <label className="switch">
                      <input
                        data-status={Active}
                        data-active={Active}
                        checked={Active}
                        type="checkbox"
                        onChange={() => handleLandingMode("enquiry")}
                      />
                      <span className="slider round"></span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div
        className="modal fade"
        id="MultimodesModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="MultimodesModal"
        aria-hidden="true"
      >
        <Modal show={active} onHide={() => handleClose("")} centered>
          <Modal.Header>
            <Modal.Title>
              <h5
                className="title title--h1 first-title title__separate mb-0"
                id="MultimodesModal"
              >
                Multi Mode Settings
              </h5>
            </Modal.Title>

            <button
              type="button"
              className="close"
              onClick={() => handleClose("")}
            >
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close alert</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h6 className="text-center mb-2 Varcolor font-weight-normal">
                Change your default card tap behaviour.
              </h6>
              <ul className="m-0 p-0 multimodes-ul">
                <li className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="mb-0">Open Profile</h6>
                  <label className="switch">
                    <input
                      data-status={ActiveProfile}
                      data-active={ActiveProfile}
                      checked={ActiveProfile}
                      type="checkbox"
                      name="hello"
                      onChange={() => handleLandingMode("profile-preview")}
                    />
                    <span className="slider round"></span>
                  </label>
                </li>
                <li className="d-flex align-item-center justify-content-between mb-2">
                  <h6 className="mb-0">Open Save Contact</h6>
                  <label className="switch">
                    <input
                      data-status={ActiveContact}
                      data-active={ActiveContact}
                      checked={ActiveContact}
                      type="checkbox"
                      name="hello"
                      onChange={() => handleLandingMode("save-contact")}
                    />
                    <span className="slider round"></span>
                  </label>
                </li>
                {Data?.card_google_review !== null ? (
                  <li className="d-flex align-item-center justify-content-between mb-2">
                    <h6 className="mb-0">Open Google Review Page</h6>
                    <label className="switch">
                      <input
                        data-status={ActiveGoogleReview}
                        data-active={ActiveGoogleReview}
                        checked={ActiveGoogleReview}
                        type="checkbox"
                        onChange={() => handleLandingMode("open-google-review")}
                      />
                      <span className="slider round"></span>
                    </label>
                  </li>
                ) : (
                  ""
                )}
                {Data?.whatsapp_number !== null ? (
                  <li className="d-flex align-item-center justify-content-between mb-2">
                    <h6 className="mb-0">Open Whatsapp</h6>
                    <label className="switch">
                      <input
                        data-status={ActiveWhatsapp}
                        data-active={ActiveWhatsapp}
                        checked={ActiveWhatsapp}
                        type="checkbox"
                        onChange={() => handleLandingMode("whatsapp")}
                      />
                      <span className="slider round"></span>
                    </label>
                  </li>
                ) : (
                  ""
                )}
                <li className="d-flex align-item-center justify-content-between mb-2">
                  <h6 className="mb-0">Open Share Contact</h6>
                  <label className="switch">
                    <input
                      data-status={ActiveShareContact}
                      data-active={ActiveShareContact}
                      checked={ActiveShareContact}
                      type="checkbox"
                      onChange={() => handleLandingMode("share-contact")}
                    />
                    <span className="slider round"></span>
                  </label>
                </li>
                <li className="d-flex align-item-center justify-content-between mb-2">
                  <h6 className="mb-0">Open Appointment</h6>
                  <label className="switch">
                    <input
                      data-status={ShowAppointment}
                      data-active={ShowAppointment}
                      checked={ShowAppointment}
                      type="checkbox"
                      onChange={() => handleLandingMode("appointment")}
                    />
                    <span className="slider round"></span>
                  </label>
                </li>
                <li className="d-flex align-item-center justify-content-between mb-2">
                  <h6 className="mb-0">Open Review</h6>
                  <label className="switch">
                    <input
                      data-status={Active}
                      data-active={Active}
                      checked={Active}
                      type="checkbox"
                      onChange={() => handleLandingMode("enquiry")}
                    />
                    <span className="slider round"></span>
                  </label>
                </li>
              </ul>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
