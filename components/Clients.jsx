"use client"
import React from "react";
import { Swiper as SwiperComponent } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";


const Clients = ({ card, Titles, PlanData, ClientPhotos }) => {
  return (
    <>
      {Titles?.card_clients.source !== 0 &&
      card?.card_clients?.length !== 0 &&
      Titles?.card_clients.is_active !== 0 &&
      PlanData?.is_expired == false &&
      PlanData?.subscription?.plan_id !== 1 &&
      PlanData?.subscription !== null ? (
        <section className="box-content boxxx mb-3">
          {/* <!-- Clients --> */}
          {Titles &&
          Titles?.card_clients.is_active &&
          ClientPhotos?.length !== 0 ? (
            <div className="mt-0">
              <h2 className="title title--h1 title title--h1 first-title title__separate">
                {Titles && Titles?.card_clients.visible_name === "card_clients"
                  ? "Card Clients"
                  : Titles?.card_clients?.visible_name}
              </h2>

              <SwiperComponent
                slidesPerView={2}
                breakpoints={{
                  1110: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                }}
                spaceBetween={20}
                style={{ cursor: "pointer" }}
                className="mySwiper"
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination, Navigation]}
              >
                {ClientPhotos.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="w-100" key={index}>
                        <img
                          className="slider-images w-100"
                          src={card.base_url + item.path}
                          alt="Logo"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </SwiperComponent>
            </div>
          ) : (
            ""
          )}
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default Clients;
