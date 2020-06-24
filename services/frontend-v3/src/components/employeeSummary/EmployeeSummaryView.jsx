import React from "react";
import { List } from "antd";
import PropTypes from "prop-types";

const EmployeeSummaryView = ({ values }) => {
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={values}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </div>
  );
};

EmployeeSummaryView.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object),
};

EmployeeSummaryView.defaultProps = {
  values: null,
};

export default EmployeeSummaryView;
