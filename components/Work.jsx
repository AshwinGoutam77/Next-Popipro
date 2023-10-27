"use client";
import SimpleBackdrop from "./SimpleBackDrop";
import { Swiper as SwiperComponent } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const Work = ({
  card,
  Card_photos,
  Titles,
  PlanData,
  PaginationData,
  card_url,
}) => {
  const [Page, setPage] = useState(2);
  const [Card_videos, setCard_videos] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    setCard_videos(card?.card_videos);
  }, []);

  const LoadMoreFunction = async () => {
    const response = await fetch(
      `https://admin.popipro.com/api/get-more-items/?card_url=${card_url}&type=card_videos&current_page=${Page} `,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await response.json();
    if (response.ok) {
      setCard_videos((prevData) => [
        ...prevData,
        ...data?.data?.next_page_data,
      ]);
      setPage((prevPage) => prevPage + 1);
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
      <SimpleBackdrop visible={false} />
      {Card_photos?.length !== 0 &&
      Titles?.card_photos?.is_active !== 0 &&
      PlanData?.is_expired == false ? (
        <div className="mt-3 box-content boxxx" id="card_photos">
          {Titles && Titles?.card_photos?.is_active ? (
            <div>
              <div className="pb-2">
                <h1 className="title title--h1 first-title title__separate">
                  {Titles?.card_photos?.visible_name}
                </h1>
              </div>

              {/* <!-- Images-slider --> */}
              <SwiperComponent
                slidesPerView={2}
                spaceBetween={10}
                style={{ cursor: "pointer" }}
                className="mySwiper"
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
              >
                {Card_photos &&
                  Card_photos.map((photo, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="swiper-slide review-items position-relative">
                          <div
                            className="position-absolute top-0 zoom-icon-images"
                            onClick={() => openImagePopup(i)}
                          >
                            <FontAwesomeIcon
                              icon={faMagnifyingGlass}
                              className="zIndex-1"
                            />
                          </div>
                          <img
                            className="gallery-grid__image cover lazyload"
                            src={card.base_url + photo.path}
                            data-zoom
                            alt="photos"
                            onClick={() => openImagePopup(i)}
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </SwiperComponent>
              {selectedImageIndex !== null && (
                <div className="image-popup">
                  <span className="close-button" onClick={closeImagePopup}>
                    &times;
                  </span>

                  <img
                    src={card?.base_url + Card_photos[selectedImageIndex].path}
                    alt="images"
                  />
                  {selectedImageIndex > 0 && (
                    <button className="prev-button" onClick={goToPreviousImage}>
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
            </div>
          ) : (
            ""
          )}
          {/* <ImageModal
            isOpen={modalIsOpen}
            onClose={closeModal}
            imageUrl={selectedImage}
          /> */}
        </div>
      ) : (
        ""
      )}

      {Card_videos?.length !== 0 &&
      Titles?.card_videos?.source !== 0 &&
      Titles?.card_videos?.is_active !== 0 &&
      PlanData?.is_expired == false ? (
        <div className="mt-3 box-content boxxx">
          {Titles && Titles?.card_videos?.is_active ? (
            <>
              <div>
                <div className="">
                  <h1 className="title title--h1 first-title title__separate">
                    {Titles?.card_videos?.visible_name}
                  </h1>
                </div>

                {/* <!-- Videos-slider --> */}
                {card.id === "S7ZG" ? (
                  <div>
                    <div className="swiper-slide review-items mt-3">
                      <div className="w-100">
                        <div
                          className="w-100 vedio-flex"
                          style={{ gap: "8px" }}
                        >
                          <img
                            src="https://prafullgupta.com/connectwork/assets/chat/groups/210823111005WhatsAppImage2023-08-19at4.38.05PM1.jpeg"
                            alt="photos"
                            className="video-width h-100 vedio-height"
                            style={{ borderRadius: "10px" }}
                          />
                          <img
                            src="https://prafullgupta.com/connectwork/assets/chat/groups/210823111005WhatsAppImage2023-08-19at4.38.05PM.jpeg"
                            alt="photos"
                            className="video-width h-100 vedio-height"
                            style={{ borderRadius: "10px" }}
                          />
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-edit-class" style={{ gap: "10px" }}>
                    {Card_videos &&
                      Card_videos.map((video, i) => {
                        function getId(url) {
                          const regExp =
                            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                          const match = String(url).match(regExp);

                          return match && match[2]?.length === 11
                            ? match[2]
                            : null;
                        }
                        const videoId = getId(video);
                        return (
                          <div
                            className="swiper-slide review-items mt-3 col-sm-12 col-md-6 col-lg-6"
                            key={i}
                          >
                            <div className="w-100">
                              <div className="w-100 vedio-height">
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
              </div>
              {PaginationData.total_videos !== Card_videos?.length ? (
                card.id !== "S7ZG" ? (
                  <div className="mx-auto text-center mt-3">
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
                )
              ) : (
                ""
              )}
            </>
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

export default Work;
