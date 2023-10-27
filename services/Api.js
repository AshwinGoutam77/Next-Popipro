import axios from "axios";
import { useEffect } from "react";

const baseURL = "https://admin.popipro.com/api/";

const Api = async (
  url,
  postData = null,
  additionalURL = null,
  queryParama = ""
) => {
  let tokenn = localStorage.getItem("token");
  const tokenString = tokenn;
  const token = tokenString;
  const csrfToken = "Kn336n5IFpiaBUGBnfbuVAaRKPF3TjyrSCPuCU4Y";
  const headers = {
    "X-CSRF-TOKEN": csrfToken,
    Authorization: url.path === "get-card-data" ? "" : "Bearer " + token,
    "Content-Type":
      url.method === "PUT"
        ? "application/x-www-form-urlencoded"
        : "multipart/form-data",
    Accept: "application/json",
  };
  let axiosUrl = baseURL + url.path;
  axiosUrl = additionalURL ? axiosUrl + "/" + additionalURL : axiosUrl;
  axiosUrl = queryParama ? axiosUrl + queryParama : axiosUrl;
  const response = axios({
    url: axiosUrl,
    method: url.method,
    headers,
    data: { ...postData },
  });
  return response;
};

export default Api;
