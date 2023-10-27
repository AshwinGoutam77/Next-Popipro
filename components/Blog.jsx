/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { HitClickApi } from "@services/Routes";
import Api from "@services/Api";

function Blog({ Titles, Data, PaginationData, PlanData, card_url }) {
  const [ModalId, setModalId] = useState("");
  const [AddMoreBlogs, setAddMoreBlogs] = useState("");
  const [Page, setPage] = useState(2);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    setAddMoreBlogs(Data?.card_blogs);
  }, []);

  const handleHitClick = async (id) => {
    console.log(id);
    let payload = {
      card: Data?.id,
      type: "blog",
      device_id: navigator.userAgent,
      object_base: id,
      hit_type: "visit-site",
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
    }
  };
  const HitClick = async () => {
    let payload = {
      card: Data?.id,
      type: "blog",
      device_id: navigator.userAgent,
      object_base: Data?.id,
      hit_type: "view-more",
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
    }
  };

  const ShowModalID = (id) => {
    setModalId(id);
    handleShow();
    HitClick();
  };
  const LoadMoreFunction = async () => {
    const response = await fetch(
      `https://admin.popipro.com/api/get-more-items/?card_url=${card_url}&type=card_blogs&current_page=${Page} `,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await response.json();
    if (response.ok) {
      setAddMoreBlogs((prevData) => [
        ...prevData,
        ...data?.data?.next_page_data?.data,
      ]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              {Titles.card_blogs?.visible_name}
            </h5>
          </Modal.Title>
          <button type="button" className="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {AddMoreBlogs &&
            AddMoreBlogs?.map((item, index) => {
              return (
                <div key={index}>
                  {ModalId == item.id ? (
                    <div>
                      {item?.image?.path ? (
                        <img
                          className="coverr-modal lazyload"
                          src={Data?.base_url + item?.image?.path}
                          alt="photos"
                        />
                      ) : (
                        <img
                          className="coverr lazyload"
                          src="./static/img/picture-1.jpg"
                          alt="photos"
                          style={{ width: "100%", height: "190px" }}
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
                        className=""
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
                          onClick={() => handleHitClick()}
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
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
        </Modal.Body>
      </Modal>
      {Titles &&
      Titles.card_blogs?.is_active &&
      AddMoreBlogs?.length !== 0 &&
      Titles.card_blogs?.is_active !== 0 &&
      PlanData?.is_expired == false &&
      PlanData?.subscription?.plan_id !== 1 &&
      PlanData?.subscription !== null ? (
        <div className="mt-3 box-content boxxx" id="card_blogs">
          <div className="pb-2">
            <h1 className="title title--h1 first-title title__separate">
              {Titles && Titles.card_blogs?.visible_name}
            </h1>
          </div>

          <div className="row">
            {AddMoreBlogs.length == 1 ? (
              <div className="pr-0 news-grid w-100">
                {AddMoreBlogs &&
                  AddMoreBlogs.map((item, index) => {
                    return (
                      <div key={index} className="blog-position col-lg-12 pr-0">
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
                                  //   src="../../assets/img/demo.jpg"
                                  src="./static/img/demo.jpg"
                                  alt="photos"
                                />
                              )}
                            </div>
                          </div>
                          <div className="col-sm-12 col-lg-6 pr-0">
                            <div className="content-div p-0 mt-3">
                              <h2 className="title title--h4">{item.name}</h2>
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
                                  onClick={() => ShowModalID(item.id)}
                                >
                                  <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className="user-select-auto mr-2 mt-1"
                                    style={{
                                      fontSize: "22px",
                                      color: "var(--color)",
                                    }}
                                    onClick={() => handleHitClick(item?.id)}
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="news-grid w-100">
                {AddMoreBlogs &&
                  AddMoreBlogs.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          AddMoreBlogs.length == 1
                            ? "blog-position col-lg-12"
                            : "blog-position col-lg-6"
                        }
                      >
                        <div className="flex-blog" style={{ gap: "16px" }}>
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
                                src="./static/img/picture-1.jpg"
                                alt="photos"
                              />
                            )}
                          </div>
                          <div className="content-div p-0 mt-3">
                            <h2 className="title title--h4">{item.name}</h2>
                            <p
                              id="p_wrap"
                              className="blogTextHeight text-dark mt-2"
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            ></p>
                            <div className="d-flex align-items-center justify-content-end">
                              <span
                                style={{ fontSize: "13px", cursor: "pointer" }}
                                data-toggle="modal"
                                data-target="#BlogModal"
                                onClick={() => ShowModalID(item.id)}
                              >
                                <FontAwesomeIcon
                                  icon={faArrowRight}
                                  className="user-select-auto mr-2 mt-1"
                                  style={{
                                    fontSize: "19px",
                                    color: "var(--color)",
                                  }}
                                  onClick={() => handleHitClick(item?.id)}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            {PaginationData?.total_blogs !== AddMoreBlogs?.length ? (
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

export default Blog;
