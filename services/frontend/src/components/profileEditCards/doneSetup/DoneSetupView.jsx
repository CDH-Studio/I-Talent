import { Typography, Button } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import "./DoneSetupView.less";

const { Title, Paragraph } = Typography;

/**
 *  DoneSetup(props)
 *
 *  Controller for the Done Setup Page.
 */
const DoneSetupView = ({ userId }) => {
  const history = useHistory();

  return (
    <div className="done-content">
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
      <Paragraph className="done-subHeading">
        <FormattedMessage id="setup.done.description" />
      </Paragraph>
      <Paragraph className="done-subHeading" strong>
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
