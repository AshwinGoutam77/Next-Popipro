/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable eqeqeq */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCircleInfo,
  faFloppyDisk,
  faInfo,
  faLock,
  faPencil,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Modal from "react-bootstrap/Modal";
import { CardData, LoadMoreApi, deleteSection } from "@services/Routes";
import Api from "@services/Api";
import EditPlan from "./EditPlan";

export default function EditBlogs({
  APIDATA,
  setData,
  AddMoreBlogs,
  TitleData,
  Data,
  setAddMoreBlogs,
  card,
  PaginationData,
  MainData,
  PlanData,
  token,
}) {
  const [Active, setActive] = useState("");
  const [ShowLoader, setShowLoader] = useState("");
  const [ModalId, setModalId] = useState("");
  const [BlogModalId, setBlogModalId] = useState("");
  const [Image, setImage] = useState();
  const [ServicesName, setServicesName] = useState("");
  const [ServicesDescription, setServicesDescription] = useState("");
  const [BlogUrl, setBlogUrl] = useState("");
  const [EditFields, setEditFields] = useState(false);
  const [Page, setPage] = useState(2);
  const [LoadMoreData, setLoadMoreData] = useState("");
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const [BlogName, setBlogName] = useState("");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleEditClose = () => setShowEdit(false);
  const handleShow = () => setShow(true);
  const handleEditShow = () => setShowEdit(true);

  useEffect(() => {
    setBlogName(TitleData?.card_blogs?.visible_name);
  }, []);

  const ShowModalID = (id) => {
    setModalId(id);
  };

  useEffect(() => {
    setActive(TitleData?.card_blogs?.is_active == "1" ? true : false);
  }, [TitleData]);

  const aRef = useRef(null);

  const handleSaveBlogDetail = async (id = null) => {
    setShowLoader(true);
    let data = [];
    let error = false;
    let mess = "";
    if (ServicesName == "" || ServicesDescription == "") {
      error = true;
      mess =
        ServicesName == ""
          ? "Blog heading field is required"
          : "Blog Description is required";
    } else {
      id !== null
        ? (data = [
            {
              blog_image: Image,
              blog_name: ServicesName,
              blog_description: ServicesDescription,
              blog_url: BlogUrl,
              saved_blog: id,
            },
          ])
        : (data = [
            {
              blog_image: Image,
              blog_name: ServicesName,
              blog_description: ServicesDescription,
              blog_url: BlogUrl,
            },
          ]);
    }
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
      const response = await Api(CardData, { blogs: data });
      if (response.data.status) {
        APIDATA();
        handleClose();
        handleEditClose();
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
    handleCanclebtn();
    setShowLoader(false);
    HandleEmptyFeilds();
    var elem = document.getElementById("card_blogs");
    elem.scrollIntoView();
  };

  const handleDelteBlogs = async (id, type, DataId) => {
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
      confirmButtonColor: "rgb(24 123 249)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await Api(deleteSection, data);
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
        name: "card_blogs",
        visible_name: BlogName,
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
    handleEditShow();
    setBlogModalId(id);
    setServicesName(name);
    setServicesDescription(description);
  };
  const HandleEmptyFeilds = () => {
    aRef.current.value = null;
    setServicesName("");
    setServicesDescription("");
    setBlogUrl("");
  };
  const handleCanclebtn = () => {
    handleClose();
    handleEditClose();
  };
  const handleChnageTitle = async () => {
    setShowLoader(true);
    let titles = [
      {
        name: "card_blogs",
        visible_name: BlogName,
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

  const handleLoadMore = async () => {
    LoadMoreFunction();
  };

  const LoadMoreFunction = async () => {
    setShowLoader(true);
    const response = await Api(
      LoadMoreApi,
      {},
      "?card_url=" + card + "&type=card_blogs" + "&current_page=" + Page
    );
    if (response.data.status) {
      setLoadMoreData(response?.data?.data?.next_page_data?.next_page_url);
      setShowLoader(false);
      setAddMoreBlogs((prevData) => [
        ...prevData,
        ...response?.data?.data?.next_page_data?.data,
      ]);
      setPage((prevPage) => prevPage + 1);
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
              Add {BlogName}
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
              Upload Image (*Recommended Size 347x160)
            </lable>
            <input
              type="file"
              name="image"
              className="form-control mb-4 p-1"
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
            <lable className="modalFormLable">Url</lable>
            <input
              name="name"
              rows="4"
              cols="50"
              className="form-control mb-4 mt-1"
              value={BlogUrl}
              placeholder="url"
              style={{ height: "40px", border: "1px solid #ccc" }}
              onChange={(e) => setBlogUrl(e.target.value)}
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
            <button
              className="send-btnn"
              onClick={() => handleSaveBlogDetail()}
            >
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
              Edit {BlogName}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleEditClose}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {AddMoreBlogs &&
            AddMoreBlogs?.map((items, i) => {
              return (
                <>
                  {BlogModalId === items.id ? (
                    <div>
                      <input
                        type="hidden"
                        defaultValue={items.id}
                        name="hiddenId"
                        key={i}
                      />
                      <lable className="modalFormLable">
                        Upload Image (*Recommended Size 347x160)
                      </lable>
                      <input
                        type="file"
                        name="image"
                        className="form-control mb-4 p-1 mt-1"
                        accept="image/png, image/gif, image/jpeg"
                        style={{ border: "1px solid #ccc" }}
                        // onChange={(evnt) => handleWhatImChange(i, evnt)}
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
                        // onChange={(evnt) => handleWhatImChange(i, evnt)}
                        onChange={(e) => setServicesName(e.target.value)}
                      ></input>
                      <lable className="modalFormLable">Url</lable>
                      <input
                        name="url"
                        rows="4"
                        cols="50"
                        className="form-control mb-4 mt-1"
                        defaultValue={items.url || ""}
                        placeholder="url"
                        style={{ height: "40px", border: "1px solid #ccc" }}
                        // onChange={(evnt) => handleWhatImChange(i, evnt)}
                        onChange={(e) => setBlogUrl(e.target.value)}
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
                          onClick={() => handleSaveBlogDetail(items.id)}
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

      {/* Detail modal */}
      <div
        className="modal fade"
        id="BlogModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="BlogModalTitle"
        aria-hidden="true"
      >
        {AddMoreBlogs &&
          AddMoreBlogs?.map((item, index) => {
            return (
              <>
                {ModalId == item.id ? (
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                    key={index}
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="title title--h1 first-title title__separate mb-0"
                          id="BlogModalTitle"
                        >
                          {BlogName}
                        </h5>

                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={handleCanclebtn}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div
                        className="modal-body"
                        style={{ padding: "30px 25px" }}
                      >
                        <div>
                          {item?.image?.path ? (
                            <img
                              className="coverr-modal lazyload"
                              src={Data?.base_url + item?.image?.path}
                              alt="blogs"
                            />
                          ) : (
                            <img
                              className="coverr-modal lazyload"
                              src="../../assets/img/demo.jpg"
                              alt="blogs"
                            />
                          )}
                          <p
                            className="mt-3 font-weight-bold mb-3"
                            style={{ color: "black", fontSize: "14px" }}
                          >
                            {item.name}
                          </p>
                          <p
                            id="p_wrap"
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          ></p>
                          {item.url !== "" ? (
                            <a
                              href={
                                item?.url?.includes("http://") ||
                                item?.url?.includes("https://")
                                  ? item?.url
                                  : "https://" + item?.url
                              }
                              target="_blank"
                              className="mt-3 product-modal-btn mx-auto"
                              style={{
                                background: "var(--color)",
                                width: "40%",
                              }}
                            >
                              <i
                                className="fa fa-link mr-2"
                                style={{
                                  fontSize: "16px",
                                }}
                              ></i>
                              Visit Site{" "}
                            </a>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            );
          })}
      </div>

      {TitleData?.card_blogs?.source !== 0 ? (
        <div className="position-relative">
          {Data ? (
            <EditPlan Data={Data} PlanData={PlanData} APIDATA={APIDATA} />
          ) : (
            ""
          )}
          <div className="mt-3 box-content boxxx mb-3" id="card_blogs">
            <div className="pb-2 flex-header">
              <div className="d-flex align-items-baseline">
                {EditFields ? (
                  <input
                    name="years"
                    rows="4"
                    cols="50"
                    className="title-section-input"
                    onChange={(e) => setBlogName(e.target.value)}
                    defaultValue={
                      TitleData &&
                      TitleData?.card_blogs?.visible_name == "card_blogs"
                        ? "card_blogs"
                        : TitleData?.card_blogs?.visible_name
                    }
                    placeholder="Title"
                  ></input>
                ) : (
                  <>
                    <h5
                      className="title title--h1 first-title title__separate"
                      id="BlogModalTitle"
                    >
                      {BlogName}
                    </h5>
                  </>
                )}
              </div>
              <div>
                {TitleData?.card_blogs?.source == "2" &&
                PlanData?.is_expired == false &&
                PlanData?.subscription?.plan_id !== 1 ? (
                  <div className="d-flex align-items-center">
                    <div class="wrapper">
                      <div class="tooltip">
                        Present yourself/business by writing blogs, articles,
                        poetry, story...
                      </div>
                      <FontAwesomeIcon
                        icon={faInfo}
                        className="mr-2 pe-auto Iconcolor-black cursor-pointer"
                        onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
                      />
                    </div>
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

                    {MainData?.company_setting?.maximum_blogs !==
                    PaginationData?.total_blogs ? (
                      <button
                        className="addmore"
                        data-toggle="modal"
                        data-target="#AddMoreBlogModal"
                        onClick={() => handleShow()}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    ) : (
                      <button className="addmore" onClick={handleUpgradePlan}>
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    )}
                    <>
                      <label className="switch">
                        <input
                          data-status={TitleData.card_blogs?.is_active}
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
            {AddMoreBlogs?.length == 0 ? (
              <div>
                <p className="mt-0">
                  Blogs are empty, To add blogs click on the plus icon and add
                  the blogs.
                </p>
              </div>
            ) : (
              <div className="row">
                {AddMoreBlogs?.length == 1 ? (
                  <div className="pr-0 news-grid w-100">
                    {AddMoreBlogs &&
                      AddMoreBlogs.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="blog-position col-lg-12 pr-0"
                          >
                            <div
                              className="flex-blog row w-100"
                              style={{ gap: "0px" }}
                            >
                              <div className="col-sm-12 col-lg-6 pr-0">
                                <div>
                                  {item?.image?.path ? (
                                    <img
                                      className="coverr lazyload"
                                      src={Data?.base_url + item?.image?.path}
                                      alt="photos"
                                    />
                                  ) : (
                                    <img
                                      className="coverr lazyload"
                                      src="../../assets/img/demo.jpg"
                                      alt="photos"
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="col-sm-12 col-lg-6 pr-0">
                                <div className="content-div p-0 mt-3">
                                  <h2 className="title title--h4">
                                    {item.name}
                                  </h2>
                                  <p
                                    id="p_wrap"
                                    className="blogTextHeight text-dark mt-2"
                                    dangerouslySetInnerHTML={{
                                      __html: item.description,
                                    }}
                                  ></p>
                                  <div className="d-flex align-items-center justify-content-end">
                                    <span
                                      style={{
                                        fontSize: "13px",
                                        cursor: "pointer",
                                      }}
                                      data-toggle="modal"
                                      data-target="#BlogModal"
                                      onClick={() => ShowModalID(item.id)}
                                    >
                                      <FontAwesomeIcon
                                        icon={faArrowRight}
                                        className="user-select-auto mr-2 mt-1"
                                        style={{
                                          fontSize: "22px",
                                          color: "var(--color)",
                                        }}
                                        // onClick={() => handleHitClick(item?.id)}
                                      />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {TitleData?.card_blogs?.source == "2" &&
                            PlanData?.is_expired == false &&
                            PlanData?.subscription?.plan_id !== 1 ? (
                              <div
                                className="d-flex align-items-center justify-content-start w-100 mb-4 mt-0"
                                style={{ gap: "10px" }}
                              >
                                <button
                                  className="send-btnn m-0"
                                  data-toggle="modal"
                                  data-target="#EditBlogModal"
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
                                    handleDelteBlogs(item.id, 5, Data?.id)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="news-grid w-100">
                    {AddMoreBlogs &&
                      AddMoreBlogs.map((item, index, { length }) => {
                        return (
                          <>
                            <div key={index} className="blog-position col-lg-6">
                              <div
                                className={
                                  index === 0
                                    ? "flex-blog border-0 w-100 mt-0"
                                    : "flex-blog border-0 w-100 mt-0"
                                }
                              >
                                <div className="w-100">
                                  {item?.image?.path ? (
                                    <img
                                      className="coverr lazyload"
                                      src={Data?.base_url + item?.image?.path}
                                      alt="blogs"
                                    />
                                  ) : (
                                    <img
                                      className="coverr lazyload"
                                      src="../static/img/picture-1.jpg"
                                      alt="blogs"
                                    />
                                  )}
                                </div>
                                <div className="content-div mt-3">
                                  <h2 className="title title--h4 mt-2">
                                    {item.name}
                                  </h2>
                                  <p
                                    id="p_wrap"
                                    dangerouslySetInnerHTML={{
                                      __html: item.description,
                                    }}
                                    className="blogTextHeight mt-2"
                                  ></p>
                                  <div className="mt-2 d-flex align-items-center justify-content-end">
                                    <span
                                      style={{
                                        fontSize: "13px",
                                        cursor: "pointer",
                                      }}
                                      data-toggle="modal"
                                      data-target="#BlogModal"
                                      onClick={() => ShowModalID(item.id)}
                                    >
                                      <FontAwesomeIcon
                                        icon={faArrowRight}
                                        className="user-select-auto mr-2"
                                        style={{
                                          fontSize: "19px",
                                          color: "var(--color)",
                                        }}
                                      />
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {TitleData?.card_blogs?.source == "2" &&
                              PlanData?.is_expired == false &&
                              PlanData?.subscription?.plan_id !== 1 ? (
                                <div
                                  className="d-flex align-items-center justify-content-start w-100 mb-4 mt-0"
                                  style={{ gap: "10px" }}
                                >
                                  <button
                                    className="send-btnn m-0"
                                    data-toggle="modal"
                                    data-target="#EditBlogModal"
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
                                      handleDelteBlogs(item.id, 5, Data?.id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </>
                        );
                      })}
                  </div>
                )}
                {PaginationData?.total_blogs !== AddMoreBlogs?.length ? (
                  <div className="mx-auto text-center pt-2">
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
