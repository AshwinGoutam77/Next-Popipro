"use client";
import SimpleBackdrop from "@components/SimpleBackDrop";
import {
  faAngleLeft,
  faAngleRight,
  faDownload,
  faSignal,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Api from "@services/Api";
import { GetInshights } from "@services/Routes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/about.css";
import { Modal } from "react-bootstrap";
import { redirect } from "next/navigation";

const Leads = () => {
  const [Data, setData] = useState("");
  const [ModalId, setModalId] = useState("");
  let d = new Date();
  const [StartDate, setStartDate] = useState(d.setMonth(d.getMonth() - 1));
  const [EndDate, setEndDate] = useState(new Date());
  const [ShowLoader, setShowLoader] = useState(false);
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

  function pad(n, width, z) {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  const handleSearchData = async () => {
    try {
      setShowLoader(true);
      let startDateNew = new Date(StartDate);
      let startDt =
        startDateNew?.getFullYear() +
        "-" +
        pad(parseInt(startDateNew.getMonth()) + 1, 2) +
        "-" +
        pad(startDateNew.getDate(), 2);
      let endDt =
        EndDate?.getFullYear() +
        "-" +
        pad(parseInt(EndDate.getMonth()) + 1, 2) +
        "-" +
        pad(EndDate.getDate(), 2);
      const response = await Api(
        GetInshights,
        {},
        "?start_date=" + startDt + "&end_date=" + endDt
      );
      if (response.data.status) {
        setData(response.data.data);
        setShowLoader(false);
      }
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

  const shareContact = async (name, number, email) => {
    var contact = {
      name: name,
      phone: number,
      email: email,
    };
    var vcard = "BEGIN:VCARD\nVERSION:3.0\nFN:";
    vcard +=
      contact.name +
      "\nTEL;TYPE=work,voice:" +
      contact.phone +
      "\nEMAIL;CHARSET=UTF-8;type=Email,INTERNET:" +
      contact.email +
      "\nURL;TYPE=Popipro - Digital Business Card:" +
      contact.url;

    vcard += "\nEND:VCARD";

    var blob = new Blob([vcard], { type: "text/vcard" });
    var url = URL.createObjectURL(blob);

    const newLink = document.createElement("a");
    newLink.download = contact.name + ".vcf";
    newLink.textContent = contact.name;
    newLink.href = url;

    newLink.click();
  };

  return Token ? (
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
      <div
        className="login-header p-3 text-center d-flex align-items-center justify-content-between"
        style={{ background: "black" }}
      >
        <h5 className="text-white m-0">
          <FontAwesomeIcon icon={faSignal} className="text-white mr-2" /> Lead
          Analytics
        </h5>
        <Link href="/dashboard">
          <h6 className="text-white m-0">
            {" "}
            <FontAwesomeIcon icon={faAngleLeft} className="text-white mr-2" />
            Back
          </h6>
        </Link>
      </div>
      <Modal show={showModal} onHide={() => setShowModal("")} centered>
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
          {Data?.leads?.map((item, index) => {
            return item.id == ModalId ? (
              <div className="leads-custom-table mb-1" key={index}>
                <div className="d-flex align-items-start">
                  <p className="w-100 font-weight-bold">Name</p>
                  <p className="w-100">{item.full_name}</p>
                </div>
                {item.email_address ? (
                  <div className="d-flex align-items-start">
                    <p className="w-100 font-weight-bold">Email</p>
                    <p className="w-100">{item.email_address}</p>
                  </div>
                ) : (
                  ""
                )}
                <div className="d-flex align-items-start">
                  <p className="w-100 font-weight-bold">Contact Number</p>
                  <p className="w-100">{item.contact_number}</p>
                </div>
                <div className="d-flex align-items-start">
                  <p className="w-100 font-weight-bold">Date</p>
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
      {/* <div
        className="modal fade"
        id="LeadsModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="LeadsModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{ borderRadius: "10px" }}>
            <div className="modal-header">
              <h5
                className="title title--h1 first-title title__separate mb-0"
                id="BlogModalTitle"
              >
                More Detail
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
            <div className="modal-body" style={{ padding: "10px 5px" }}>
              {Data?.leads?.map((item, index) => {
                return item.id == ModalId ? (
                  <div className="leads-custom-table mb-1" key={index}>
                    <div className="d-flex align-items-start">
                      <p className="w-100 font-weight-bold">Name</p>
                      <p className="w-100">{item.full_name}</p>
                    </div>
                    {item.email_address ? (
                      <div className="d-flex align-items-start">
                        <p className="w-100 font-weight-bold">Email</p>
                        <p className="w-100">{item.email_address}</p>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="d-flex align-items-start">
                      <p className="w-100 font-weight-bold">Contact Number</p>
                      <p className="w-100">{item.contact_number}</p>
                    </div>
                    <div className="d-flex align-items-start">
                      <p className="w-100 font-weight-bold">Date</p>
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
            </div>
          </div>
        </div>
      </div> */}
      <div
        className="d-flex align-items-center flex-column justify-content-between h-100vh w-100"
        style={{ height: "calc(100vh - 58px)" }}
      >
        <div className="w-100">
          <h5 className="first-title title__separate mx-4 mt-4 text-black">
            Your last one month leads
          </h5>

          <div className="mx-3">
            <div className="row w-100 m-0 p-0 mb-4 align-items-end">
              <div className="col-6 col-lg-2 p-0 px-2">
                <lable className="ml-1">From</lable>
                <DatePicker
                  dateFormat="MM/dd/yyyy"
                  selected={StartDate}
                  maxDate={new Date()}
                  onChange={(date) => setStartDate(date)}
                  placeholderText={"End Date"}
                  className="form-control insight-filter w-100"
                />
              </div>
              <div className="col-6 col-lg-2 p-0 px-2">
                <lable className="ml-1">To</lable>
                <DatePicker
                  dateFormat="MM/dd/yyyy"
                  selected={EndDate}
                  defaultValue={EndDate}
                  onChange={(Date) => setEndDate(Date)}
                  maxDate={new Date()}
                  placeholderText={"End Date"}
                  className="form-control insight-filter w-100"
                />
              </div>
              <div className="col-6 col-lg-2 p-0 px-2">
                <button
                  className="insight-search w-100 mt-3"
                  onClick={handleSearchData}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="box-shadow-leads">
            <table className="insight-table">
              <thead>
                <tr>
                  <th>Name</th>
                  {/* <th>Contact no.</th> */}
                  <th>Date</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Data?.leads?.length === 0 ? (
                  <tr>
                    <td className="p-3">No data available</td>
                  </tr>
                ) : (
                  Data?.leads?.map((item, index) => {
                    return (
                      <tr
                        data-column="Message"
                        key={index}
                        onClick={() => setModalId(item.id)}
                        className="cursor-pointer"
                      >
                        <td
                          data-column="Name"
                          onClick={() => setShowModal(true)}
                        >
                          {item.full_name} ({item?.contact_number})
                        </td>
                        {/* <td
                          data-column="Email"
                          data-toggle="modal"
                          data-target="#LeadsModal"
                        >
                          {item.contact_number}
                        </td> */}
                        <td
                          className="leads-short-para"
                          onClick={() => setShowModal(true)}
                        >
                          {item.created_at}
                        </td>
                        <td>
                          <FontAwesomeIcon
                            icon={faDownload}
                            className="text-dark ml-4"
                            onClick={() =>
                              shareContact(
                                item.full_name,
                                item.contact_number,
                                item.email
                              )
                            }
                          />
                        </td>
                        <td onClick={() => setShowModal(true)}>
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
        <div
          className="w-100 text-center text-white p-2 mt-3"
          style={{ bottom: "0", background: "black" }}
        >
          <p> © 2023. All Rights Reserved By Popipro.</p>
        </div>
      </div>
    </>
  ) : (
    redirect("/login")
  );
};

export default Leads;
