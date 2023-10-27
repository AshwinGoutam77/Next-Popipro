import React from "react";
import { Modal } from "react-bootstrap";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  TwitterShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,
  HatenaShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  WeiboIcon,
  HatenaIcon,
} from "react-share";

export default function Share({ Data, card, active, handleClose }) {
  let title = "";
  return (
    <div>
      <Modal show={active} onHide={() => handleClose("")} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              className="title title--h1 first-title title__separate mb-0"
              id="shareModal"
            >
              Share Via
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
          <div className="Demo__container d-flex flex-wrap">
            <div className="Demo__some-network">
              <FacebookShareButton
                url={"https://app.popipro.com/" + card}
                quote={title}
                className="Demo__some-network__share-button"
              >
                <FacebookIcon size={35} round />
              </FacebookShareButton>
            </div>

            <div className="Demo__some-network">
              <FacebookMessengerShareButton
                url={"https://app.popipro.com/" + card}
                appId="521270401588372"
                className="Demo__some-network__share-button"
              >
                <FacebookMessengerIcon size={35} round />
              </FacebookMessengerShareButton>
            </div>

            <div className="Demo__some-network">
              <TwitterShareButton
                url={"https://app.popipro.com/" + card}
                title={title}
                className="Demo__some-network__share-button"
              >
                <TwitterIcon size={35} round />
              </TwitterShareButton>

              <div className="Demo__some-network__share-count">&nbsp;</div>
            </div>

            <div className="Demo__some-network">
              <TelegramShareButton
                url={"https://app.popipro.com/" + card}
                title={title}
                className="Demo__some-network__share-button"
              >
                <TelegramIcon size={35} round />
              </TelegramShareButton>

              <div className="Demo__some-network__share-count">&nbsp;</div>
            </div>

            <div className="Demo__some-network">
              <WhatsappShareButton
                url={"https://app.popipro.com/" + card}
                title={title}
                separator=":: "
                className="Demo__some-network__share-button"
              >
                <WhatsappIcon size={35} round />
              </WhatsappShareButton>

              <div className="Demo__some-network__share-count">&nbsp;</div>
            </div>

            <div className="Demo__some-network">
              <LinkedinShareButton
                url={"https://app.popipro.com/" + card}
                className="Demo__some-network__share-button"
              >
                <LinkedinIcon size={35} round />
              </LinkedinShareButton>
            </div>

            <div className="Demo__some-network">
              <VKShareButton
                url={"https://app.popipro.com/" + card}
                // image={`${String(window.location)}/${"exampleImage"}`}
                className="Demo__some-network__share-button"
              >
                <VKIcon size={35} round />
              </VKShareButton>
            </div>

            <div className="Demo__some-network">
              <OKShareButton
                url={"https://app.popipro.com/" + card}
                // image={`${String(window.location)}/${"exampleImage"}`}
                className="Demo__some-network__share-button"
              >
                <OKIcon size={35} round />
              </OKShareButton>

              {/* <div>
                    <OKShareCount
                      url={"https://app.popipro.com/"+ card}
                      className="Demo__some-network__share-count"
                    />
                  </div> */}
            </div>

            <div className="Demo__some-network">
              <RedditShareButton
                url={"https://app.popipro.com/" + card}
                title={title}
                windowWidth={660}
                windowHeight={460}
                className="Demo__some-network__share-button"
              >
                <RedditIcon size={35} round />
              </RedditShareButton>

              {/* <div>
                    <RedditShareCount
                      url={"https://app.popipro.com/"+ card}
                      className="Demo__some-network__share-count"
                    />
                  </div> */}
              <div className="Demo__some-network__share-count">&nbsp;</div>
            </div>

            <div className="Demo__some-network">
              <TumblrShareButton
                url={"https://app.popipro.com/" + card}
                title={title}
                className="Demo__some-network__share-button"
              >
                <TumblrIcon size={35} round />
              </TumblrShareButton>

              {/* <div>
                      <TumblrShareCount
                        url={"https://app.popipro.com/"+ card}
                        className="Demo__some-network__share-count"
                      />
                    </div> */}
            </div>

            <div className="Demo__some-network">
              <LivejournalShareButton
                url={"https://app.popipro.com/" + card}
                title={title}
                description={"https://app.popipro.com/" + card}
                className="Demo__some-network__share-button"
              >
                <LivejournalIcon size={35} round />
              </LivejournalShareButton>
            </div>

            <div className="Demo__some-network">
              <MailruShareButton
                url={"https://app.popipro.com/" + card}
                title={title}
                className="Demo__some-network__share-button"
              >
                <MailruIcon size={35} round />
              </MailruShareButton>
            </div>

            <div className="Demo__some-network">
              <EmailShareButton
                url={"https://app.popipro.com/" + card}
                subject={title}
                body="body"
                className="Demo__some-network__share-button"
              >
                <EmailIcon size={35} round />
              </EmailShareButton>
              <div className="Demo__some-network__share-count">&nbsp;</div>
            </div>
            <div className="Demo__some-network">
              <ViberShareButton
                url={"https://app.popipro.com/" + card}
                title={title}
                className="Demo__some-network__share-button"
              >
                <ViberIcon size={35} round />
              </ViberShareButton>
            </div>

            <div className="Demo__some-network">
              <WorkplaceShareButton
                url={"https://app.popipro.com/" + card}
                quote={title}
                className="Demo__some-network__share-button"
              >
                <WorkplaceIcon size={35} round />
              </WorkplaceShareButton>
            </div>

            <div className="Demo__some-network">
              <LineShareButton
                url={"https://app.popipro.com/" + card}
                title={title}
                className="Demo__some-network__share-button"
              >
                <LineIcon size={35} round />
              </LineShareButton>
            </div>

            <div className="Demo__some-network">
              <WeiboShareButton
                url={"https://app.popipro.com/" + card}
                title={title}
                // image={`${String(window.location)}/${"exampleImage"}`}
                className="Demo__some-network__share-button"
              >
                <WeiboIcon size={35} round />
              </WeiboShareButton>
            </div>

            <div className="Demo__some-network">
              <PocketShareButton
                url={"https://app.popipro.com/" + card}
                title={title}
                className="Demo__some-network__share-button"
              >
                <PocketIcon size={35} round />
              </PocketShareButton>
            </div>

            <div className="Demo__some-network">
              <InstapaperShareButton
                url={"https://app.popipro.com/" + card}
                title={title}
                className="Demo__some-network__share-button"
              >
                <InstapaperIcon size={35} round />
              </InstapaperShareButton>
            </div>

            <div className="Demo__some-network">
              <HatenaShareButton
                url={"https://app.popipro.com/" + card}
                title={title}
                windowWidth={660}
                windowHeight={460}
                className="Demo__some-network__share-button"
              >
                <HatenaIcon size={35} round />
              </HatenaShareButton>

              {/* <div>
                    <HatenaShareCount
                      url={"https://app.popipro.com/"+ card}
                      className="Demo__some-network__share-count"
                    />
                  </div> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
