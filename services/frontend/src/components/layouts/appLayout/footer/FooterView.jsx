import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { Divider, Layout } from "antd";

import ReportBug from "../../../reportBug/ReportBug";

import "./FooterView.less";

const { Footer } = Layout;

const FooterView = () => {
  const { keycloak } = useKeycloak();

  /**
   * Generate footer link option
   *
   * @param {Object} Option - The Option object to be displayed.
   * @param {string} Option.redirectPath - Path to redirect to on click
   * @param {string} notification.messageId - i18n id of text to display as label
   */
  const generateFooterItem = ({ redirectPath, messageId }) => (
    <Link to={`/${redirectPath}`}>
      <FormattedMessage id={messageId} />
        <span className="screenReaderOnly">
          <FormattedMessage id="opens.in.new.tab" />
        </span>
    </Link>
  );

  return (
    <Footer className="footer">
      <h2 className="visually-hidden">Page Footer</h2>
      {generateFooterItem({
        messageId: "footer.about.link",
        redirectPath: "about",
      })}
      <Divider className="footer-divider" type="vertical" />
      <FormattedMessage id="footer.contact.link" />
      <Divider className="footer-divider" type="vertical" />
      {generateFooterItem({
        messageId: "footer.privacy.link",
        redirectPath: "privacy",
      })}
      <Divider className="footer-divider" type="vertical" />
      {generateFooterItem({
        messageId: "footer.terms.and.conditions.link",
        redirectPath: "terms-and-conditions",
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
