import React from "react";
import { FormattedMessage } from "react-intl";

import { Layout, Typography } from "antd";
import { Link } from "react-router-dom";

const { Footer } = Layout;
const { Text } = Typography;

const FooterView = () => {
  /* Component Styles */
  const styles = {
    footer: {
      backgroundColor: "#F8F8F8",
      paddingLeft: "60px",
      zIndex: 4,
      width: "100%",

      left: "0",
      bottom: "0",
    },
    link: {
      display: "inline",
      marginLeft: "15px",
    },
    aroundLinks: {
      textAlign: "center",
      paddingLeft: "270px",
    },
    aroundLinksSmall: {
      textAlign: "center",
    },
    dashes: {
      marginLeft: "15px",
    },
  };

  return (
    <Footer style={styles.footer}>
      <div style={styles.aroundLinksSmall}>
        <Link style={styles.link} to="/about">
          <FormattedMessage id="footer.about.link" />
        </Link>

        <Text style={styles.dashes}>-</Text>

        <Link style={styles.link} to="/help">
          <FormattedMessage id="footer.contact.link" />
        </Link>

        <Text style={styles.dashes}>-</Text>

        <Link style={styles.link} to="/terms">
          <FormattedMessage id="footer.terms.and.conditions.link" />
        </Link>

        <Text style={styles.dashes}>-</Text>

        <Link style={styles.link} to="/privacy">
          <FormattedMessage id="footer.privacy.link" />
        </Link>
      </div>
    </Footer>
  );
};

export default FooterView;
