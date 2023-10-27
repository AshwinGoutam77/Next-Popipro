/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faChevronRight,
  faEnvelope,
  faLink,
  faMapMarkerAlt,
  faPencil,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CardData, GetCardData } from "@services/Routes";
import Api from "@services/Api";
import { Modal } from "react-bootstrap";

function EditHeader({ Data, setData, TitleData, PlanData, card, APIDATA }) {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState();
  const [Email, setEmail] = useState("");
  const [Profession, setProfession] = useState();
  const [Phone, setPhone] = useState();
  const [Address, setAddress] = useState();
  const [WebUrl, setWebUrl] = useState("");
  const [GoogleReview, setGoogleReview] = useState("");
  const [Show, setShow] = useState(false);
  const [ProfileImage, setProfileImage] = useState("");
  const [ColorCode, setColorCode] = useState("");
  const [cardStatus, setCardStatus] = useState("");
  const [ShowLoader, setShowLoader] = useState("");
  const [WhatsaapNumber, setWhatsaapNumber] = useState("");
  const [TrustPilot, setTrustPilot] = useState("");
  const [image, setImage] = useState(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [Base64Image, setBase64Image] = useState("");
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [showModal, setShowModal] = useState(false);

  const getBlobData = () => {
    axios({
      method: "get",
      url: croppedImage,
      responseType: "blob",
    }).then(function (response) {
      var reader = new FileReader();
      reader.readAsDataURL(response.data);
      reader.onloadend = function () {
        var base64data = reader.result;
        const formData = new FormData();
        formData.append("file", base64data);
        console.log(base64data);
        setBase64Image(base64data);
      };
    });
  };

  const handleImageUpload = async (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const tokenString = localStorage.getItem("url");
  let card_url = tokenString;

  // const APIDATA = async () => {
  //   const response = await Api(GetCardData, {}, "?card_url=" + card);
  //   setCardStatus(response.data.data.is);
  // };

  const cancleChanges = () => {
    window["closeModal"]();
    setShow(true);
    if (Show) {
      setShow(false);
    }
  };
  const SaveDataApi = async () => {
    // getBlobData();
    let info = {
      first_name: FirstName,
      last_name: LastName,
      email: TitleData.card_email?.source == 1 ? "" : Email,
      profession: Profession,
      phone: Phone,
      address: Address,
      image: ProfileImage[0],
      // image: Base64Image,
      color_code: ColorCode,
      website: WebUrl,
      google_review_url: GoogleReview,
      whatsapp_number: WhatsaapNumber,
      trustpilot_url: TrustPilot,
    };
    // console.log(info);
    // return;
    setShowLoader(true);
    try {
      const response = await Api(CardData, info);
      setShowLoader(true);
      if (response.data?.status) {
        APIDATA();
        handleClose();
        setShow(true);
        if (Show) {
          setShow(false);
        }
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
  const editHandler = async () => {
    handleShow();
    setShowLoader(true);
    setShow(true);
    if (Show) {
      setShow(false);
    }
    const response = await Api(GetCardData, {}, "?card_url=" + card);
    setShowLoader(true);
    if (response.data.status) {
      setFirstName(response.data.data.card.first_name);
      setLastName(response.data.data.card.last_name);
      setEmail(response.data.data.card.card_email);
      setProfession(response.data.data.card.card_profession);
      setPhone(response.data.data.card.card_contact);
      setAddress(response.data.data.card.card_address);
      setGoogleReview(response.data.data.card.card_google_review);
      setWebUrl(response.data.data.card.card_website);
      setColorCode(response.data.data.card.color_code);
      setWhatsaapNumber(response.data.data.card.whatsapp_number);
      setTrustPilot(response.data.data.card.card_trustpilot);
    }
    setShowLoader(false);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      // console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image]);

  function blobToBase64(croppedImage) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(croppedImage);
      console.log(croppedImage);
    });
  }

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
      {/* <SimpleBackdrop visible={ShowLoader} />
      <Share Data={Data} /> */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Manage Informations
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "10px 30px" }}>
          <div className="mt-3">
            <span className="overhead text-left mb-0">
              Upload profile image
            </span>
            <input
              type="file"
              placeholder="Name"
              onChange={(e) => {
                setProfileImage(e.target.files);
              }}
              // onChange={handleImageUpload}
              accept="image/png, image/gif, image/jpeg"
              className="form-control  mt-1  w-100 text-left"
              style={{
                border: "1px solid rgb(204, 204, 204)",
                borderRadius: "20px",
              }}
            />
            {/* <EasyCrop
                  image={image}
                  setRotation={setRotation}
                  setZoom={setZoom}
                  onCropComplete={onCropComplete}
                  setCrop={setCrop}
                  zoom={zoom}
                  rotation={rotation}
                  crop={crop}
                  showCroppedImage={showCroppedImage}
                  croppedImage={croppedImage}
                  setCroppedImage={setCroppedImage}
                /> */}
          </div>
          <div className="mt-3">
            <span className="overhead text-left mb-0">Name</span>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setFirstName(e.target.value)}
              defaultValue={FirstName || ""}
              className="email-input w-100 text-left"
              autoFocus="autofocus"
              style={{
                borderBottom: "1px solid rgb(204, 204, 204);",
              }}
            />
          </div>
          <div className="mt-3">
            {TitleData?.card_website?.source !== 1 ? (
              <div className="mt-2 w-100">
                <span className="overhead text-left">Profession</span>
                <input
                  type="text"
                  placeholder="Profession"
                  onChange={(e) => setProfession(e.target.value)}
                  defaultValue={Profession || ""}
                  className="email-input"
                  style={{
                    borderBottom: "1px solid rgb(204, 204, 204);",
                  }}
                />
              </div>
            ) : (
              <div className="mt-2 w-100">
                <span className="overhead text-left">Profession</span>
                <input
                  type="text"
                  placeholder="Profession"
                  onChange={(e) => setProfession(e.target.value)}
                  defaultValue={Profession || ""}
                  className="email-input"
                  readOnly
                  style={{
                    borderBottom: "1px solid rgb(204, 204, 204);",
                    background: "#dcdcdcd9",
                  }}
                />
              </div>
            )}
          </div>
          <div className="mt-3">
            {TitleData?.card_email?.source == 2 ? (
              <>
                <span className="overhead">Email</span>
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  defaultValue={Email || ""}
                  className="email-input"
                />
              </>
            ) : (
              <>
                <span className="overhead">Email</span>
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  defaultValue={Email || ""}
                  className="email-input"
                  style={{ background: "#dcdcdcd9" }}
                  readOnly
                />
              </>
            )}
          </div>
          <div className="mt-3">
            {TitleData?.card_contact?.source == "2" ? (
              <>
                <span className="overhead">Phone</span>
                <input
                  type="text"
                  placeholder="Phone number"
                  onChange={(e) => setPhone(e.target.value)}
                  defaultValue={Phone || ""}
                  className="email-input"
                />
              </>
            ) : (
              <>
                <span className="overhead">Phone</span>
                <input
                  type="text"
                  placeholder="Phone number"
                  onChange={(e) => setPhone(e.target.value)}
                  defaultValue={Phone || ""}
                  className="email-input"
                  style={{ background: "#dcdcdcd9" }}
                  readOnly
                />
              </>
            )}
          </div>
          <div className="mt-3">
            {TitleData?.card_contact?.source == "2" ? (
              <>
                <span className="overhead">
                  Whatsaap Number{" "}
                  <span style={{ color: "var(--color)", fontWeight: "normal" }}>
                    (*Please enter number with country code and without any
                    spaces)
                  </span>
                </span>
                <input
                  type="text"
                  placeholder="Whatsaap number"
                  onChange={(e) => setWhatsaapNumber(e.target.value)}
                  defaultValue={WhatsaapNumber || ""}
                  className="email-input"
                />
              </>
            ) : (
              <>
                <span className="overhead">Whatsaap Number</span>
                <input
                  type="text"
                  placeholder="Whatsaap Number"
                  onChange={(e) => setWhatsaapNumber(e.target.value)}
                  defaultValue={WhatsaapNumber || ""}
                  className="email-input"
                  style={{ background: "#dcdcdcd9" }}
                  readOnly
                />
              </>
            )}
          </div>
          <div className="mt-3">
            {TitleData?.card_address?.source == "2" ? (
              <>
                <span className="overhead">Location</span>
                <input
                  type="text"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  defaultValue={Address || ""}
                  className="email-input"
                />
              </>
            ) : (
              <>
                <span className="overhead">Location</span>
                <input
                  type="text"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  defaultValue={Address || ""}
                  className="email-input"
                  style={{ background: "#dcdcdcd9" }}
                  readOnly
                />
              </>
            )}
          </div>
          <div className="mt-3">
            {TitleData?.card_website?.source !== 1 ? (
              <>
                <span className="overhead">Website URL</span>
                <input
                  type="text"
                  placeholder="Website URL"
                  onChange={(e) => setWebUrl(e.target.value)}
                  defaultValue={WebUrl || ""}
                  className="email-input"
                />
              </>
            ) : (
              <>
                <span className="overhead">Website URL</span>
                <input
                  type="text"
                  placeholder="Website URL"
                  onChange={(e) => setWebUrl(e.target.value)}
                  defaultValue={WebUrl || ""}
                  className="email-input"
                  style={{ background: "#dcdcdcd9" }}
                  readOnly
                />
              </>
            )}
          </div>
          <div className="mt-3">
            {TitleData?.card_website?.source !== 1 &&
            PlanData?.subscription?.plan_id !== 1 &&
            PlanData?.is_expired == false ? (
              <>
                <span className="overhead">Google review url</span>
                <input
                  type="text"
                  placeholder="Your google Review url"
                  onChange={(e) => setGoogleReview(e.target.value)}
                  defaultValue={GoogleReview || ""}
                  className="email-input"
                />
              </>
            ) : (
              <>
                <span className="overhead">Google review url</span>
                <input
                  type="text"
                  placeholder="Your google Review url"
                  onChange={(e) => setGoogleReview(e.target.value)}
                  defaultValue={GoogleReview || ""}
                  className="email-input"
                  style={{ background: "#dcdcdcd9" }}
                  readOnly
                />
              </>
            )}
          </div>
          <div className="mt-3 mb-3">
            {TitleData?.card_website?.source !== 1 &&
            PlanData?.subscription?.plan_id !== 1 &&
            PlanData?.is_expired == false ? (
              <>
                <span className="overhead">Trust Pilot</span>
                <input
                  type="text"
                  placeholder="Your Trust Pilot url"
                  onChange={(e) => setTrustPilot(e.target.value)}
                  defaultValue={TrustPilot || ""}
                  className="email-input"
                />
              </>
            ) : (
              <>
                <span className="overhead">Trust Pilot</span>
                <input
                  type="text"
                  placeholder="Your Trust Pilot url"
                  onChange={(e) => setTrustPilot(e.target.value)}
                  defaultValue={TrustPilot || ""}
                  className="email-input"
                  style={{ background: "#dcdcdcd9" }}
                  readOnly
                />
              </>
            )}
          </div>
          <div
            className="d-flex align-items-center pb-4"
            style={{ gap: "8px" }}
          >
            <button
              className={"contact-btn w-100"}
              onClick={SaveDataApi}
              defaultValue="1"
              style={{ padding: "7px 20px" }}
            >
              Save
            </button>
            <button
              className={"contact-delete-btn w-100"}
              onClick={cancleChanges}
              defaultValue="1"
              style={{ padding: "7px 20px" }}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <header className="header header-box">
        <button
          className="edit-header"
          data-toggle="modal"
          data-target="#EditHeaderModal"
          onClick={editHandler}
        >
          <FontAwesomeIcon
            icon={faPencil}
            style={{ fontSize: "17px", cursor: "pointer", color: "black" }}
          />
        </button>
        <div className="header__left">
          <div className="header__photo">
            <div style={{ position: "relative", height: "100%" }}>
              <img
                className="header__photo-img"
                value={Data && Data.profile_picture.path}
                src={
                  Data?.profile_picture?.path
                    ? Data?.base_url + Data?.profile_picture?.path
                    : "https://avatars.githubusercontent.com/u/8152403?v=4"
                }
                alt="images"
              />
            </div>
          </div>
          <div className="header__base-info">
            {Data && Data.first_name == null ? (
              "Name"
            ) : (
              <h4 className="title titl--h4">{Data?.first_name}</h4>
            )}
            <div className="status w-100">
              {Data && Data.card_profession == null
                ? "Profession"
                : Data?.card_profession}
            </div>
          </div>
        </div>
        <div className="header__right">
          <ul className="header__contact row">
            <li className="col-sm-6 col-12">
              <a
                href={"mailto:" + Data?.card_email}
                className="d-flex align-items-center justify-content-between"
              >
                <div className="align-div">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="user-select-auto mr-2"
                    style={{
                      fontSize: "15px",
                      transform: "rotateY(180deg)",
                    }}
                  />
                  <a
                    href={"mailto:" + Data?.card_email}
                    className="overhead_a text-dark text-decoration-none"
                    target="_blank"
                  >
                    {" "}
                    {Data && Data.card_email}
                  </a>
                </div>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="user-select-auto mr-2"
                  style={{
                    fontSize: "15px",
                  }}
                />
              </a>
            </li>
            <li className="col-sm-6 col-12">
              {Data?.card_contact !== null ? (
                <a
                  href={"tel:" + Data?.card_contact}
                  className="d-flex align-items-center justify-content-between"
                >
                  <div className="align-div">
                    <FontAwesomeIcon
                      icon={faPhoneAlt}
                      className="user-select-auto mr-2"
                      style={{
                        fontSize: "15px",
                        transform: "rotateY(180deg)",
                      }}
                    />
                    <a
                      href={"tel:" + Data?.card_contact}
                      className="overhead_a text-dark text-decoration-none"
                      style={{ marginLeft: "5px" }}
                    >
                      {Data && Data.card_contact}
                    </a>
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="user-select-auto mr-2"
                    style={{
                      fontSize: "15px",
                    }}
                  />
                </a>
              ) : (
                ""
              )}
            </li>
            <li className="col-sm-6 col-12">
              {Data?.card_address !== null ? (
                <a
                  href={
                    Data &&
                    Data?.card_address &&
                    (Data?.card_address?.includes("http://") ||
                      Data?.card_address?.includes("https://"))
                      ? Data?.card_address
                      : "https://www.google.com/maps/place/" +
                        Data?.card_address
                  }
                  className="d-flex align-items-center justify-content-between"
                >
                  <div className="align-div">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="user-select-auto mr-2"
                      style={{
                        fontSize: "15px",
                        transform: "rotateY(180deg)",
                      }}
                    />
                    <a
                      href={
                        Data &&
                        Data?.card_address &&
                        (Data?.card_address?.includes("http://") ||
                          Data?.card_address?.includes("https://"))
                          ? Data?.card_address
                          : "https://www.google.com/maps/place/" +
                            Data?.card_address
                      }
                      target="_blank"
                      className="overhead_a text-dark text-decoration-none"
                      style={{ marginLeft: "9px" }}
                    >
                      {Data && Data?.card_address}
                    </a>
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="user-select-auto mr-2"
                    style={{
                      fontSize: "15px",
                    }}
                  />
                </a>
              ) : (
                ""
              )}
            </li>
            <li className="web-li col-sm-6 col-12">
              <div>
                <div>
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className="user-select-auto mr-2"
                    style={{
                      fontSize: "15px",
                      transform: "rotateY(180deg)",
                    }}
                  />
                  <p className="text-dark m-0">{Data?.card_name}</p>
                </div>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="user-select-auto mr-2"
                  style={{
                    fontSize: "15px",
                  }}
                />
              </div>
            </li>
            <li className="col-sm-6 col-12">
              <>
                {Data?.card_website ? (
                  <div>
                    <a
                      href={
                        Data &&
                        Data?.card_website &&
                        (Data?.card_website?.includes("http://") ||
                          Data?.card_website?.includes("https://"))
                          ? Data.card_website
                          : Data.card_website
                      }
                      className="d-flex align-items-center justify-content-between"
                    >
                      <div className="align-div">
                        <FontAwesomeIcon
                          icon={faLink}
                          className="user-select-auto mr-2"
                          style={{
                            fontSize: "15px",
                            transform: "rotateY(180deg)",
                          }}
                        />
                        <a
                          href={
                            Data &&
                            Data?.card_website &&
                            (Data?.card_website?.includes("http://") ||
                              Data?.card_website?.includes("https://"))
                              ? Data.card_website
                              : "https://" + Data.card_website
                          }
                          target="_blank"
                          className="overhead_a text-dark text-decoration-none"
                          style={{ marginLeft: "2px" }}
                        >
                          {Data &&
                          Data?.card_website &&
                          (Data?.card_website?.includes("http://") ||
                            Data?.card_website?.includes("https://"))
                            ? Data.card_website
                            : Data.card_website}
                        </a>
                      </div>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="user-select-auto mr-2"
                        style={{
                          fontSize: "15px",
                        }}
                      />
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default EditHeader;
