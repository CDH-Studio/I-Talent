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
  SearchOutlined,
} from "@ant-design/icons";
import {
  HistoryPropType,
  ProfileInfoPropType,
} from "../../utils/customPropTypes";
import Header from "../header/Header";
import prepareInfo from "../../functions/prepareInfo";
import "./ResultsCardView.less";

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
      badgeIcon = <TeamOutlined className="res-badge-icon" />;
      badgeColor = "#087472";
      tooltipMessage = (
        <FormattedMessage
          id="connection.tooltip"
          values={{ name: person.firstName }}
        />
      );
    } else if (person.status === "INACTIVE") {
      badgeIcon = <LockOutlined className="res-badge-icon" />;
      badgeColor = "#989898";
      tooltipMessage = (
        <FormattedMessage
          id="connection.tooltip.inactive"
          values={{ name: person.firstName }}
        />
      );
    } else if (person.status === "HIDDEN") {
      badgeIcon = <EyeInvisibleOutlined />;
      badgeColor = "#000";
      tooltipMessage = (
        <FormattedMessage
          id="connection.tooltip.hidden"
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
            <Text className="res-avatar-text">{person.nameInitials}</Text>
          </Avatar>
        </Badge>
      </Tooltip>
    );
  };

  /**
   * Get subtitle for user card
   * @param {Object} person - The person being rendered on card.
   */
  const getUserSubtitle = ({ person }) => {
    let subtitle = "-";

    if (person.jobTitle) {
      subtitle = person.jobTitle;
    }

    if (person.groupLevel) {
      subtitle = `${subtitle} (${person.groupLevel.name})`;
    }

    return subtitle;
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
          tabIndex={0}
          type="link"
          block
          style={ribbonStyle}
          icon={
            isConnection ? (
              <UserDeleteOutlined className="res-button-icon" />
            ) : (
                <UserAddOutlined className="res-button-icon" />
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
          className="res-button"
        >
          {isConnection ? (
            <FormattedMessage id="remove.connection" />
          ) : (
              <FormattedMessage id="add.connection" />
            )}
        </Button>
      );
    }
    return (
      <Button
        tabIndex={0}
        type="link"
        block
        style={ribbonStyle}
        icon={<EditOutlined className="res-button-icon" />}
        onClick={(e) => {
          e.stopPropagation();
          history.push("/profile/edit/primary-info");
        }}
        className="res-button"
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
        <BranchesOutlined className="res-card-footer-icon" />
        {person.branch ? (
          <Text>{person.branch}</Text>
        ) : (
            <Text>
              <FormattedMessage id="unknown.branch" />
            </Text>
          )}
      </div>,
      <div>
        <EnvironmentOutlined className="res-card-footer-icon" />
        {person.branch ? (
          <Text>
            {person.officeLocation.streetNumber}{" "}
            {person.officeLocation.streetName}, {person.officeLocation.city}
          </Text>
        ) : (
            <Text>
              <FormattedMessage id="unknown.location" />
            </Text>
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

    const cardTitle = (
      <Text>
        {person.firstName} {person.lastName}
      </Text>
    );

    return (
      <Col span={24} xxl={12} key={key}>
        <Badge.Ribbon
          style={{ padding: 0 }}
          text={getActionRibbonBtn({ person })}
          color={isConnection ? "#192E2F" : "#1D807B"}
        >
          <Card
            tabIndex={0}
            className="res-card"
            hoverable
            bordered
            onClick={() => history.push(`/profile/${person.id}`)}
            onKeyPress={(e) => handleKeyPress(e, person)}
            actions={getCardFooter({ person })}
            bodyStyle={{ padding: "23px", flex: 1, flexBasis: "auto" }}
          >
            <Row>
              <Col span={24}>
                <Row style={{ paddingTop: "15px" }}>
                  <Meta
                    className="res-meta"
                    avatar={getUserAvatar({ person })}
                    title={cardTitle}
                    description={
                      <p className="res-small-p">
                        {getUserSubtitle({ person })}
                      </p>
                    }
                  />
                </Row>
              </Col>

              <Col span={24} style={{ marginTop: "12px" }}>
                {person.resultSkills.length > 0 ? (
                  <span>
                    {person.resultSkills.map(({ id, name }) => (
                      <Tag className="res-tag" key={id}>
                        {name}
                      </Tag>
                    ))}
                    <Tag className="res-tag">
                      +{person.totalResultSkills - 4}
                    </Tag>
                  </span>
                ) : (
                    <Tag className="res-tag">
                      <FormattedMessage id="no.matching.skills.found" />
                    </Tag>
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
        <Text type="secondary" className="res-result-count">
          <FormattedMessage id="search.results.found" />: {count}
        </Text>
      );
    }
    return <Spin className="res-loading-spinner" />;
  };

  /**
   * Render Result Cards
   * @param {Object} dataSource - The list of user results.
   */
  const renderResultCards = (dataSource) => {
    if (!loading && dataSource.length === 0) {
      return (
        <Empty description={<FormattedMessage id="no.results.found" />} />
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
          <>
            <SearchOutlined />
            <FormattedMessage id="results.title" />
          </>
        }
        subtitle={getResultCount({ isLoading: loading, count: results.length })}
      />
      <div className="res-container">
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
