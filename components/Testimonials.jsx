"use client";

import { Swiper as SwiperComponent } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { AddTestimonials } from "@services/Routes";
import Api from "@services/Api";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";

const Testimonials = ({
  InquiryModal,
  InquiryPopup,
  card,
  subscription,
  card_testimonials,
  Titles,
  company_setting,
  profile,
}) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [Image, setImage] = useState("");
  const [Name, setName] = useState("");
  const [SubTitle, setSubTitle] = useState("");
  const [Number, setNumber] = useState("");
  const [Description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (Name == "") {
      toast.error("Name is requried", {
        position: "top-right",
        autoclose: 2000,
        hideprogressbar: "false",
        closeonclick: "true",
        pauseonhover: "true",
        draggable: "true",
        progress: "undefined",
        theme: "light",
      });
      return;
    } else if (Description == "") {
      toast.error("Description is requried", {
        position: "top-right",
        autoclose: 2000,
        hideprogressbar: "false",
        closeonclick: "true",
        pauseonhover: "true",
        draggable: "true",
        progress: "undefined",
        theme: "light",
      });
      return;
    } else if (SubTitle == "") {
      toast.error("SubTitile is requried", {
        position: "top-right",
        autoclose: 2000,
        hideprogressbar: "false",
        closeonclick: "true",
        pauseonhover: "true",
        draggable: "true",
        progress: "undefined",
        theme: "light",
      });
      return;
    } else if (Number == "") {
      toast.error("Number is requried", {
        position: "top-right",
        autoclose: 2000,
        hideprogressbar: "false",
        closeonclick: "true",
        pauseonhover: "true",
        draggable: "true",
        progress: "undefined",
        theme: "light",
      });
      return;
    }
    try {
      let payload = {
        testimonial_image: Image,
        card_url: profile,
        name: Name,
        company_name: SubTitle,
        description: Description,
        phone: Number,
      };
      const response = await Api(AddTestimonials, payload);
      if (response.data.status) {
        toast.success(response.data.message, {
          position: "top-right",
          autoclose: 2000,
          hideprogressbar: "false",
          closeonclick: "true",
          pauseonhover: "true",
          draggable: "true",
          progress: "undefined",
          theme: "light",
        });
        handleClose();
        setName("");
        setNumber("");
        setDescription("");
        setImage("");
        setSubTitle("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoclose: 2000,
        hideprogressbar: "false",
        closeonclick: "true",
        pauseonhover: "true",
        draggable: "true",
        progress: "undefined",
        theme: "light",
      });
    }
  };
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoclose={1000}
        hideprogressbar={"false"}
        newestontop={"false"}
        closeonclick={"false"}
        rtl={"false"}
        pauseonfocusloss={"true"}
        draggable
        pauseonhover={"true"}
        theme="light"
      />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              Leave a Review
            </h5>
          </Modal.Title>
          <button type="button" className="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-lg-12 col-md-12 mb-3">
              <label className="modalFormLable">
                Upload Image (*Prefered size in ration of 100x100)
              </label>
              <input
                type="file"
                name="image"
                className="form-control"
                accept="image/png, image/gif, image/jpeg"
                style={{ border: "1px solid #ccc" }}
                /* ref={aRef} */
                onChange={(e) => setImage(e.target.files[0])}
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
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setSubTitle(e.target.value)}
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
                value={Number}
                onChange={(e) => setNumber(e.target.value)}
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
                onChange={(e) => setDescription(e.target.value)}
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

      {Titles?.card_testimonials.source !== 0 &&
      card?.card_testimonials?.length !== 0 &&
      Titles?.card_testimonials.is_active !== 0 &&
      subscription?.is_expired == false &&
      subscription?.subscription?.plan_id !== 1 &&
      subscription?.subscription !== null ? (
        <div className="box-content boxxx mb-3" id="card_testimonials">
          {/* <!-- Testimonials --> */}
          {Titles &&
          Titles.card_testimonials.is_active &&
          card_testimonials?.length !== 0 ? (
            <div className="mt-0">
              <div className="d-flex align-items-start justify-content-between">
                <h2 className="title title--h1 first-title title__separate">
                  {Titles &&
                  Titles.card_testimonials.visible_name === "card_testimonials"
                    ? "Card Testimonials"
                    : Titles.card_testimonials.visible_name}
                </h2>
              </div>
              <SwiperComponent
                style={{ cursor: "pointer" }}
                className="mySwiper"
                pagination={{
                  clickable: true,
                }}
                spaceBetween={10}
                modules={[Pagination, Navigation]}
              >
                {card_testimonials.map((items, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="swiper-slide review-item review-item-testimonials d-block">
                        <div className="d-flex align-items-center w-100">
                          {items.image.path ? (
                            <img
                              className="case-item__icon"
                              src={card.base_url + items.image.path}
                              alt="photos"
                            />
                          ) : (
                            <img
                              className="case-item__icon"
                              src="./static/img/demo.jpg"
                              alt="photos"
                              style={{ borderRadius: "100%" }}
                            />
                          )}
                          <div className="pt-0">
                            <h4
                              className="title title--h5 text-align-start ml-2 mb-0"
                              style={{ textAlign: "start" }}
                            >
                              {items.name}
                            </h4>
                            <p className="text-left ml-2 font-weight-bold m-0">
                              {items.company_name}
                            </p>
                          </div>
                        </div>
                        <div className="review-item__textbox">
                          <div
                            id="p_wrap"
                            className="review-item__caption text-left mt-3"
                            dangerouslySetInnerHTML={{
                              __html: items.description,
                            }}
                          ></div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </SwiperComponent>
              {company_setting.show_testimonial_button !== 0 ? (
                ""
              ) : (
                <div className="d-flex justify-content-center">
                  <button
                    className="contact-btn w-auto m-0 d-flex align-items-center mt-3"
                    data-toggle="modal"
                    data-target="#AddTestimonialsModal"
                    onClick={handleShow}
                  >
                    Leave a Review
                  </button>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Testimonials;
