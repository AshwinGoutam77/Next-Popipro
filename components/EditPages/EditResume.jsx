"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
import { CardData, deleteSection } from "@services/Routes";
import Api from "@services/Api";
import EditPlan from "./EditPlan";

export default function EditResume({
  APIDATA,
  setData,
  card_url,
  AddMoreExp,
  setAddMoreExp,
  TitleData,
  ResumeName,
  Data,
  MainData,
  PlanData,
}) {
  const [Active, setActive] = useState("");
  const [ShowLoader, setShowLoader] = useState("");
  const [ModalId, setModalId] = useState("");
  const [ExpYears, setExpYears] = useState("");
  const [ExpDescription, setExpDescription] = useState("");
  const [ExpDesignation, setExpDesignation] = useState("");
  const [EditFields, setEditFields] = useState(false);
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const [ExpTitle, setExpTitle] = useState("");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleEditClose = () => setShowEdit(false);
  const handleShow = () => setShow(true);
  const handleEditShow = () => setShowEdit(true);

  useEffect(() => {
    setExpTitle(TitleData?.card_experience?.visible_name);
  }, []);
  useEffect(() => {
    setActive(TitleData?.card_experience?.is_active == "1" ? true : false);
  }, [TitleData]);

  const handleSaveExp = async (id) => {
    setShowLoader(true);
    let titles = [
      {
        name: "card_experience",
        visible_name: ExpTitle,
      },
    ];
    let data = [];
    let error = false;
    let mess = "";
    // ExpFeild.map(async (o, i) => {
    if (ExpDesignation == "" || ExpDescription == "") {
      error = true;
      mess =
        ExpDesignation == ""
          ? "Designation field is required"
          : "Description field is required";
    } else {
      id !== null
        ? (data = [
            {
              designation: ExpDesignation,
              years: ExpYears,
              description: ExpDescription,
              saved_exp: id,
            },
          ])
        : (data = [
            {
              designation: ExpDesignation,
              years: ExpYears,
              description: ExpDescription,
            },
          ]);
    }
    // });

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
      // console.log(data);
      // return
      const response = await Api(CardData, { titles, experience: data });
      setShowLoader(false);
      if (response?.data?.status) {
        APIDATA();
        HandleEmptyFeilds();
        handleClose();
        handleEditClose();
        // setData(response?.data?.data);
        toast.success(response?.data?.message, {
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
      toast.error(error?.response?.data?.message, {
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
    HandleEmptyFeilds();
    var elem = document.getElementById("card_experience");
    elem.scrollIntoView();
  };
  const handleDelteSkills = async (id, type, DataId) => {
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
          handleEditExperience();
        }
      }
    });
  };

  const handleActive = async () => {
    let titles = [
      {
        name: "card_experience",
        visible_name: ResumeName?.visible_name,
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
  const handleSetId = (id, years, description, designation) => {
    handleEditShow();
    setModalId(id);
    setExpYears(years);
    setExpDescription(description);
    setExpDesignation(designation);
  };
  const HandleEmptyFeilds = () => {
    handleClose();
    handleEditClose();
    setExpYears("");
    setExpDescription("");
    setExpDesignation("");
  };
  const handleCanclebtn = () => {
    // window["closeModal"]();
  };
  const handleChnageTitle = async () => {
    setShowLoader(true);
    setEditFields(false);
    let titles = [
      {
        name: "card_experience",
        visible_name: ExpTitle,
      },
    ];
    try {
      const response = await Api(CardData, { titles });
      setShowLoader(false);
      if (response?.data?.status) {
        APIDATA();
        // setData(response.data.data);
        toast.success(response.data.message, {
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
      if (error?.request?.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login/" + card_url;
      }
      setShowLoader(false);
      toast.error(error?.response?.data?.message, {
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
              Add {TitleData?.card_experience?.visible_name}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <lable className="modalFormLable">Title*</lable>
            <div>
              <input
                name="designation"
                rows="4"
                cols="50"
                className="form-control mb-4 mt-1 border border-#ccc"
                placeholder="Title"
                value={ExpDesignation}
                style={{ height: "40px" }}
                onChange={(evnt) => setExpDesignation(evnt.target.value)}
              ></input>
              <lable className="modalFormLable">Steps</lable>
              <input
                name="years"
                rows="4"
                cols="50"
                className="form-control mb-4 mt-1 border border-#ccc"
                placeholder="Steps"
                value={ExpYears}
                style={{ height: "40px" }}
                onChange={(evnt) => setExpYears(evnt.target.value)}
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
                data={ExpDescription || ""}
                onReady={(editor) => {}}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setExpDescription(data);
                }}
                onBlur={(event, editor) => {}}
                onFocus={(event, editor) => {}}
              />
            </div>
            <div
              className="d-flex align-items-center mt-3"
              style={{ gap: "10px" }}
            >
              <button className="send-btnn" onClick={() => handleSaveExp()}>
                Save
              </button>
              <button className="delete-button m-0" onClick={handleCanclebtn}>
                Cancel
              </button>
            </div>
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
              Edit {TitleData?.card_experience?.visible_name}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleEditClose}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {AddMoreExp &&
            AddMoreExp?.map((item, i) => {
              return (
                <>
                  {ModalId === item.id ? (
                    <div>
                      <input
                        type="hidden"
                        defaultValue={item.id}
                        name="hiddenId"
                        key={i}
                      />
                      <lable className="modalFormLable">Title*</lable>
                      <input
                        name="designation"
                        rows="4"
                        cols="50"
                        className="form-control mb-4 mt-1 border border-#ccc"
                        placeholder="Title"
                        defaultValue={item.designation}
                        style={{ height: "40px" }}
                        onChange={(evnt) =>
                          setExpDesignation(evnt.target.value)
                        }
                      ></input>
                      <lable className="modalFormLable">Steps</lable>
                      <input
                        name="years"
                        rows="4"
                        cols="50"
                        className="form-control mb-4 mt-1 border border-#ccc"
                        placeholder="Steps"
                        defaultValue={item.years}
                        style={{ height: "40px" }}
                        onChange={(evnt) => setExpYears(evnt.target.value)}
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
                        data={ExpDescription || ""}
                        onReady={(editor) => {}}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setExpDescription(data);
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
                          onClick={() => handleSaveExp(item.id)}
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

      {TitleData?.card_experience?.source !== 0 ? (
        <div className="position-relative">
          {Data ? (
            <EditPlan Data={Data} PlanData={PlanData} APIDATA={APIDATA} />
          ) : (
            ""
          )}
          <div className="mt-3 box-content boxxx" id="card_experience">
            {/* <!-- Experience --> */}
            <div className="row">
              <div className="col-12">
                <div className="flex-header">
                  <div className="pb-2 d-flex align-items-baseline">
                    {EditFields ? (
                      <input
                        name="years"
                        rows="4"
                        cols="50"
                        className="title-section-input"
                        onChange={(e) => setExpTitle(e.target.value)}
                        defaultValue={
                          TitleData &&
                          TitleData.card_experience?.visible_name ==
                            "card_experience"
                            ? "card_experience"
                            : TitleData?.card_experience?.visible_name
                        }
                        placeholder="Title"
                      ></input>
                    ) : (
                      <>
                        <h1 className="title title--h1 first-title title__separate">
                          {ExpTitle}
                        </h1>
                      </>
                    )}
                  </div>
                  <div>
                    {TitleData?.card_experience?.source == 2 &&
                    PlanData?.is_expired == false &&
                    PlanData?.subscription?.plan_id !== 1 ? (
                      <div className="d-flex align-items-center">
                        <div class="wrapper">
                          <div class="tooltip">
                            This section can be used for your work experience,
                            your work process, or show off your current skills.
                          </div>
                          <FontAwesomeIcon
                            icon={faInfo}
                            className="mr-2 pe-auto Iconcolor-black cursor-pointer"
                            onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
                          />
                        </div>
                        <div
                          className="edit-pencile-div"
                          style={{ top: "8px", right: "60px" }}
                        >
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
                        {MainData?.company_setting?.maximum_experience <=
                        AddMoreExp?.length ? (
                          <button
                            className="addmore"
                            // onClick={handleUpgradePlan}
                            onClick={() => handleShow()}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        ) : (
                          <button
                            className="addmore"
                            data-toggle="modal"
                            data-target="#AddMoreExpModal"
                            onClick={() => handleShow()}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        )}
                        <>
                          <label className="switch">
                            <input
                              data-status={TitleData.card_experience?.is_active}
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
                {AddMoreExp?.length == 0 ? (
                  <div>
                    <p>
                      Experiance are empty, To add experience click on the edit
                      icon.
                    </p>
                  </div>
                ) : (
                  <div className="timeline">
                    {/* <!-- Item --> */}
                    {AddMoreExp &&
                      AddMoreExp.map((item, index) => {
                        return (
                          <article key={index} className="timeline__item">
                            <h5 className="title title--h5 timeline__title d-flex justify-content-between align-items-center">
                              {item.designation}
                            </h5>
                            <p
                              id="p_wrap"
                              className="timeline__description"
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            ></p>
                            <span className="timeline__period mb-2">
                              {item.years}
                            </span>
                            {TitleData?.card_experience?.source == "2" &&
                            PlanData?.is_expired == false &&
                            PlanData?.subscription?.plan_id !== 1 ? (
                              <div
                                className="d-flex align-items-center mb-4 mt-3"
                                style={{ gap: "10px" }}
                              >
                                <button
                                  className="send-btnn m-0"
                                  data-toggle="modal"
                                  data-target="#EditExpModal"
                                  onClick={() =>
                                    handleSetId(
                                      item.id,
                                      item.years,
                                      item.description,
                                      item.designation
                                    )
                                  }
                                >
                                  Edit
                                </button>
                                <button
                                  className="delete-button m-0"
                                  onClick={() =>
                                    handleDelteSkills(item.id, 6, Data?.id)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </article>
                        );
                      })}
                  </div>
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
}
