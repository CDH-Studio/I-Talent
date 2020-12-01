import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { Row, Col, List, Tag } from "antd";

const CareerInterestsView = ({
  interestedInRemote,
  lookingJob,
  relocationLocations,
}) => {
  const getCareerInterestsInfo = () => {
    const items = [];

    let description = "-";
    if (interestedInRemote) {
      description = <FormattedMessage id="profile.yes" />;
    } else if (interestedInRemote === false) {
      description = <FormattedMessage id="no" />;
    }

    items.push(
      {
        title: <FormattedMessage id="interested.in.remote" />,
        description,
      },
      {
        title: <FormattedMessage id="looking.for.new.job" />,
        description: (lookingJob && lookingJob.description) || "-",
      }
    );

    if (relocationLocations && relocationLocations.length > 0) {
      items.push({
        title: <FormattedMessage id="profile.willing.to.relocate.to" />,
        render: (
          <div style={{ marginTop: 7 }}>
            {relocationLocations.map(({ id, city, province }) => (
              <Tag color="#727272" key={id}>
                {city}, {province}
              </Tag>
            ))}
          </div>
        ),
      });
    }

    return items;
  };

  return (
    <Row>
      <Col span={24}>
        <List
          itemLayout="horizontal"
          dataSource={getCareerInterestsInfo()}
          renderItem={({ title, description, render }) => (
            <List.Item>
              <Col span={24}>
                <List.Item.Meta title={title} description={description} />
                {render}
              </Col>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

CareerInterestsView.propTypes = {
  interestedInRemote: PropTypes.bool,
  lookingJob: PropTypes.shape({
    description: PropTypes.string,
  }),
  relocationLocations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      city: PropTypes.string,
      province: PropTypes.string,
    })
  ),
};

CareerInterestsView.defaultProps = {
  interestedInRemote: undefined,
  lookingJob: undefined,
  relocationLocations: [],
};

export default CareerInterestsView;
