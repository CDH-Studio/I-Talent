import { Row, Col } from "antd";
import Substantive from "./substantive/Substantive";
import Acting from "./acting/Acting";
import { ProfileInfoPropType } from "../../utils/customPropTypes";

const EmployeeSummaryView = ({ data }) => (
    <div>
      <Row>
        <Col span={data.actingLevel ? 12 : 24}>
          <Substantive data={data} />
        </Col>
        {data.actingLevel && (
          <Col span={12}>
            <Acting data={data} />
          </Col>
        )}
      </Row>
    </div>
  );

EmployeeSummaryView.propTypes = {
  data: ProfileInfoPropType,
};

EmployeeSummaryView.defaultProps = {
  data: null,
};

export default EmployeeSummaryView;
