"use client";
import {
  faBagShopping,
  faCalendarCheck,
  faCartShopping,
  faChartSimple,
  faGear,
  faLightbulb,
  faMoneyBill1Wave,
  faNewspaper,
  faPalette,
  faRightFromBracket,
  faSignal,
  faSliders,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../styles/edit.css";
import "../../styles/about.css";
// import { CardData, EditData, UpgradePlan } from "../ApiServices/ApiRoutes";
// import Api from "../ApiServices/Api";
// import SimpleBackdrop from "../Backdrop";
import SimpleBackdrop from "@components/SimpleBackDrop";
// import ChangePassword from "./ChangePassword";
// import Theme from "./Theme";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
// import DashboardPlan from "./DashboardPlan";
import { Tooltip } from "@mui/material";
import Api from "@services/Api";
import { EditData } from "@services/Routes";
import DashboardPlan from "@components/Dashboard/DashboardPlan";
import Multimodes from "@components/Dashboard/Multimodes";
import ChangePassword from "@components/Dashboard/ChangePassword";
import Theme from "@components/Dashboard/Theme";
import Suggestions from "@components/Dashboard/Suggestions";
// import Suggestions from "./Suggestion";
// import DashboardProducts from "./DashboardProducts";

export default function Dashboard() {
  const [ShowLoader, setShowLoader] = useState(false);
  const [Data, setData] = useState("");
  const [PlanData, setPlanData] = useState("");
  const [Color, setColor] = useState("");
  const [BackgroundColor, setBackgroundColor] = useState("");
  const [HeaderColor, setHeaderColor] = useState("");
  const [MainData, setMainData] = useState("");
  const [TitleData, setTitleData] = useState("");
  const [Appointment, setAppointment] = useState("");
  const [modalShow, setModalShow] = useState("");
  const [ModalShowMulti, setModalShowMulti] = useState("");
  const [card_url, setCard_url] = useState("");

  const APIDATA = async () => {
    setShowLoader(true);
    try {
      const response = await Api(EditData, {}, "?card_url=" + card_url);
      if (response.data.status) {
        setShowLoader(false);
        setTitleData(response.data.data?.titles);
        setAppointment(response.data.data.titles.card_booking?.visible_name);
        setData(response.data.data.card);
        setPlanData(response?.data?.data?.plan);
        setColor(response.data.data.card?.color_code);
        setBackgroundColor(response.data.data?.card?.background_color);
        setHeaderColor(response.data.data?.card?.banner_color);
        setMainData(response.data.data);
        document.documentElement.style.setProperty(
          "--color",
          response.data.data.card.color_code
        );
        document.documentElement.style.setProperty(
          "--header-color",
          response.data.data.card.banner_color
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
      console.log(error);
      if (error?.request?.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    setShowLoader(false);
  };

  useEffect(() => {
    setCard_url(localStorage.getItem("url"));
    APIDATA();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("url");
    window.location.href = "/" + card_url;
  };
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
  const SaveStatusApi = async () => {
    setShowLoader(true);
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
    setShowLoader(false);
  };
  return Data ? (
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
      <div
        className="d-flex align-items-center flex-column justify-content-between h-100vh w-100 bg-white"
        // style={{ height: "100vh" }}
      >
        <div
          className="login-header p-2 text-center d-flex align-items-center justify-content-between px-4 w-100"
          style={{ background: "black" }}
        >
          <img
            src="https://www.popipro.com/assets/images/whiteLogo.png"
            alt="logo"
            className="login-logo"
            style={{ width: "135px" }}
          />
          <Tooltip title="Logout">
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="text-white cursor-pointer"
              style={{ fontSize: "20px" }}
              onClick={handleLogout}
            />
          </Tooltip>
        </div>

        <div className="p-4 dashboard-section">
          <div className="d-flex justify-content-center align-items-center flex-column">
            <img
              src={
                Data?.profile_picture?.path
                  ? Data?.base_url + Data?.profile_picture?.path
                  : "https://avatars.githubusercontent.com/u/8152403?v=4"
              }
              alt="imagee"
              className="dashboard-image"
            />
            <h5 className="text-center text-black dashboard-h5 dashboard-mt">
              Welcome,{" "}
              <span style={{ color: "var(--color)" }}>{Data?.first_name}</span>
            </h5>
            <p className="text-center dashboard-mt text-black">
              You can manage all your data and analytics from this dashboard.
            </p>
            {Data?.is_onboarding == "1" ? (
              <p className="text-center mt-1 font-weight-bold cursor-pointer">
                Your profile is private and not visible on tap.
                <br /> Once you fills information, don't forget to make it
                public..
              </p>
            ) : (
              ""
            )}
            {Data &&
            PlanData?.is_expired !== false &&
            PlanData?.is_trial_taken !== 0 ? (
              <a
                href="https://www.popipro.com/order"
                target="_blank"
                className="mt-2 font-weight-bold subscrition-p cursor-pointer"
              >
                Your subscription is expired, Click to renew it.
              </a>
            ) : PlanData?.is_expired == false ? (
              <>
                <p className="dashboard-mt mt-4 mb-1 subscrition-p">
                  Your Subscrition will ends in{" "}
                  <span className="font-weight-bold">
                    {MainData?.plan?.subscription_left_days} days.
                  </span>{" "}
                </p>
              </>
            ) : PlanData?.subscription?.plan_id == 1 ||
              PlanData?.subscription?.plan_id == null ? (
              <div className="d-sm-flex" style={{ gap: "10px" }}>
                <p
                  className="mt-2 font-weight-bold subscrition-p cursor-pointer"
                  onClick={() => handleFreeTrail()}
                >
                  Click here to activate 30 Days Free Trial !!
                  <span className="font-weight-bold">
                    {MainData?.plan?.subscription?.end_date}
                  </span>
                </p>
                {Data && Data?.is_onboarding !== "1" ? (
                  <p className="mt-2 font-weight-bold subscrition-p cursor-pointer">
                    <span
                      className="text-white"
                      onClick={(e) => SaveStatusApi()}
                    >
                      {" "}
                      Click here to make your profile available publically.
                    </span>
                  </p>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>

          <h6 className="text-center dashboard-mt font-weight-bold text-black mb-2 pb-0">
            Profile Informations
          </h6>

          <div className="row dashboard-padding">
            {/* Edit Profile */}
            <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
              <Link
                href={"/edit/" + localStorage.getItem("url")}
                className="w-100"
              >
                <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-white mb-2"
                    style={{ fontSize: "20px" }}
                  />
                  <h6 className="text-white text-center mb-0">Edit Profile</h6>
                </span>
              </Link>
            </div>
            {/* Edit theme */}
            <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
              <div
                className="dashboard-boxes d-flex justify-content-center align-items-center flex-column"
                data-toggle={
                  PlanData?.is_expired !== false &&
                  PlanData?.is_trial_taken !== 0
                    ? ""
                    : PlanData?.subscription?.plan_id !== 1 &&
                      PlanData?.subscription !== null
                    ? "modal"
                    : ""
                }
                data-target="#BackgroundColorDiv"
                onClick={() => setModalShow("theme")}
              >
                {Data ? (
                  <DashboardPlan
                    Data={Data}
                    PlanData={PlanData}
                    APIDATA={APIDATA}
                  />
                ) : (
                  ""
                )}
                <>
                  <FontAwesomeIcon
                    icon={faPalette}
                    className="text-white mb-2"
                    style={{ fontSize: "20px" }}
                  />
                  <h6 className="text-white text-center mb-0">Edit Theme</h6>
                </>
              </div>
            </div>
            {/* Multiple Mode */}
            <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
              <div
                className="dashboard-boxes d-flex justify-content-center align-items-center flex-column"
                data-toggle={
                  PlanData?.is_expired !== false &&
                  PlanData?.is_trial_taken !== 0
                    ? ""
                    : PlanData?.subscription?.plan_id !== 1 &&
                      PlanData?.subscription !== null
                    ? "modal"
                    : ""
                }
                data-target="#MultimodesModal"
                onClick={() => {
                  setModalShow("MultimodesModal");
                }}
              >
                {Data ? (
                  <DashboardPlan
                    Data={Data}
                    PlanData={PlanData}
                    APIDATA={APIDATA}
                  />
                ) : (
                  ""
                )}
                <>
                  <FontAwesomeIcon
                    icon={faSliders}
                    className="text-white mb-2"
                    style={{ fontSize: "20px" }}
                  />
                  <h6 className="text-white text-center mb-0">Multiple Mode</h6>
                </>
              </div>
            </div>

            {/* Suggestions */}
            <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
              <div
                className="dashboard-boxes d-flex justify-content-center align-items-center flex-column"
                onClick={() => {
                  console.log("abc");
                  setModalShow("suggestion");
                }}
              >
                <FontAwesomeIcon
                  icon={faLightbulb}
                  className="text-white mb-2"
                  style={{ fontSize: "20px" }}
                />
                <h6 className="text-white text-center mb-0">Suggestions</h6>
              </div>
            </div>

            {/* My subscription */}
            <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
              <Link href="/plan" className="w-100">
                <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                  {Data ? (
                    <DashboardPlan
                      Data={Data}
                      PlanData={PlanData}
                      APIDATA={APIDATA}
                    />
                  ) : (
                    ""
                  )}
                  <FontAwesomeIcon
                    icon={faMoneyBill1Wave}
                    className="text-white mb-2"
                    style={{ fontSize: "20px" }}
                  />
                  <h6 className="text-white text-center mb-0">Subscription</h6>
                </span>
              </Link>
            </div>

            {/* Chnage password */}
            <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
              {/* <Link href="/change-password" className="w-100"> */}
              <div
                className="dashboard-boxes d-flex justify-content-center align-items-center flex-column"
                onClick={() => setModalShow("password")}
              >
                <FontAwesomeIcon
                  icon={faGear}
                  className="text-white mb-2"
                  style={{ fontSize: "20px" }}
                />
                <h6 className="text-white text-center mb-0">Password</h6>
              </div>
              {/* </Link> */}
            </div>
          </div>

          {/* ........... */}
          <h6 className="text-center dashboard-mt font-weight-bold text-black">
            Analytics & Data
          </h6>
          <div className="row mt-2 dashboard-padding">
            {/* Overall insights */}
            <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
              <Link
                href={
                  PlanData?.is_expired !== false &&
                  PlanData?.is_trial_taken !== 0
                    ? "https://www.popipro.com/order"
                    : PlanData?.subscription?.plan_id !== 1 &&
                      PlanData?.subscription !== null
                    ? "/insights"
                    : ""
                }
                className="w-100"
              >
                <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                  {Data ? (
                    <DashboardPlan
                      Data={Data}
                      PlanData={PlanData}
                      APIDATA={APIDATA}
                    />
                  ) : (
                    ""
                  )}
                  <>
                    <FontAwesomeIcon
                      icon={faChartSimple}
                      className="text-white mb-2"
                      style={{ fontSize: "20px" }}
                    />
                    <h6 className="text-white text-center mb-0">
                      Overall Insights
                    </h6>
                  </>
                </span>
              </Link>
            </div>
            {/* Lead insights */}
            <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
              <Link
                href={
                  PlanData?.is_expired !== false &&
                  PlanData?.is_trial_taken !== 0
                    ? "https://www.popipro.com/order"
                    : PlanData?.subscription?.plan_id !== 1 &&
                      PlanData?.subscription !== null
                    ? "/leads"
                    : ""
                }
                className="w-100"
              >
                <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                  {Data ? (
                    <DashboardPlan
                      Data={Data}
                      PlanData={PlanData}
                      APIDATA={APIDATA}
                    />
                  ) : (
                    ""
                  )}
                  <>
                    <FontAwesomeIcon
                      icon={faSignal}
                      className="text-white mb-2"
                      style={{ fontSize: "20px" }}
                    />
                    <h6 className="text-white text-center mb-0">Lead</h6>
                  </>
                </span>
              </Link>
            </div>
            {/* Product analytics */}
            <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
              <Link
                href={
                  PlanData?.is_expired !== false &&
                  PlanData?.is_trial_taken !== 0
                    ? "https://www.popipro.com/order"
                    : PlanData?.subscription?.plan_id !== 1 &&
                      PlanData?.subscription !== null
                    ? "/product"
                    : ""
                }
                className="w-100"
              >
                <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                  {Data ? (
                    <DashboardPlan
                      Data={Data}
                      PlanData={PlanData}
                      APIDATA={APIDATA}
                    />
                  ) : (
                    ""
                  )}
                  <>
                    <FontAwesomeIcon
                      icon={faBagShopping}
                      className="text-white mb-2"
                      style={{ fontSize: "20px" }}
                    />
                    <h6 className="text-white text-center mb-0">
                      {TitleData?.card_products?.visible_name}
                    </h6>
                  </>
                </span>
              </Link>
            </div>{" "}
            {/* Blogs analytics */}
            <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
              <Link
                href={
                  PlanData?.is_expired !== false &&
                  PlanData?.is_trial_taken !== 0
                    ? "https://www.popipro.com/order"
                    : PlanData?.subscription?.plan_id !== 1 &&
                      PlanData?.subscription !== null
                    ? "/blog"
                    : ""
                }
                className="w-100"
              >
                <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                  {Data ? (
                    <DashboardPlan
                      Data={Data}
                      PlanData={PlanData}
                      APIDATA={APIDATA}
                    />
                  ) : (
                    ""
                  )}
                  <>
                    <FontAwesomeIcon
                      icon={faNewspaper}
                      className="text-white mb-2"
                      style={{ fontSize: "20px" }}
                    />
                    <h6 className="text-white text-center mb-0">
                      {" "}
                      {TitleData?.card_blogs?.visible_name}
                    </h6>
                  </>
                </span>
              </Link>
            </div>
            {/* Product enquiry */}
            <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
              <Link
                href={
                  PlanData?.is_expired !== false &&
                  PlanData?.is_trial_taken !== 0
                    ? "https://www.popipro.com/order"
                    : PlanData?.subscription?.plan_id !== 1 &&
                      PlanData?.subscription !== null
                    ? "/product-enquiry"
                    : ""
                }
                className="w-100"
              >
                <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                  {Data ? (
                    <DashboardPlan
                      Data={Data}
                      PlanData={PlanData}
                      APIDATA={APIDATA}
                    />
                  ) : (
                    ""
                  )}
                  <>
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-white mb-2"
                      style={{ fontSize: "20px" }}
                    />
                    <h6 className="text-white text-center mb-0">
                      {" "}
                      {TitleData?.card_products?.visible_name} Inquiry
                    </h6>
                  </>
                </span>
              </Link>
              {/* <div className="d-none">
                <DashboardProducts TitleData={TitleData} />
              </div> */}
            </div>
            {/* My appointment */}
            <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
              <Link
                href={
                  PlanData?.is_expired !== false &&
                  PlanData?.is_trial_taken !== 0
                    ? "https://www.popipro.com/order"
                    : PlanData?.subscription?.plan_id !== 1 &&
                      PlanData?.subscription !== null
                    ? "/appointment-lead"
                    : ""
                }
                className="w-100"
              >
                <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                  {Data ? (
                    <DashboardPlan
                      Data={Data}
                      PlanData={PlanData}
                      APIDATA={APIDATA}
                    />
                  ) : (
                    ""
                  )}
                  <>
                    <FontAwesomeIcon
                      icon={faCalendarCheck}
                      className="text-white mb-2"
                      style={{ fontSize: "20px" }}
                    />
                    <h6 className="text-white text-center mb-0">
                      Appointments
                    </h6>
                  </>
                </span>
              </Link>
            </div>
            {/* Approve request */}
            <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
              <Link
                href={
                  PlanData?.is_expired !== false &&
                  PlanData?.is_trial_taken !== 0
                    ? "https://www.popipro.com/order"
                    : PlanData?.subscription?.plan_id !== 1 &&
                      PlanData?.subscription !== null
                    ? "/testimonialsLeads"
                    : ""
                }
                className="w-100"
              >
                <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                  {Data ? (
                    <DashboardPlan
                      Data={Data}
                      PlanData={PlanData}
                      APIDATA={APIDATA}
                    />
                  ) : (
                    ""
                  )}
                  <>
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-white mb-2"
                      style={{ fontSize: "20px" }}
                    />
                    <h6 className="text-white text-center mb-0">
                      Approve Request
                    </h6>
                  </>
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-0 pb-4 w-100 bg-white">
          <h6 className="text-center mt-4 font-weight-bold mb-2">
            Follow us on
          </h6>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ gap: "10px" }}
          >
            <Link
              href="https://www.facebook.com/popipro.global"
              target="_blank"
            >
              <span className="media-icon-div">
                <span className="social-media-icons">
                  <img
                    src={"./static/img/facebook.png"}
                    alt="facebook"
                    style={{
                      width: "50px",
                      borderRadius: "100%",
                    }}
                  />
                </span>
              </span>
            </Link>
            <Link
              href="https://www.instagram.com/popipro.global/"
              target="_blank"
            >
              <span className="media-icon-div">
                <span className="social-media-icons">
                  <img
                    src={"../static/img/instagram.png"}
                    alt="instagram"
                    style={{
                      width: "50px",
                      borderRadius: "100%",
                    }}
                  />
                </span>
              </span>
            </Link>
            <Link
              href="https://www.youtube.com/@popipro.global"
              target="_blank"
            >
              <span className="media-icon-div">
                <span className="social-media-icons">
                  <img
                    src={"../static/img/youtube.png"}
                    alt="linkedin"
                    style={{
                      width: "50px",
                      borderRadius: "100%",
                    }}
                  />
                </span>
              </span>
            </Link>
            <Link href="https://twitter.com/PopiPro_Global" target="_blank">
              <span className="media-icon-div">
                <span className="social-media-icons">
                  <img
                    src={"../static/img/twitter.png"}
                    alt="twitter"
                    style={{
                      width: "50px",
                      borderRadius: "100%",
                    }}
                  />
                </span>
              </span>
            </Link>
          </div>
        </div>
        <div
          className="w-100 text-center text-white p-2 mt-0"
          style={{ bottom: "0", background: "black" }}
        >
          <p> © 2023. All Rights Reserved By Popipro.</p>
        </div>
      </div>
      <Multimodes
        Data={Data}
        APIDATA={APIDATA}
        MainData={MainData}
        TitleData={TitleData}
        Appointment={Appointment}
        active={modalShow == "MultimodesModal" ? true : false}
        handleClose={setModalShow}
      />
      <ChangePassword
        active={modalShow == "password" ? true : false}
        handleClose={setModalShow}
      />
      <Theme
        APIDATA={APIDATA}
        Data={Data}
        PlanData={PlanData}
        Color={Color}
        setColor={setColor}
        BackgroundColor={BackgroundColor}
        setBackgroundColor={setBackgroundColor}
        HeaderColor={HeaderColor}
        setHeaderColor={setHeaderColor}
        active={modalShow == "theme" ? true : false}
        handleClose={setModalShow}
      />
      <Suggestions
        active={modalShow == "suggestion" ? true : false}
        handleClose={setModalShow}
      />
    </>
  ) : (
    <>
      <SimpleBackdrop visible={ShowLoader} />
    </>
  );
}
