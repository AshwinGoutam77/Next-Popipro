import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleBackdrop from "@components/SimpleBackDrop";
import { ChangePasswordApi } from "@services/Routes";
import Api from "@services/Api";
import { Modal } from "react-bootstrap";

export default function ChangePassword({ active, handleClose }) {
  const [Password, setPassword] = useState("");
  const [Confirm_Password, setConfirm_Password] = useState("");
  const [ShowLoader, setShowLoader] = useState(false);
  const [OldPassword, setOldPassword] = useState("");

  const handlecontinue = async () => {
    if (Password === "") {
      toast.error("Password field is requried", {
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
    setShowLoader(true);
    try {
      let payload = {
        password: Password,
        password_confirmation: Confirm_Password,
        old_password: OldPassword,
      };
      const response = await Api(ChangePasswordApi, payload);
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
        setPassword("");
        setConfirm_Password("");
        setOldPassword("");
        // window["closeModal"]();
        localStorage.removeItem("token");
        window.location.href = "/login";
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
    setShowLoader(false);
  };

  return (
    <>
      <SimpleBackdrop visible={ShowLoader} />
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
      <div
        className="modal fade"
        id="ChangePasswordModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ChangePasswordModal"
        aria-hidden="true"
      >
        <Modal show={active} onHide={() => handleClose("")} centered>
          <Modal.Header>
            <Modal.Title>
              <h5
                className="title title--h1 first-title title__separate mb-0"
                id="BlogModalTitle"
              >
                Password
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
              <form className="changePassword-form-section text-center px-0 pt-1 mb-4">
                <input
                  type="password"
                  name="number"
                  placeholder="Old Password*"
                  className="mt-2"
                  value={OldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="New Password*"
                  className="mt-2"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm Password*"
                  className="mt-2"
                  value={Confirm_Password}
                  onChange={(e) => setConfirm_Password(e.target.value)}
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
                  Update Password
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
