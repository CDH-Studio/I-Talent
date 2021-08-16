import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Button } from "antd";
import PropTypes from "prop-types";

const AlertDialog = ({
  title,
  body,
  isOpen,
  onOk,
  onCancel,
  okText,
  cancelText,
}) => (
  <div>
    <Dialog
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      open={isOpen}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelText}</Button>
        <Button autoFocus onClick={onOk} type="primary">
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

AlertDialog.propTypes = {
  body: PropTypes.element.isRequired,
  cancelText: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  okText: PropTypes.element.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  title: PropTypes.element.isRequired,
};

export default AlertDialog;
