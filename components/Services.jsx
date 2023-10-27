"use client";
import { Swiper as SwiperComponent } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";

const Services = ({ Titles, card, subscription }) => {
  return (
    <>
      {Titles?.card_services.source !== 0 &&
      card?.card_services?.length !== 0 &&
      Titles?.card_services.is_active !== 0 &&
      subscription?.is_expired == false &&
      subscription?.subscription?.plan_id !== 1 &&
      subscription?.subscription !== null ? (
        <div className="box-content boxxx mb-3" id="card_services">
          {/* <!-- What --> */}
          {Titles &&
          Titles?.card_services.is_active &&
          card?.card_services?.length !== 0 ? (
            <div className="mt-0">
              <h1 className="title title--h1 first-title title__separate">
                {Titles &&
                Titles?.card_services.visible_name === "card_services"
                  ? "Card Services"
                  : Titles?.card_services.visible_name}
              </h1>
              <div className="row">
                {/* <!-- Case Item --> */}
                <SwiperComponent
                  breakpoints={{
                    1110: {
                      slidesPerView:
                        card?.card_services?.length == 1 ? "1" : "2",
                    },
                    768: {
                      slidesPerView: 1,
                    },
                  }}
                  spaceBetween={20}
                  style={{ cursor: "pointer" }}
                  className="mySwiper w-100 pb-0"
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination, Navigation]}
                >
                  {card?.card_services.map((item, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="case-item pt-3">
                          <div className="w-100">
                            {item.image.path ? (
                              <img
                                className="case-item__icon"
                                src={card.base_url + item.image.path}
                                alt="photos"
                              />
                            ) : (
                              <img
                                className="case-item__icon"
                                src="../../assets/img/picture-1.jpg"
                                alt="photos"
                              />
                            )}
                            <h3 className="title title--h4 mt-4 m-0">
                              {item.name}
                            </h3>
                            <div
                              id="p_wrap"
                              className="review-item__caption text-left mt-3"
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            ></div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </SwiperComponent>
              </div>
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

export default Services;
