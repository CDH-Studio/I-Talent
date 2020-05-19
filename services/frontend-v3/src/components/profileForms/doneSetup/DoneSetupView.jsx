import React from "react";
import { Typography, Button, Skeleton } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { NetworkErrorsPropType } from "../../../customPropTypes";
import EditProfileError from "../editProfileError/editProfileError";

const { Title, Paragraph } = Typography;

/**
 *  DoneSetup(props)
 *
 *  Controller for the Done Setup Page.
 */
const DoneSetupView = ({ load, networkErrors }) => {
  /* Component Styles */
  const styles = {
    skeleton: {
      textAlign: "center",
      width: "100%",
      minHeight: "400px",
      background: "#fff",
      padding: "30px 30px",
    },
    uncenteredSkeleton: {
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
    buttonText: {
      marginLeft: "10px",
    },
  };

  if (networkErrors && networkErrors.length) {
    return (
      <div style={styles.uncenteredSkeleton}>
        <EditProfileError networkErrors={networkErrors} />;
      </div>
    );
  }

  if (!load) {
    return (
      /* If form data is loading then wait */
      <div style={styles.skeleton}>
        <Skeleton active />
      </div>
    );
  }
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
        <FormattedMessage id="setup.done.title" />
      </Title>
      <Paragraph style={styles.subHeading}>
        <FormattedMessage id="setup.done.description" />
      </Paragraph>
      <Paragraph style={styles.subHeading} strong>
        <FormattedMessage id="setup.done.action" />
      </Paragraph>
      <Button
        icon={<SearchOutlined />}
        size="large"
        style={{ marginRight: "25px" }}
        href="/secured/home"
      >
        <span>
          <FormattedMessage id="setup.done.search" />
        </span>
      </Button>
      <Button
        icon={<UserOutlined />}
        size="large"
        type="primary"
        href={`/secured/profile/${localStorage.getItem("userId")}`}
      >
        <span>
          <FormattedMessage id="setup.done.view.profile" />
        </span>
      </Button>
    </div>
  );
};

DoneSetupView.propTypes = {
  load: PropTypes.bool.isRequired,
  networkErrors: NetworkErrorsPropType.isRequired,
};

export default DoneSetupView;
