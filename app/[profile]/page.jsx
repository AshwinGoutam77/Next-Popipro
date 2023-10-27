import React, { Suspense } from "react";
import "../../styles/about.css";
import "../../styles/edit.css";
import Main from "./Main";

export async function generateMetadata({ params, searchParams }) {
  const { profile } = params;
  const data = (await getProfileData(profile)) || {};
  let card = data?.data?.card || {};
  return {
    title: card?.first_name
      ? card?.first_name + " - " + card?.card_profession
      : "Popipro",
    description: card?.card_description,
  };
}

const ProfilePage = async ({ params }) => {
  const { profile } = params;
  return (
    <>
      <Suspense
        fallback={
          <h5
            className="d-flex align-items-center justify-content-center text-center"
            style={{ height: "100vh" }}
          >
            Loading...
          </h5>
        }
      >
        <Main profile={profile} />
      </Suspense>
    </>
  );
};

export default ProfilePage;

const getProfileData = async (profile) => {
  const response = await fetch(
    `https://admin.popipro.com/api/get-card-data/?card_url=${profile}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
  }
};
