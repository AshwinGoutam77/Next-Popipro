import Link from "next/link";

export default function Home() {
  return (
    <>
      <div
        className="login-header p-2 text-center"
        style={{ background: "black" }}
      >
        <img
          src="https://www.popipro.com/assets/images/whiteLogo.png"
          alt="logo"
          className="login-logo"
          style={{ width: "145px" }}
        />
      </div>
      <div className="row login-screen-div w-100 m-0 height-100">
        <div className="banner-login-div col-sm-12 col-lg-6 m-0 p-0 position-relative">
          <img
            src="https://admin.popipro.com/assets/images/system/popi-pro-girl.jpg"
            alt="logo"
            className="w-100 banner-login-image"
          />
        </div>
        <div className="login-section col-sm-12 col-lg-6 m-0 p-0 d-flex align-items-center justify-content-center">
          <div className="text-center landing-section-class">
            <h3 className="pt-2 text-center">
              Welcome to the<span> popipro</span>
            </h3>
            <p
              className="text-dark"
              style={{ color: "white", padding: "0 50px" }}
            >
              The next generation tool to manage your profile data.
            </p>
            <Link
              href={"/login"}
              className="login-btn-main bg-btn7 lnk wow fadeInUp mt-3"
              data-wow-delay=".6s"
              style={{
                visibility: "visible",
                animationDelay: "0.6s",
                animationName: "fadeInUp",
              }}
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
