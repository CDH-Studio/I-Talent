import { Row, Col, Button } from "antd";
import {
  CheckOutlined,
  ClearOutlined,
  RightOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

import "./FormControlButtonsView.less";

const FormControlButtonsView = ({
  edit,
  create,
  onSave,
  onSaveAndNext,
  onSaveAndFinish,
  onReset,
  onFinish,
  fieldsChanged,
}) => {
  const firstButtonContent = () =>
    create ? (
      <>
        <CheckOutlined aria-hidden="true" className="mr-2" />
        <FormattedMessage id="save.and.finish" />
      </>
    ) : (
      <>
        <SaveOutlined aria-hidden="true" className="mr-2" />
        <FormattedMessage id="save" />
      </>
    );

  const lastButtonOnClick = () => {
    if (create) {
      if (onSaveAndNext) {
        onSaveAndNext();
      } else {
        onSaveAndFinish();
      }
    } else if (fieldsChanged) {
      onSaveAndFinish();
    } else {
      onFinish();
    }
  };

  const lastButtonContent = () =>
    create ? (
      <>
        {onSaveAndNext ? (
          <FormattedMessage id="save.and.next" />
        ) : (
          <FormattedMessage id="save.and.finish" />
        )}
        <RightOutlined aria-hidden="true" className="ml-2" />
      </>
    ) : (
      <>
        <CheckOutlined aria-hidden="true" className="mr-2" />
        {fieldsChanged ? (
          <FormattedMessage id="save.and.finish" />
        ) : (
          <FormattedMessage id="button.finish" />
        )}
      </>
    );

  return (
    <Row gutter={[24, 14]} className="fcb-container">
      <Col xs={24} md={24} lg={18} xl={18}>
        {(edit || onSaveAndNext) && (
          <Button
            className="fcb-finishAndSaveBtn"
            onClick={create ? onSaveAndFinish : onSave}
            htmlType="submit"
            disabled={edit && !fieldsChanged}
          >
            {firstButtonContent()}
          </Button>
        )}
        <Button
          className="fcb-finishAndSaveBtn"
          htmlType="button"
          onClick={onReset}
          danger
          disabled={!fieldsChanged}
        >
          <ClearOutlined aria-hidden="true" className="mr-2" />
          <FormattedMessage id="clear.changes" />
        </Button>
      </Col>
      <Col xs={24} md={24} lg={6} xl={6}>
        <Button
          className="fcb-saveBtn"
          htmlType="submit"
          onClick={lastButtonOnClick}
        >
          {lastButtonContent()}
        </Button>
      </Col>
    </Row>
  );
};

FormControlButtonsView.propTypes = {
  edit: PropTypes.bool.isRequired,
  create: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onSaveAndNext: PropTypes.func,
  onSaveAndFinish: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  fieldsChanged: PropTypes.bool.isRequired,
};

FormControlButtonsView.defaultProps = {
  onSaveAndNext: undefined,
};

export default FormControlButtonsView;
