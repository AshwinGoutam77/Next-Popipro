"use client";
import Api from "@services/Api";
import { AppointmentBooking } from "@services/Routes";
import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function ContactForm({ card_url, Titles, PlanData, MainData }) {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Contact, setContact] = useState("");
  const [Message, setMessage] = useState("");
  const [Date, setDate] = useState("");
  const [Time, setTime] = useState("");

  const handleAppointment = async () => {
    if (Name == "") {
      toast.error("Name is requried", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (Contact == "") {
      toast.error("Mobile/Phone number is requried", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (Email == "") {
      toast.error("Email is requried", {
        position: "top-right",
        autoClose: 2000,
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
      let data = {
        card_url: card_url,
        name: Name,
        contact: Contact,
        email: Email,
        message: Message,
        date: Date,
        time: Time,
      };
      const response = await Api(AppointmentBooking, data);
      if (response.data.status) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setName("");
        setContact("");
        setEmail("");
        setMessage("");
        setDate("");
        setTime("");
      }
    } catch (error) {
      toast.error(error.response.data.message, {
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
  };
  return (
    <>
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

      {Titles.card_booking?.is_active === 1 &&
      PlanData?.is_expired == false &&
      PlanData?.subscription?.plan_id !== 1 &&
      PlanData?.subscription !== null ? (
        <div className="mt-3 box-content boxxx" id="card_booking">
          <div className="pb-2">
            <h2 className="title title--h1 first-title title__separate">
              {Titles && Titles.card_booking?.visible_name}
            </h2>
          </div>

          <div className="row">
            <div className="form-group col-lg-6 col-md-6 mb-2">
              {/* <label className="ml-2 font-weight-normal">Name*</label> */}
              <input
                type="text"
                className="form-control contactform-class"
                placeholder="Enter your name*"
                required="required"
                autoComplete="on"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-lg-6 col-md-6 mb-2">
              {/* <label className="ml-2 font-weight-normal">Contact number*</label> */}
              <input
                type="number"
                className="form-control contactform-class"
                placeholder="Enter your mobile/phone number*"
                required="required"
                autoComplete="on"
                value={Contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <div className="help-block with-errors"></div>
            </div>
            {MainData?.company_setting?.show_appointment_button !== 0 ? (
              <div className="row w-100 mx-0">
                <div className="form-group col-lg-6 col-md-6 mb-2">
                  {/* <label className="ml-2 font-weight-normal">
                    Appointment Date
                  </label> */}
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Date"
                    required="required"
                    autoComplete="on"
                    value={Date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <div className="help-block with-errors"></div>
                </div>
                <div className="form-group col-lg-6 col-md-6 mb-2">
                  {/* <label className="ml-2 font-weight-normal">
                    Appointment Time
                  </label> */}
                  <input
                    type="time"
                    className="form-control"
                    placeholder="Date"
                    required="required"
                    autoComplete="on"
                    value={Time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                  <div className="help-block with-errors"></div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="form-group col-lg-12 col-md-12 mb-2">
              {/* <label className="ml-2 font-weight-normal">Email address*</label> */}
              <input
                type="email"
                className="form-control contactform-class"
                placeholder="Enter your email address*"
                required="required"
                autoComplete="on"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-12 col-md-12 mb-2">
              {/* <label className="ml-2 font-weight-normal">Your message*</label> */}
              <textarea
                className="textarea form-control contactform-class"
                placeholder="Enter your message"
                rows="4"
                required="required"
                value={Message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-12 order-1 order-md-2 submitbutton">
              <button
                type="submit"
                className="contact-btn mt-0 w-auto"
                style={{ padding: "10px 60px" }}
                onClick={handleAppointment}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
