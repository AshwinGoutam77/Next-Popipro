"use client";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const AboutMe = ({ card, Titles }) => {
  const [Readmore, setReadmore] = useState(false);
  const HandleReadmore = () => {
    setReadmore(true);
    if (Readmore) {
      setReadmore(false);
    }
  };
  return (
    <>
      {Titles?.card_description?.source !== 0 &&
      card?.card_description !== null &&
      Titles?.card_description?.is_active !== 0 ? (
        <div className="box-content boxxx mb-3 mt-0" id="card_description">
          {/* <!-- About --> */}
          {Titles?.card_description?.is_active &&
          card?.card_description !== null ? (
            <div className="pb-0 pb-sm-2">
              <div className="flex-header">
                <h1 className="title title--h1 first-title title__separate">
                  {Titles.card_description?.visible_name
                    ? Titles.card_description?.visible_name
                    : "About Yourself"}
                </h1>
              </div>
              <div
                id="p_wrap mb-0"
                className={Readmore ? "card-p" : "card-description"}
                dangerouslySetInnerHTML={{
                  __html: card?.card_description,
                }}
              ></div>
              {card?.card_description?.length > "250" ||
              card?.card_description == null ? (
                <p
                  className="read-more text-align-end"
                  onClick={HandleReadmore}
                >
                  {Readmore ? (
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2 mt-2" />
                  ) : (
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="mr-2 mt-2"
                    />
                  )}
                </p>
              ) : (
                ""
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

export default AboutMe;
