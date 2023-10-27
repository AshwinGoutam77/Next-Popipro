/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCircleXmark,
  faCloudArrowUp,
  faFloppyDisk,
  faInfo,
  faLock,
  faPencil,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper as SwiperComponent } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { CardData, deleteFiles } from "@services/Routes";
import Api from "@services/Api";
import EditPlan from "./EditPlan";

export default function EditClients({
  APIDATA,
  setData,
  ClientPhotos,
  TitleData,
  Data,
  MainData,
  PlanData,
  token,
}) {
  const [Clients, setClients] = useState(false);
  const [photos, setPhotos] = useState("");
  const [Active, setActive] = useState("");
  const [ShowLoader, setShowLoader] = useState("");
  const [EditFields, setEditFields] = useState(false);
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const [ClientName, setClientName] = useState("");

  useEffect(() => {
    setClientName(TitleData?.card_clients?.visible_name);
  }, []);

  useEffect(() => {
    setActive(TitleData?.card_clients?.is_active == "1" ? true : false);
  }, [TitleData]);

  const handleEditClient = () => {
    setClients(true);
    if (Clients) {
      setClients(false);
    }
  };
  const DeleteClient = async (path, type, DataId) => {
    let data = {
      type: type,
      file_url: path,
      obj_base: DataId,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(99 171 187)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await Api(deleteFiles, data);
        if (response.data.status) {
          Swal.fire("Deleted!", "", "success");
          APIDATA();
        }
      }
    });
  };

  const CancleFiles = () => {
    setClients(true);
    if (Clients) {
      setClients(false);
    }
  };

  const SendFiles = async (e) => {
    setShowLoader(true);
    setClients(true);
    if (Clients) {
      setClients(false);
    }
    setPhotos(e.target.files);
    let data = {
      clients: photos,
      titles: [
        {
          name: "card_clients",
          visible_name: ClientName,
        },
      ],
    };

    try {
      const response = await Api(CardData, data);
      if (response.data.status) {
        APIDATA();
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
      }
    } catch (error) {
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
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
    setShowLoader(false);
  };

  const handleActive = async () => {
    let titles = [
      {
        name: "card_clients",
        visible_name: ClientName,
        is_featured: Active ? "0" : "1",
        is_active: Active ? "0" : "1",
      },
    ];
    Swal.fire({
      title: "Are you sure?",
      text:
        Active == 1
          ? "You want to hide this section from your profile?"
          : "You want to show this section on your profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(24 123 249)",
      cancelButtonColor: "#d33",
      confirmButtonText: Active == 1 ? "Yes hide it!" : "Yes show it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setShowLoader(true);
          const response = await Api(CardData, { titles });
          if (response.status) {
            setActive((prev) => !prev);
            setShowLoader(false);
            // APIDATA();
          }
        } catch (error) {
          if (error.request.status == "401") {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
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
      }
    });
  };
  const handleUpgradePlan = () => {
    Swal.fire({
      title:
        "You have reached your storage limit, to increase your limit please upgrade your plan.",
      icon: "info",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<a href="https://www.popipro.com/order" target="_blank">Upgrade</a>',
    });
  };
  const handleChnageTitle = async () => {
    setShowLoader(true);
    let titles = [
      {
        name: "card_clients",
        visible_name: ClientName,
      },
    ];
    try {
      const response = await Api(CardData, { titles });
      setShowLoader(false);
      if (response.data.status) {
        setShowLoader(false);
        APIDATA();
        // setData(response.data.data);
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
        setEditFields(false);
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

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {TitleData?.card_clients?.source !== 0 ? (
        <div className="position-relative">
          {Data ? (
            <EditPlan Data={Data} PlanData={PlanData} APIDATA={APIDATA} />
          ) : (
            ""
          )}
          <div className="mt-3 box-content boxxx" id="about">
            <div className="flex-header">
              <div className="d-flex align-items-baseline">
                {EditFields ? (
                  <input
                    type="text"
                    className="title-section-input"
                    placeholder="Clients Images"
                    onChange={(e) => setClientName(e.target.value)}
                    defaultValue={
                      TitleData &&
                      TitleData?.card_clients?.visible_name == "card_clients"
                        ? "Clients Sections"
                        : TitleData?.card_clients?.visible_name
                    }
                  />
                ) : (
                  <>
                    <h2 className="title title--h1 first-title title__separate">
                      {TitleData &&
                      TitleData?.card_clients?.visible_name == "card_clients"
                        ? "Card Clients"
                        : TitleData?.card_clients?.visible_name}
                    </h2>
                  </>
                )}
              </div>
              {TitleData?.card_clients?.source == "2" &&
              PlanData?.is_expired == false &&
              PlanData?.subscription?.plan_id !== 1 ? (
                <div>
                  <div className="d-flex align-items-center">
                    <div class="wrapper">
                      <div class="tooltip">
                        Upload a secure image no larger than 600 x 600px at
                        roughly 96px. JPG, PNG are allowed
                      </div>
                      <FontAwesomeIcon
                        icon={faInfo}
                        className="mr-2 pe-auto Iconcolor-black cursor-pointer"
                        onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
                      />
                    </div>
                    <>
                      {/* {Clients ? (
                        ""
                      ) : (
                        <> */}
                      <div>
                        {MainData?.company_setting?.maximum_clients <=
                          ClientPhotos?.length || Data?.is_expired ? (
                          <div className="d-flex align-items-center">
                            <div className="edit-pencile-div">
                              {EditFields ? (
                                <FontAwesomeIcon
                                  icon={faFloppyDisk}
                                  className="ml-3 pe-auto floopySave-icon"
                                  onClick={() => handleChnageTitle()}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faPencil}
                                  className="ml-3 pe-auto Iconcolor-black"
                                  onClick={() => setEditFields(true)}
                                />
                              )}
                            </div>
                            <button
                              className="addmore"
                              onClick={handleUpgradePlan}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                        ) : (
                          <div className="d-flex align-items-center">
                            <div className="edit-pencile-div">
                              {EditFields ? (
                                <FontAwesomeIcon
                                  icon={faFloppyDisk}
                                  className="ml-3 pe-auto floopySave-icon"
                                  onClick={() => handleChnageTitle()}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faPencil}
                                  className="ml-3 pe-auto Iconcolor-black"
                                  onClick={() => setEditFields(true)}
                                />
                              )}
                            </div>
                            <button
                              className="addmore"
                              onClick={handleEditClient}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                        )}
                      </div>
                      {/* </>
                      )} */}
                      <label className="switch">
                        <input
                          data-status={TitleData.card_clients?.is_active}
                          data-active={Active}
                          checked={Active}
                          type="checkbox"
                          onChange={() => handleActive()}
                        />
                        <span className="slider round"></span>
                      </label>
                    </>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            {Clients ? (
              <>
                <div className="upload-section">
                  <div className="file-section">
                    <div className="upload-btn-wrapper">
                      <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        className="uploadicon"
                      />
                      <p>Upload Files</p>
                      <input
                        type="file"
                        name="myfile"
                        id="file"
                        accept="image/png, image/gif, image/jpeg"
                        multiple
                        onChange={(e) => {
                          setPhotos(e.target.files);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="image-box">
                  {photos &&
                    Object.keys(photos).map(function (key) {
                      return (
                        <>
                          <div style={{ position: "relative" }}>
                            <img
                              className="viewimage"
                              src={URL.createObjectURL(photos[key])}
                              alt="clients"
                            />
                          </div>
                        </>
                      );
                    })}
                </div>
                <div
                  className="d-flex align-items-center mt-3"
                  style={{ gap: "10px" }}
                >
                  <button className="send-btnn" onClick={SendFiles}>
                    SAVE
                  </button>
                  <button className="delete-button m-0" onClick={CancleFiles}>
                    Cancel
                  </button>
                </div>
              </>
            ) : ClientPhotos?.length == 0 ? (
              <div>
                <p className="m-0">
                  Images are empty, upload files by clicking plus icon
                </p>
              </div>
            ) : (
              <SwiperComponent
                slidesPerView={2}
                breakpoints={{
                  1110: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                }}
                spaceBetween={20}
                style={{ cursor: "pointer" }}
                className="mySwiper"
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination, Navigation]}
              >
                {/* {ClientPhotos?.length == 0 ? (
                  <div>
                    <p className="m-0">
                      Images are empty, upload files by clicking plus icon
                    </p>
                  </div>
                ) : ( */}
                <div>
                  {ClientPhotos &&
                    ClientPhotos.map((item, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <div className="w-100" key={index}>
                            {TitleData?.card_clients?.source == "2" &&
                            PlanData?.is_expired == false &&
                            PlanData?.subscription?.plan_id !== 1 ? (
                              <FontAwesomeIcon
                                icon={faCircleXmark}
                                onClick={() =>
                                  DeleteClient(item.path, 9, Data?.id)
                                }
                                style={{
                                  top: "-1px",
                                  right: "0",
                                  color: "rgb(213, 51, 51)",
                                  fontSize: "20px",
                                }}
                                className="delete-icon3"
                              />
                            ) : (
                              ""
                            )}
                            <img
                              className="slider-images w-100"
                              src={Data?.base_url + item.path}
                              alt="Logo"
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </div>
                {/* )} */}
              </SwiperComponent>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
