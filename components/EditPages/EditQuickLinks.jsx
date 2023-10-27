/* eslint-disable react/jsx-no-target-blank */
"use client";
import {
  faChevronRight,
  faCircleInfo,
  faFloppyDisk,
  faInfo,
  faLink,
  faLock,
  faPencil,
  faPhone,
  faPlus,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { CardData, deleteSection } from "@services/Routes";
import Api from "@services/Api";
import Modal from "react-bootstrap/Modal";
import EditPlan from "./EditPlan";

export default function EditCustomLink({
  APIDATA,
  Data,
  TitleData,
  PlanData,
  MainData,
}) {
  const [LinkLabel, setLinkLabel] = useState("");
  const [LinkName, setLinkName] = useState("");
  const [Active, setActive] = useState("");
  const [EditFields, setEditFields] = useState(false);
  const [ModalId, setModalId] = useState("");
  const [Tags, setTags] = useState("");
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleEditClose = () => setShowEdit(false);
  const handleShow = () => setShow(true);
  const handleEditShow = () => setShowEdit(true);
  const [CustomLinkTitle, setCustomLinkTitle] = useState("");

  useEffect(() => {
    setCustomLinkTitle(TitleData?.card_custom_url?.visible_name);
  }, []);

  useEffect(() => {
    setActive(TitleData?.card_custom_url?.is_active == "1" ? true : false);
  }, [TitleData]);

  const handleCanclebtn = () => {
    handleClose();
    handleEditClose();
    setLinkLabel("");
    setLinkName("");
  };

  const handleSaveDetails = async (id = null) => {
    // setShowLoader(true);
    let custom_urls = [];
    let error = false;
    let mess = "";
    // BlogFeild.map(async (o, i) => {
    if (LinkLabel == "" || LinkName == "") {
      error = true;
      mess = LinkLabel == "" ? "Label is required" : "Link is required";
    } else {
      id !== null
        ? (custom_urls = [
            {
              title: LinkLabel,
              link: LinkName,
              tag: Tags,
              saved_custom_url: id,
            },
          ])
        : (custom_urls = [
            {
              title: LinkLabel,
              link: LinkName,
              tag: Tags,
            },
          ]);
    }
    // });
    if (error) {
      // setShowLoader(false);
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
      const response = await Api(CardData, { custom_urls });
      if (response?.data?.status) {
        APIDATA();
        handleClose();
        handleEditClose();
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
      }
    } catch (error) {
      if (error?.request?.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      toast(error?.response?.data?.message, {
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
    handleCanclebtn();
    setLinkLabel("");
    setLinkName("");

    // setShowLoader(false);
  };

  const handleDeleteNumber = async (id, type, DataId) => {
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
      confirmButtonColor: "#3085d6",
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
        name: "card_alternate_phone",
        visible_name: CustomLinkTitle,
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
          // setShowLoader(true);
          const response = await Api(CardData, { titles });
          if (response.status) {
            setActive((prev) => !prev);
            // setShowLoader(false);
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

  const handleChnageTitle = async () => {
    // setShowLoader(true);
    let titles = [
      {
        name: "card_custom_url",
        visible_name: CustomLinkTitle,
      },
    ];
    try {
      const response = await Api(CardData, { titles });
      // setShowLoader(false);
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
        setEditFields(false);
      }
    } catch (error) {
      console.log(error);
      // if (error.request.status == "401") {
      //   localStorage.removeItem("token");
      //   window.location.href = "/login";
      // }
      // toast(error.response.data.message, {
      //   position: "bottom-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    }
  };
  const handleSetId = (id, title, link, tag) => {
    handleEditShow();
    setModalId(id);
    setLinkLabel(title);
    setLinkName(link);
    setTags(tag);
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
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Add {CustomLinkTitle}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <lable className="modalFormLable">Label</lable>
            <input
              type="text"
              name="number"
              rows="4"
              cols="50"
              className="form-control mb-4 mt-1"
              value={LinkLabel}
              placeholder="Enter label*"
              style={{ height: "40px", border: "1px solid #ccc" }}
              onChange={(e) => setLinkLabel(e.target.value)}
            ></input>
          </div>
          <div>
            <lable className="modalFormLable">Link</lable>
            <input
              type="text"
              name="number"
              rows="4"
              cols="50"
              className="form-control mb-4 mt-1"
              value={LinkName}
              placeholder="Enter Link*"
              style={{ height: "40px", border: "1px solid #ccc" }}
              onChange={(e) => setLinkName(e.target.value)}
            ></input>
          </div>
          <div>
            <lable className="modalFormLable">Tags (Max-word limit 10)</lable>
            <input
              type="text"
              name="number"
              rows="4"
              cols="50"
              className="form-control mb-4 mt-1"
              value={Tags}
              maxLength={"10"}
              placeholder="Enter Tags"
              style={{ height: "40px", border: "1px solid #ccc" }}
              onChange={(e) => setTags(e.target.value)}
            ></input>
          </div>
          <div
            className="d-flex align-items-center mt-3"
            style={{ gap: "10px" }}
          >
            <button className="send-btnn" onClick={() => handleSaveDetails()}>
              Save
            </button>
            <button className="delete-button m-0" onClick={handleCanclebtn}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit Model */}
      <Modal show={showEdit} onHide={handleEditClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Edit {CustomLinkTitle}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={() => handleEditClose()}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {Data?.card_custom_url?.map((item, index) => {
            return (
              <>
                {ModalId === item.id ? (
                  <div key={index}>
                    <div>
                      <lable className="modalFormLable">Label</lable>
                      <input
                        type="text"
                        name="number"
                        rows="4"
                        cols="50"
                        className="form-control mb-4 mt-1"
                        value={LinkLabel}
                        placeholder="Enter label"
                        style={{ height: "40px", border: "1px solid #ccc" }}
                        onChange={(e) => setLinkLabel(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <lable className="modalFormLable">Link</lable>
                      <input
                        type="text"
                        name="number"
                        rows="4"
                        cols="50"
                        className="form-control mb-4 mt-1"
                        value={LinkName}
                        placeholder="Enter Link"
                        style={{ height: "40px", border: "1px solid #ccc" }}
                        onChange={(e) => setLinkName(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <lable className="modalFormLable">Tags</lable>
                      <input
                        type="text"
                        name="number"
                        rows="4"
                        cols="50"
                        className="form-control mb-4 mt-1"
                        value={Tags}
                        placeholder="Enter Tags"
                        style={{ height: "40px", border: "1px solid #ccc" }}
                        onChange={(e) => setTags(e.target.value)}
                      ></input>
                    </div>
                    <div
                      className="d-flex align-items-center mt-3"
                      style={{ gap: "10px" }}
                    >
                      <button
                        className="send-btnn"
                        onClick={() => handleSaveDetails(item.id)}
                      >
                        Save
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

      <div className="position-relative">
        {Data ? (
          <EditPlan Data={Data} PlanData={PlanData} APIDATA={APIDATA} />
        ) : (
          ""
        )}
        <div className="mb-3 box-content boxxx" id="about_us">
          <div className="flex-header">
            <div className="d-flex align-items-baseline">
              {EditFields ? (
                <input
                  type="text"
                  name="AboutMe"
                  className="title-section-input mb-3"
                  placeholder="Custom Links"
                  onChange={(e) => setCustomLinkTitle(e.target.value)}
                  defaultValue={CustomLinkTitle || ""}
                />
              ) : (
                <>
                  <h1 className="title title--h1 first-title title__separate">
                    {CustomLinkTitle}
                  </h1>
                </>
              )}
            </div>

            <div>
              {TitleData?.card_custom_url?.source == "2" &&
              PlanData?.is_expired == false &&
              PlanData?.subscription?.plan_id !== 1 ? (
                <div className="d-flex align-items-center">
                  <div class="wrapper">
                    <div class="tooltip">
                      Add links to external sites, shop pages, landing pages,
                      coming soon, invites and more...
                    </div>
                    <FontAwesomeIcon
                      icon={faInfo}
                      className="mr-1 pe-auto Iconcolor-black cursor-pointer"
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
                    {MainData?.company_setting?.maximum_custom_link >=
                    Data?.card_custom_url?.length ? (
                      <button
                        className="addmore"
                        data-toggle="modal"
                        data-target="#CustomLinkModal"
                        onClick={handleShow}
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
                          data-status={
                            CustomLinkTitle?.card_custom_url?.is_active
                          }
                          data-active={Active}
                          checked={Active}
                          type="checkbox"
                          onChange={() => handleActive()}
                        />
                        <span className="slider round"></span>
                      </label>
                    </>
                  </>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {Data?.card_custom_url?.length == 0 ? (
            <p>Custom Links are empty, to add links click on the add icon.</p>
          ) : (
            ""
          )}
          <div>
            {Data?.card_custom_url?.map((item, index) => {
              return (
                <>
                  <div className="alternate-number-div" key={index}>
                    {TitleData?.card_custom_url?.source == "2" &&
                    PlanData?.is_expired == false &&
                    PlanData?.subscription?.plan_id !== 1 ? (
                      <FontAwesomeIcon
                        icon={faXmarkCircle}
                        className="user-select-auto position-absolute top-0 end-0 zindex-1 edit-user-minus"
                        style={{
                          top: "0",
                          right: "0",
                          cursor: "pointer",
                          color: "var(--color)",
                          fontSize: "20px",
                          zIndex: "1",
                          background: "white",
                        }}
                        onClick={() => handleDeleteNumber(item.id, 8, Data?.id)}
                      />
                    ) : (
                      ""
                    )}
                    <div
                      className="d-flex align-items-center justify-content-between mt-1 mb-1"
                      key={index}
                    >
                      <a
                        href={
                          item &&
                          item.link &&
                          (item.link?.includes("http://") ||
                            item.link?.includes("https://"))
                            ? item.link
                            : "https://" + item.link
                        }
                        target="_blank"
                      >
                        <div className="d-flex align-items-center position-relative">
                          <FontAwesomeIcon
                            icon={faLink}
                            className="pe-auto Iconcolor-black"
                            style={{ fontSize: "15px" }}
                          />
                          <a
                            href={
                              item &&
                              item.link &&
                              (item.link?.includes("http://") ||
                                item.link?.includes("https://"))
                                ? item.link
                                : "https://" + item.link
                            }
                            target="_blank"
                            className="ml-3 font-weight-bold"
                            style={{ color: "black" }}
                          >
                            {item.title}
                            <span
                              class="badge badge-pill badge-warning ml-2"
                              style={{ top: "-15px", right: "0" }}
                            >
                              {item.tag}
                            </span>
                          </a>
                        </div>
                      </a>
                      {TitleData?.card_services?.source == "2" &&
                      PlanData?.is_expired == false &&
                      PlanData?.subscription?.plan_id !== 1 ? (
                        <FontAwesomeIcon
                          data-toggle="modal"
                          data-target="#CustomLinkModalEdit"
                          icon={faPencil}
                          className="pe-auto cursor-pointer"
                          style={{
                            fontSize: "15px",
                            color: "var(--color)",
                            marginRight: "35px",
                          }}
                          onClick={() =>
                            handleSetId(
                              item.id,
                              item.title,
                              item.link,
                              item.tag
                            )
                          }
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
