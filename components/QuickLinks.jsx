import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const QuickLinks = ({ card,subscription,Titles }) => {
  return (
    <>
      {Titles?.card_custom_url?.source !== 0 &&
      card?.card_custom_url?.length !== 0 &&
      Titles?.card_custom_url?.is_active !== 0 &&
      subscription?.is_expired == false &&
      subscription?.subscription?.plan_id !== 1 &&
      subscription?.subscription !== null ? (
        <div className="mb-3 box-content boxxx" id="about_us">
          <div className="flex-header">
            <h1 className="title title--h1 first-title title__separate">
              {CustomLinkTitle?.visible_name}
            </h1>
          </div>
          <div>
            {card?.card_custom_url?.map((item, index) => {
              return (
                <div className="alternate-number-div" key={index}>
                  <a
                    href={
                      item &&
                      item.link &&
                      (item.link?.includes("http://") ||
                        item.link?.includes("https://"))
                        ? item.link
                        : "https://" + item.link
                    }
                    target="_blank"
                    onClick={() => HitClick("direct", "custom_url", item.id)}
                  >
                    <div
                      className="d-flex align-items-center justify-content-between mt-1 mb-1"
                      key={index}
                    >
                      <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon
                            icon={faLink}
                            className="pe-auto Iconcolor-black"
                            style={{
                              fontSize: "15px",
                              marginRight: "10px",
                            }}
                          />
                          <p style={{ color: "black" }}>
                            {item.title}{" "}
                            <span
                              className="badge badge-pill badge-warning ml-2"
                              style={{ top: "-15px", right: "0" }}
                            >
                              {item.tag}
                            </span>
                          </p>
                        </div>
                      </div>
                      <FontAwesomeIcon
                        icon={faArrowRight}
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
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default QuickLinks;
