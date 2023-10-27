import React from "react";
import Header from "@components/Header";
import "../../styles/about.css";
import "../../styles/edit.css";
import Banner from "@components/Banner";
import Navbar from "@components/Navbar";
import SocialMedia from "@components/SocialMedia";
import AboutMe from "@components/AboutMe";
import QuickLinks from "@components/QuickLinks";
import Services from "@components/Services";
import Testimonials from "@components/Testimonials";
import Clients from "@components/Clients";
import Resume from "@components/Resume";
import Work from "@components/Work";
import Blog from "@components/Blog";
import Product from "@components/Products.";
import ContactForm from "@components/ContactForm";
import Footer from "@components/Footer";
import Alternateno from "@components/Alternateno";
import { redirect } from "next/navigation";

export default async function Main({ profile }) {
  const data = (await getProfileData(profile)) || {};
  // const HitApi = (await hitClickApi(data?.data?.id)) || {};
  let card = data?.data?.card || {};
  // let API = HitApi || {};
  let MainData = data?.data;
  let permission = data?.data?.permission;
  let titles = data?.data?.titles;
  let headers = data?.data?.headers;
  let currency = data?.data?.currency;
  let company_setting = data?.data?.company_setting;
  let hit_type = data?.data?.hit_type;
  let landing_mode = data?.data?.landing_mode;
  let custom_forms = data?.data?.custom_forms;
  let card_social_links = data?.data?.card_social_links;
  let card_clients = data?.data?.card_clients;
  let forms = data?.data?.forms;
  let plan = data?.data?.plan;
  let pagination_data = data?.data?.pagination_data;
  let is_individual = data?.data?.is_individual;
  let AddMoreBlogs = data?.data?.card?.card_blogs;
  let Products = data?.data?.card?.card_products;
  let is_onboarding = data?.data?.card?.is_onboarding;

  return (
    data && (
      <>
        {is_onboarding !== 1 ? (
          <>
            <Banner
              card={card}
              permission={permission}
              subscription={plan}
              CardLinks={card?.card_social_links}
              Titles={titles}
            />
            <main className="main">
              <div className="container gutter-top">
                <Header
                  profile={profile}
                  card={card}
                  company_setting={company_setting}
                  Titles={titles}
                  CardLinks={card?.card_social_links}
                />
                <div className="row sticky-parent">
                  <aside className="col-12 col-md-12 col-lg-2">
                    <Navbar
                      TitleData={titles}
                      HeaderData={headers}
                      card={card}
                    />
                  </aside>
                  <div className="col-12 col-md-12 col-lg-10">
                    <Alternateno Data={card} Titles={titles} PlanData={plan} />
                    <SocialMedia
                      card={card}
                      Titles={titles}
                      CardLinks={card?.card_social_links}
                    />

                    <AboutMe Titles={titles} card={card} />

                    <QuickLinks
                      subscription={plan?.subscription}
                      card={card}
                      Titles={titles}
                    />

                    <Services subscription={plan} card={card} Titles={titles} />

                    <Testimonials
                      card={card}
                      subscription={plan}
                      card_testimonials={card?.card_testimonials}
                      Titles={titles}
                      company_setting={company_setting}
                      InquiryModal={false}
                      InquiryPopup={false}
                      setInquiryModal={false}
                      profile={profile}
                    />

                    <Clients
                      card={card}
                      ClientPhotos={card?.card_clients}
                      PlanData={plan}
                      Titles={titles}
                    />

                    <Resume
                      Titles={titles}
                      subscription={plan}
                      card_experience={card?.card_experience}
                    />

                    <Work
                      Card_videos={card?.card_videos}
                      Card_photos={card?.card_photos}
                      Titles={titles}
                      Data={card}
                      card={card}
                      PaginationData={pagination_data}
                      /* openModal={openModal} */
                      PlanData={plan}
                      card_url={profile}
                    />
                    <Product
                      PlanData={plan}
                      Titles={titles}
                      Data={card}
                      card={card}
                      PaginationData={pagination_data}
                      MainData={MainData}
                      Products={Products}
                      card_url={profile}
                    />
                    <Blog
                      PlanData={plan}
                      Titles={titles}
                      Data={card}
                      card={card}
                      PaginationData={pagination_data}
                      AddMoreBlogs={AddMoreBlogs}
                      card_url={profile}
                    />
                    <ContactForm
                      card_url={profile}
                      Titles={titles}
                      Data={card}
                      card={card}
                      MainData={MainData}
                      PlanData={plan}
                    />
                  </div>
                </div>
              </div>
            </main>
            <Footer card_url={profile} />
          </>
        ) : (
          redirect("/")
        )}
      </>
    )
  );
}
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
// const hitClickApi = async (id) => {
//   const response = await fetch(`https://admin.popipro.com/api/hit-click`, {
//     method: "post",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       card: id,
//       type: "card",
//       device_id: navigator.userAgent,
//       object_base: id,
//       hit_type: "direct",
//     }),
//   });
//   const API = await response.json();
//   return API;
// };
