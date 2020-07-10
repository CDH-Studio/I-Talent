import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import { Layout } from "antd";

const { Footer } = Layout;

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
  };

  // update width to screen size

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWidth = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  if (windowWidth < 993) {
    return (
      <Footer style={styles.footer}>
        <div style={styles.aroundLinksSmall}>
          <a
            style={styles.link}
            // href to be changed to route w about page
            href="/about"
          >
            <FormattedMessage id="footer.about.link" />
          </a>

          <a
            style={styles.link}
            // href to be changed to route w Contact Us page
            href="/about/help"
          >
            <FormattedMessage id="footer.contact.link" />
          </a>

          <a style={styles.link} href="//about/terms">
            <FormattedMessage id="footer.terms.and.conditions.link" />
          </a>

          <a style={styles.link} href="/about/privacy">
            <FormattedMessage id="footer.privacy.link" />
          </a>
        </div>
      </Footer>
    );
  }

  const urlSections = window.location.toString().split("/");
  const endURL = urlSections[urlSections.length - 1];

  if (
    endURL === "home" ||
    endURL === "about" ||
    endURL === "terms" ||
    endURL === "privacy" ||
    endURL === "help" ||
    endURL === ""
  ) {
    return (
      <Footer style={styles.footer}>
        <div style={styles.aroundLinksSmall}>
          <a
            style={styles.link}
            // href to be changed to route w about page
            href="/about"
          >
            <FormattedMessage id="footer.about.link" />
          </a>

          <a
            style={styles.link}
            // href to be changed to route w Contact Us page
            href="/about/help"
          >
            <FormattedMessage id="footer.contact.link" />
          </a>

          <a style={styles.link} href="/about/terms">
            <FormattedMessage id="footer.terms.and.conditions.link" />
          </a>

          <a style={styles.link} href="/about/privacy">
            <FormattedMessage id="footer.privacy.link" />
          </a>
        </div>
      </Footer>
    );
  }

  return (
    <Footer style={styles.footer}>
      <div style={styles.aroundLinks}>
        <a
          style={styles.link}
          // href to be changed to route w about page
          href="/about"
        >
          <FormattedMessage id="footer.about.link" />
        </a>

        <a
          style={styles.link}
          // href to be changed to route w Contact Us page
          href="/about/help"
        >
          <FormattedMessage id="footer.contact.link" />
        </a>

        <a style={styles.link} href="/about/terms">
          <FormattedMessage id="footer.terms.and.conditions.link" />
        </a>

        <a style={styles.link} href="/about/privacy">
          <FormattedMessage id="footer.privacy.link" />
        </a>
      </div>
    </Footer>
  );
};

export default FooterView;
