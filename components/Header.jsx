"use client";
import {
  faArrowRight,
  faBuilding,
  faEnvelope,
  faLink,
  faMapMarkerAlt,
  faPhoneAlt,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
// import Share from "./Share";
import "../styles/header.css";
import Link from "next/link";
import { HitClickApi, contactUs } from "@services/Routes";
import Api from "@services/Api";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Share from "./Share";

const Header = ({ profile, card, company_setting, Titles, CardLinks }) => {
  const [ProfileImage, setProfileImage] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [showReview, setShowReview] = useState(false);
  const handleShowReview = () => setShowReview(true);
  const handleCloseReview = () => setShowReview(false);
  const [FirstName, setFirstName] = useState("");
  const [Number, setNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const [ShowLoader, setShowLoader] = useState(false);
  const [SendWhatsaap, setSendWhatsaap] = useState(false);
  const [modalShow, setModalShow] = useState("");

  const handleCanclebtn = () => {
    handleClose();
  };

  const handleSendWhatsaapMessage = () => {
    setSendWhatsaap(true);
    if (SendWhatsaap) {
      setSendWhatsaap(false);
    }
  };

  const handleSaveData = async () => {
    if (FirstName === "") {
      toast.error("Name is required", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (Number === "") {
      toast.error("Number is required", {
        position: "top-right",
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
    let payloadData = {
      full_name: FirstName,
      contact_number: Number,
      email: Email,
      message: Message,
      card_url: profile,
    };
    try {
      setShowLoader(true);
      console.log(payloadData);
      // return;
      const response = await Api(contactUs, payloadData);
      handleCanclebtn();
      if (response.data.status) {
        setShowLoader(false);
        // HitClick();
        toast(response.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        window.location.href = SendWhatsaap
          ? "https://api.whatsapp.com/send?phone=" +
            card?.card_contact +
            "&" +
            `text=Popipro Inquiry %0a Name =${FirstName} ${
              Email ? `%0a Email = ${Email}` : ""
            } %0a Number =${Number} ${
              Message ? ` %0a Message = ${Message}` : ""
            }`
          : "#";
        setFirstName("");
        setNumber("");
        setEmail("");
        setMessage("");
      } else {
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      setShowLoader(false);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  let links = [];
  const shareContact = async () => {
    let text = card?.card_description?.replace(/(<([^>]+)>)/gi, "");
    let payload = {
      card: card?.id,
      type: "card",
      device_id: navigator.userAgent,
      object_base: card?.id,
      hit_type: "contact-download",
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
      setProfileImage(response.data.data.base_image);

      var contact = {
        website: card?.card_website,
        address: card?.card_address,
        image: response.data.data.base_image?.replace(
          "data:image/png;base64,",
          ""
        ),
        name: card?.first_name,
        phone: card?.card_contact,
        email: card.card_email,
        url: "app.popipro.com/" + profile,
        location: card.card_address,
        links: links,
        title: card?.card_profession,
        about: text,
        alternate_no: card?.card_alternate_phone?.map((item) => {
          return item.country_code
            ? item.title + item.country_code + " " + item.number
            : item.title + item.number + " ";
        }),
      };
      // console.log(contact);
      // return;
      // create a vcard file
      var vcard = "BEGIN:VCARD\nVERSION:3.0\nFN:";
      vcard +=
        contact.name +
        "\nTEL;TYPE=work,voice:" +
        contact.phone +
        "\nEMAIL;CHARSET=UTF-8;type=Email,INTERNET:" +
        contact.email +
        "\nURL;TYPE=Popipro - Digital Business Card:" +
        contact.url;

      vcard += contact.image
        ? "\nPHOTO;ENCODING=b;TYPE=JPEG:" + contact.image
        : "";
      vcard += contact.card_website
        ? "\nURL;Website URL=UTF-8:" + contact.website
        : "";
      let alt_str = card?.card_alternate_phone?.map((item) => {
        return item.country_code
          ? `\nTEL;TYPE=${item.title},voice:` +
              item.country_code +
              " " +
              item.number +
              ""
          : `\nTEL;TYPE=${item.title},voice:` + item.number + "";
      });
      vcard += alt_str.join("");
      vcard += contact.address ? "\nADR;CHARSET=UTF-8:" + contact.address : "";
      vcard += contact.links["instagram"]
        ? "\nURL;type=Instagram;Instagram=UTF-8:" + contact.links["Instagram"]
        : "";
      vcard += contact.links["Facebook"]
        ? "\nURL;type=Facebook;Facebook=UTF-8:" + contact.links["Facebook"]
        : "";
      vcard += contact.links["Linkedin"]
        ? "\nURL;type=Linkedin;Linkedin=UTF-8:" + contact.links["Linkedin"]
        : "";
      vcard += contact.links["Youtube"]
        ? "\nURL;type=Youtube;Youtube=UTF-8:" + contact.links["Youtube"]
        : "";
      vcard += contact.links["Twitter"]
        ? "\nURL;type=Twitter;Twitter=UTF-8:" + contact.links["Twitter"]
        : "";
      vcard += contact.links["Pinterest"]
        ? "\nURL;type=Pinterest;Pinterest=UTF-8:" + contact.links["Pinterest"]
        : "";
      vcard += contact.title ? "\nTITLE:" + contact.title : "";

      vcard += contact.about ? "\nNOTE:" + contact.about : "";
      vcard += "\nEND:VCARD";
      // console.log(vcard);
      // return;

      var blob = new Blob([vcard], { type: "text/vcard" });
      var url = URL.createObjectURL(blob);

      const newLink = document.createElement("a");
      newLink.download = contact.name + ".vcf";
      newLink.textContent = contact.name;
      newLink.href = url;

      newLink.click();
    }
  };

  let Name = "";
  let SubTitle = "";
  let phoneNumber = "";
  let Description = "";
  const handleSubmit = () => {};

  const handleAppointment = () => {
    var elem = document.getElementById("card_booking");
    elem?.scrollIntoView();
  };

  const handleHitClick = async (type) => {
    let payload = {
      card: card?.id,
      type: "card",
      device_id: navigator.userAgent,
      object_base: card?.id,
      hit_type: type,
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
    }
  };

  return (
    <>
      <Share
        Data={card}
        card={profile}
        active={modalShow == "share" ? true : false}
        handleClose={setModalShow}
      />
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
      {/* Share Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              Share Contact
            </h5>
          </Modal.Title>
          <button type="button" className="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center pb-4">
            *<b>{card.first_name}</b> will receive the information via Email or
            Whatsapp.
          </p>
          <div className="row">
            <div className="form-group col-lg-6 col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name*"
                required="required"
                autoComplete="on"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-lg-6 col-md-6 mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Mobile/Phone*"
                required="required"
                autoComplete="on"
                value={Number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-lg-12 col-md-6 mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                required="required"
                autoComplete="on"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-12 col-md-12 mb-3">
              <textarea
                className="textarea form-control"
                placeholder="Your message"
                rows="4"
                required="required"
                value={Message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 order-2 order-md-1 text-center text-md-left">
              <div id="validator-contact" className="hidden"></div>
            </div>
            <div className="col-12 mx-2 d-flex align-items-center mb-2">
              <input
                type="checkbox"
                onChange={() => handleSendWhatsaapMessage()}
              />
              <p className="ml-2">
                Do you want to send message on whatsaap also?
              </p>
            </div>
            <div className="col-12 col-md-12 order-1 order-md-2 submitbutton">
              <button
                type="submit"
                className="contact-btn mt-0 w-auto"
                style={{ padding: "10px 60px" }}
                onClick={handleSaveData}
              >
                Send
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Review Modal */}
      <Modal show={showReview} onHide={handleCloseReview} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              Leave a Review
            </h5>
          </Modal.Title>
          <button type="button" className="close" onClick={handleCloseReview}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-lg-12 col-md-12 mb-3">
              <lable className="modalFormLable">
                Upload Image (*Prefered size in ration of 100x100)
              </lable>
              <input
                type="file"
                name="image"
                className="form-control"
                accept="image/png, image/gif, image/jpeg"
                style={{ border: "1px solid #ccc" }}
                /* ref={aRef} */
                /* onChange={(e) => setImage(e.target.files[0])} */
              />
            </div>
            <div className="form-group col-lg-6 col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name*"
                required="required"
                autoComplete="on"
                value={Name}
                onChange={(e) => {}}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-lg-6 col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Sub-Title"
                required="required"
                autoComplete="on"
                value={SubTitle}
                onChange={(e) => {}}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-lg-12 col-md-6 mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Phone Number"
                required="required"
                autoComplete="on"
                value={phoneNumber}
                onChange={(e) => {}}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-12 col-md-12 mb-3">
              <textarea
                className="textarea form-control"
                placeholder="Your message*"
                rows="4"
                required="required"
                value={Description}
                onChange={(e) => {}}
              ></textarea>
              <div className="help-block with-errors"></div>
            </div>
            <div className="col-12 col-md-12 order-1 order-md-2 submitbutton">
              <button
                type="submit"
                className="contact-btn mt-0 w-auto"
                style={{ padding: "10px 60px" }}
                onClick={handleSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* <Share Data={Data} card={card} /> */}
      <header className="header header-box mb-3">
        <button
          className="edit-header"
          data-toggle="modal"
          data-target="#exampleModalCenter"
          onClick={() => setModalShow("share")}
        >
          <FontAwesomeIcon
            icon={faShareSquare}
            className="user-select-auto mr-2"
            style={{
              fontSize: "16px",
              color: "var(--color)",
              cursor: "pointer",
            }}
          />
        </button>
        <div className="header__left position-relative">
          <div className="header__photo">
            <img
              className="header__photo-img"
              value={card?.profile_picture?.path}
              src={
                card.profile_picture?.path
                  ? card.base_url + card.profile_picture?.path
                  : "https://avatars.githubusercontent.com/u/8152403?v=4"
              }
              alt="avtar"
            />
          </div>
          <div className="header__base-info">
            <h1 className="title titl--h4">
              {card.first_name == null ? "Name" : card.first_name}
            </h1>
            <div className="status">
              <p>
                {" "}
                {card.card_profession == null
                  ? "Profession"
                  : card.card_profession}
              </p>
            </div>
            <div className="d-flex sm-class" style={{ gap: "8px" }}>
              <button className="contact-btn" onClick={shareContact}>
                Add Contact
              </button>
              <button
                className="contact-btn"
                data-toggle="modal"
                data-target="#exampleModalLong"
                onClick={handleShow}
              >
                Share Contact
              </button>
            </div>
            <div className="d-flex sm-class" style={{ gap: "8px" }}>
              {company_setting?.show_testimonial_button !== 0 ? (
                ""
              ) : (
                <button
                  className="contact-btn mt-2"
                  data-toggle="modal"
                  data-target="#AddTestimonialsModal"
                  onClick={handleShowReview}
                  style={{
                    backgroundColor: "var(--themecolor)",
                    color: "black",
                  }}
                >
                  Get Reviews
                </button>
              )}
              {Titles?.card_booking?.is_active == 0 ? (
                ""
              ) : (
                // <a href="#card_booking" className="w-100">
                <button
                  className="contact-btn mt-2"
                  style={{
                    backgroundColor: "var(--themecolor)",
                    color: "black",
                  }}
                  onClick={handleAppointment}
                >
                  Appointment
                </button>
                // </a>
              )}
            </div>
          </div>
        </div>
        <div className="header__right">
          <ul className="header__contact row">
            {card.card_email ? (
              <li className="col-sm-6 col-12">
                <a
                  href={"mailto:" + card.card_email}
                  className="d-flex align-items-center justify-content-between"
                  onClick={() => handleHitClick("email")}
                  target="_blank"
                >
                  <div className="align-div">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="user-select-auto mr-2"
                      style={{
                        width: "15px",
                        fontSize: "15px",
                        transform: "rotateY(180deg)",
                      }}
                    />
                    <span className="overhead_a text-dark text-decoration-none getCard-a">
                      {" "}
                      {card.card_email}
                    </span>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="user-select-auto mr-2"
                    style={{
                      width: "15px",
                      fontSize: "15px",
                    }}
                  />
                </a>
              </li>
            ) : (
              ""
            )}
            {card.card_contact !== null ? (
              <>
                <li className="col-sm-6 col-12">
                  <a
                    href={"tel:" + card.card_contact}
                    className="d-flex align-items-center justify-content-between getCard-a"
                    onClick={() => handleHitClick("call")}
                  >
                    <div className="align-div">
                      <FontAwesomeIcon
                        icon={faPhoneAlt}
                        className="user-select-auto mr-2"
                        style={{
                          width: "15px",
                          fontSize: "15px",
                          transform: "rotateY(180deg)",
                        }}
                      />
                      <span
                        className="overhead_a text-dark text-decoration-none"
                        style={{ marginLeft: "5px" }}
                      >
                        {card.card_contact}
                      </span>
                    </div>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="user-select-auto mr-2"
                      style={{
                        width: "15px",
                        fontSize: "15px",
                      }}
                    />
                  </a>
                </li>
              </>
            ) : (
              ""
            )}
            {card.card_address !== null ? (
              <li className=" col-sm-6 col-12">
                <a
                  href={
                    card.card_address &&
                    (card.card_address?.includes("http://") ||
                      card.card_address?.includes("https://"))
                      ? card.card_address
                      : "https://www.google.com/maps/place/" + card.card_address
                  }
                  target="_blank"
                  className="d-flex align-items-center justify-content-between getCard-a"
                  onClick={() => handleHitClick("location")}
                >
                  <div className="align-div">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="user-select-auto mr-2"
                      style={{
                        width: "15px",
                        fontSize: "15px",
                        transform: "rotateY(180deg)",
                      }}
                    />
                    <span
                      className="overhead_a text-dark text-decoration-none"
                      style={{ marginLeft: "7px" }}
                    >
                      {card.card_address}
                    </span>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="user-select-auto mr-2"
                    style={{
                      width: "15px",
                      fontSize: "15px",
                    }}
                  />
                </a>
              </li>
            ) : (
              ""
            )}
            {Titles?.card_name?.source == 1 ? (
              <li className="web-li d-flex align-items-center justify-content-between col-sm-6 col-12">
                <div>
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className="user-select-auto mr-2"
                    style={{
                      width: "15px",
                      fontSize: "15px",
                      transform: "rotateY(180deg)",
                    }}
                  />
                  <p className="text-dark m-0">{card?.card_name}</p>
                </div>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="user-select-auto mr-2"
                  style={{
                    width: "15px",
                    fontSize: "15px",
                  }}
                />
              </li>
            ) : (
              ""
            )}
            {card.card_website !== null ? (
              <li className="col-sm-6 col-12">
                <a
                  href={
                    card.card_website &&
                    (card.card_website?.includes("http://") ||
                      card.card_website?.includes("https://"))
                      ? card.card_website
                      : "https://" + card.card_website
                  }
                  target="_blank"
                  className="d-flex align-items-center justify-content-between"
                  onClick={() => handleHitClick("website")}
                >
                  <div className="align-div">
                    <FontAwesomeIcon
                      icon={faLink}
                      className="user-select-auto mr-2"
                      style={{
                        width: "15px",
                        fontSize: "15px",
                        transform: "rotateY(180deg)",
                      }}
                    />
                    <span
                      className="overhead_a text-dark text-decoration-none getCard-a"
                      style={{ marginLeft: "7px" }}
                    >
                      {card.card_website &&
                      (card.card_website?.includes("http://") ||
                        card.card_website?.includes("https://"))
                        ? card.card_website
                        : card.card_website}
                    </span>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="user-select-auto mr-2"
                    style={{
                      width: "15px",
                      fontSize: "15px",
                    }}
                  />
                </a>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>

        {/* LINKS SECTION */}
        <div style={{ display: "none" }}>
          <div className="mt-4 mobile-social-view">
            <h1 className="title title--h1 first-title title__separate">
              Social Network
            </h1>
            <div
              className="d-flex flex-wrap align-items-center gap-2"
              style={{ gap: "10px" }}
            >
              {CardLinks &&
                CardLinks.map((item, i) => {
                  links[item?.parent?.platform_name] = item.link;
                  return (
                    <div key={i}>
                      {!item.link?.includes("https://") ? (
                        <Link
                          href={item.parent.target_url + item.link}
                          target="_blank"
                          key={i}
                        >
                          <div className="media-icon-div">
                            <span
                              className="social-media-icons"
                              dangerouslySetInnerHTML={{
                                __html: item.parent.platform_icon,
                              }}
                            ></span>
                          </div>
                        </Link>
                      ) : (
                        <Link href={item.link} target="_blank" key={i}>
                          <div className="media-icon-div">
                            <span
                              className="social-media-icons"
                              dangerouslySetInnerHTML={{
                                __html: item.parent.platform_icon,
                              }}
                            ></span>
                          </div>
                        </Link>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </header>
      {/* LINKS SECTION */}
      <div className="box-content boxxx mb-3 mt-0 d-none">
        <h1 className="title title--h1 first-title title__separate">
          {Titles?.card_social_links?.visible_name}
        </h1>
        <div
          className="d-flex flex-wrap align-items-center"
          style={{ gap: "15px" }}
        >
          <div
            className="d-flex flex-wrap align-items-center"
            style={{ gap: "15px" }}
          >
            {CardLinks &&
              CardLinks.map((item, i) => {
                links[item?.parent?.platform_name] = item.link;
                return item?.link !== null ? (
                  <div key={i}>
                    {!item.link?.includes("https://") ? (
                      <Link
                        href={item.parent.target_url + item.link}
                        target="_blank"
                        key={i}
                        /* onClick={() => HitClick("direct", "social", item.id)} */
                      >
                        <div className="media-icon-div">
                          <span className="social-media-icons">
                            <img
                              src={
                                "./static/img/" +
                                item.parent.platform_name.toLowerCase() +
                                ".png"
                              }
                              alt={item.parent.platform_name}
                              style={{
                                width: "50px",
                                borderRadius: "100%",
                              }}
                            />
                          </span>
                        </div>
                      </Link>
                    ) : (
                      <Link
                        href={item.link}
                        target="_blank"
                        key={i}
                        /* onClick={() => HitClick("direct", "social", item.id)} */
                      >
                        <div className="media-icon-div">
                          <span className="social-media-icons">
                            <img
                              src={
                                "./static/img/" +
                                item.parent.platform_name.toLowerCase() +
                                ".png"
                              }
                              alt={item.parent.platform_name}
                              style={{
                                width: "50px",
                                borderRadius: "100%",
                              }}
                            />
                          </span>
                        </div>
                      </Link>
                    )}
                  </div>
                ) : (
                  ""
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
