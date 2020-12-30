import PropTypes from "prop-types";
import AdminLayoutView from "./AdminLayoutView";
import availableTypes from "./adminLayoutTypes";

/**
 *  AdminLayout(props)
 *  Controller for the Admin Layout.
 */
const AdminLayout = ({ displaySideBar, type, children }) => (
  <AdminLayoutView displaySideBar={displaySideBar} type={type}>
    {children}
  </AdminLayoutView>
);

AdminLayout.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(availableTypes).isRequired,
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
