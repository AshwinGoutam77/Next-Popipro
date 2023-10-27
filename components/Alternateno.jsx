"use client";
import { faChevronRight, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Api from "@services/Api";
import { HitClickApi } from "@services/Routes";
import React from "react";

export default function Alternateno({ Titles, Data, PlanData, AlterNumber }) {
  const HitClick = async (type, social, id) => {
    let payload = {
      card: Data?.id,
      type: social ? social : "card",
      device_id: navigator.userAgent,
      object_base: id ? id : Data?.id,
      hit_type: type,
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
    }
  };
  return (
    <>
      {Titles?.card_alternate_phone?.source !== 0 &&
      Data?.card_alternate_phone?.length !== 0 &&
      Titles?.card_alternate_phone?.is_active !== 0 &&
      PlanData?.is_expired == false &&
      PlanData?.subscription?.plan_id !== 1 &&
      PlanData?.subscription !== null ? (
        <div className="mb-3 box-content boxxx mt-0" id="about_us">
          <div className="flex-header">
            <h1 className="title title--h1 first-title title__separate">
              {Titles?.card_alternate_phone?.visible_name}
            </h1>
          </div>
          {Data?.card_alternate_phone?.map((item, index) => {
            return (
              <div className="alternate-number-div" key={index}>
                <a
                  href={
                    item.country_code || item?.extension
                      ? "tel:" +
                        item.country_code +
                        "-" +
                        item?.number +
                        "-" +
                        item?.extension
                      : "tel:" + item?.number
                  }
                  onClick={() => HitClick("direct", "alternate_phone", item.id)}
                >
                  <div
                    className="d-flex align-items-center justify-content-between mt-1 mb-1"
                    key={index}
                  >
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
                      {item.country_code == null ? (
                        <p
                          // href={"tel:" + item?.number}
                          className="ml-1"
                          style={{ color: "black" }}
                        >
                          {item?.country_code}
                          {item?.country_code ? "-" : ""} {item?.number}
                          {item?.extension ? "-" : ""} {item?.extension}
                        </p>
                      ) : (
                        <p className="ml-1" style={{ color: "black" }}>
                          {item?.country_code}
                          {item?.country_code ? "-" : ""} {item?.number}
                          {item?.extension ? "-" : ""} {item?.extension}
                        </p>
                      )}
                    </div>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="pe-auto mr-2"
                      style={{
                        fontSize: "15px",
                        color: "var(--color)",
                      }}
                    />
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
