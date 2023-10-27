import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { CardData } from "@services/Routes";
import Api from "@services/Api";

export default function EditFooter({ Data, card_url, APIDATA }) {
  const SaveStatusApi = async () => {
    // setShowLoader(true);
    if (Data.first_name == null) {
      toast("Name field is requried", {
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
    const response = await Api(CardData, { is_onboarding: 2 });
    if (response.status) {
      APIDATA();
    }
    // setShowLoader(false);
  };
  return (
    <>
      <div className="w-100 footer-div d-flex align-items-center justify-content-center flex-column">
        <img
          src="https://www.popipro.com/assets/images/whiteLogo.png"
          style={{ width: "110px" }}
          alt="photos"
        />
        <p className="mb-0 text-center mt-2">
          One card to connect, collect, showcase and track - revolutionize your
          network with a tap.
        </p>
        <div className="d-flex align-items-center mt-3" style={{ gap: "10px" }}>
          <Link href={"/" + card_url}>
            <button
              className="footer-btn"
              onClick={(e) => SaveStatusApi()}
              defaultValue="1"
            >
              <span>
                {Data?.is_onboarding == "2"
                  ? "View PopiCard"
                  : "Publish and view your PopiCard"}
              </span>
              <FontAwesomeIcon
                icon={faForward}
                className={"ml-2"}
                style={{ fontSize: "14px", cursor: "pointer" }}
              />
            </button>
          </Link>
        </div>
        <p className="mt-4 mb-4 text-center footer-copyright">
          Copyright © 2023 All Rights Reserved.
        </p>
      </div>
    </>
  );
}
