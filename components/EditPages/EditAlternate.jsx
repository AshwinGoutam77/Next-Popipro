import {
  faFloppyDisk,
  faInfo,
  faPencil,
  faPhone,
  faPlus,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import Api from "@services/Api";
import { CardData, deleteSection } from "@services/Routes";
import { Modal } from "react-bootstrap";
import EditPlan from "./EditPlan";

export default function EditAlternateNo({
  APIDATA,
  Data,
  TitleData,
  PlanData,
  MainData,
}) {
  const [NumberLabel, setNumberLabel] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [ShowLoader, setShowLoader] = useState();
  const [Active, setActive] = useState("");
  const [EditFields, setEditFields] = useState(false);
  const [ModalId, setModalId] = useState("");
  const [CountryCode, setCountryCode] = useState("");
  const [Extension, setExtension] = useState("");
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const [AlterNumber, setAlterNumber] = useState("");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleEditClose = () => setShowEdit(false);
  const handleShow = () => setShow(true);
  const handleEditShow = () => setShowEdit(true);

  useEffect(() => {
    setActive(TitleData?.card_alternate_phone?.is_active == "1" ? true : false);
  }, [TitleData]);

  useEffect(() => {
    setAlterNumber(TitleData?.card_alternate_phone?.visible_name);
  }, []);

  const handleCanclebtn = () => {
    handleClose();
    handleEditClose();
    setNumberLabel("");
    setMobileNumber("");
    setCountryCode("");
    setExtension("");
  };
  const handleActive = async () => {
    const titles = [
      {
        name: "card_alternate_phone",
        visible_name: AlterNumber,
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
      }
    });
  };
  const handleSaveDetails = async (id = null) => {
    setShowLoader(true);
    let alternate_phones = [];
    let error = false;
    let mess = "";
    if (MobileNumber == "" || NumberLabel == "") {
      error = true;
      mess = NumberLabel == "" ? "Label is required" : "Number is required";
    } else {
      id !== null
        ? (alternate_phones = [
            {
              title: NumberLabel,
              number: MobileNumber,
              extension: Extension,
              country_code: CountryCode,
              saved_alternate_phone: id,
            },
          ])
        : (alternate_phones = [
            {
              title: NumberLabel,
              number: MobileNumber,
              extension: Extension,
              country_code: CountryCode,
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
      const response = await Api(CardData, { alternate_phones });
      if (response?.data?.status) {
        APIDATA();
        handleClose();
        handleEditClose();
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
    setNumberLabel("");
    setMobileNumber("");
    setCountryCode("");
    setExtension("");
    setShowLoader(false);
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
  const handleSetId = (id, title, number, country_code, extension) => {
    handleEditShow();
    setModalId(id);
    setNumberLabel(title);
    setMobileNumber(number);
    setCountryCode(country_code);
    setExtension(extension);
  };
  const handleChnageTitle = async () => {
    setShowLoader(true);
    const titles = [
      {
        name: "card_alternate_phone",
        visible_name: AlterNumber,
      },
    ];
    try {
      const response = await Api(CardData, { titles });
      setShowLoader(false);
      if (response.data.status) {
        setShowLoader(false);
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
      {/* <SimpleBackdrop visible={ShowLoader} /> */}
      <div
        className="modal fade"
        id="AlternateNumberModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="AlternateNumberModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{ borderRadius: "25px" }}>
            <div className="modal-header">
              <h5
                className="title title--h1 first-title title__separate mb-0"
                id="BlogModalTitle"
              >
                {AlterNumber}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" style={{ padding: "30px 25px" }}>
              <div>
                <lable className="modalFormLable">Label</lable>
                <input
                  type="text"
                  name="number"
                  rows="4"
                  cols="50"
                  className="form-control mb-4 mt-1"
                  value={NumberLabel}
                  placeholder="Enter label for Alternate number"
                  style={{ height: "40px", border: "1px solid #ccc" }}
                  onChange={(e) => setNumberLabel(e.target.value)}
                ></input>
              </div>
              <div>
                <lable className="modalFormLable">Phone Number</lable>
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "8px" }}
                >
                  <input
                    type="text"
                    name="number"
                    rows="4"
                    cols="50"
                    className="form-control mb-4 mt-1 w-50"
                    value={CountryCode}
                    placeholder="+91"
                    style={{ height: "40px", border: "1px solid #ccc" }}
                    onChange={(e) => setCountryCode(e.target.value)}
                  ></input>
                  <input
                    type="number"
                    name="number"
                    rows="4"
                    cols="50"
                    className="form-control mb-4 mt-1"
                    value={MobileNumber}
                    placeholder="xxxxxxxxxx"
                    style={{ height: "40px", border: "1px solid #ccc" }}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    name="number"
                    rows="4"
                    cols="50"
                    className="form-control mb-4 mt-1 w-50"
                    value={Extension}
                    placeholder="xxxx"
                    style={{ height: "40px", border: "1px solid #ccc" }}
                    onChange={(e) => setExtension(e.target.value)}
                  ></input>
                </div>
              </div>

              <div
                className="d-flex align-items-center mt-3"
                style={{ gap: "10px" }}
              >
                <button
                  className="send-btnn"
                  onClick={() => handleSaveDetails()}
                >
                  Save
                </button>
                <button className="delete-button m-0" onClick={handleCanclebtn}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Add {AlterNumber}
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
              value={NumberLabel}
              placeholder="Enter label for Alternate number"
              style={{ height: "40px", border: "1px solid #ccc" }}
              onChange={(e) => setNumberLabel(e.target.value)}
            ></input>
          </div>
          <div>
            <lable className="modalFormLable">Phone Number</lable>
            <div className="d-flex align-items-center" style={{ gap: "8px" }}>
              <input
                type="text"
                name="number"
                rows="4"
                cols="50"
                className="form-control mb-4 mt-1 w-50"
                value={CountryCode}
                placeholder="+91"
                style={{ height: "40px", border: "1px solid #ccc" }}
                onChange={(e) => setCountryCode(e.target.value)}
              ></input>
              <input
                type="number"
                name="number"
                rows="4"
                cols="50"
                className="form-control mb-4 mt-1"
                value={MobileNumber}
                placeholder="xxxxxxxxxx"
                style={{ height: "40px", border: "1px solid #ccc" }}
                onChange={(e) => setMobileNumber(e.target.value)}
              ></input>
              <input
                type="text"
                name="number"
                rows="4"
                cols="50"
                className="form-control mb-4 mt-1 w-50"
                value={Extension}
                placeholder="xxxx"
                style={{ height: "40px", border: "1px solid #ccc" }}
                onChange={(e) => setExtension(e.target.value)}
              ></input>
            </div>
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

      {/* Edit model */}
      <div
        className="modal fade"
        id="AlternateNumberModalEdit"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="AlternateNumberModalEdit"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{ borderRadius: "25px" }}>
            <div className="modal-header">
              <h5
                className="title title--h1 first-title title__separate mb-0"
                id="AlternateNumberModalEdit"
              >
                {AlterNumber}
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
            <div className="modal-body" style={{ padding: "30px 25px" }}>
              <>
                {Data?.card_alternate_phone?.map((item, index) => {
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
                              value={NumberLabel}
                              placeholder="Enter label for Alternate number"
                              style={{
                                height: "40px",
                                border: "1px solid #ccc",
                              }}
                              onChange={(e) => setNumberLabel(e.target.value)}
                            ></input>
                          </div>
                          <div>
                            <lable className="modalFormLable">
                              Phone Number
                            </lable>
                            <div
                              className="d-flex align-items-center"
                              style={{ gap: "8px" }}
                            >
                              <input
                                type="text"
                                name="number"
                                rows="4"
                                cols="50"
                                className="form-control mb-4 mt-1 w-50"
                                value={CountryCode}
                                placeholder="+91"
                                style={{
                                  height: "40px",
                                  border: "1px solid #ccc",
                                }}
                                onChange={(e) => setCountryCode(e.target.value)}
                              ></input>
                              <input
                                type="number"
                                name="number"
                                rows="4"
                                cols="50"
                                className="form-control mb-4 mt-1"
                                value={MobileNumber}
                                placeholder="xxxxxxxxxx"
                                style={{
                                  height: "40px",
                                  border: "1px solid #ccc",
                                }}
                                onChange={(e) =>
                                  setMobileNumber(e.target.value)
                                }
                              ></input>
                              <input
                                type="text"
                                name="number"
                                rows="4"
                                cols="50"
                                className="form-control mb-4 mt-1 w-50"
                                value={Extension}
                                placeholder="xxxx"
                                style={{
                                  height: "40px",
                                  border: "1px solid #ccc",
                                }}
                                onChange={(e) => setExtension(e.target.value)}
                              ></input>
                            </div>
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
              </>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showEdit} onHide={handleEditClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Edit {AlterNumber}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {Data?.card_alternate_phone?.map((item, index) => {
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
                        value={NumberLabel}
                        placeholder="Enter label for Alternate number"
                        style={{
                          height: "40px",
                          border: "1px solid #ccc",
                        }}
                        onChange={(e) => setNumberLabel(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <lable className="modalFormLable">Phone Number</lable>
                      <div
                        className="d-flex align-items-center"
                        style={{ gap: "8px" }}
                      >
                        <input
                          type="text"
                          name="number"
                          rows="4"
                          cols="50"
                          className="form-control mb-4 mt-1 w-50"
                          value={CountryCode}
                          placeholder="+91"
                          style={{
                            height: "40px",
                            border: "1px solid #ccc",
                          }}
                          onChange={(e) => setCountryCode(e.target.value)}
                        ></input>
                        <input
                          type="number"
                          name="number"
                          rows="4"
                          cols="50"
                          className="form-control mb-4 mt-1"
                          value={MobileNumber}
                          placeholder="xxxxxxxxxx"
                          style={{
                            height: "40px",
                            border: "1px solid #ccc",
                          }}
                          onChange={(e) => setMobileNumber(e.target.value)}
                        ></input>
                        <input
                          type="text"
                          name="number"
                          rows="4"
                          cols="50"
                          className="form-control mb-4 mt-1 w-50"
                          value={Extension}
                          placeholder="xxxx"
                          style={{
                            height: "40px",
                            border: "1px solid #ccc",
                          }}
                          onChange={(e) => setExtension(e.target.value)}
                        ></input>
                      </div>
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
        <div className="mb-3 box-content boxxx sm-mt-0" id="about_us">
          <div className="flex-header">
            <div className="d-flex align-items-baseline">
              {EditFields ? (
                <input
                  type="text"
                  name="AboutMe"
                  className="title-section-input mb-3"
                  placeholder="Custom Numbers"
                  onChange={(e) => setAlterNumber(e.target.value)}
                  defaultValue={AlterNumber || ""}
                />
              ) : (
                <>
                  <h1 className="title title--h1 first-title title__separate">
                    {AlterNumber}
                  </h1>
                </>
              )}
            </div>

            <div>
              {TitleData?.card_alternate_phone?.source == "2" &&
              PlanData?.is_expired == false &&
              PlanData?.subscription?.plan_id !== 1 ? (
                <div className="d-flex align-items-center">
                  <div class="wrapper">
                    <div class="tooltip">
                      You can utilize this section to add any contact number,
                      skype number, whatsaap number.
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
                  <>
                    {MainData?.company_setting?.maximum_alternate_phone >=
                    Data?.card_alternate_phone?.length ? (
                      <button
                        className="addmore"
                        data-toggle="modal"
                        data-target="#AlternateNumberModal"
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
                            TitleData.card_alternate_phone?.is_active
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
          {Data?.card_alternate_phone?.length == 0 ? (
            <p>
              Alternate Numbers are empty, to add numbers click on the add icon.
            </p>
          ) : (
            ""
          )}
          {Data?.card_alternate_phone?.map((item, index) => {
            return (
              <>
                <div className="alternate-number-div" key={index}>
                  {TitleData?.card_alternate_phone?.source == "2" &&
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
                      onClick={() => handleDeleteNumber(item.id, 9, Data?.id)}
                    />
                  ) : (
                    ""
                  )}
                  <div
                    className="d-flex align-items-center justify-content-between mt-1 mb-1"
                    key={index}
                  >
                    <a href={"tel:" + item.number}>
                      <div className="d-flex align-items-center flex-wrap">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="pe-auto Iconcolor-black"
                          style={{ fontSize: "15px" }}
                        />
                        <p
                          className="ml-2 font-weight-bold"
                          style={{ color: "black" }}
                        >
                          {item.title} :
                        </p>
                        <a
                          href={
                            "tel:" +
                            item.country_code +
                            "-" +
                            item?.number +
                            "-" +
                            item?.extension
                          }
                          className="ml-1"
                          style={{ color: "black" }}
                        >
                          {item?.country_code}
                          {item?.country_code ? "-" : ""} {item?.number}
                          {item?.extension ? "-" : ""} {item?.extension}
                        </a>
                      </div>
                    </a>
                    {TitleData?.card_services?.source == "2" &&
                    PlanData?.is_expired == false &&
                    PlanData?.current_plan?.plan_name !== "basic" ? (
                      <FontAwesomeIcon
                        data-toggle="modal"
                        data-target="#AlternateNumberModalEdit"
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
                            item.number,
                            item?.country_code,
                            item?.extension
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
    </>
  );
}
