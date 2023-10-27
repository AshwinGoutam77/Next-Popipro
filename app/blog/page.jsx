"use client";
import {
  faAngleLeft,
  faAngleRight,
  faChartSimple,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { GetInshights } from "@services/Routes";
import Api from "@services/Api";
import { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import SimpleBackdrop from "@components/SimpleBackDrop";
import "../../styles/about.css";
import { redirect } from "next/navigation";

export default function DashboardBlogs() {
  const [Data, setData] = useState("");
  const [ModalId, setModalId] = useState("");
  let d = new Date();
  const [StartDate, setStartDate] = useState(d.setMonth(d.getMonth() - 1));
  const [EndDate, setEndDate] = useState(new Date());
  const [ShowLoader, setShowLoader] = useState(false);
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
      <div>
        <div
          className="login-header p-3 text-center d-flex align-items-center justify-content-between"
          style={{ background: "black" }}
        >
          <h5 className="text-white m-0">
            <FontAwesomeIcon icon={faNewspaper} className="text-white mr-2" />{" "}
            {Data?.title_array?.card_blogs?.visible_name}
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
          <h5 className="first-title title__separate mx-4 mt-4 text-black">
            Your last one month {Data?.title_array?.card_blogs?.visible_name}{" "}
            Analytics
          </h5>

          <div className="mx-3">
            <div className="row w-100 m-0 p-0 mb-4 align-items-end">
              <div className="col-6 col-lg-2 p-0 px-2">
                <lable className="ml-1">From</lable>
                <DatePicker
                  selected={StartDate}
                  onChange={(Date) => setStartDate(Date)}
                  maxDate={new Date()}
                  placeholderText={"End Date"}
                  className="form-control insight-filter w-100"
                />
              </div>
              <div className="col-6 col-lg-2 p-0 px-2">
                <lable className="ml-1">To</lable>
                <DatePicker
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
                  <th>Views</th>
                </tr>
              </thead>
              <tbody>
                {Data?.blog_states?.length === 0 ? (
                  <tr>
                    <td className="p-3">No data available</td>
                  </tr>
                ) : (
                  Data?.blog_states?.map((item, index) => {
                    return (
                      <tr key={index} className="cursor-pointer">
                        <td data-column="Name">{item.name}</td>
                        <td data-column="Email">{item.count}</td>
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
    </>
  ) : (
    redirect("/login")
  );
}
