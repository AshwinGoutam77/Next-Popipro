import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useState } from "react";
import SimpleBackdrop from "../Backdrop";
import { UpgradePlan } from "@services/Routes";
import Api from "@services/Api";

export default function EditPlan({ PlanData, Data, APIDATA }) {
  const [ShowLoader, setShowLoader] = useState();
  const handleFreeTrail = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to activate 30 days Free trial for Premium Features without paying any money for now?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(24 123 249)",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await Api(UpgradePlan, {
            total_month: "1",
            is_trial: "1",
          });
          setShowLoader(false);
          if (response.data.status) {
            APIDATA();
            toast(response.data.message, {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            toast.error(response.data.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      });
    } catch (error) {
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      setShowLoader(false);
      toast(error.response.data.message, {
        position: "bottom-right",
        autoClose: 2000,
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
      {/* <SimpleBackdrop visible={ShowLoader} /> */}
      <div>
        {Data &&
        PlanData?.is_expired !== false &&
        PlanData?.is_trial_taken !== 0 ? (
          <a
            href="https://www.popipro.com/order"
            target="_blank"
            rel="noreferrer"
            className="w-100 text-center"
          >
            <div className="overlay-div d-flex align-items-start justify-content-end flex-column">
              <div className="d-flex align-items-center">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-white mb-2"
                  style={{ fontSize: "20px" }}
                />
                <p className="text-white ml-2 text-left">
                  Your plan has been expired, Click here to renew plan
                </p>
              </div>
            </div>
          </a>
        ) : PlanData?.subscription?.plan_id == null ||
          PlanData?.subscription?.plan_id == 1 ? (
          <>
            <div
              className="overlay-div d-flex align-items-start justify-content-end flex-column"
              onClick={() => handleFreeTrail()}
            >
              <div className="d-flex align-items-center">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-white mb-2"
                  style={{ fontSize: "20px" }}
                />
                <p className="text-white ml-2 text-left">
                  Click here to unlock the 30 days free trial
                </p>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
