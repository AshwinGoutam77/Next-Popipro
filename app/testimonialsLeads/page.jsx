"use client";
import {
  faAngleLeft,
  faAngleRight,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ActiveTestimonials, GetTestimonials } from "@services/Routes";
import Api from "@services/Api";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import Link from "next/link";
import "../../styles/about.css";
import { redirect } from "next/navigation";

export default function TestimonialsLeads() {
  const [Data, setData] = useState("");
  const [ModalId, setModalId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [Token, setToken] = useState("");

  const handleTestimonialsData = async () => {
    try {
      const response = await Api(GetTestimonials, {});
      if (response.data.status) {
        setData(response.data.data);
      }
    } catch (error) {
      if (error?.request?.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      toast(error?.response?.data?.message, {
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

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    handleTestimonialsData();
  }, []);

  const handleActiveTestimonials = async (id) => {
    let data = {
      testimonial_id: id,
      type: 1,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "Once you active this testimonial it will show in your profile",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(99 171 187)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Active",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await Api(ActiveTestimonials, data);
        if (response.data.status) {
          Swal.fire("Testimonial Activated!", "", "success");
          handleTestimonialsData();
        }
      }
    });
  };

  const handleDeleteTestimonials = async (id) => {
    let data = {
      testimonial_id: id,
      type: 0,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "Once you delete this testimonial request, you can't revert it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(99 171 187)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await Api(ActiveTestimonials, data);
        if (response.data.status) {
          Swal.fire("Testimonial Activated!", "", "success");
          handleTestimonialsData();
        }
      }
    });
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
            Data?.map((item, index) => {
              return item.id == ModalId ? (
                <div className="leads-custom-table mb-1" key={index}>
                  <div className="d-flex align-items-start">
                    <p className="w-100 font-weight-bold">Name</p>
                    <p className="w-100">{item.name}</p>
                  </div>
                  <div className="d-flex align-items-start">
                    <p className="w-100 font-weight-bold">Sub Title</p>
                    <p className="w-100">{item.company_name}</p>
                  </div>
                  <div className="d-flex align-items-start">
                    <p className="w-100 font-weight-bold">Contact Number</p>
                    <p className="w-100">{item.user_contact_number}</p>
                  </div>
                  <div className="d-flex align-items-start">
                    <p className="w-100 font-weight-bold">Date</p>
                    <p className="w-100">{item.created_at}</p>
                  </div>
                  {item.description ? (
                    <div className="d-flex align-items-start">
                      <p className="w-100 font-weight-bold">Message</p>
                      <p className="w-100">{item.description}</p>
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
          <h5 className="text-white m-0">
            <FontAwesomeIcon icon={faStar} className="text-white mr-2" />
            Approve request
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
          <div className="box-shadow-leads mt-4">
            <table className="insight-table">
              <thead>
                <tr>
                  <th>Contact</th>
                  <th>Req. Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Data?.length === 0 ? (
                  <tr>
                    <td className="p-3">No data available</td>
                  </tr>
                ) : (
                  Data?.map((item, index) => {
                    return (
                      <tr
                        data-column="Message"
                        key={index}
                        className="cursor-pointer"
                      >
                        <td
                          data-column="name"
                          onClick={() => {
                            setModalId(item.id), setShowModal(true);
                          }}
                        >
                          {/* {item.contact_number} */}
                          {item.user_contact_number}
                        </td>
                        <td
                          data-column="created date"
                          onClick={() => {
                            setModalId(item.id), setShowModal(true);
                          }}
                        >
                          {/* {item.created_at} */}
                          {item.created_at}
                        </td>
                        <td
                          data-column="status"
                          onClick={() => handleActiveTestimonials(item.id)}
                        >
                          {/* {item.created_at} */}
                          <p href="#" class="badge badge-danger">
                            Approve It
                          </p>
                        </td>
                        <td className="d-flex align-items-center">
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-dark ml-1"
                            onClick={() => handleDeleteTestimonials(item.id)}
                          />
                          <FontAwesomeIcon
                            icon={faAngleRight}
                            className="text-dark ml-4"
                            onClick={() => {
                              setModalId(item.id), setShowModal(true);
                            }}
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
