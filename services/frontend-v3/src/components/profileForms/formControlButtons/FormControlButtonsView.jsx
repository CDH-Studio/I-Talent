import React from "react";
import { Row, Col, Button } from "antd";
import {
  CheckOutlined,
  ClearOutlined,
  RightOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

import "./FormControlButtonsView.scss";

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
        <CheckOutlined />
        <span>
          <FormattedMessage id="setup.save.and.finish" />
        </span>
      </>
    ) : (
      <>
        <SaveOutlined />
        <span>
          <FormattedMessage id="setup.save" />
        </span>
      </>
    );

  const lastButtonOnClick = () => {
    if (create) {
      onSaveAndNext();
    } else if (fieldsChanged) {
      onSaveAndFinish();
    } else {
      onFinish();
    }
  };

  const lastButtonContent = () =>
    create ? (
      <>
        <span>
          <FormattedMessage id="setup.save.and.next" />
        </span>
        <RightOutlined />
      </>
    ) : (
      <>
        <CheckOutlined />
        <span>
          {fieldsChanged ? (
            <FormattedMessage id="setup.save.and.finish" />
          ) : (
            <FormattedMessage id="button.finish" />
          )}
        </span>
      </>
    );

  return (
    <Row gutter={24} className="container">
      <Col xs={24} md={24} lg={18} xl={18}>
        {(edit || onSaveAndNext) && (
          <Button
            className="finishAndSaveBtn"
            onClick={create ? onSaveAndFinish : onSave}
            htmlType="button"
            disabled={edit && !fieldsChanged}
          >
            {firstButtonContent()}
          </Button>
        )}
        <Button
          className="clearBtn"
          htmlType="button"
          onClick={onReset}
          danger
          disabled={!fieldsChanged}
        >
          <ClearOutlined />
          <span>
            <FormattedMessage id="button.clear" />
          </span>
        </Button>
      </Col>
      <Col xs={24} md={24} lg={6} xl={6}>
        <Button className="saveBtn" type="primary" onClick={lastButtonOnClick}>
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
