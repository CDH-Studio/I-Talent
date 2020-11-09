import React from "react";
import { FormattedMessage } from "react-intl";
import "./FooterView.scss";
import { Layout, Typography } from "antd";
import { Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

import ReportBug from "../../../reportBug/ReportBug";

const { Footer } = Layout;
const { Text } = Typography;

const FooterView = () => {
  const { keycloak } = useKeycloak();

  return (
    <Footer className="footer">
      <div className="aroundLinksSmall">
        <Link className="link" to="/about">
          <FormattedMessage id="footer.about.link" />
        </Link>

        <Text className="dashes">|</Text>

        <Link className="link" to="/help">
          <FormattedMessage id="footer.contact.link" />
        </Link>

        <Text className="dashes">|</Text>

        <Link className="link" to="/terms">
          <FormattedMessage id="footer.terms.and.conditions.link" />
        </Link>

        <Text className="dashes">|</Text>

        <Link className="link" to="/privacy">
          <FormattedMessage id="footer.privacy.link" />
        </Link>

        {keycloak && keycloak.authenticated && (
          <Text className="dashes">|</Text>
        )}

        <ReportBug />
      </div>
    </Footer>
  );
};

export default FooterView;
