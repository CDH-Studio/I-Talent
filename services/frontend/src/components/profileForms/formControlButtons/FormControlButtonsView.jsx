import "./FormControlButtonsView.less";

import {
  CheckOutlined,
  ClearOutlined,
  RightOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

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
    <Row className="fcb-container" gutter={[24, 14]}>
      <Col lg={18} md={24} xl={18} xs={24}>
        {(edit || onSaveAndNext) && (
          <Button
            className="fcb-finishAndSaveBtn"
            disabled={edit && !fieldsChanged}
            htmlType="submit"
            onClick={create ? onSaveAndFinish : onSave}
          >
            {firstButtonContent()}
          </Button>
        )}
        <Button
          className="fcb-finishAndSaveBtn"
          danger
          disabled={!fieldsChanged}
          htmlType="button"
          onClick={onReset}
        >
          <ClearOutlined aria-hidden="true" className="mr-2" />
          <FormattedMessage id="clear.changes" />
        </Button>
      </Col>
      <Col lg={6} md={24} xl={6} xs={24}>
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
  create: PropTypes.bool.isRequired,
  edit: PropTypes.bool.isRequired,
  fieldsChanged: PropTypes.bool.isRequired,
  onFinish: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSaveAndFinish: PropTypes.func.isRequired,
  onSaveAndNext: PropTypes.func,
};

FormControlButtonsView.defaultProps = {
  onSaveAndNext: undefined,
};

export default FormControlButtonsView;
