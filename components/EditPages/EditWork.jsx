/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCircleXmark,
  faCloudArrowUp,
  faFloppyDisk,
  faInfo,
  faLock,
  faMagnifyingGlass,
  faPencil,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper as SwiperComponent } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import {
  CardData,
  GetCardData,
  LoadMoreApi,
  UpgradePlan,
  deleteFiles,
} from "@services/Routes";
import Api from "@services/Api";
import Swal from "sweetalert2";
import { Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import { Modal } from "react-bootstrap";
import EditPlan from "./EditPlan";

export default function EditWorks({
  APIDATA,
  setData,
  Card_photos,
  Card_videos,
  card_url,
  PhotosName,
  TitleData,
  VideoName,
  Data,
  card,
  PaginationData,
  MainData,
  PlanData,
  openModal,
  setAddMoreVedios,
  AddMoreVedios,
}) {
  const [ShowSlidesImage, setShowSlidesImage] = useState(false);
  const [Photos, setPhotos] = useState([]);
  const [Active, setActive] = useState("");
  const [ActiveVideo, setActiveVideo] = useState(false);
  const [ShowVedios, setShowVedios] = useState(false);
  const [TestiFeild, setTestiFeild] = useState([
    {
      url: "",
    },
  ]);
  const [ShowLoader, setShowLoader] = useState("");
  const [ModalVideos, setModalVideos] = useState("");
  const [Page, setPage] = useState(2);
  const [LoadMoreData, setLoadMoreData] = useState("");
  const [EditFields, setEditFields] = useState(false);
  const [EditVideoFields, setEditVideoFields] = useState(false);
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const [tooltipIsOpen2, setTooltipIsOpen2] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [PhotoTitle, setPhotoTitle] = useState("");
  const [VideoTitle, setVideoTitle] = useState("");

  useEffect(() => {
    handelOpenTesti();
    setPhotoTitle(TitleData?.card_photos?.visible_name);
    setVideoTitle(TitleData?.card_videos?.visible_name);
    // setAddMoreVedios(Data?.card_videos);
  }, []);

  useEffect(() => {
    setActive(TitleData?.card_photos?.is_active == "1" ? true : false);
    setActiveVideo(TitleData?.card_videos?.is_active == "1" ? true : false);
  }, [TitleData]);

  const handleShowSlider = () => {
    setShowSlidesImage(true);
    if (ShowSlidesImage) {
      setShowSlidesImage(false);
    }
  };
  const SendFiles = async (e) => {
    setShowLoader(true);
    setPhotos(e.target.files);
    setShowSlidesImage(false);
    let Filess = {
      photos: Photos,
    };
    try {
      const response = await Api(CardData, Filess);
      if (response.data.status) {
        APIDATA();
        // setData(response.data.data);
      }
      setShowLoader(false);
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

    var elem = document.getElementById("card_photos");
    elem.scrollIntoView();
  };
  const CancleFiles = () => {
    setShowSlidesImage(false);
  };

  const handleCancle = async () => {
    setShowVedios(true);
    if (ShowVedios) {
      setShowVedios(false);
    }
    const response = await Api(GetCardData, {}, "?card_url=" + card_url);
    if (response.status) {
      setTestiFeild(response.data.data.card.card_videos);
      setAddMoreVedios(response.data.data.card.card_videos);
    }
  };

  const handelOpenTesti = async () => {
    // setShowVedios(true);
    // if (ShowVedios) {
    //   setShowVedios(false);
    // }
    // const response = await Api(GetCardData, {}, "?card_url=" + card_url);
    // if (response.status) {
    //   setTestiFeild(response.data.data.card.card_videos);
    //   setAddMoreVedios(response.data.data.card.card_videos);
    // }
  };

  const handleTestiChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const lists = [...TestiFeild];
    lists[index][name] = value;
    setTestiFeild(lists);
  };

  const handleSaveVideos = async (id) => {
    setShowLoader(true);
    let videos = [];
    let error = false;
    let mess = "";
    // TestiFeild.map((o, i) => {
    if (ModalVideos === "") {
      error = true;
      mess = ModalVideos === "" ? "URL field is required" : "";
    } else {
      videos.push(ModalVideos);
    }
    // });
    if (error) {
      setShowLoader(false);
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
      return;
    }

    try {
      const response = await Api(CardData, { videos: videos });
      if (response.data.status) {
        APIDATA();
        setPage(2);
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
    handleCanclebtn();
    var elem = document.getElementById("card_photos");
    elem.scrollIntoView();
  };

  const handleDelteImages = async (path, type, DataId) => {
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await Api(deleteFiles, data);
        if (response.data.status) {
          Swal.fire("Deleted!", "", "success");
          APIDATA();
          setPage(2);
        }
      }
    });
  };
  const handleActive = async () => {
    let titles = [
      {
        name: "card_photos",
        visible_name: PhotosName?.visible_name,
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
  const handleActiveVedio = async () => {
    let titles = [
      {
        name: "card_videos",
        visible_name: VideoName?.visible_name,
        is_featured: ActiveVideo ? "0" : "1",
        is_active: ActiveVideo ? "0" : "1",
      },
    ];
    Swal.fire({
      title: "Are you sure?",
      text:
        ActiveVideo == 1
          ? "You want to hide this section from your profile?"
          : "You want to show this section on your profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(24 123 249)",
      cancelButtonColor: "#d33",
      confirmButtonText: ActiveVideo == 1 ? "Yes hide it!" : "Yes show it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setShowLoader(true);
          const response = await Api(CardData, { titles });
          if (response.status) {
            setActiveVideo((prev) => !prev);
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
    // try {
    //   const response = await Api(CardData, { titles });
    //   if (response.status) {
    //     APIDATA();
    //     setActiveVideo((prev) => !prev);
    //   }
    // } catch (error) {
    //   if (error.request.status == "401") {
    //     localStorage.removeItem("token");
    //     window.location.href = "/register/" + card_url;
    //   }
    // }
  };

  const HandleEmptyFeilds = () => {
    handleShow();
    setModalVideos("");
  };
  const handleCanclebtn = () => {
    handleClose();
  };
  const handleLoadMore = async () => {
    LoadMoreFunction();
  };

  const LoadMoreFunction = async () => {
    setShowLoader(true);
    const response = await Api(
      LoadMoreApi,
      {},
      "?card_url=" + card + "&type=card_videos" + "&current_page=" + Page
    );
    if (response.data.status) {
      console.log(response?.data?.data?.next_page_data);
      setLoadMoreData(response?.data?.data?.next_page_data?.next_page_url);
      // setShowLoader(false);
      setAddMoreVedios((prevData) => [
        ...prevData,
        ...response?.data?.data?.next_page_data,
      ]);
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handleChnageTitle = async () => {
    setShowLoader(true);
    let titles = [
      {
        name: "card_photos",
        visible_name: PhotoTitle,
      },
    ];
    try {
      const response = await Api(CardData, { titles });
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
        setEditFields(false);
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
  };

  const handleChnageVideoTitle = async () => {
    setShowLoader(true);
    let titles = [
      {
        name: "card_videos",
        visible_name: VideoTitle,
      },
    ];
    try {
      const response = await Api(CardData, { titles });
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
        setEditVideoFields(false);
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
  const handleFreeTrail = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to activate 30 days Free trial for Premium Features? ",
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openImagePopup = (index) => {
    setSelectedImageIndex(index);
    //console.log(Card_photos[selectedImageIndex]);
  };

  const closeImagePopup = () => {
    setSelectedImageIndex(null);
  };

  const goToPreviousImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const goToNextImage = () => {
    if (selectedImageIndex < Card_photos.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };
  return (
    <>
      {/* <SimpleBackdrop visible={ShowLoader} /> */}

      {/* Add More MODAL */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Add {VideoTitle}
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
              Add your video URL.
              <br />
              <span className="ml-2">*Please upload youtube urls only.</span>
            </lable>
            <input
              type="text"
              name="url"
              className="form-control mt-1 mb-2"
              value={ModalVideos}
              autoFocus
              id="file"
              multiple
              onChange={(evnt) => setModalVideos(evnt.target.value)}
              style={{ border: "1px solid #ccc", height: "40px" }}
            />
          </div>
          <div
            className="d-flex align-items-center mt-3"
            style={{ gap: "10px" }}
          >
            <button className="send-btnn" onClick={() => handleSaveVideos()}>
              Save
            </button>
            <button className="delete-button m-0" onClick={handleCanclebtn}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {TitleData?.card_photos?.source !== 0 ? (
        <div className="position-relative">
          {Data ? (
            <EditPlan Data={Data} PlanData={PlanData} APIDATA={APIDATA} />
          ) : (
            ""
          )}
          <div className="mt-3 box-content boxxx" id="card_photos">
            <div className="pb-2 flex-header">
              <div className="d-flex align-items-baseline">
                {EditFields ? (
                  <input
                    name="years"
                    rows="4"
                    cols="50"
                    className="title-section-input"
                    onChange={(e) => setPhotoTitle(e.target.value)}
                    defaultValue={
                      TitleData &&
                      TitleData.card_photos?.visible_name == "card_photos"
                        ? "card_photos"
                        : TitleData?.card_photos?.visible_name
                    }
                    placeholder="Title"
                  ></input>
                ) : (
                  <>
                    <h1 className="title title--h1 first-title title__separate">
                      {PhotoTitle}
                    </h1>
                  </>
                )}
              </div>
              <div>
                {TitleData?.card_photos?.source == "2" &&
                PlanData?.is_expired == false &&
                PlanData?.subscription?.plan_id !== 1 ? (
                  <div className="d-flex align-items-center">
                    <div class="wrapper">
                      <div class="tooltip">
                        You can add your portfolio, business images, project
                        images etc.
                      </div>
                      <FontAwesomeIcon
                        icon={faInfo}
                        className="mr-2 pe-auto Iconcolor-black cursor-pointer"
                        onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
                      />
                    </div>
                    {/* {ShowSlidesImage ? (
                      ""
                    ) : (
                      <> */}
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
                    {MainData?.company_setting?.maximum_photos <=
                    Card_photos?.length ? (
                      <button className="addmore" onClick={handleUpgradePlan}>
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    ) : (
                      <button className="addmore" onClick={handleShowSlider}>
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    )}
                    {/* </>
                    )} */}
                    <>
                      <Tooltip title="Mark As Feature" placement="top" arrow>
                        <>
                          <label className="switch">
                            <input
                              data-status={TitleData.card_photos?.is_active}
                              data-active={Active}
                              checked={Active}
                              type="checkbox"
                              onChange={() => handleActive()}
                            />
                            <span className="slider round"></span>
                          </label>
                        </>
                      </Tooltip>
                    </>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* <!-- Images-slider --> */}
            {ShowSlidesImage ? (
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
                        multiple
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => {
                          setPhotos(e.target.files);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="image-box">
                  {/* {renderImage(SelectedImage)} */}

                  {Photos &&
                    Object.keys(Photos).map(function (key) {
                      return (
                        <>
                          <div style={{ position: "relative" }}>
                            <img
                              className="viewimage"
                              src={URL.createObjectURL(Photos[key])}
                              alt="images"
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
                    Save
                  </button>
                  <button className="delete-button m-0" onClick={CancleFiles}>
                    Cancel
                  </button>
                </div>
              </>
            ) : Card_photos?.length == 0 ? (
              <div>
                <p className="m-0">
                  Images are empty, you can upload files by clicking plus icon
                </p>
              </div>
            ) : (
              <>
                <SwiperComponent
                  slidesPerView={2}
                  spaceBetween={10}
                  style={{ cursor: "pointer" }}
                  className="mySwiper"
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination, Navigation]}
                >
                  {/* {Card_photos?.length == 0 ? (
                    <div>
                      <p className="m-0">
                        Images are empty, you can upload files by clicking plus
                        icon
                      </p>
                    </div>
                  ) : ( */}
                  <div>
                    {Card_photos &&
                      Card_photos.map((photo, i) => {
                        // console.log(photo);
                        return (
                          <SwiperSlide key={i}>
                            <div className="swiper-slide review-items position-relative">
                              <div
                                className="position-absolute top-0 zoom-icon-images"
                                onClick={() => openImagePopup(i)}
                                style={{
                                  right: "0px",
                                  left: "0px",
                                  borderRadius: "0px 0px 10px 0px",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faMagnifyingGlass}
                                  className="zIndex-1"
                                />
                              </div>
                              {TitleData?.card_photos?.source == "2" &&
                              PlanData?.is_expired == false &&
                              PlanData?.subscription?.plan_id !== 1 ? (
                                <FontAwesomeIcon
                                  icon={faCircleXmark}
                                  className="delete-icon2"
                                  style={{
                                    top: "0",
                                    right: "0",
                                    color: "rgb(213, 51, 51)",
                                    fontSize: "20px",
                                  }}
                                  onClick={() => openImagePopup(i)}
                                />
                              ) : (
                                ""
                              )}
                              <img
                                className="gallery-grid__image cover lazyload"
                                src={Data?.base_url + photo.path}
                                data-zoom
                                alt="images"
                                onClick={() => openImagePopup(i)}
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                  </div>
                  {/* )} */}
                </SwiperComponent>

                {selectedImageIndex !== null && (
                  <div className="image-popup">
                    <span className="close-button" onClick={closeImagePopup}>
                      &times;
                    </span>

                    <img
                      src={
                        Data?.base_url + Card_photos[selectedImageIndex].path
                      }
                      alt="images"
                    />
                    {selectedImageIndex > 0 && (
                      <button
                        className="prev-button"
                        onClick={goToPreviousImage}
                      >
                        <i className="fas fa-chevron-left"></i> Previous
                      </button>
                    )}

                    {/* Right (Next) button */}
                    {selectedImageIndex < Card_photos.length - 1 && (
                      <button className="next-button" onClick={goToNextImage}>
                        Next <i className="fas fa-chevron-right"></i>
                      </button>
                    )}
                  </div>
                )}
              </>
            )}

            {/* <div className="image-box">{renderVedio(SelectedVedio)}</div> */}
          </div>
        </div>
      ) : (
        ""
      )}

      {TitleData?.card_videos?.source !== 0 ? (
        <div className="position-relative">
          {Data ? (
            <EditPlan Data={Data} PlanData={PlanData} APIDATA={APIDATA} />
          ) : (
            ""
          )}
          <div className="mt-3 box-content boxxx" id="work">
            {/* <!-- Videos-slider --> */}
            <div className="pb-0 flex-header mt-0">
              <div className="d-flex align-items-baseline">
                {EditVideoFields ? (
                  <input
                    name="years"
                    rows="4"
                    cols="50"
                    className="title-section-input"
                    onChange={(e) => setVideoTitle(e.target.value)}
                    defaultValue={
                      TitleData &&
                      TitleData.card_videos?.visible_name === "card_videos"
                        ? "card_videos"
                        : TitleData?.card_videos?.visible_name
                    }
                    placeholder="Title"
                  ></input>
                ) : (
                  <>
                    <h1 className="title title--h1 first-title title__separate">
                      {VideoTitle}
                    </h1>
                  </>
                )}
              </div>
              <div>
                {TitleData?.card_videos?.source == "2" &&
                PlanData?.is_expired == false &&
                PlanData?.subscription?.plan_id !== 1 ? (
                  <div className="d-flex align-items-center">
                    <div class="wrapper">
                      <div class="tooltip">
                        Here you can upload your videos to this section, simply
                        copy the link from youtube or vimeo and paste it in.
                      </div>
                      <FontAwesomeIcon
                        icon={faInfo}
                        className="mr-2 pe-auto Iconcolor-black cursor-pointer"
                        onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
                      />
                    </div>
                    <div className="edit-pencile-div">
                      {EditVideoFields ? (
                        <FontAwesomeIcon
                          icon={faFloppyDisk}
                          className="ml-3 pe-auto floopySave-icon"
                          onClick={() => handleChnageVideoTitle()}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faPencil}
                          className="ml-3 pe-auto Iconcolor-black"
                          onClick={() => setEditVideoFields(true)}
                        />
                      )}
                    </div>
                    {MainData?.company_setting?.maximum_videos <=
                    Card_videos?.length ? (
                      <button className="addmore" onClick={handleUpgradePlan}>
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    ) : (
                      <button
                        className="addmore"
                        data-toggle="modal"
                        data-target="#AddVideoModal"
                        onClick={() => HandleEmptyFeilds()}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    )}
                    <>
                      <Tooltip title="Mark As Feature" placement="top" arrow>
                        <>
                          <label className="switch">
                            <input
                              data-status={TitleData.card_videos?.is_active}
                              data-active={ActiveVideo}
                              checked={ActiveVideo}
                              type="checkbox"
                              onChange={() => handleActiveVedio()}
                            />
                            <span className="slider round"></span>
                          </label>
                        </>
                      </Tooltip>
                    </>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {ShowVedios ? (
              <>
                {AddMoreVedios.length == 0 ? (
                  <div>
                    <p className="m-0">
                      Videos are empty, you can upload files by clicking plus
                      icon
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>Upload url</p>
                    {AddMoreVedios &&
                      AddMoreVedios.map((item, i) => {
                        return (
                          <>
                            <div className="mb-3" key={i}>
                              <input
                                type="text"
                                name="url"
                                className="form-control"
                                defaultValue={item || ""}
                                autoFocus
                                id="file"
                                multiple
                                onChange={(evnt) => handleTestiChange(i, evnt)}
                              />
                            </div>
                          </>
                        );
                      })}
                  </div>
                )}
                <div
                  className="d-flex align-items-center mt-3"
                  style={{ gap: "10px" }}
                >
                  <button
                    className="send-btnn"
                    onClick={() => handleSaveVideos()}
                  >
                    Save
                  </button>
                  <button className="delete-button m-0" onClick={handleCancle}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div>
                {AddMoreVedios?.length == 0 ? (
                  <div>
                    <p className="m-0">
                      Videos are empty, you can upload files by clicking plus
                      icon
                    </p>
                  </div>
                ) : (
                  <div className="flex-edit-class" style={{ gap: "10px" }}>
                    {AddMoreVedios &&
                      AddMoreVedios.map((video) => {
                        function getId(url) {
                          const regExp =
                            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                          const match = String(url)?.match(regExp);
                          return match && match[2]?.length === 11
                            ? match[2]
                            : null;
                        }
                        const videoId = getId(video);
                        return (
                          <div className="swiper-slide review-items mt-3 col-sm-12 col-md-6 col-lg-6">
                            {TitleData?.card_videos?.source == "2" &&
                            PlanData?.is_expired == false &&
                            PlanData?.subscription?.plan_id !== 1 ? (
                              <FontAwesomeIcon
                                icon={faCircleXmark}
                                style={{
                                  top: "0",
                                  right: "0",
                                  color: "rgb(213, 51, 51)",
                                  fontSize: "20px",
                                }}
                                onClick={() =>
                                  handleDelteImages(video, 4, Data?.id)
                                }
                                className="delete-icon2"
                              />
                            ) : (
                              ""
                            )}
                            <div className="w-100">
                              <div className="vedio-height">
                                <div className="video-player-container">
                                  <ReactPlayer
                                    url={video}
                                    controls
                                    width="560"
                                    height="315"
                                  />
                                </div>
                              </div>
                              <div></div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
                {PaginationData?.total_videos !== AddMoreVedios?.length &&
                AddMoreVedios?.length !== 0 ? (
                  <div className="mx-auto text-center mt-3">
                    <a
                      className="text-center cursor-pointer mx-auto"
                      style={{
                        textDecoration: "underline",
                        fontSize: "16px",
                        color: "var(--color)",
                      }}
                      onClick={handleLoadMore}
                    >
                      Load More
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
