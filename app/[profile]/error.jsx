"use client";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Error() {
  return (
    <div
      className="d-flex align-items-center justify-content-center text-center flex-column"
      style={{ height: "100vh", padding: "0px 60px", fontSize: "18px" }}
    >
      <img src="./static/img/notfound.png" alt="img" width="250px" />
      <h6 className="mt-2">Something went wrong</h6>
      <a
        to="https://www.popipro.com/"
        className="w-100 d-flex align-items-center justify-content-center"
      >
        <button
          className="contact-btn backHomebtn d-flex align-items-center justify-content-center"
          style={{ fontSize: "16px" }}
        >
          Back to popipro
          <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
        </button>
      </a>
    </div>
  );
}
