import React, { useState } from "react";
import Api from "@services/Api";
import { HitSuggestion } from "@services/Routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleBackdrop from "@components/SimpleBackDrop";
import { Modal } from "react-bootstrap";

export default function Suggestions({ active, handleClose }) {
  const [Message, setMessage] = useState("");

  const handlecontinue = async () => {
    if (Message === "") {
      toast.error("Message field is requried", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      let payload = {
        suggestion: Message,
      };
      const response = await Api(HitSuggestion, payload);
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
        setMessage("");
        window["closeModal"]();
      } else {
        toast.error(response?.data.message, {
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
      toast(error.response?.data.message, {
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
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Modal show={active} onHide={() => handleClose('')} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              className="title title--h1 first-title title__separate mb-0"
              id="BlogModalTitle"
            >
              Suggestions
            </h5>
          </Modal.Title>

          <button type="button" className="close" onClick={() => handleClose('')}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <textarea
              type="password"
              name="number"
              placeholder="Drop a suggestion*"
              className="mt-2 form-control"
              value={Message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ minHeight: "150px" }}
              required
            />
            <button
              className="login-btn-main bg-btn7 lnk wow fadeInUp mt-4"
              data-wow-delay=".6s"
              style={{
                visibility: "visible",
                animationDelay: "0.6s",
                animationName: "fadeInUp",
              }}
              onClick={handlecontinue}
            >
              Save
            </button>
            {/* </form> */}
          </div>
        </Modal.Body>
      </Modal>
      {/* <div
        className="modal fade"
        id="SuggestionModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="SuggestionModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{ borderRadius: "10px" }}>
            <div className="modal-header">
              <h5
                className="title title--h1 first-title title__separate mb-0"
                id="BlogModalTitle"
              >
                Suggestions
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
            <div className="modal-body" style={{ padding: "30px 25px" }}>
              <div>
                
                <textarea
                  type="password"
                  name="number"
                  placeholder="Drop a suggestion*"
                  className="mt-2 form-control"
                  value={Message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ minHeight: "150px" }}
                  required
                />
                <button
                  className="login-btn-main bg-btn7 lnk wow fadeInUp mt-4"
                  data-wow-delay=".6s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.6s",
                    animationName: "fadeInUp",
                  }}
                  onClick={handlecontinue}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
