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
            href="https://github.com/CDH-Studio/UpSkill#what-is-I-Talent"
          >
            <FormattedMessage id="footer.about.link" />
          </a>

          <a
            style={styles.link}
            // href to be changed to route w Contact Us page
            href="https://github.com/CDH-Studio/UpSkill#what-is-I-Talent"
          >
            <FormattedMessage id="footer.contact.link" />
          </a>

          <a
            style={styles.link}
            href="https://www.canada.ca/en/transparency/terms.html"
          >
            <FormattedMessage id="footer.terms.and.conditions.link" />
          </a>

          <a
            style={styles.link}
            href="https://www.canada.ca/en/transparency/terms.html"
          >
            <FormattedMessage id="footer.privacy.link" />
          </a>
        </div>
      </Footer>
    );
  }

  const urlSections = window.location.toString().split("/");
  // console.log(urlSections);
  const endURL = urlSections[urlSections.length - 1];

  if (endURL === "home" || endURL === "about") {
    return (
      <Footer style={styles.footer}>
        <div style={styles.aroundLinksSmall}>
          <a
            style={styles.link}
            // href to be changed to route w about page
            href="https://github.com/CDH-Studio/UpSkill#what-is-I-Talent"
          >
            <FormattedMessage id="footer.about.link" />
          </a>

          <a
            style={styles.link}
            // href to be changed to route w Contact Us page
            href="https://github.com/CDH-Studio/UpSkill#what-is-I-Talent"
          >
            <FormattedMessage id="footer.contact.link" />
          </a>

          <a
            style={styles.link}
            href="https://www.canada.ca/en/transparency/terms.html"
          >
            <FormattedMessage id="footer.terms.and.conditions.link" />
          </a>

          <a
            style={styles.link}
            href="https://www.canada.ca/en/transparency/terms.html"
          >
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
          href="https://github.com/CDH-Studio/UpSkill#what-is-I-Talent"
        >
          <FormattedMessage id="footer.about.link" />
        </a>

        <a
          style={styles.link}
          // href to be changed to route w Contact Us page
          href="https://github.com/CDH-Studio/UpSkill#what-is-I-Talent"
        >
          <FormattedMessage id="footer.contact.link" />
        </a>

        <a
          style={styles.link}
          href="https://www.canada.ca/en/transparency/terms.html"
        >
          <FormattedMessage id="footer.terms.and.conditions.link" />
        </a>

        <a
          style={styles.link}
          href="https://www.canada.ca/en/transparency/terms.html"
        >
          <FormattedMessage id="footer.privacy.link" />
        </a>
      </div>
    </Footer>
  );
};

export default FooterView;
