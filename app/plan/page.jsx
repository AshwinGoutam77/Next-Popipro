"use client";
import {
  faAngleLeft,
  faMoneyBill1Wave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Api from "@services/Api";
import { EditData } from "@services/Routes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "../../styles/about.css";

const PlanManagment = () => {
  const [Data, setData] = useState("");
  const [ModalId, setModalId] = useState("");
  let d = new Date();
  const [StartDate, setStartDate] = useState(d.setMonth(d.getMonth() - 1));
  const [EndDate, setEndDate] = useState(new Date());
  const [ShowLoader, setShowLoader] = useState(false);

  useEffect(() => {
    api();
  }, []);

  let card_url = "ashwin-goutam";

  const api = async () => {
    const response = await Api(EditData, {}, "?card_url=" + card_url);
    if (response.data.status) {
      setData(response.data.data);
    }
  };

  return (
    <div>
      <div>
        <div
          className="login-header p-3 text-center d-flex align-items-center justify-content-between"
          style={{ background: "black" }}
        >
          <h5 className="text-white m-0">
            <FontAwesomeIcon
              icon={faMoneyBill1Wave}
              className="text-white mr-2"
            />{" "}
            Subscription
          </h5>
          <Link href="/dashboard">
            <h6 className="text-white m-0">
              {" "}
              <FontAwesomeIcon icon={faAngleLeft} className="text-white mr-2" />
              Back
            </h6>
          </Link>
        </div>
        <div>
          {/* <h5 className="first-title title__separate mx-4 mt-4 text-black">
            My Subscription
          </h5> */}

          <div className="box-shadow-leads mt-4">
            <table className="insight-table">
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Price</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {Data?.blog_states?.length === 0 ? (
                  <tr>
                    <td className="p-3">No data available</td>
                  </tr>
                ) : (
                  //   Data?.Plan?.map((item, index) => {
                  //     return (
                  <tr className="cursor-pointer">
                    <td data-column="Name">
                      {Data?.plan?.subscription?.plan?.plan_name}
                    </td>
                    <td data-column="Name">
                      {Data?.plan?.subscription?.plan_currency?.currency +
                        Data?.plan?.subscription?.plan?.plan_price_per_month}
                    </td>
                    <td data-column="Name">
                      {Data?.plan?.subscription?.start_date}
                    </td>
                    <td data-column="Email">
                      {Data?.plan?.subscription?.end_date}
                    </td>
                  </tr>
                  //     );
                  //   })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        className="w-100 text-center text-white p-2 position-absolute mt-3"
        style={{ bottom: "0", background: "black" }}
      >
        <p> © 2023. All Rights Reserved By Popipro.</p>
      </div>
    </div>
  );
};

export default PlanManagment;
