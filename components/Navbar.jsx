"use client"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import "../styles/navbar.css";

const Navbar = ({ card, HeaderData }) => {
  /* const handleScrollRight = () => {
    document.getElementById("content").scrollBy(30, 0); // for right scroll
  };
  const handleScrollLeft = () => {
    document.getElementById("content").scrollBy(-30, 0); // for left scroll
  }; */

  const handleScroll = (href) => {
    var elem = document.getElementById(href);
    elem?.scrollIntoView();
  };
  return (
    <>
      {/* <aside className="col-12 col-md-12 col-lg-2"> */}
      {card?.card_description?.length == null ? (
        <></>
      ) : (
        <div className="sidebar box sticky-column sidebarr" id="content">
          <ul
            className={
              HeaderData?.length > 4
                ? "nav navscroll-bar d-flex align-items-center justify-content-between"
                : "nav d-flex align-items-center justify-content-between"
            }
          >
            <li
              className={
                HeaderData?.length > 5
                  ? "sticky-li-left d-lg-none d-md-none"
                  : "d-none"
              }
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                /* onClick={handleScrollLeft} */
                className="pe-auto Iconcolor-black"
                style={{
                  cursor: "pointer",
                  marginLeft: "10px",
                  fontSize: "22px",
                  color: "var(--color)",
                  position: "relative",
                  top: "2px",
                }}
              />
            </li>
            {HeaderData &&
              HeaderData?.map((el, i) => {
                return (
                  <li
                    className="nav__item"
                    key={i}
                    onClick={() => handleScroll(el.attribute)}
                  >
                    <a
                      activeclass="active"
                      // href={`#${el.attribute}`}
                      // scroll={true}
                    >
                      <span
                        style={{ fontSize: "16px" }}
                        dangerouslySetInnerHTML={{
                          __html: el.icon,
                        }}
                      ></span>
                      {/* {el.menu_name} */}
                    </a>
                  </li>
                );
              })}
            <li
              className={
                HeaderData?.length > 5
                  ? "sticky-li-left d-lg-none d-md-none"
                  : "d-none"
              }
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                /* onClick={handleScrollRight} */
                className="pe-auto Iconcolor-black"
                style={{
                  cursor: "pointer",
                  marginRight: "10px",
                  fontSize: "22px",
                  color: "var(--color)",
                  position: "relative",
                  top: "2px",
                }}
              />
            </li>
          </ul>
        </div>
      )}
      {/* </aside> */}
    </>
  );
};

export default Navbar;
