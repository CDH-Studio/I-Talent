import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import {
  ExclamationCircleOutlined,
  LoadingOutlined,
  RocketOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Modal, Row, Typography } from "antd";
import PropTypes from "prop-types";

import handleError from "../../../functions/handleError";
import { HistoryPropType } from "../../../utils/customPropTypes";
import config from "../../../utils/runtimeConfig";
import useAxios from "../../../utils/useAxios";

import "./WelcomeView.less";

const { backendAddress } = config;
const { Title, Paragraph } = Typography;

/**
 * Generate large square button for GEDS profiles
 * @param {React.ReactElement} icon - button icon
 * @param {string} firstTitle - first button title
 * @param {string} secondTitle - second button title
 * @param {string} thirdTitle - third button title
 * @param {Object} value - object containing the user's GEDS profile info
 * @param {string} type - button type
 * @param {string} userId - user's Id
 * @param {Object} history - history object
 * @returns {React.ReactElement} - React Element
 */
/* eslint-disable react/prop-types */
const ProfileBtn = ({
  icon,
  firstTitle,
  secondTitle,
  thirdTitle,
  value,
  type,
  userId,
  history,
}) => {
  const axios = useAxios();

  /**
   * Truncate text to not overflow card
   * @param {string} text - text to be truncated
   * @param {number} length - max length of truncated text
   * @returns {string} - truncated text
   */
  const truncateString = (text, length) => {
    if (text && text.length > length) {
      return `${text.substring(0, length)}.`;
    }
    return text;
  };

  /**
   * Push GEDS profile to the database
   */
  const createProfile = async () => {
    if (value) {
      await axios
        .put(`${backendAddress}/profile/${userId}?language=ENGLISH`, value)
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
/* eslint-enable react/prop-types */

/**
 * Generates a list of GEDS profiles that match the user using large square buttons
 * @param {Object} gedsProfiles - object containing info for GEDS profiles 
 * @param {React.ReactElement} icon - button icon
 * @param {string} userId - user's Id
 * @param {Object} history - history object
 * @param {Object} intl - intl object
 * @returns {React.ReactElement} - React Element
 */
/* eslint-disable react/prop-types */
const GedsProfileList = ({
  gedsProfiles,
  load,
  userId,
  history,
  intl,
}) => {
  const { locale } = useSelector((state) => state.settings);
  
  // check if GEDS profiles have loaded
  if (load || !gedsProfiles || Object.keys(gedsProfiles).length === 0) {
    return (
      <div>
        {/* loading button */}
        {load && <ProfileBtn
          firstTitle={intl.formatMessage({ id: "fetching.profiles" })}
          icon={<LoadingOutlined aria-hidden="true" />}
          secondTitle={intl.formatMessage({ id: "from.gcdirectory" })}
          type="loading"
        />}
        {/* new user button */}
        <ProfileBtn
          firstTitle={intl.formatMessage({ id: "new.user" })}
          history={history}
          icon={<UserAddOutlined aria-hidden="true" />}
          secondTitle={intl.formatMessage({ id: "start.fresh" })}
        />
      </div>
    );
  };

  return (
    <div>
      {/* generate list of GEDS profiles */}
      <ProfileBtn
        firstTitle={`${gedsProfiles.firstName} ${gedsProfiles.lastName}`}
        history={history}
        icon={<UserOutlined aria-hidden="true" />}
        secondTitle={gedsProfiles.jobTitle && gedsProfiles.jobTitle[locale]}
        thirdTitle={gedsProfiles.email}
        userId={userId}
        value={gedsProfiles}
      />
      {/* new user button */}
      <ProfileBtn
        firstTitle={intl.formatMessage({ id: "new.user" })}
        history={history}
        icon={<UserAddOutlined aria-hidden="true" />}
        secondTitle={intl.formatMessage({ id: "start.fresh" })}
      />
    </div>
  );
};
/* eslint-enable react/prop-types */

/**
 * Generates the modal to confirm "skip profile setup"
 * @param {function} skipProfileCreation - function that skips profile creation
 * @param {Object} intl - intl object
 */
const showSkipModal = (skipProfileCreation, intl) => {
  Modal.confirm({
    autoFocusButton: null,
    cancelText: intl.formatMessage({ id: "no" }),
    content: intl.formatMessage({ id: "setup.welcome.skip.modal" }),
    icon: <ExclamationCircleOutlined aria-hidden="true" />,
    keyboard: false,
    okText: intl.formatMessage({ id: "yes" }),
    okType: "danger",
    onOk: skipProfileCreation,
    title: intl.formatMessage({ id: "settings.delete.modal.title" }),
  });
};

const WelcomeView = ({
  gedsProfiles,
  load,
  userId,
  history,
  skipProfileCreation,
}) => {
  const intl = useIntl();

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
      <GedsProfileList
        gedsProfiles={gedsProfiles}
        history={history}
        intl={intl}
        load={load}
        userId={userId}
      />
      <div className="skipButton">
        <Button onClick={() => showSkipModal(skipProfileCreation, intl)} type="text">
          <FormattedMessage id="setup.welcome.skip" />
        </Button>
      </div>
    </Col>
  );
};

WelcomeView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  gedsProfiles: PropTypes.object,
  history: HistoryPropType.isRequired,
  load: PropTypes.bool.isRequired,
  skipProfileCreation: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

WelcomeView.defaultProps = {
  gedsProfiles: undefined,
};

export default WelcomeView;
