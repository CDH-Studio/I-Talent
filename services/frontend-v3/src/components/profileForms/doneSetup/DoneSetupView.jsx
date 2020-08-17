import React from "react";
import { Typography, Button } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

const { Title, Paragraph } = Typography;

/**
 *  DoneSetup(props)
 *
 *  Controller for the Done Setup Page.
 */
const DoneSetupView = ({ userId }) => {
  const history = useHistory();

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
    buttonText: {
      marginLeft: "10px",
    },
  };

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
        onClick={() => history.push(`/`)}
      >
        <span>
          <FormattedMessage id="setup.done.search" />
        </span>
      </Button>
      <Button
        icon={<UserOutlined />}
        size="large"
        type="primary"
        onClick={() => history.push(`/profile/${userId}`)}
      >
        <span>
          <FormattedMessage id="setup.done.view.profile" />
        </span>
      </Button>
    </div>
  );
};

DoneSetupView.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default DoneSetupView;
