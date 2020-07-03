import React from "react";
// import { FormattedMessage } from "react-intl";
// import ChangeLanguage from "../../../changeLanguage/ChangeLanguage";
// import CanLogo from "../../../../assets/government-of-canada-logo.svg";
// import Footer from "./Footer";
import { Layout } from "antd";

const { Footer } = Layout;

const FooterView = () => {
  /* Component Styles */
  const styles = {
    footer: {
      backgroundColor: "#F8F8F8",
      paddingLeft: "60px",
      boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
      height: "60px",
      zIndex: 4,
      width: "100%",

      left: "0",
      bottom: "0",
    },
    link: {
      float: "right",
      display: "inline",
      margin: "15px",
      marginBottom: "20px",
    },
  };

  //   // update width to screen size

  //   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //   const updateWidth = () => setWindowWidth(window.innerWidth);

  //   useEffect(() => {
  //     window.addEventListener("resize", updateWidth);

  //     return () => window.removeEventListener("resize", updateWidth);
  //   }, []);

  //   if (windowWidth > 400) {
  //     return (
  //       <Footer style={styles.header}>

  //       </Footer>
  //     );
  //   }

  return (
    <>
      <Footer style={styles.footer}>
        <a
          style={styles.link}
          // href to be changed to route w about page
          href="https://github.com/CDH-Studio/UpSkill#what-is-I-Talent"
        >
          About I-Talent
        </a>
        <a
          style={styles.link}
          // href to be changed to route w Contact Us page
          href="https://github.com/CDH-Studio/UpSkill#what-is-I-Talent"
        >
          Contact Us
        </a>

        <a
          style={styles.link}
          href="https://www.canada.ca/en/transparency/terms.html"
        >
          Terms and Conditions
        </a>

        <a
          style={styles.link}
          href="https://www.canada.ca/en/transparency/terms.html"
        >
          Privacy
        </a>
      </Footer>
    </>
  );
};

export default FooterView;
