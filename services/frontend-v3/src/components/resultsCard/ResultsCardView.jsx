import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import {
  Row,
  Col,
  Tag,
  Card,
  Avatar,
  Typography,
  Empty,
  Skeleton,
  Badge,
  Tooltip,
  Button,
  Spin,
} from "antd";
import {
  UserAddOutlined,
  UserDeleteOutlined,
  TeamOutlined,
  EditOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  BranchesOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import {
  HistoryPropType,
  ProfileInfoPropType,
} from "../../utils/customPropTypes";
import Header from "../header/Header";
import prepareInfo from "../../functions/prepareInfo";
import "./ResultsCardView.scss";

const { Meta } = Card;
const { Text } = Typography;

const ResultsCardView = ({
  history,
  results,
  locale,
  loading,
  userId,
  connections,
  addConnection,
  removeConnection,
}) => {
  /*
   * Handle Key Press
   *
   * handle how to process when enter key is hit when focusing on a results card
   */
  const handleKeyPress = (e, person) => {
    if (e.charCode === 32 || e.charCode === 13) {
      e.preventDefault();
      history.push(`/profile/${person.id}`);
    }
  };

  /**
   * Render User Avatar for each card
   * @param {Object} person - The person being rendered on card.
   */
  const getUserAvatar = ({ person }) => {
    let badgeIcon;
    let badgeColor;
    let tooltipMessage;

    if (person.isConnection) {
      badgeIcon = <TeamOutlined className="badge-icon" />;
      badgeColor = "#087472";
      tooltipMessage = (
        <FormattedMessage
          id="search.results.cards.connection.tooltip"
          values={{ name: person.firstName }}
        />
      );
    } else if (person.status === "INACTIVE") {
      badgeIcon = <LockOutlined className="badge-icon" />;
      badgeColor = "#989898";
      tooltipMessage = (
        <FormattedMessage
          id="search.results.cards.connection.tooltip.inactive"
          values={{ name: person.firstName }}
        />
      );
    } else if (person.status === "HIDDEN") {
      badgeIcon = <EyeInvisibleOutlined />;
      badgeColor = "#000";
      tooltipMessage = (
        <FormattedMessage
          id="search.results.cards.connection.tooltip.hidden"
          values={{ name: person.firstName }}
        />
      );
    }

    return (
      <Tooltip align={{ offset: [18, -3] }} title={tooltipMessage}>
        <Badge
          count={badgeIcon}
          offset={[-6, 6]}
          style={{
            backgroundColor: badgeColor,
            borderRadius: "20px",
            padding: "5px",
            color: "white",
          }}
        >
          <Avatar
            size={48}
            style={{
              backgroundColor: person.avatarColor,
            }}
          >
            <Text className="avatar-text">{person.nameInitials}</Text>
          </Avatar>
        </Badge>
      </Tooltip>
    );
  };

  /**
   * Render User Avatar for each card
   * @param {Object} person - The person being rendered on card.
   */
  const getActionRibbonBtn = ({ person }) => {
    const isConnection = connections.includes(person.id);

    const ribbonStyle = {
      padding: "0px",
      color: "#ffffff",
      margin: "1px",
      display: "inline-block",
    };

    // get action in ribbon
    if (person.id !== userId) {
      return (
        <Button
          tabIndex="0"
          type="link"
          block
          style={ribbonStyle}
          icon={
            isConnection ? (
              <UserDeleteOutlined className="button-icon" />
            ) : (
              <UserAddOutlined className="button-icon" />
            )
          }
          onClick={(e) => {
            e.stopPropagation();

            if (isConnection) {
              removeConnection(person.id);
            } else {
              addConnection(person.id);
            }
          }}
          className="button"
        >
          {isConnection ? (
            <FormattedMessage id="search.results.cards.remove.connection" />
          ) : (
            <FormattedMessage id="search.results.cards.add.connection" />
          )}
        </Button>
      );
    }
    return (
      <Button
        tabIndex="0"
        type="link"
        block
        style={ribbonStyle}
        icon={<EditOutlined className="button-icon" />}
        onClick={(e) => {
          e.stopPropagation();
          history.push("/profile/edit/primary-info");
        }}
        className="button"
      >
        <FormattedMessage id="edit.profile" />
      </Button>
    );
  };

  /**
   * Render User Avatar for each card
   * @param {Object} person - The person being rendered on card.
   */
  const getCardFooter = ({ person }) => {
    return [
      <div>
        <BranchesOutlined className="card-footer-icon" />
        {person.branch ? (
          <Text>{person.branch}</Text>
        ) : (
          <Text>Branch unknown</Text>
        )}
      </div>,
      <div>
        <EnvironmentOutlined className="card-footer-icon" />
        {person.branch ? (
          <Text>
            {person.officeLocation.streetNumber}{" "}
            {person.officeLocation.streetName}, {person.officeLocation.city}
          </Text>
        ) : (
          <Text>Location unknown</Text>
        )}
      </div>,
    ];
  };

  /**
   * Render User Result Card
   * @param {Object} person - The person being rendered on card.
   * @param {key} integer - The type of notification.
   */
  const renderCard = ({ person, key }) => {
    const isConnection = connections.includes(person.id);

    const userLevel =
      person.groupLevel && person.groupLevel.name
        ? `(${person.groupLevel.name})`
        : "";

    const cardTitle = (
      <Text>
        {person.firstName} {person.lastName}
      </Text>
    );

    return (
      <Col span={24} xxl={12} key={key}>
        <Badge.Ribbon
          text={getActionRibbonBtn({ person })}
          color={isConnection ? "#192E2F" : "#1D807B"}
        >
          <Card
            tabIndex="0"
            className="card"
            hoverable
            bordered
            onClick={() => history.push(`/profile/${person.id}`)}
            onKeyPress={(e) => handleKeyPress(e, person)}
            actions={getCardFooter({ person })}
            bodyStyle={{ padding: "25px", flex: 1, flexBasis: "auto" }}
          >
            <Row>
              <Col span={24}>
                <Row style={{ paddingTop: "15px" }}>
                  <Meta
                    className="meta"
                    avatar={getUserAvatar({ person })}
                    title={cardTitle}
                    description={
                      <p className="small-p">
                        {person.jobTitle} {userLevel}
                      </p>
                    }
                  />
                </Row>
              </Col>

              <Col span={24} style={{ marginTop: "20px" }}>
                {person.resultSkills.length > 0 ? (
                  <Row align="middle" type="flex">
                    {person.resultSkills.map(({ id, name }) => (
                      <Col key={id}>
                        <Tag className="tag">{name}</Tag>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Tag className="tag">No matching skills found</Tag>
                )}
              </Col>
            </Row>
          </Card>
        </Badge.Ribbon>
      </Col>
    );
  };

  /**
   * Render Result Count
   * @param {Boolean} isLoading - loading status.
   * @param {number} count - loading status.
   */
  const getResultCount = ({ isLoading, count }) => {
    if (!isLoading) {
      return (
        <Text type="secondary" className="result-count">
          results found: {count}
        </Text>
      );
    }
    return <Spin className="loading-spinner" />;
  };

  /**
   * Render Result Cards
   * @param {Object} dataSource - The list of user results.
   */
  const renderResultCards = (dataSource) => {
    if (!loading && dataSource.length === 0) {
      return (
        <Empty description={<FormattedMessage id="search.no.results" />} />
      );
    }

    const preparedResults = prepareInfo(dataSource, locale);

    return preparedResults.map((person, key) => renderCard({ person, key }));
  };

  /**
   * Get loading animations when loading results
   *
   */
  const getLoadingAnimation = () => {
    return (
      <Row gutter={[16, 16]} type="flex" justify="left">
        <Col span={24} xxl={12}>
          <Card>
            <Skeleton active />
          </Card>
        </Col>
        <Col span={24} xxl={12} style={{ opacity: "50%" }}>
          <Card>
            <Skeleton active />
          </Card>
        </Col>
        <Col span={24} xxl={12} style={{ opacity: "30%" }}>
          <Card>
            <Skeleton active />
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Header
        title={
          <span>
            <FormattedMessage id="results.title" />
            {getResultCount({ isLoading: loading, count: results.length })}
          </span>
        }
      />
      <div className="container">
        {loading && getLoadingAnimation()}
        <Row
          gutter={[16, 16]}
          type="flex"
          justify="left"
          align={results.length === 0 ? "center" : undefined}
        >
          {!loading && renderResultCards(results)}
        </Row>
      </div>
    </>
  );
};

ResultsCardView.propTypes = {
  history: HistoryPropType.isRequired,
  results: PropTypes.arrayOf(ProfileInfoPropType),
  locale: PropTypes.oneOf(["FRENCH", "ENGLISH"]).isRequired,
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  connections: PropTypes.arrayOf(PropTypes.string).isRequired,
  addConnection: PropTypes.func.isRequired,
  removeConnection: PropTypes.func.isRequired,
};

ResultsCardView.defaultProps = {
  results: [],
};

export default ResultsCardView;
