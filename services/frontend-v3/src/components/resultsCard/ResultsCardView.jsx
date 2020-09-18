import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import {
  Row,
  Col,
  Tag,
  Card,
  Divider,
  Avatar,
  Typography,
  Empty,
  Skeleton,
  Badge,
  Tooltip,
  Button,
} from "antd";
import {
  UserAddOutlined,
  UserDeleteOutlined,
  TeamOutlined,
  EditOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import {
  HistoryPropType,
  ProfileInfoPropType,
} from "../../utils/customPropTypes";
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
  const renderAvatar = (person) => {
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
    } else {
      badgeIcon = undefined;
      badgeColor = undefined;
      tooltipMessage = undefined;
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
   * Render User Result Card
   * @param {Object} person - The person being rendered on card.
   * @param {key} integer - The type of notification.
   */
  const renderCard = ({ person, key }) => {
    const actions = [];
    const isConnection = connections.includes(person.id);

    // get action in ribbon
    if (person.id !== userId) {
      actions.push(
        <Button
          tabIndex="0"
          type="link"
          block
          style={{
            padding: "0px",
            color: "#ffffff",
            margin: "1px",
            display: "inline-block;",
          }}
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
    } else {
      actions.push(
        <Button
          tabIndex="0"
          type="link"
          block
          style={{
            color: "#ffffff",
            margin: "auto",
            width: "100%",
            display: "inline-block;",
          }}
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
    }

    const hasSkills = person.resultSkills.length > 0;

    const cardTitle = person.branch ? <Text>{person.branch}</Text> : "";
    const cardExtra =
      person.groupLevel && person.groupLevel.name ? (
        <Text>{`${person.groupLevel.name}`}</Text>
      ) : (
        ""
      );

    return (
      <Col span={24} xxl={12} key={key}>
        <Badge.Ribbon
          text={actions}
          color={isConnection ? "#192E2F" : "#1D807B"}
        >
          <Card
            tabIndex="0"
            className="card"
            hoverable
            bordered
            onClick={() => history.push(`/profile/${person.id}`)}
            onKeyPress={(e) => handleKeyPress(e, person)}
            title={cardTitle}
            extra={cardExtra}
            actions={actions}
            bodyStyle={{ padding: "25px", flex: 1, flexBasis: "auto" }}
          >
            <Row>
              <Col>
                <Row style={{ paddingTop: 4 }}>
                  <Meta
                    className="meta"
                    avatar={renderAvatar(person)}
                    title={`${person.firstName} ${person.lastName}`}
                    description={
                      <p className="small-p">
                        {person.jobTitle ? person.jobTitle : "-"}
                      </p>
                    }
                  />
                </Row>
              </Col>

              {hasSkills && <Divider type="vertical" className="divider" />}

              <Col flex="1">
                {hasSkills && (
                  <Row align="middle" type="flex">
                    {person.resultSkills.map(({ id, name }) => (
                      <Col key={id}>
                        <Tag className="tag">{name}</Tag>
                      </Col>
                    ))}
                  </Row>
                )}
              </Col>
            </Row>
          </Card>
        </Badge.Ribbon>
      </Col>
    );
  };

  const renderResultCards = (dataSource) => {
    if (!loading && dataSource.length === 0) {
      return (
        <Empty description={<FormattedMessage id="search.no.results" />} />
      );
    }

    const preparedResults = prepareInfo(dataSource, locale);

    return preparedResults.map((person, key) => renderCard({ person, key }));
  };

  return (
    <div className="container">
      {loading && (
        <Card>
          <Skeleton />
        </Card>
      )}
      <Row
        gutter={[24, 24]}
        type="flex"
        justify="left"
        align={results.length === 0 ? "center" : undefined}
      >
        {!loading && renderResultCards(results)}
      </Row>
    </div>
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
