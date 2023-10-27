import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Swal from "sweetalert2";

import Api from "@services/Api";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import SimpleBackdrop from "@components/SimpleBackDrop";
import { UpgradePlan } from "@services/Routes";

export default function DashboardPlan({ Data, PlanData, APIDATA }) {
  const [ShowLoader, setShowLoader] = useState(false);
  const handleFreeTrail = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to activate 30 days Free trial for Premium Features without paying any money for now? ",
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
            Swal.fire("Done", "", "success");
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
      <SimpleBackdrop visible={ShowLoader} />
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {Data &&
      PlanData?.is_expired !== false &&
      PlanData?.is_trial_taken !== 0 ? (
        <a
          href="https://www.popipro.com/order"
          target="_blank"
          rel="noreferrer"
          className="text-center dashboard-overlay-div d-flex align-items-left justify-content-end flex-column"
        >
          <span className="text-white font-weight-bold text-center d-flex align-items-center">
            <FontAwesomeIcon
              icon={faLock}
              className="text-white mr-2"
              style={{ fontSize: "20px" }}
            />
            <span className="text-left">Renew your plan</span>
          </span>
        </a>
      ) : PlanData?.subscription?.plan_id == 1 ||
        PlanData?.subscription?.plan_id == null ? (
        <>
          <p
            className="text-center dashboard-overlay-div d-flex align-items-left justify-content-end flex-column"
            onClick={() => handleFreeTrail()}
          >
            <span className="text-white font-weight-bold text-left d-flex align-items-center">
              <FontAwesomeIcon
                icon={faLock}
                className="text-white mr-2"
                style={{ fontSize: "15px" }}
              />
              <span style={{ fontSize: "12px" }}>Premium Feature</span>
            </span>
          </p>
        </>
      ) : (
        ""
      )}
    </>
  );
}
