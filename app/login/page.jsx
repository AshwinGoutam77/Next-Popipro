"use client";
import SimpleBackdrop from "@components/SimpleBackDrop";
import { useAuthContext } from "@context/AuthContext";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

async function loginUser(credentials) {
  return fetch("https://admin.popipro.com/api/login-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const LoginPage = () => {
  let { card } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ShowLoader, setShowLoader] = useState(false);
  const { token, userLogin } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      email: email,
      password: password,
      card_url: card,
    });
    if (response.status) {
      userLogin(response);
      localStorage.setItem("url", response.current_url);
      localStorage.setItem("token", response.token);
      // localStorage.setItem("url", token.current_url);
      // window.location.href = "/edit/" + localStorage.getItem("url");
      window.location.href = "/dashboard";
    } else {
      toast.error(response.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setShowLoader(false);
  };
  return localStorage.getItem("token") ? (
    redirect("/dashboard")
  ) : (
    <>
      <SimpleBackdrop visible={ShowLoader} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

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
        <div className="login-section col-sm-12 col-lg-6 m-0 p-0 mt-4 d-flex align-items-center justify-content-center">
          <div>
            <h3 className="pt-2 text-center">
              Manage your <span>popipro</span>
              <br />
              Profile Data.{token}
            </h3>
            <form
              onSubmit={handleSubmit}
              className="login-form-section text-center"
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                className=""
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="mt-2"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              <div className="d-flex align-items-center justify-content-start mt-2">
                <input type="checkbox" className="w-auto mr-2" />
                <p className="">Remember me</p>
              </div>
              <button
                className="login-btn-main bg-btn7 lnk wow fadeInUp mt-4"
                data-wow-delay=".6s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.6s",
                  animationName: "fadeInUp",
                }}
              >
                Sign In
              </button>
              <div className="align-bottom col-sm-12 d-flex justify-content-center text-center mt-3">
                <Link href={"/forgot"}>
                  <p className="m-0">Forgot Password?</p>
                </Link>
                <br />
              </div>
              {/* <p className="m-0" onClick={goBack}>View PopiCard</p> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
