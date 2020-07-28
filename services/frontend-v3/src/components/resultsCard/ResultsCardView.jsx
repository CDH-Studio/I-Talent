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
} from "@ant-design/icons";
import {
  HistoryPropType,
  ProfileInfoPropType,
} from "../../utils/customPropTypes";
import prepareInfo from "../../functions/prepareInfo";

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
  const styles = {
    smallP: {
      margin: 0,
      marginTop: -10,
    },
    badge: {
      backgroundColor: "#565656",
      borderRadius: 20,
      padding: 5,
    },
    badgeIcon: {
      color: "#F5F5F5",
    },
    divider: {
      height: "auto",
      marginRight: 20,
      marginTop: 4,
    },
    tag: {
      marginBottom: "2px",
      marginTop: "2px",
    },
    meta: {
      margin: 0,
      marginRight: 20,
    },
    avatarText: {
      fontSize: "25px",
      color: "white",
    },
    card: {
      height: "100%",
      overflowX: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    cardBody: {
      flex: 1,
    },
    container: {
      maxWidth: 1600,
    },
    buttonIcon: {
      fontSize: 16,
      marginRight: 5,
    },
    button: {
      margin: "-10px 0",
    },
  };

  /*
   * Handle Key Press
   *
   * handle how to process when enter key is hit when focusing on a results card
   */
  const handleKeyPress = (e, person) => {
    if (e.charCode === 32 || e.charCode === 13) {
      e.preventDefault();
      history.push(`/secured/profile/${person.id}`);
    }
  };
  const renderAvatar = (person) => {
    return (
      <Tooltip
        align={{ offset: [18, -3] }}
        title={
          person.isConnection ? (
            <FormattedMessage
              id="search.results.cards.connection.tooltip"
              values={{ name: person.firstName }}
            />
          ) : undefined
        }
      >
        <Badge
          count={
            person.isConnection ? (
              <TeamOutlined style={styles.badgeIcon} />
            ) : undefined
          }
          offset={[-6, 6]}
          style={styles.badge}
        >
          <Avatar
            size={48}
            style={{
              backgroundColor: person.avatarColor,
            }}
          >
            <Text style={styles.avatarText}>{person.nameInitials}</Text>
          </Avatar>
        </Badge>
      </Tooltip>
    );
  };

  const renderCard = (person, key) => {
    const actions = [];
    const isConnection = connections.includes(person.id);

    if (person.id !== userId) {
      actions.push(
        <Button
          tabIndex="0"
          type="link"
          block
          icon={
            isConnection ? (
              <UserDeleteOutlined style={styles.buttonIcon} />
            ) : (
              <UserAddOutlined style={styles.buttonIcon} />
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
          style={styles.button}
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
          icon={<EditOutlined style={styles.buttonIcon} />}
          onClick={(e) => {
            e.stopPropagation();
            history.push("/secured/profile/edit/primary-info");
          }}
          style={styles.button}
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
        <Card
          tabIndex="0"
          style={styles.card}
          size="small"
          hoverable
          bordered
          onClick={() => history.push(`/secured/profile/${person.id}`)}
          onKeyPress={(e) => handleKeyPress(e, person)}
          title={cardTitle}
          extra={cardExtra}
          actions={actions}
          bodyStyle={styles.cardBody}
        >
          <Row>
            <Col>
              <Row style={{ paddingTop: 4 }}>
                <Meta
                  style={styles.meta}
                  avatar={renderAvatar(person)}
                  title={`${person.firstName} ${person.lastName}`}
                  description={
                    <p style={styles.smallP}>
                      {person.jobTitle ? person.jobTitle : "-"}
                    </p>
                  }
                />
              </Row>
            </Col>

            {hasSkills && <Divider type="vertical" style={styles.divider} />}

            <Col flex="1">
              {hasSkills && (
                <Row align="middle" type="flex">
                  {person.resultSkills.map(({ id, name }) => (
                    <Col key={id}>
                      <Tag style={styles.tag}>{name}</Tag>
                    </Col>
                  ))}
                </Row>
              )}
            </Col>
          </Row>
        </Card>
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

    return preparedResults.map((person, key) => renderCard(person, key));
  };

  return (
    <div style={styles.container}>
      {loading && (
        <Card>
          <Skeleton />
        </Card>
      )}
      <Row
        gutter={[8, 8]}
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
