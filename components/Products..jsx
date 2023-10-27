/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faEnvelope,
  faLink,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { HitClickApi, ProductEnquiry } from "@services/Routes";
import Api from "@services/Api";
import { ToastContainer, toast } from "react-toastify";

export default function Product({
  Titles,
  Data,
  card,
  PaginationData,
  PlanData,
  MainData,
  card_url,
}) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [ModalId, setModalId] = useState("");
  const [Page, setPage] = useState(2);
  const [Products, setProducts] = useState("");
  const [showProduct, setShowProduct] = useState(false);
  const handleShowProduct = () => setShowProduct(true);
  const handleCloseProduct = () => setShowProduct(false);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Contact, setContact] = useState("");
  const [Message, setMessage] = useState("");
  const [MessageId, setMessageId] = useState("");

  useEffect(() => {
    setProducts(Data?.card_products);
  }, []);

  const ShowModalID = (id) => {
    setModalId(id);
    handleShow();
    HitClick(id);
  };

  const LoadMoreFunction = async () => {
    const response = await fetch(
      `https://admin.popipro.com/api/get-more-items/?card_url=${card_url}&type=card_products&current_page=${Page} `,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await response.json();
    if (response.ok) {
      setProducts((prevData) => [
        ...prevData,
        ...data?.data?.next_page_data?.data,
      ]);
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handleProductSubmit = async (id) => {
    if (Name == "") {
      toast.error("Name is requried", {
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
    } else if (Contact == "") {
      toast.error("Mobile/Phone number is requried", {
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
    try {
      let data = {
        product: MessageId,
        name: Name,
        contact: Contact,
        email: Email,
        message: Message,
        card_url: card_url,
      };
      const response = await Api(ProductEnquiry, data);
      if (response.data.status) {
        // APIDATA();
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
        window["closeModal"]();
        setName("");
        setEmail("");
        setContact("");
        setMessage("");
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
  };
  const handleHitClick = async () => {
    let payload = {
      card: Data?.id,
      type: "product",
      device_id: navigator.userAgent,
      object_base: Data?.id,
      hit_type: "visit-site",
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
    }
  };
  const HitClick = async (id) => {
    setMessageId(id);
    let payload = {
      card: Data?.id,
      type: "product",
      device_id: navigator.userAgent,
      object_base: id,
      hit_type: "view-more",
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
    }
  };
  const handleModal = (id) => {
    HitClick(id);
    handleShowProduct();
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
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              {Titles?.card_products?.visible_name}
            </h5>
          </Modal.Title>
          <button type="button" className="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {Products &&
            Products?.map((item, index) => {
              return (
                <div key={index}>
                  {ModalId == item.id ? (
                    <div>
                      {item?.image?.path ? (
                        <img
                          className="coverr-modal lazyload"
                          src={Data?.base_url + item?.image?.path}
                          alt="product"
                        />
                      ) : (
                        <img
                          className="coverr lazyload"
                          src="../static/img/picture-1.jpg"
                          style={{ width: "100%", height: "190px" }}
                          alt="product"
                        />
                      )}
                      <div className="d-flex align-items-center justify-content-between">
                        <span
                          className="mt-3 mb-0 font-weight-bold"
                          style={{ color: "black", fontSize: "14px" }}
                        >
                          {item.name}
                        </span>
                        {item?.price !== 0 ? (
                          <p
                            className="mt-3 font-weight-bold"
                            style={{ color: "var(--color)" }}
                          >
                            {item.currency} {item.price}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                      <p
                        id="p_wrap"
                        className="review-item__caption text-left mt-3"
                        dangerouslySetInnerHTML={{
                          __html: item.description,
                        }}
                      ></p>
                      <div
                        className="d-flex align-items-center justify-content-center mt-3 flex-wrap"
                        style={{ gap: "10px" }}
                      >
                        {item.url !== "" ? (
                          <a
                            href={
                              item?.url?.includes("http://") ||
                              item?.url?.includes("https://")
                                ? item?.url
                                : "https://" + item?.url
                            }
                            target="_blank"
                            className="mt-1 product-modal-btn w-auto"
                            style={{ background: "var(--color)" }}
                            onClick={() => handleHitClick()}
                          >
                            <i
                              className="fa fa-link mr-2"
                              style={{
                                fontSize: "16px",
                              }}
                            ></i>
                            {Data?.id == "TrxF"
                              ? "Watch Video"
                              : item.button_placeholder
                              ? item.button_placeholder
                              : "Visit Site"}
                          </a>
                        ) : (
                          ""
                        )}
                        {MainData?.company_setting
                          ?.show_product_enquiry_button == 0 ? (
                          <a
                            className="mt-1 product-modal-btn w-auto text-white d-block"
                            style={{ background: "var(--color)" }}
                            onClick={() => HitClick(item?.id)}
                            data-toggle="modal"
                            data-target="#ProductEnquireModal"
                          >
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              className="user-select-auto mr-2"
                            />
                            Enquire Now
                          </a>
                        ) : (
                          ""
                        )}
                        {MainData?.company_setting?.show_product_wp_button ==
                        0 ? (
                          <a
                            href={
                              "https://api.whatsapp.com/send?phone=" +
                              Data?.card_contact +
                              "&" +
                              `text=Hey there, I have recently visited your profile on popipro.com. Could you kindly provide additional information about ${item.name}?`
                            }
                            target="_blank"
                            className="mt-1 product-modal-btn w-auto d-block"
                            onClick={() => HitClick(item?.id)}
                          >
                            {/* <i
                              className="fa-brands  fa-whatsapp mr-2"
                              style={{
                                fontSize: "16px",
                              }}
                            ></i> */}
                            <img
                              src="./static/img/whatsapp.png"
                              style={{
                                width: "23px",
                                marginBottom: "1px",
                              }}
                            />
                            Quick Connect
                          </a>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
        </Modal.Body>
      </Modal>

      <Modal show={showProduct} onHide={handleCloseProduct} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              Enquire Now
            </h5>
          </Modal.Title>
          <button type="button" className="close" onClick={handleCloseProduct}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-lg-6 col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name*"
                required="required"
                autoComplete="on"
                value={Name}
                onChange={(e) => setName(e.target.value)}
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
                value={Contact}
                onChange={(e) => setContact(e.target.value)}
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
            <div className="col-12 col-md-12 order-1 order-md-2 submitbutton">
              <button
                type="submit"
                className="send-btnn mt-0 w-auto"
                style={{ padding: "10px 60px" }}
                onClick={() => handleProductSubmit()}
              >
                Send
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {Titles?.card_products?.is_active === 1 &&
      Products?.length !== 0 &&
      PlanData?.is_expired == false &&
      PlanData?.subscription?.plan_id !== 1 &&
      PlanData?.subscription !== null ? (
        <div className="box-content boxxx mb-3" id="card_products">
          <div className="mt-0 product-section-div">
            <div className="d-flex align-items-start justify-content-between">
              <h2 className="title title--h1 first-title title__separate">
                {Titles &&
                Titles.card_products?.visible_name === "card_products"
                  ? "card_products"
                  : Titles?.card_products?.visible_name}
              </h2>
            </div>
            {Products &&
              Products?.map((items, index, { length }) => {
                return (
                  <div key={index}>
                    <div
                      className={
                        index + 1 === length
                          ? "swiper-slide review-item review-item-products"
                          : "swiper-slide review-item review-item-products review-item-products-border"
                      }
                    >
                      <div className="row d-flex justify-content-between pt-3 product-bottom-padding w-100">
                        <div className="col-6 col-sm-6 col-lg-4">
                          <div className="position-relative">
                            {items?.image?.path ? (
                              <img
                                className="case-item__icon-products"
                                src={Data?.base_url + items?.image?.path}
                                alt="product"
                              />
                            ) : (
                              <img
                                className="case-item__icon-products"
                                src="./static/img/picture-1.jpg"
                                alt="product"
                              />
                            )}
                            {items?.description?.length <= "0" ? (
                              ""
                            ) : (
                              <div className="product-icons-div">
                                {Data?.whatsapp_number !== null &&
                                MainData?.company_setting
                                  ?.show_product_wp_button == 0 ? (
                                  <a
                                    href={
                                      "https://api.whatsapp.com/send?phone=" +
                                      Data?.whatsapp_number +
                                      "&" +
                                      `text=Hey there, I have recently visited your profile on popipro.com. Could you kindly provide additional information about ${items.name}?`
                                    }
                                    target="_blank"
                                    className="whatsap-enquiry-view d-flex align-items-center justify-content-center"
                                    onClick={() => HitClick(items?.id)}
                                  >
                                    {/* <i className="fa-brands  fa-whatsapp Whatsaapsvg"></i> */}
                                    <img
                                      src="./static/img/whatsapp.png"
                                      className="Whatsaapsvg"
                                    />
                                  </a>
                                ) : (
                                  ""
                                )}
                                {MainData?.company_setting
                                  ?.show_product_enquiry_button == 0 ? (
                                  <a
                                    data-toggle="modal"
                                    data-target="#ProductEnquireModal"
                                    className="whatsap-enquiry-view d-flex align-items-center justify-content-center"
                                    onClick={() => handleModal(items?.id)}
                                    // onClick={() => HitClick(items?.id)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faEnvelope}
                                      className="user-select-auto"
                                    />
                                  </a>
                                ) : (
                                  ""
                                )}
                                {items.url !== "" ? (
                                  <a
                                    href={
                                      items?.url?.includes("https://") ||
                                      items?.url?.includes("http://")
                                        ? items?.url
                                        : "https://" + items?.url
                                    }
                                    target="_blank"
                                    className="whatsap-link-view d-flex align-items-center justify-content-center"
                                    onClick={() => HitClick(items?.id)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faLink}
                                      className="user-select-auto"
                                    />
                                  </a>
                                ) : (
                                  ""
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div
                          className={
                            items?.description?.length <= "0"
                              ? "col-6 col-sm-6 col-lg-8 d-flex align-items-start justify-content-center flex-column"
                              : "col-6 col-sm-6 col-lg-8"
                          }
                          style={{ textAlign: "initial" }}
                        >
                          <p
                            style={{ fontSize: "14px", color: "black" }}
                            className={
                              items?.description?.length <= "0"
                                ? "title title--h5 font-weight-bolder product-heading2 m-0"
                                : "title title--h5 font-weight-bolder product-heading m-0"
                            }
                          >
                            {items.name}
                          </p>
                          <p
                            id="p_wrap"
                            className="review-item__caption text-left products-review m-0 mt-1"
                            dangerouslySetInnerHTML={{
                              __html: items.description,
                            }}
                          ></p>
                          <div className="text-align-end mt-2 d-flex align-items-center justify-content-between text-left">
                            {items.price != 0 ? (
                              <span className="product-price">
                                {items.currency} {items.price}
                              </span>
                            ) : (
                              ""
                            )}
                            {items?.description?.length <= "0" ? (
                              <div
                                className="d-flex align-items-center justify-content-left weight-small-100"
                                style={{ gap: "10px" }}
                              >
                                {Data?.whatsapp_number !== null &&
                                MainData?.company_setting
                                  ?.show_product_wp_button == 0 ? (
                                  <a
                                    href={
                                      "https://api.whatsapp.com/send?phone=" +
                                      Data?.whatsapp_number +
                                      "&" +
                                      `text=Hey there, I have recently visited your profile on popipro.com. Could you kindly provide additional information about ${items.name}?`
                                    }
                                    target="_blank"
                                    className="whatsap-enquiry-view d-flex align-items-center justify-content-center"
                                    onClick={() => HitClick(items?.id)}
                                  >
                                    {/* <i className="fa-brands  fa-whatsapp Whatsaapsvg"></i> */}
                                    <img
                                      src="./static/img/whatsapp.png"
                                      className="Whatsaapsvg"
                                    />
                                  </a>
                                ) : (
                                  ""
                                )}
                                {MainData?.company_setting
                                  ?.show_product_enquiry_button == 0 ? (
                                  <a
                                    data-toggle="modal"
                                    data-target="#ProductEnquireModal"
                                    className="whatsap-enquiry-view d-flex align-items-center justify-content-center"
                                    onClick={() => HitClick(items?.id)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faEnvelope}
                                      className="user-select-auto"
                                    />
                                  </a>
                                ) : (
                                  ""
                                )}
                                {items.url !== "" ? (
                                  <a
                                    href={
                                      items?.url?.includes("https://") ||
                                      items?.url?.includes("http://")
                                        ? items?.url
                                        : "https://" + items?.url
                                    }
                                    target="_blank"
                                    className="whatsap-link-view d-flex align-items-center justify-content-center"
                                    onClick={() => HitClick(items?.id)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faLink}
                                      className="user-select-auto"
                                    />
                                  </a>
                                ) : (
                                  ""
                                )}
                              </div>
                            ) : (
                              <p
                                style={{
                                  fontSize: "15px",
                                  marginRight: "10px",
                                  cursor: "pointer",
                                }}
                                onClick={() => ShowModalID(items.id)}
                                className="m-0 mr-2"
                              >
                                <FontAwesomeIcon
                                  icon={faArrowRight}
                                  className="user-select-auto mr-2 viewmore-btn-product"
                                />
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 mb-2" />
                  </div>
                );
              })}

            {PaginationData?.total_product !== Products?.length ? (
              <div className="mx-auto text-center">
                <a
                  className="text-center cursor-pointer mx-auto"
                  style={{
                    textDecoration: "underline",
                    fontSize: "16px",
                    color: "var(--color)",
                  }}
                  onClick={LoadMoreFunction}
                >
                  Load More
                </a>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
