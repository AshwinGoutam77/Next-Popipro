"use client";
import SimpleBackdrop from "@components/SimpleBackDrop";
import {
  faAngleLeft,
  faBagShopping,
  faChartSimple,
  faChevronRight,
  faDownload,
  faEnvelope,
  faEye,
  faLink,
  faLocationDot,
  faPhone,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Api from "@services/Api";
import { EditData, GetInshights } from "@services/Routes";
import "../../styles/about.css";
import { redirect } from "next/navigation";

const Insights = () => {
  const [Data, setData] = useState("");
  let d = new Date();
  const [StartDate, setStartDate] = useState(d.setMonth(d.getMonth() - 1));
  const [EndDate, setEndDate] = useState(new Date());
  const [ShowLoader, setShowLoader] = useState(false);
  const [UserData, setUserData] = useState("");
  const [FiltterData, setFiltterData] = useState(false);
  const [Token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    api();
    APIDATA();
  }, []);

  let card_url = "ashwin-goutam";

  const APIDATA = async () => {
    setShowLoader(true);
    try {
      const response = await Api(EditData, {}, "?card_url=" + card_url);
      if (response.data.status) {
        setShowLoader(false);
        setUserData(response.data.data);
        document.documentElement.style.setProperty(
          "--color",
          response.data.data.card.color_code
        );
        document.documentElement.style.setProperty(
          "--themecolor",
          response.data.data.card.background_color
        );
        const color = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--color");
      }
    } catch (error) {
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    setShowLoader(false);
  };
  const api = async () => {
    const response = await Api(GetInshights, {});
    if (response.data.status) {
      setData(response.data.data);
    }
  };
  const data = {
    labels: Data?.click_hits?.map((item, i) => {
      return item.month;
    }),
    datasets: [
      {
        label: "Total Profile Views",
        backgroundColor: "#24b1e6",
        borderColor: "#24b1e6",
        data: Data?.click_hits?.map((item, i) => {
          return item.hit;
        }),
      },
      {
        label: "Total Save Contacts",
        backgroundColor: "#3b4b5e",
        borderColor: "#3b4b5e",
        data: Data?.click_hits?.map((item, i) => {
          return item.contact_download;
        }),
      },
    ],
  };

  let dSet = Data?.users_social_link?.map((el) => {
    return {
      label: new Array(el.label),
      borderColor: new Array("#0aa"),
      borderWidth: new Array(5),
      backgroundColor: new Array(el.color),
      data: Data?.click_hits?.map((item, i) => {
        return item?.social_media?.map((media) => {
          // console.log("......", media?.label);
          return media?.label == el.label ? media.count : 0;
        });
      }),
    };
  });

  const data2 = {
    labels: Data?.click_hits?.map((item, i) => {
      return item.month;
    }),

    datasets: dSet || [],
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
      {/* Header */}

      <div
        className="login-header p-3 text-center d-flex align-items-center justify-content-between"
        style={{ background: "black" }}
      >
        <h5 className="text-white m-0">
          <FontAwesomeIcon icon={faChartSimple} className="text-white mr-2" />{" "}
          Overall Insights
        </h5>
        <Link href="/dashboard">
          <h6 className="text-white m-0">
            {" "}
            <FontAwesomeIcon icon={faAngleLeft} className="text-white mr-2" />
            Back
          </h6>
        </Link>
      </div>
      {/* Quick Analytics */}

      <h5 className="first-title title__separate mx-4 mt-4 text-black">
        Quick Analytics
      </h5>
      <div className="mx-2">
        <div className="row mt-4 px-2 w-100 mx-0" style={{ gap: "0px" }}>
          <div className="col-6 col-lg-3 mb-2 p-0 px-1">
            <div className="text-left insights-dashboard-boxes">
              <div className="d-flex align-items-center mb-1">
                <FontAwesomeIcon icon={faEye} className="text-white mr-2" />
                <p className="text-white font-weight-bold">Profile Views</p>
              </div>
              <h5 className="text-white ml-4">{Data?.total_click_hits}</h5>
            </div>
          </div>
          <div className="col-6 col-lg-3 mb-2 p-0 px-1">
            <div className="text-left insights-dashboard-boxes">
              <div className="d-flex align-items-center mb-1">
                <FontAwesomeIcon
                  icon={faDownload}
                  className="text-white mr-2"
                />
                <p className="text- font-weight-bold">Save Contacts</p>
              </div>
              <h5 className="text-white ml-4">{Data?.total_saved_contact}</h5>
            </div>
          </div>
          <div className="col-6 col-lg-3 mb-2 p-0 px-1">
            <div className="text-left insights-dashboard-boxes">
              <div className="d-flex align-items-center mb-1">
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="text-white mr-2"
                />
                <p className="text-white font-weight-bold">Product Views</p>
              </div>
              <h5 className="text-white ml-4">
                {Data?.card_states?.product_views}
              </h5>
            </div>
          </div>
          <div className="col-6 col-lg-3 mb-2 p-0 px-1">
            <div className="text-left insights-dashboard-boxes">
              <div className="d-flex align-items-center mb-1">
                <FontAwesomeIcon icon={faShare} className="text-white mr-2" />
                <p className="text-white font-weight-bold">Your Leads</p>
              </div>
              <h5 className="text-white ml-4">{Data?.total_share_contact}</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}

      <div className="row w-100 m-0">
        <div className="col-12 col-lg-6 mt-4 px-0">
          <div className="barchart-div mx-4">
            <Bar data={data} className="" />
          </div>
        </div>
        <div className="col-12 col-lg-6 mt-4 px-0">
          <div className="barchart-div mx-4">
            <Bar data={data2} className="" />
          </div>
        </div>
      </div>

      {/* Product */}

      <h5 className="first-title title__separate mx-4 mt-4 text-black">
        {UserData?.titles?.card_products?.visible_name} Analytics
      </h5>
      <div className="row w-100 m-0">
        <div className="col-12 col-lg-12 p-0 mb-2">
          <Link href="/product">
            {Data?.card_states?.product_views == 0 ? (
              <p className="font-weight-bold mx-4 d-flex align-items-center ml-lg-4">
                No data found
              </p>
            ) : (
              <p className="font-weight-bold mx-4 d-flex align-items-center ml-lg-4">
                <span>
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="mr-2"
                    style={{ fontSize: "15px" }}
                  />
                  You got
                  <span className="Varcolor">
                    {" " + Data?.card_states?.product_views + " "}
                  </span>
                  clicks on Products, click here to see complete report
                </span>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="mx-2 cursor-pointer ml-3"
                  style={{ fontSize: "15px", color: "var(--color)" }}
                />
              </p>
            )}
          </Link>
        </div>
      </div>

      {/* Blog Analysis */}
      <h5 className="first-title title__separate mx-4 mt-3 text-black">
        {UserData?.titles?.card_blogs?.visible_name} Analytics
      </h5>
      <div className="row w-100 m-0">
        <div className="col-12 col-lg-12 p-0 mb-2">
          <Link href="/blog">
            {Data?.card_states?.blog_views == 0 ? (
              <p className="font-weight-bold mx-4 d-flex align-items-center ml-lg-4">
                No data found
              </p>
            ) : (
              <p className="font-weight-bold mx-4 d-flex align-items-center ml-lg-4">
                <span>
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="mr-2"
                    style={{ fontSize: "15px" }}
                  />
                  You have total
                  <span className="Varcolor">
                    {" " + Data?.card_states?.blog_views + " "}
                  </span>
                  leads click here to see more.
                </span>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="mx-2 cursor-pointer ml-3"
                  style={{ fontSize: "15px", color: "var(--color)" }}
                />
              </p>
            )}
          </Link>
        </div>
      </div>

      {/* Filter */}

      <div className="filter-section">
        <article className="article">
          <h5 className="first-title mx-4 mt-4 text-black">Filter</h5>
        </article>
        <div className="mx-3 mt-3 filter-div">
          <div className="row w-100 m-0 p-0 align-items-end justify-content-sm-center">
            <div className="col-6 col-lg-2 p-0 px-2">
              <label className="ml-1">From</label>
              <DatePicker
                selected={StartDate}
                onChange={(Date) => setStartDate(Date)}
                maxDate={new Date()}
                placeholderText={"End Date"}
                className="form-control insight-filter w-100"
              />
            </div>
            <div className="col-6 col-lg-2 p-0 px-2">
              <label className="ml-1">To</label>
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
        {/* Contact Analysis */}

        <h5 className="first-title title__separate mx-4 mt-4 text-black">
          Contact Analytics
        </h5>

        <div className="row w-100 m-0">
          <div className="col-12 col-lg-3 p-0 mb-2">
            <p className="font-weight-bold leads-para ml-lg-4">
              <FontAwesomeIcon
                icon={faPhone}
                className="mr-2"
                style={{ fontSize: "15px" }}
              />
              <span className="Varcolor">{Data?.card_states?.contact}</span>{" "}
              People reached you through your contact number.
            </p>
          </div>
          <div className="col-12 col-lg-3 p-0 mb-2">
            <p className="font-weight-bold leads-para">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="mr-2"
                style={{ fontSize: "15px" }}
              />
              <span className="Varcolor">{Data?.card_states?.email}</span>{" "}
              People reached you through your Email ID.
            </p>
          </div>
          <div className="col-12 col-lg-3 p-0 mb-2">
            <p className="font-weight-bold leads-para">
              <FontAwesomeIcon
                icon={faLink}
                className="mr-2"
                style={{ fontSize: "15px" }}
              />
              <span className="Varcolor">{Data?.card_states?.website}</span>{" "}
              People reached you through your Website.
            </p>
          </div>
          <div className="col-12 col-lg-3 p-0 mb-2">
            <p className="font-weight-bold leads-para mr-lg-4">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="mr-2"
                style={{ fontSize: "15px" }}
              />
              <span className="Varcolor">{Data?.card_states?.address}</span>{" "}
              People reached you through the your Address.
            </p>
          </div>
          {Data?.alternate_phone_states?.map((item, index) => {
            return (
              <>
                <div className="col-12 col-lg-3 p-0 mb-2" key={index}>
                  <p
                    className={
                      index === 1
                        ? "font-weight-bold leads-para"
                        : "font-weight-bold leads-para ml-lg-4"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="mr-2"
                      style={{ fontSize: "15px" }}
                    />
                    <span className="Varcolor">{item?.count}</span> People
                    reached you through the contact number{" "}
                    <span className="Varcolor">
                      {item?.country_code
                        ? item.country_code + "-" + item.number
                        : item.number}
                    </span>{" "}
                    ({item.name}).
                  </p>
                </div>
              </>
            );
          })}
        </div>

        {/* Social Analytics */}

        <h5 className="first-title title__separate mx-4 mt-3 text-black">
          Social Analytics
        </h5>

        <div className="row w-100 m-0 mb-4 justify-content-left">
          {Data?.card_states?.social_links.length === 0 ? (
            <p className="mx-4 font-weight-bold mb-4">No data available</p>
          ) : (
            Data?.card_states?.social_links?.map((item, index) => {
              return (
                <>
                  <div className="col-12 col-lg-3 p-0 mb-2">
                    <p
                      className={
                        index === 1
                          ? "font-weight-bold leads-para"
                          : "font-weight-bold leads-para ml-lg-4"
                      }
                    >
                      <i
                        className={`fa-brands fa-${item.label?.toLowerCase()} mr-2`}
                        style={{ fontSize: "15px" }}
                      ></i>
                      {item?.hit} People reach out through the{" "}
                      <span className="Varcolor">{item?.label}</span>
                    </p>
                  </div>
                </>
              );
            })
          )}
        </div>
      </div>
      <div
        className="w-100 text-center text-white p-2 mt-3"
        style={{ bottom: "0", background: "black" }}
      >
        <p> © 2023. All Rights Reserved By Popipro.</p>
      </div>
    </>
  ) : (
    redirect("/login")
  );
};

export default Insights;
