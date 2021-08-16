import "./WelcomeView.less";

import {
  ExclamationCircleOutlined,
  LoadingOutlined,
  RocketOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Modal, Row, Typography } from "antd";
import PropTypes from "prop-types";
import { FormattedMessage, injectIntl } from "react-intl";
import { useSelector } from "react-redux";

import handleError from "../../../functions/handleError";
import { HistoryPropType, IntlPropType } from "../../../utils/customPropTypes";
import config from "../../../utils/runtimeConfig";
import useAxios from "../../../utils/useAxios";

const { backendAddress } = config;
const { Title, Paragraph } = Typography;

const WelcomeView = ({
  gedsProfiles,
  intl,
  load,
  userId,
  history,
  skipProfileCreation,
}) => {
  // get current language code
  const { locale } = useSelector((state) => state.settings);
  const axios = useAxios();

  /**
   * Generate large square button for GEDS profiles
   *
   */
  const generateProfileBtn = ({
    icon,
    firstTitle,
    secondTitle,
    thirdTitle,
    value,
    type,
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
        await axios
          .put(`${backendAddress}api/profile/${userId}?language=ENGLISH`, value)
          .then(() => history.push("/profile/create/step/2"))
          .catch((error) => handleError(error, "message", history));
      }
      history.push("/profile/create/step/2");
    };

    return (
      <Button
        className="btn"
        onClick={type !== "loading" ? createProfile : null}
      >
        {/* icon */}
        <div className="btnIcon">{icon}</div>

        {/* first title */}
        <div className="btnFirstTitle">
          <strong>{truncateString(firstTitle, 24)}</strong>
        </div>

        {/* second title */}
        <div className="btnSecondTitle">
          {secondTitle ? (
            truncateString(secondTitle, 28)
          ) : (
            <div style={{ opacity: 0 }}>empty</div>
          )}
        </div>

        {/* third title */}
        <div className="btnThirdTitle">
          {thirdTitle ? (
            truncateString(thirdTitle, 28)
          ) : (
            <div style={{ opacity: 0 }}>empty</div>
          )}
        </div>
      </Button>
    );
  };

  generateProfileBtn.propTypes = {
    icon: PropTypes.element.isRequired,
    firstTitle: PropTypes.string.isRequired,
    secondTitle: PropTypes.string,
    thirdTitle: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
  };

  generateProfileBtn.defaultProps = {
    secondTitle: undefined,
    thirdTitle: undefined,
    value: undefined,
    type: undefined,
  };

  /**
   * Generates a list of GEDS profiles that match the user using large square buttons
   *
   */
  const generateGedsProfileList = () => {
    // check if GEDS profiles have loaded
    if (!load || !gedsProfiles) {
      return (
        <div>
          {/* loading button */}
          {generateProfileBtn({
            icon: <LoadingOutlined aria-hidden="true" />,
            firstTitle: intl.formatMessage({ id: "fetching.profiles" }),
            secondTitle: intl.formatMessage({
              id: "from.gcdirectory",
            }),
            type: "loading",
          })}
          {/* new user button */}
          {generateProfileBtn({
            icon: <UserAddOutlined aria-hidden="true" />,
            firstTitle: intl.formatMessage({ id: "new.user" }),
            secondTitle: intl.formatMessage({
              id: "start.fresh",
            }),
          })}
        </div>
      );
    }

    return (
      <div>
        {/* generate list of GEDS profiles */}
        {generateProfileBtn({
          icon: <UserOutlined aria-hidden="true" />,
          firstTitle: `${gedsProfiles.firstName} ${gedsProfiles.lastName}`,
          secondTitle: gedsProfiles.jobTitle && gedsProfiles.jobTitle[locale],
          thirdTitle: gedsProfiles.email,
          value: gedsProfiles,
        })}
        {/* new user button */}
        {generateProfileBtn({
          icon: <UserAddOutlined aria-hidden="true" />,
          firstTitle: intl.formatMessage({ id: "new.user" }),
          secondTitle: intl.formatMessage({
            id: "start.fresh",
          }),
        })}
      </div>
    );
  };

  const showSkipModal = () => {
    Modal.confirm({
      title: intl.formatMessage({ id: "settings.delete.modal.title" }),
      content: intl.formatMessage({ id: "setup.welcome.skip.modal" }),
      icon: <ExclamationCircleOutlined />,
      onOk: skipProfileCreation,
      okText: intl.formatMessage({ id: "yes" }),
      cancelText: intl.formatMessage({ id: "no" }),
    });
  };

  return (
    <Col className="welcome-content">
      <Title className="welcome" level={2}>
        <RocketOutlined aria-hidden="true" className="mr-1" rotate="45" />
        <FormattedMessage id="welcome" />
      </Title>
      <Row justify="center">
        <Paragraph className="subHeading">
          <FormattedMessage id="setup.welcome.description" />
        </Paragraph>
      </Row>
      <Row justify="center">
        <Paragraph className="subHeading" strong>
          <FormattedMessage id="setup.welcome.action" />
        </Paragraph>
      </Row>
      {generateGedsProfileList()}
      <div className="skipButton">
        <Button onClick={showSkipModal} type="text">
          <FormattedMessage id="setup.welcome.skip" />
        </Button>
      </div>
    </Col>
  );
};

WelcomeView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  gedsProfiles: PropTypes.object,
  intl: IntlPropType,
  load: PropTypes.bool.isRequired,
  history: HistoryPropType.isRequired,
  userId: PropTypes.string.isRequired,
  skipProfileCreation: PropTypes.func.isRequired,
};

WelcomeView.defaultProps = {
  gedsProfiles: undefined,
  intl: undefined,
};

export default injectIntl(WelcomeView);
