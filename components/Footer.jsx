/* eslint-disable eqeqeq */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Footer({ Data, card_url }) {
  const [Token, setToken] = useState("");
  const handleLOGOUT = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("url");
    window.location.href = "/login";
  };
  const HandleLogOutPopup = () => {
    Swal.fire({
      title: `You are not authorize to access this area.`,
      icon: "info",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `<p>Logout</p>`,
    }).then((result) => {
      if (result["isConfirmed"]) {
        handleLOGOUT();
      }
    });
  };
  useEffect(() => {
    setToken(localStorage.getItem("url"));
  }, [Token]);

  return (
    <>
      <div className="w-100 footer-div text-center">
        <img
          src="https://www.popipro.com/assets/images/whiteLogo.png"
          style={{ width: "110px" }}
          alt="photos"
        />
        <p className="mb-4 mt-2 footer-para">
          One card to connect, collect, showcase and track{" "}
          <span className="ml-1">
            - revolutionize your network with a tap.{" "}
          </span>
        </p>
        <div
          className="d-flex align-items-center mt-3 justify-content-center"
          style={{ gap: "10px" }}
        >
          <button className="footer-btn">
            <Link
              href="https://www.popipro.com/shop"
              className="text-white"
              target="_blank"
            >
              Get your PopiCard
            </Link>
          </button>
          {card_url == Token || Token === null ? (
            <Link href={"/edit/" + card_url}>
              <button className="footer-btn text-white">
                <span>Login to PopiCard</span>
              </button>
            </Link>
          ) : (
            <button
              className="footer-btn text-white"
              onClick={HandleLogOutPopup}
            >
              <span>Login To PopiCard</span>
            </button>
          )}
        </div>
        <p className="m-0 mt-4 pb-3 text-center footer-copyright">
          Copyright © 2023 All Rights Reserved.
        </p>
      </div>
    </>
  );
}
