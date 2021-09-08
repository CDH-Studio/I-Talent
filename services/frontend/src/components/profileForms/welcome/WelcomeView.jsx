import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
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

const WelcomeView = ({
  gedsProfiles,
  load,
  userId,
  history,
  skipProfileCreation,
}) => {
  // get current language code
  const { locale } = useSelector((state) => state.settings);
  const axios = useAxios();
  const intl = useIntl();

  const [isModalVisible, setIsModalVisible] = useState(false);

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
    firstTitle: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    secondTitle: PropTypes.string,
    thirdTitle: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
  };

  generateProfileBtn.defaultProps = {
    secondTitle: undefined,
    thirdTitle: undefined,
    type: undefined,
    value: undefined,
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
            firstTitle: intl.formatMessage({ id: "fetching.profiles" }),
            icon: <LoadingOutlined aria-hidden="true" />,
            secondTitle: intl.formatMessage({
              id: "from.gcdirectory",
            }),
            type: "loading",
          })}
          {/* new user button */}
          {generateProfileBtn({
            firstTitle: intl.formatMessage({ id: "new.user" }),
            icon: <UserAddOutlined aria-hidden="true" />,
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
          firstTitle: `${gedsProfiles.firstName} ${gedsProfiles.lastName}`,
          icon: <UserOutlined aria-hidden="true" />,
          secondTitle: gedsProfiles.jobTitle && gedsProfiles.jobTitle[locale],
          thirdTitle: gedsProfiles.email,
          value: gedsProfiles,
        })}
        {/* new user button */}
        {generateProfileBtn({
          firstTitle: intl.formatMessage({ id: "new.user" }),
          icon: <UserAddOutlined aria-hidden="true" />,
          secondTitle: intl.formatMessage({
            id: "start.fresh",
          }),
        })}
      </div>
    );
  };

  const showSkipModal = () => {
    setIsModalVisible(true);
  };

  const hideSkipModal = () => {
    setIsModalVisible(false);
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
        <Modal
          cancelText={
            <>
              <CloseCircleOutlined aria-hidden="true" className="mr-1" />
              <FormattedMessage id="no" />
            </>
          }
          closable={false}
          maskClosable={false}
          okButtonProps={{ danger: true, ghost: true }}
          okText={
            <>
              <CheckCircleOutlined aria-hidden="true" className="mr-1" />
              <FormattedMessage id="yes" />
            </>
          }
          onCancel={hideSkipModal}
          onOk={skipProfileCreation}
          title={
            <>
              <ExclamationCircleOutlined
                aria-hidden="true"
                className="mr-2 warning-text"
              />
              <FormattedMessage id="settings.delete.modal.title" />
            </>
          }
          visible={isModalVisible}
        >
          <FormattedMessage id="setup.welcome.skip.modal" />
        </Modal>
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
