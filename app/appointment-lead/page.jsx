"use client";
import {
  faAngleLeft,
  faAngleRight,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { GetInshights } from "@services/Routes";
import Api from "@services/Api";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import "../../styles/about.css";
import { redirect } from "next/navigation";

export default function AppointmentLead() {
  const [Data, setData] = useState("");
  const [ModalId, setModalId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [Token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    api();
  }, []);

  const api = async () => {
    const response = await Api(GetInshights, {});
    if (response.data.status) {
      setData(response.data.data);
    }
  };

  return Token ? (
    <div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              More Detail
            </h5>
          </Modal.Title>
          <button
            type="button"
            class="close"
            onClick={() => setShowModal(false)}
          >
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "10px 5px" }}>
          {Data &&
            Data?.bookings?.map((item, index) => {
              return item.id == ModalId ? (
                <div className="leads-custom-table mb-1" key={index}>
                  <div className="d-flex align-items-start">
                    <p className="w-100 font-weight-bold">Name</p>
                    <p className="w-100">{item.name}</p>
                  </div>
                  <div className="d-flex align-items-start">
                    <p className="w-100 font-weight-bold">Email</p>
                    <p className="w-100">{item.email}</p>
                  </div>
                  <div className="d-flex align-items-start">
                    <p className="w-100 font-weight-bold">Contact Number</p>
                    <p className="w-100">{item.contact}</p>
                  </div>
                  <div className="d-flex align-items-start">
                    <p className="w-100 font-weight-bold">Appointment Date</p>
                    <p className="w-100">{item.date}</p>
                  </div>
                  <div className="d-flex align-items-start">
                    <p className="w-100 font-weight-bold">Appointment Time</p>
                    <p className="w-100">{item.time}</p>
                  </div>
                  <div className="d-flex align-items-start">
                    <p className="w-100 font-weight-bold">Created Date</p>
                    <p className="w-100">{item.created_at}</p>
                  </div>
                  {item.message ? (
                    <div className="d-flex align-items-start">
                      <p className="w-100 font-weight-bold">Message</p>
                      <p className="w-100">{item.message}</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              );
            })}
        </Modal.Body>
      </Modal>
      <div>
        <div
          className="login-header p-3 text-center d-flex align-items-center justify-content-between"
          style={{ background: "black" }}
        >
          <h5 className="text-white m-0 d-flex align-items-center">
            <FontAwesomeIcon
              icon={faCalendarCheck}
              className="text-white mr-2"
            />
            Appointments
          </h5>
          <Link href="/dashboard">
            <h6 className="text-white m-0">
              {" "}
              <FontAwesomeIcon icon={faAngleLeft} className="text-white mr-2" />
              Back
            </h6>
          </Link>
        </div>
        <div>
          {/* <h5 className="first-title title__separate mx-4 mt-4 text-black">
            Product Enquiry Leads
          </h5> */}

          <div className="box-shadow-leads mt-4">
            <table className="insight-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Req. Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Data?.bookings?.length === 0 ? (
                  <tr>
                    <td className="p-3">No data available</td>
                  </tr>
                ) : (
                  Data?.bookings?.map((item, index) => {
                    return (
                      <tr
                        data-column="Message"
                        key={index}
                        onClick={() => {
                          setModalId(item.id), setShowModal(true);
                        }}
                        className="cursor-pointer"
                      >
                        <td data-column="name">{item.name}</td>
                        <td data-column="name">
                          {item.contact ? item.contact : "-"}
                        </td>
                        <td data-column="created date">{item.created_at}</td>
                        <td className="d-flex align-items-center">
                          <FontAwesomeIcon
                            icon={faAngleRight}
                            className="text-dark ml-4"
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        className="w-100 text-center text-white p-2 position-absolute mt-3"
        style={{ bottom: "0", background: "black" }}
      >
        <p> © 2023. All Rights Reserved By Popipro.</p>
      </div>
    </div>
  ) : (
    redirect("/login")
  );
}
