import React from "react";
import { Typography, Button, Skeleton } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

/**
 *  DoneSetup(props)
 *
 *  Controller for the Done Setup Page.
 */
function DoneSetupView(props) {
  /* Component Styles */
  const styles = {
    skeleton: {
      textAlign: "center",
      width: "100%",
      minHeight: "400px",
      background: "#fff",
      padding: "30px 30px",
    },
    content: {
      textAlign: "center",
      width: "100%",
      background: "#fff",
      padding: "80px 10px",
    },
    subHeading: {
      fontSize: "1.3em",
    },
  };

  if (!props.load) {
    return (
      /* If form data is loading then wait */
      <div style={styles.skeleton}>
        <Skeleton active />
      </div>
    );
  } else {
    /* Once data had loaded display form */
    return (
      <div style={styles.content}>
        <CheckCircleOutlined
          style={{
            color: "#087472",
            fontSize: "85px",
          }}
        />
        <Title
          level={1}
          style={{
            color: "#001529",
            opacity: 0.7,
            marginTop: "15px",
          }}
        >
          All Done
        </Title>
        <Paragraph style={styles.subHeading}>
          Your profile is now set up!
        </Paragraph>
        <Paragraph style={styles.subHeading} strong>
          Feel free to view your profile and make sure to keep it up-to-date!
        </Paragraph>
        <Button
          icon={<SearchOutlined />}
          size={"large"}
          style={{ marginRight: "25px" }}
          href={"/secured/home"}
        >
          Search Profiles
        </Button>
        <Button
          icon={<UserOutlined />}
          size={"large"}
          type="primary"
          href={"/secured/profile/" + localStorage.getItem("userId")}
        >
          View Profile
        </Button>
      </div>
    );
  }
}

export default DoneSetupView;
