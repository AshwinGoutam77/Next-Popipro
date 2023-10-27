import { toast } from "react-toastify";
import { CardData } from "@services/Routes";
import Api from "@services/Api";
import { Modal } from "react-bootstrap";

export default function Theme({
  APIDATA,
  Data,
  PlanData,
  setBackgroundColor,
  BackgroundColor,
  Color,
  setColor,
  HeaderColor,
  setHeaderColor,
  active,
  handleClose,
}) {
  const handleColor = async () => {
    if (Color === undefined) {
      toast("Please fill the Color", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const response = await Api(CardData, {
      color_code: Color,
      background_color: BackgroundColor,
      banner_color: HeaderColor,
    });

    if (response.data.status) {
      setColor(Data?.color_code);
      setBackgroundColor(Data?.background_color);
      document.documentElement.style.setProperty("--color", Color);
      document.documentElement.style.setProperty("--header-color", HeaderColor);
      document.documentElement.style.setProperty(
        "--themecolor",
        BackgroundColor
      );
      const color = getComputedStyle(document.documentElement).getPropertyValue(
        "--color"
      );
      const color2 = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--header-color");
      // console.log(color);
      APIDATA();
    }
    handleClose()
  };
  const habdleResetColor = async () => {
    const response = await Api(CardData, {
      color_code: "#24b1e6",
      background_color: "#dfeef8",
      banner_color: "#24b1e6",
    });

    if (response.data.status) {
      setColor(Data?.color_code);
      document.documentElement.style.setProperty("--color", "#24b1e6");
      document.documentElement.style.setProperty("--header-color", "#24b1e6");
      document.documentElement.style.setProperty("--themecolor", "#dfeef8");
      const color = getComputedStyle(document.documentElement).getPropertyValue(
        "--color"
      );
      const Headercolor = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--headerColor");
      const color1 = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--themecolor");
      // console.log(color, color1);
      APIDATA();
    }
    handleClose()
  };
  return (
    <>
      <div
        className="modal fade"
        id="ChangePasswordModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ChangePasswordModal"
        aria-hidden="true"
      >
        <Modal show={active} onHide={() => handleClose("")} centered>
          <Modal.Header>
            <Modal.Title>
              <h5
                className="title title--h1 first-title title__separate mb-0"
                id="BlogModalTitle"
              >
                Select Profile Colour
              </h5>
            </Modal.Title>

            <button
              type="button"
              className="close"
              onClick={() => handleClose("")}
            >
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close alert</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            <div className="position-relative">
              <div className="mb-3 pl-2 pr-3">
                <p className="pl-2 mb-0 font-weight-bold">
                  Enter HexCode for profile colour
                </p>
                <input
                  type="text"
                  placeholder="#ffc021"
                  className="form-control border"
                  value={Color || ""}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div className="mb-3 pl-2 pr-3">
                <p className="pl-2 mb-0 font-weight-bold">
                  Enter HexCode for background colour
                </p>
                <input
                  type="text"
                  placeholder="#ffc021"
                  className="form-control border"
                  value={BackgroundColor || ""}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                />
              </div>
              <div className="mb-3 pl-2 pr-3">
                <p className="pl-2 mb-0 font-weight-bold">
                  Enter HexCode for header colour
                </p>
                <input
                  type="text"
                  placeholder="#ffc021"
                  className="form-control border"
                  value={HeaderColor || ""}
                  onChange={(e) => setHeaderColor(e.target.value)}
                />
              </div>
              <p className="text-center mb-3 underline-or">
                <span>OR</span>
              </p>
              <div
                className="d-flex align-items-center justify-content-center w-100"
                style={{ gap: "10px" }}
              >
                <div className="w-100">
                  <div className="color-pick">
                    <input
                      type="color"
                      value={Color || ""}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-100 border-0 bg-transparent"
                      style={{ height: "150px" }}
                    />
                  </div>
                  <p className="mt-2 text-center font-weight-bold">
                    Select <br />
                    Your Profile Colour
                  </p>
                </div>
                <div className="w-100">
                  <div className="color-pick">
                    <input
                      type="color"
                      value={BackgroundColor || ""}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-100 border-0 bg-transparent"
                      style={{ height: "150px" }}
                    />
                  </div>
                  <p className="mt-2 text-center font-weight-bold">
                    Select <br />
                    Background Colour
                  </p>
                </div>
              </div>
              <div className="d-flex mt-3">
                <div className="w-100 d-flex align-items-center flex-column">
                  <div className="color-pick w-50">
                    <input
                      type="color"
                      value={HeaderColor || ""}
                      onChange={(e) => setHeaderColor(e.target.value)}
                      className="w-100 border-0 bg-transparent"
                      style={{ height: "150px" }}
                    />
                  </div>
                  <p className="mt-2 text-center font-weight-bold">
                    Select <br />
                    Your Header Colour
                  </p>
                </div>
              </div>
              <div
                className="d-flex align-items-center justify-content-center mt-3"
                style={{ gap: "10px" }}
              >
                <button
                  onClick={(e) => handleColor(e)}
                  className="contact-btn mt-2"
                >
                  Save Changes
                </button>
                <button
                  onClick={(e) => habdleResetColor(e)}
                  className="contact-btn mt-2"
                  style={{ background: "#24b1e6" }}
                >
                  Reset Default
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
