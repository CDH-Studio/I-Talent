import { FormattedMessage } from "react-intl";
import "./FooterView.less";
import { Layout, Typography } from "antd";
import { useKeycloak } from "@react-keycloak/web";
import { useSelector } from "react-redux";
import config from "../../../../utils/runtimeConfig";
import ReportBug from "../../../reportBug/ReportBug";

const { drupalSite } = config;
const { Footer } = Layout;
const { Text } = Typography;

const footerObject = (value, messageId, lang) => (
  <a
    className="link"
    target="_blank"
    rel="noopener noreferrer"
    href={`${drupalSite}${lang}/${value}`}
  >
    <FormattedMessage id={messageId} />
  </a>
);

const FooterView = () => {
  const { locale } = useSelector((state) => state.settings);
  const { keycloak } = useKeycloak();
  return (
    <Footer className="footer" role="contentinfo">
      <div className="aroundLinksSmall">
        {footerObject(
          "about",
          "footer.about.link",
          locale === "ENGLISH" ? "en" : "fr"
        )}
        <Text className="dashes">|</Text>
        {footerObject(
          "help",
          "footer.contact.link",
          locale === "ENGLISH" ? "en" : "fr"
        )}
        <Text className="dashes">|</Text>
        {footerObject(
          "terms-and-conditions-use",
          "footer.terms.and.conditions.link",
          locale === "ENGLISH" ? "en" : "fr"
        )}
        <Text className="dashes">|</Text>
        {footerObject(
          "privacy",
          "footer.privacy.link",
          locale === "ENGLISH" ? "en" : "fr"
        )}
        {keycloak && keycloak.authenticated && (
          <Text className="dashes">|</Text>
        )}
        <ReportBug />
      </div>
    </Footer>
  );
};

export default FooterView;
