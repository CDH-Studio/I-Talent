import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, Button } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import {
  UserOutlined,
  UserAddOutlined,
  RocketOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import config from "../../../config";

const { Title, Paragraph } = Typography;
const { backendAddress } = config;

function Welcome(props) {
  const history = useHistory();

  // get current language code
  const locale = props.intl.formatMessage({
    id: "language.code",
    defaultMessage: "en",
  });

  /* Component Styles */
  const styles = {
    content: {
      textAlign: "center",
      width: "100%",
      minHeight: "400px",
      background: "#fff",
      padding: "80px 10px",
    },
    welcome: {
      color: "#001529",
      opacity: 0.7,
    },
    subHeading: {
      fontSize: "1.3em",
    },
    divider: {
      width: "20px !important",
      color: "red",
    },
    btn: { width: "180px", height: "180px", margin: "10px" },
    btnIcon: {
      opacity: 0.7,
      fontSize: "65px",
      display: "block",
      marginTop: "-15px",
    },
    btnFirstTitle: {
      opacity: 0.7,
      fontSize: "17px",
      display: "block",
      marginTop: "-13px",
    },
    btnSecondTitle: {
      opacity: 0.7,
      fontSize: "15px",
      display: "block",
      marginTop: "-4px",
    },
    btnThirdTitle: {
      opacity: 0.7,
      fontSize: "15px",
      display: "block",
      fontStyle: "italic",
      marginTop: "-4px",
    },
  };

  /*
   * Generate Profile Button
   *
   * Generate large square button for GEDS profiles
   */
  const generateProfileBtn = ({
    icon,
    firstTitle,
    secondTitle,
    thirdTitle,
    value,
  }) => {
    // truncate text to not overflow card
    const truncateString = (text, length) => {
      if (text && text.length > length) {
        return `${text.substring(0, length)}.`;
      }
      return text;
    };

    // push GEDS profile to DB
    const createProfile = async () => {
      // check if button was passed profile data
      if (value) {
        // create profile
        await axios.post(
          `${backendAddress}api/profile/${localStorage.getItem("userId")}`,
          value
        );
      }

      // Redirect to step 2
      history.push("/secured/profile/create/step/2");
    };

    return (
      <Button style={styles.btn} onClick={createProfile}>
        {/* icon */}
        <div style={styles.btnIcon}>{icon}</div>

        {/* first title */}
        <div style={styles.btnFirstTitle}>
          <strong>{truncateString(firstTitle, 17)}</strong>
        </div>

        {/* second title */}
        <div style={styles.btnSecondTitle}>
          {secondTitle ? (
            truncateString(secondTitle, 17)
          ) : (
            <div style={{ opacity: 0 }}>empty</div>
          )}
        </div>

        {/* third title */}
        <div style={styles.btnThirdTitle}>
          {thirdTitle ? (
            truncateString(thirdTitle, 19)
          ) : (
            <div style={{ opacity: 0 }}>empty</div>
          )}
        </div>
      </Button>
    );
  };

  /*
   * Generate GEDS Profile List
   *
   * Generates a list of GEDS profiles that match the user using large square buttons
   */
  const generateGedsProfileList = () => {
    // check if GEDS profiles have loaded
    if (!props.load) {
      return (
        <div>
          {/* loading button */}
          {generateProfileBtn({
            icon: <LoadingOutlined />,
            firstTitle: props.intl.formatMessage({
              id: "setup.welcome.geds.title",
            }),
            secondTitle: props.intl.formatMessage({
              id: "setup.welcome.geds.description",
            }),
            type: "default",
          })}
          {/* new user button */}
          {generateProfileBtn({
            icon: <UserAddOutlined />,
            firstTitle: props.intl.formatMessage({
              id: "setup.welcome.new.title",
            }),
            secondTitle: props.intl.formatMessage({
              id: "setup.welcome.new.description",
            }),
          })}
        </div>
      );
    }
    return (
      <div>
        {/* generate list of GEDS profiles */}
        {props.gedsProfiles.map((item, index) => {
          return generateProfileBtn({
            icon: <UserOutlined />,
            firstTitle: `${item.firstName} ${item.lastName}`,
            secondTitle: item.jobTitle[locale],
            thirdTitle: item.email,
            value: item,
          });
        })}
        {/* new user button */}
        {generateProfileBtn({
          icon: <UserAddOutlined />,
          firstTitle: props.intl.formatMessage({
            id: "setup.welcome.new.title",
          }),
          secondTitle: props.intl.formatMessage({
            id: "setup.welcome.new.description",
          }),
        })}
      </div>
    );
  };

  return (
    <div style={styles.content}>
      <Title level={1} style={styles.welcome}>
        <RocketOutlined rotate="45" /> <FormattedMessage id="setup.welcome" />
      </Title>
      <Paragraph style={styles.subHeading}>
        <FormattedMessage id="setup.welcome.description" />
      </Paragraph>
      <Paragraph style={styles.subHeading} strong>
        <FormattedMessage id="setup.welcome.action" />
      </Paragraph>
      {generateGedsProfileList()}
    </div>
  );
}

export default injectIntl(Welcome);
