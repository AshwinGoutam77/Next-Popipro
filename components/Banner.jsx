"use client";
import { faArrowRight, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Api from "@services/Api";
import { HitClickApi } from "@services/Routes";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Banner = ({
  permission,
  card,
  subscription,
  CardLinks,
  Titles,
  is_onboarding,
}) => {
  const [ProfileImage, setProfileImage] = useState("");
  const [IsVisible, setIsVisible] = useState(true);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    document.documentElement.style.setProperty("--color", card?.color_code);
    document.documentElement.style.setProperty(
      "--header-color",
      card.banner_color
    );
    document.documentElement.style.setProperty(
      "--themecolor",
      card.background_color
    );
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const listenToScroll = () => {
    let heightToHideFrom = 200;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    setHeight(winScroll);

    if (winScroll > heightToHideFrom) {
      IsVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  let links = [];
  const shareContact = async () => {
    let text = card?.card_description?.replace(/(<([^>]+)>)/gi, "");
    let payload = {
      card: card?.id,
      type: "card",
      device_id: navigator.userAgent,
      object_base: card?.id,
      hit_type: "contact-download",
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
      setProfileImage(response.data.data.base_image);

      var contact = {
        website: card?.card_website,
        address: card?.card_address,
        image: response.data.data.base_image?.replace(
          "data:image/png;base64,",
          ""
        ),
        name: card?.first_name,
        phone: card?.card_contact,
        email: card.card_email,
        url: "app.popipro.com/" + card,
        location: card.card_address,
        links: links,
        title: card?.card_profession,
        about: text,
        alternate_no: card?.card_alternate_phone?.map((item) => {
          return item.country_code
            ? item.title + item.country_code + " " + item.number
            : item.title + item.number + " ";
        }),
      };
      // console.log(contact);
      // return;
      // create a vcard file
      var vcard = "BEGIN:VCARD\nVERSION:3.0\nFN:";
      vcard +=
        contact.name +
        "\nTEL;TYPE=work,voice:" +
        contact.phone +
        "\nEMAIL;CHARSET=UTF-8;type=Email,INTERNET:" +
        contact.email +
        "\nURL;TYPE=Popipro - Digital Business Card:" +
        contact.url;

      vcard += contact.image
        ? "\nPHOTO;ENCODING=b;TYPE=JPEG:" + contact.image
        : "";
      vcard += contact.card_website
        ? "\nURL;Website URL=UTF-8:" + contact.website
        : "";
      let alt_str = card?.card_alternate_phone?.map((item) => {
        return item.country_code
          ? `\nTEL;TYPE=${item.title},voice:` +
              item.country_code +
              " " +
              item.number +
              ""
          : `\nTEL;TYPE=${item.title},voice:` + item.number + "";
      });
      vcard += alt_str.join("");
      vcard += contact.address ? "\nADR;CHARSET=UTF-8:" + contact.address : "";
      vcard += contact.links["instagram"]
        ? "\nURL;type=Instagram;Instagram=UTF-8:" + contact.links["Instagram"]
        : "";
      vcard += contact.links["Facebook"]
        ? "\nURL;type=Facebook;Facebook=UTF-8:" + contact.links["Facebook"]
        : "";
      vcard += contact.links["Linkedin"]
        ? "\nURL;type=Linkedin;Linkedin=UTF-8:" + contact.links["Linkedin"]
        : "";
      vcard += contact.links["Youtube"]
        ? "\nURL;type=Youtube;Youtube=UTF-8:" + contact.links["Youtube"]
        : "";
      vcard += contact.links["Twitter"]
        ? "\nURL;type=Twitter;Twitter=UTF-8:" + contact.links["Twitter"]
        : "";
      vcard += contact.links["Pinterest"]
        ? "\nURL;type=Pinterest;Pinterest=UTF-8:" + contact.links["Pinterest"]
        : "";
      vcard += contact.title ? "\nTITLE:" + contact.title : "";

      vcard += contact.about ? "\nNOTE:" + contact.about : "";
      vcard += "\nEND:VCARD";
      // console.log(vcard);
      // return;

      var blob = new Blob([vcard], { type: "text/vcard" });
      var url = URL.createObjectURL(blob);

      const newLink = document.createElement("a");
      newLink.download = contact.name + ".vcf";
      newLink.textContent = contact.name;
      newLink.href = url;

      newLink.click();
    }
  };
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
      {permission[0]?.visible_field === "logo" ||
      permission[0]?.visible_field === "name" ||
      card.card_cover === "logo" ? (
        <div className="bgsvg-img d-flex align-items-start justify-content-between">
          <div className="fixed-b-icons">
            {!IsVisible && (
              <div id="hide">
                {" "}
                <div
                  className="float"
                  target="_blank"
                  style={{
                    bottom: "130px",
                    background: "var(--color)",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  onClick={shareContact}
                >
                  <FontAwesomeIcon
                    icon={faFloppyDisk}
                    className="ml-1"
                    style={{ position: "relative", right: "1px" }}
                  />
                </div>
              </div>
            )}
            {card.whatsapp_number !== null ? (
              <a
                href={
                  "https://api.whatsapp.com/send?phone=" + card.whatsapp_number
                }
                className="float"
                target="_blank"
                onClick={() => HitClick("direct")}
              >
                {/* <i className="fa-brands  fa-whatsapp my-float"></i> */}
                <img src="./static/img/whatsapp.png" />
              </a>
            ) : (
              ""
            )}
            {card.card_google_review !== null &&
            subscription?.subscription?.plan_id !== 1 &&
            subscription?.subscription !== null &&
            subscription?.is_expired == false ? (
              <a
                href={card.card_google_review}
                className="float"
                target="_blank"
                style={{
                  bottom: "190px",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                <img
                  src="./static/img/google.png"
                  style={{ width: "25px" }}
                  alt="photos"
                />
              </a>
            ) : (
              ""
            )}
            {card.card_trustpilot !== null &&
            subscription?.subscription?.plan_id !== 1 &&
            subscription?.subscription !== null &&
            subscription?.is_expired == false ? (
              <a href={card.card_trustpilot} className="float" target="_blank">
                <img
                  src="../../assets/img/trustpilot.png"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "100px",
                    background: "white",
                  }}
                  alt="photos"
                />
              </a>
            ) : (
              ""
            )}
          </div>

          <div className="pt-0">
            <div>
              {permission[0]?.visible_field !== "name" ? (
                <img
                  src={card.base_url + card.card_company_logo?.path}
                  className="Logo-icon"
                  style={{ width: "110px" }}
                  alt="photos"
                />
              ) : (
                <h1 className="text-white" style={{ fontSize: "16px" }}>
                  {card?.card_name}
                </h1>
              )}
            </div>
          </div>
          <div>
            <a
              href="https://www.popipro.com/shop"
              target="_blank"
              className={
                card.banner_color == "#ffffff"
                  ? "m-0 Varcolor d-flex align-items-center getCard-a"
                  : "m-0 text-white d-flex align-items-center getCard-a"
              }
            >
              Order PopiCard now
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ width: "15px" }}
                className="ml-1"
              />
            </a>
          </div>
        </div>
      ) : (
        <div
          className="bgsvg-img d-flex align-items-start justify-content-between"
          style={{
            backgroundImage: `url('${
              card.base_url + card.card_company_logo?.path
            }')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="fixed-b-icons">
            {!IsVisible && (
              <div id="hide">
                {" "}
                <div
                  className="float"
                  target="_blank"
                  style={{
                    bottom: "130px",
                    background: "var(--color)",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  onClick={shareContact}
                >
                  <FontAwesomeIcon
                    icon={faFloppyDisk}
                    className="ml-1"
                    style={{ position: "relative", right: "1px" }}
                  />
                </div>
              </div>
            )}
            {card.whatsapp_number !== null ? (
              <a
                href={
                  "https://api.whatsapp.com/send?phone=" + card.whatsapp_number
                }
                className="float"
                target="_blank"
                onClick={() => HitClick("direct")}
              >
                {/* <i className="fa-brands  fa-whatsapp my-float"></i> */}
                <img src="./static/img/whatsapp.png" />
              </a>
            ) : (
              ""
            )}
            {card.card_google_review !== null &&
            subscription?.subscription?.plan_id !== 1 &&
            subscription?.subscription !== null &&
            subscription?.is_expired == false ? (
              <a
                href={card.card_google_review}
                className="float"
                target="_blank"
                style={{
                  bottom: "190px",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                <img
                  src="./static/img/google.png"
                  style={{ width: "25px" }}
                  alt="photos"
                />
              </a>
            ) : (
              ""
            )}
            {card.card_trustpilot !== null &&
            subscription?.subscription?.plan_id !== 1 &&
            subscription?.subscription !== null &&
            subscription?.is_expired == false ? (
              <a
                href={card.card_trustpilot}
                className="float"
                target="_blank"
                style={{
                  background: "white",
                }}
              >
                <img
                  src="../../assets/img/trustpilot.png"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "100px",
                    background: "white",
                  }}
                  alt="photos"
                />
              </a>
            ) : (
              ""
            )}
          </div>

          <div className="mt-2">
            <div>
              {permission[0]?.visible_field === "name" ? (
                <h5 className="text-white" style={{ fontSize: "16px" }}>
                  {card?.card_name}
                </h5>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <a
              href="https://www.popipro.com/shop"
              target="_blank"
              className={
                card.banner_color == "#ffffff"
                  ? "m-0 Varcolor d-flex align-items-center getCard-a"
                  : "m-0 text-white d-flex align-items-center getCard-a"
              }
            >
              Order PopiCard now
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ width: "15px" }}
                className="ml-1"
              />
            </a>
          </div>
        </div>
      )}
      {/* LINKS SECTION */}
      <div className="box-content boxxx mb-3 mt-0 d-none">
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
                    )}
                  </div>
                ) : (
                  ""
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
