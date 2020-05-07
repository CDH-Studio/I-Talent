import React from "react";
import { useHistory } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Typography, Button } from "antd";
import {
  UserOutlined,
  UserAddOutlined,
  RocketOutlined
} from "@ant-design/icons";
import axios from "axios";
import config from "../../../config";

const { Title, Paragraph } = Typography;
const { backendAddress } = config;

function Welcome(props) {
  const history = useHistory();

  /* Component Styles */
  const styles = {
    content: {
      textAlign: "center",
      width: "100%",
      minHeight: "400px",
      background: "#fff",
      padding: "80px 10px"
    },
    welcome: {
      color: "#001529",
      opacity: 0.7
    },
    subHeading: {
      fontSize: "1.3em"
    },
    divider: {
      width: "20px !important",
      color: "red"
    },
    btn: { width: "180px", height: "180px", margin: "10px" },
    btnIcon: {
      opacity: 0.7,
      fontSize: "65px",
      display: "block",
      marginTop: "-15px"
    },
    btnFirstTitle: {
      opacity: 0.7,
      fontSize: "17px",
      display: "block",
      marginTop: "-13px"
    },
    btnSecondTitle: {
      opacity: 0.7,
      fontSize: "15px",
      display: "block",
      marginTop: "-4px"
    },
    btnThirdTitle: {
      opacity: 0.7,
      fontSize: "15px",
      display: "block",
      fontStyle: "italic",
      marginTop: "-4px"
    }
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
    value
  }) => {
    // truncate text to not overflow card
    const truncateString = (text, length) => {
      if (text && text.length > length) {
        return text.substring(0, length) + ".";
      } else {
        return text;
      }
    };

    // push GEDS profile to DB
    const createProfile = async () => {
      //check if button was passed profile data
      if (value) {
        // create profile
        await axios.post(
          backendAddress + "api/profile/" + localStorage.getItem("userId"),
          value
        );
      }

      //Redirect to step 2
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
            firstTitle: "Fetching Profiles",
            secondTitle: "From Geds",
            type: "default"
          })}
          {/* new user button */}
          {generateProfileBtn({
            icon: <UserAddOutlined />,
            firstTitle: "New User",
            secondTitle: "start fresh"
          })}
        </div>
      );
    } else {
      return (
        <div>
          {/* generate list of GEDS profiles */}
          {props.gedsProfiles.map((item, index) => {
            return generateProfileBtn({
              icon: <UserOutlined />,
              firstTitle: item.firstName + " " + item.lastName,
              secondTitle: item.jobTitle.en,
              thirdTitle: item.email,
              value: item
            });
          })}
          {/* new user button */}
          {generateProfileBtn({
            icon: <UserAddOutlined />,
            firstTitle: "New User",
            secondTitle: "start fresh"
          })}
        </div>
      );
    }
  };

  return (
    <div style={styles.content}>
      <Title level={1} style={styles.welcome}>
        <RocketOutlined rotate={"45"} /> Welcome
      </Title>
      <Paragraph style={styles.subHeading}>
        We just need a few bits of information to set up your profile
      </Paragraph>
      <Paragraph style={styles.subHeading} strong>
        Please select a GEDS profile to pre-populate your information or start
        from scratch
      </Paragraph>
      {generateGedsProfileList()}
    </div>
  );
}

export default Welcome;
