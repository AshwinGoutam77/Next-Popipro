"use client";
import Api from "@services/Api";
import { HitClickApi } from "@services/Routes";
import Link from "next/link";
import React from "react";

const SocialMedia = ({ card, Titles, CardLinks }) => {
  let links = [];
  const HitClick = async (type, social, id) => {
    let payload = {
      card: card?.id,
      type: social ? social : "card",
      device_id: navigator.userAgent,
      object_base: id ? id : card?.id,
      hit_type: type,
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
    }
  };
  return (
    <>
      {Titles?.card_social_links?.source !== 0 &&
      card.card_social_links?.length !== 0 ? (
        <div className="box-content boxxx mb-3 mt-0">
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
                          onClick={() => HitClick("direct", "social", item.id)}
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
      ) : (
        ""
      )}
    </>
  );
};

export default SocialMedia;
