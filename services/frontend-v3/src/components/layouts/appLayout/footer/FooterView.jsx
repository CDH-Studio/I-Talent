import React from "react";
import { FormattedMessage } from "react-intl";
import "./FooterView.scss";
import { Layout, Typography } from "antd";
import { Link } from "react-router-dom";

const { Footer } = Layout;
const { Text } = Typography;

const FooterView = () => {
  return (
    <Footer className="footer">
      <div className="aroundLinksSmall">
        <Link className="link" to="/about">
          <FormattedMessage id="footer.about.link" />
        </Link>

        <Text className="dashes">-</Text>

        <Link className="link" to="/help">
          <FormattedMessage id="footer.contact.link" />
        </Link>

        <Text className="dashes">-</Text>

        <Link className="link" to="/terms">
          <FormattedMessage id="footer.terms.and.conditions.link" />
        </Link>

        <Text className="dashes">-</Text>

        <Link className="link" to="/privacy">
          <FormattedMessage id="footer.privacy.link" />
        </Link>
      </div>
    </Footer>
  );
};

export default FooterView;
