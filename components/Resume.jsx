import React from "react";

const Resume = ({ Titles, subscription, card_experience }) => {
  return (
    <>
      {Titles &&
      Titles?.card_experience?.is_active &&
      subscription?.is_expired == false &&
      subscription?.subscription?.plan_id !== 1 &&
      subscription?.subscription !== null ? (
        card_experience?.length !== 0 && Titles?.card_experience?.is_active !== 0 ? (
          <div>
            <div className="mt-3 box-content boxxx" id="card_experience">
              <div className="pb-2">
                <h2 className="title title--h1 first-title title__separate">
                  {Titles && Titles.card_experience.visible_name}
                </h2>
              </div>

              {/* <!-- Experience --> */}
              <div className="row">
                <div className="col-12">
                  <div className="flex-header"></div>
                  <div className="timeline">
                    {/* <!-- Item --> */}
                    {card_experience.map((item, index) => {
                        return (
                          <article key={index} className="timeline__item mb-2">
                            <h5 className="title title--h5 timeline__title">
                              {item.designation}
                            </h5>
                            <div
                              className="review-item__caption text-left mb-0"
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            ></div>
                            <span className="timeline__period">
                              {item.years}
                            </span>
                          </article>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </>
  );
};

export default Resume;
