/* eslint-disable jsx-a11y/img-redundant-alt */
"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faFloppyDisk,
  faInfo,
  faLock,
  faPencil,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper as SwiperComponent } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Modal from "react-bootstrap/Modal";
import { CardData, deleteSection } from "@services/Routes";
import Api from "@services/Api";
import EditPlan from "./EditPlan";

export default function EditDoing({
  TitleData,
  Data,
  APIDATA,
  setData,
  AddMoredoings,
  CardServices,
  MainData,
  PlanData,
  token,
}) {
  const [WhatIm, setWhatIm] = useState(false);
  const [Active, setActive] = useState(false);
  const [ShowLoader, setShowLoader] = useState(false);
  const [ModalId, setModalId] = useState("");
  const [Image, setImage] = useState();
  const [ServicesName, setServicesName] = useState("");
  const [ServicesDescription, setServicesDescription] = useState("");
  const [EditFields, setEditFields] = useState(false);
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const [Doing, setDoing] = useState("");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleEditClose = () => setShowEdit(false);
  const handleShow = () => setShow(true);
  const handleEditShow = () => setShowEdit(true);

  useEffect(() => {
    setDoing(TitleData?.card_services?.visible_name);
  }, []);

  useEffect(() => {
    setActive(TitleData?.card_services?.is_active == "1" ? true : false);
  }, [TitleData]);
  const aRef = useRef(null);

  const handleCanclebtn = () => {
    handleClose();
    handleEditClose();
  };

  const handleEditWhat = async (id = null) => {
    setShowLoader(true);
    let data = [];
    let error = false;
    let mess = "";
    if (ServicesName === "" || ServicesDescription === "") {
      error = true;
      mess =
        ServicesName === ""
          ? "Heading is required"
          : "Descripotion is required";
    } else {
      id !== null
        ? (data = [
            {
              services_image: Image,
              services_name: ServicesName,
              services_description: ServicesDescription,
              saved_services: id,
            },
          ])
        : (data = [
            {
              services_image: Image,
              services_name: ServicesName,
              services_description: ServicesDescription,
            },
          ]);
    }
    if (error) {
      toast(mess, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setShowLoader(false);
      return;
    }

    try {
      setShowLoader(true);
      const response = await Api(CardData, { services: data });
      setShowLoader(false);
      if (response.data.status) {
        APIDATA();
        // setData(response.data.data);
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
        aRef.current.value = null;
        setServicesDescription("");
        setServicesName("");
        handleCanclebtn();
      }
    } catch (error) {
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      setShowLoader(false);
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
    setShowLoader(false);
    // var elem = document.getElementById("card_services");
    // elem.scrollIntoView();
  };

  const handleDelteServices = async (id, type, DataId) => {
    let data = {
      type: type,
      base: id,
      id: DataId,
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
        const response = await Api(deleteSection, data);
        if (response.data.status) {
          Swal.fire("Deleted!", "", "success");
          APIDATA();
        }
      }
    });
  };

  const handleActive = async () => {
    let titles = [
      {
        name: "card_services",
        visible_name: TitleData?.card_services?.visible_name,
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

  const handleSetId = (id, name, description) => {
    setModalId(id);
    setServicesName(name);
    setServicesDescription(description);
    handleEditShow();
  };
  const HandleEmptyFeilds = () => {
    setServicesName("");
    setServicesDescription("");
    setImage("");
  };
  const handleChnageTitle = async () => {
    setShowLoader(true);
    let titles = [
      {
        name: "card_services",
        visible_name: Doing,
      },
    ];
    try {
      const response = await Api(CardData, { titles });
      setShowLoader(false);
      if (response.data.status) {
        setShowLoader(false);
        APIDATA();
        // setData(response.data.data);
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

      {/* Add More MODAL */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Add {TitleData?.card_services?.visible_name}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <lable className="modalFormLable">
              Upload Image (*Prefered size in ration of 100x100)
            </lable>
            <input
              type="file"
              name="image"
              className="form-control mb-4 p-1 mt-1"
              accept="image/png, image/gif, image/jpeg"
              style={{ border: "1px solid #ccc" }}
              ref={aRef}
              onChange={(e) => setImage(e.target.files[0])}
            />
            <lable className="modalFormLable">Heading*</lable>
            <input
              name="name"
              rows="4"
              cols="50"
              className="form-control mb-4 mt-1"
              value={ServicesName}
              placeholder="Heading"
              style={{ height: "40px", border: "1px solid #ccc" }}
              onChange={(e) => setServicesName(e.target.value)}
            ></input>
            <lable className="modalFormLable">Description*</lable>
            <CKEditor
              editor={ClassicEditor}
              config={{
                removePlugins: [
                  "EasyImage",
                  "ImageUpload",
                  "MediaEmbed",
                  "Table",
                  "TableToolbar",
                  "Indent",
                  "BlockQuote",
                  "Heading",
                  "Emoji",
                ],
                link: {
                  decorators: {
                    addTargetToExternalLinks: {
                      mode: "automatic",
                      callback: (url) => /^(https?:)?\/\//.test(url),
                      attributes: {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      },
                    },
                  },
                },
              }}
              data={ServicesDescription || ""}
              onReady={(editor) => {}}
              onChange={(event, editor) => {
                const data = editor.getData();
                setServicesDescription(data);
              }}
              onBlur={(event, editor) => {}}
              onFocus={(event, editor) => {}}
            />
          </div>
          <div
            className="d-flex align-items-center mt-3"
            style={{ gap: "10px" }}
          >
            <button className="send-btnn" onClick={() => handleEditWhat()}>
              Save
            </button>
            <button className="delete-button m-0" onClick={handleCanclebtn}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={handleEditClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Edit {TitleData?.card_services?.visible_name}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleEditClose}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {CardServices &&
            CardServices?.map((items, i) => {
              return (
                <>
                  {ModalId === items.id ? (
                    <div>
                      <input
                        type="hidden"
                        defaultValue={items.id}
                        name="hiddenId"
                        key={i}
                      />
                      <lable className="modalFormLable">
                        Upload Image (*Prefered size in ration of 100x100)
                      </lable>
                      <input
                        type="file"
                        name="image"
                        className="form-control mb-4 p-1 mt-1"
                        accept="image/png, image/gif, image/jpeg"
                        style={{ border: "1px solid #ccc" }}
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                      <lable className="modalFormLable">Heading*</lable>
                      <input
                        name="name"
                        rows="4"
                        cols="50"
                        className="form-control mb-4 mt-1"
                        defaultValue={items.name || ""}
                        placeholder="Heading"
                        style={{ height: "40px", border: "1px solid #ccc" }}
                        onChange={(e) => setServicesName(e.target.value)}
                      ></input>
                      <lable className="modalFormLable">Description*</lable>
                      <CKEditor
                        editor={ClassicEditor}
                        config={{
                          removePlugins: [
                            "EasyImage",
                            "ImageUpload",
                            "MediaEmbed",
                            "Table",
                            "TableToolbar",
                            "Indent",
                            "BlockQuote",
                            "Heading",
                            "Emoji",
                          ],
                          link: {
                            decorators: {
                              addTargetToExternalLinks: {
                                mode: "automatic",
                                callback: (url) => /^(https?:)?\/\//.test(url),
                                attributes: {
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                },
                              },
                            },
                          },
                        }}
                        data={ServicesDescription || ""}
                        onReady={(editor) => {}}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setServicesDescription(data);
                        }}
                        onBlur={(event, editor) => {}}
                        onFocus={(event, editor) => {}}
                      />
                      <div
                        className="d-flex align-items-center mt-3"
                        style={{ gap: "10px" }}
                      >
                        <button
                          className="send-btnn"
                          onClick={() => handleEditWhat(items.id)}
                        >
                          Update
                        </button>
                        <button
                          className="delete-button m-0"
                          onClick={handleCanclebtn}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
        </Modal.Body>
      </Modal>

      {TitleData?.card_services?.source !== 0 ? (
        <div className="position-relative">
          {Data ? (
            <EditPlan Data={Data} PlanData={PlanData} APIDATA={APIDATA} />
          ) : (
            ""
          )}
          <div className="mt-3 box-content boxxx" id="card_services">
            <div className="mt-0">
              <div className="flex-header">
                {WhatIm ? (
                  <input
                    type="text"
                    className="title-section-input"
                    placeholder="Services Heading"
                    onChange={(e) => setDoing(e.target.value)}
                    defaultValue={
                      TitleData &&
                      TitleData.card_services?.visible_name == "card_services"
                        ? "Services"
                        : TitleData?.card_services?.visible_name
                    }
                  />
                ) : (
                  <div className="d-flex align-items-baseline">
                    {EditFields ? (
                      <input
                        name="years"
                        rows="4"
                        cols="50"
                        className="title-section-input"
                        onChange={(e) => setDoing(e.target.value)}
                        defaultValue={
                          TitleData &&
                          TitleData.card_services?.visible_name ==
                            "card_services"
                            ? "Services"
                            : TitleData?.card_services?.visible_name
                        }
                        placeholder="Title"
                      ></input>
                    ) : (
                      <>
                        <h1 className="title title--h1 first-title title__separate">
                          {Doing && Doing}
                        </h1>
                      </>
                    )}
                  </div>
                )}
                <div>
                  {TitleData?.card_services?.source == "2" &&
                  PlanData?.is_expired == false &&
                  PlanData?.subscription?.plan_id !== 1 ? (
                    <div className="d-flex align-items-center">
                      <div class="wrapper">
                        <div class="tooltip">
                          Add your services to this section. You can add a
                          square image, text and link to your main website.
                        </div>
                        <FontAwesomeIcon
                          icon={faInfo}
                          className="mr-2 pe-auto Iconcolor-black cursor-pointer"
                          onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
                        />
                      </div>
                      <>
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
                        {MainData?.company_setting?.maximum_services !==
                        CardServices?.length ? (
                          <button
                            className="addmore"
                            data-toggle="modal"
                            data-target="#AddMoreServicesModal"
                            onClick={handleShow}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        ) : (
                          <button
                            className="addmore"
                            onClick={handleUpgradePlan}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        )}
                        <label className="switch">
                          <input
                            data-status={TitleData.card_services?.is_active}
                            data-active={Active}
                            checked={Active}
                            type="checkbox"
                            onChange={() => handleActive()}
                          />
                          <span className="slider round"></span>
                        </label>
                      </>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {AddMoredoings?.length == 0 ? (
                <>
                  <div>
                    <p className="m-0">
                      Services are empty, to add services click on the edit icon
                    </p>
                  </div>
                </>
              ) : (
                <SwiperComponent
                  breakpoints={{
                    1110: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 1,
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
                  <div>
                    {CardServices &&
                      CardServices.map((item, i) => {
                        return (
                          <SwiperSlide key={i}>
                            <div className="case-item position-relative padding-services">
                              <div className="w-100">
                                {item?.image?.path ? (
                                  <img
                                    className="case-item__icon"
                                    src={Data?.base_url + item?.image?.path}
                                    alt="services"
                                  />
                                ) : (
                                  <img
                                    className="case-item__icon"
                                    src="../../assets/img/picture-1.jpg"
                                    alt="services"
                                  />
                                )}
                                <div>
                                  <h3 className="title title--h4 mt-2 m-0 mt-4">
                                    {item.name}
                                  </h3>
                                  <div
                                    id="p_wrap"
                                    className="case-item__caption text-start mb-2 mt-3"
                                    dangerouslySetInnerHTML={{
                                      __html: item.description,
                                    }}
                                  ></div>
                                </div>
                                {TitleData?.card_services?.source == "2" &&
                                PlanData?.is_expired == false &&
                                PlanData?.subscription?.plan_id !== 1 ? (
                                  <div
                                    className="d-flex align-items-center justify-content-start mt-3"
                                    style={{ gap: "10px" }}
                                  >
                                    <button
                                      className="send-btnn m-0"
                                      data-toggle="modal"
                                      data-target="#EditServicesModal"
                                      onClick={() =>
                                        handleSetId(
                                          item.id,
                                          item.name,
                                          item.description
                                        )
                                      }
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="delete-button m-0"
                                      onClick={() =>
                                        handleDelteServices(
                                          item.id,
                                          3,
                                          Data?.id
                                        )
                                      }
                                    >
                                      Delete
                                    </button>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                              {/* )} */}
                            </div>
                          </SwiperSlide>
                        );
                      })}
                  </div>
                </SwiperComponent>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
