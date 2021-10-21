import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { useKeycloak } from "@react-keycloak/web";
import { Divider, Layout } from "antd";

import config from "../../../../utils/runtimeConfig";
import ReportBug from "../../../reportBug/ReportBug";

import "./FooterView.less";

const { drupalSite } = config;
const { Footer } = Layout;

const FooterView = () => {
  const { locale } = useSelector((state) => state.settings);
  const { keycloak } = useKeycloak();

  /**
   * Generate footer link option
   *
   * @param {object} Option - The Option object to be displayed.
   * @param {string} Option.redirectPath - Path to redirect to on click
   * @param {string} notification.messageId - i18n id of text to display as label
   * @param {string} notification.lang - desired language to us on redirect page
   */
  const generateFooterItem = ({ redirectPath, messageId, lang }) => (
    <a
      className="link px-1"
      href={`${drupalSite}${lang}/${redirectPath}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <FormattedMessage id={messageId} />
      <span className="screenReaderOnly">
        <FormattedMessage id="opens.in.new.tab" />
      </span>
    </a>
  );

  return (
    <Footer className="footer">
      <h2 className="visually-hidden">Page Footer</h2>
      {generateFooterItem({
        lang: locale === "ENGLISH" ? "en" : "fr",
        messageId: "footer.about.link",
        redirectPath: "about",
      })}
      <Divider className="footer-divider" type="vertical" />
      {generateFooterItem({
        lang: locale === "ENGLISH" ? "en" : "fr",
        messageId: "footer.contact.link",
        redirectPath: "help",
      })}
      <Divider className="footer-divider" type="vertical" />
      {generateFooterItem({
        lang: locale === "ENGLISH" ? "en" : "fr",
        messageId: "footer.terms.and.conditions.link",
        redirectPath: "terms-and-conditions-use",
      })}
      <Divider className="footer-divider" type="vertical" />
      {generateFooterItem({
        lang: locale === "ENGLISH" ? "en" : "fr",
        messageId: "footer.privacy.link",
        redirectPath: "privacy",
      })}
      {keycloak && keycloak.authenticated && (
        <>
          <Divider className="footer-divider" type="vertical" />
          <ReportBug />
        </>
      )}
    </Footer>
  );
};

export default FooterView;
