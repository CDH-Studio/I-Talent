import React from "react";
import { FormattedMessage } from "react-intl";

import { Layout, Typography } from "antd";

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
        <a style={styles.link} href="/about">
          <FormattedMessage id="footer.about.link" />
        </a>

        <Text style={styles.dashes}>-</Text>

        <a style={styles.link} href="/help">
          <FormattedMessage id="footer.contact.link" />
        </a>

        <Text style={styles.dashes}>-</Text>

        <a style={styles.link} href="/terms">
          <FormattedMessage id="footer.terms.and.conditions.link" />
        </a>

        <Text style={styles.dashes}>-</Text>

        <a style={styles.link} href="/privacy">
          <FormattedMessage id="footer.privacy.link" />
        </a>
      </div>
    </Footer>
  );
};

export default FooterView;
