import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faBoxes,
  faExchangeAlt,
  faFileInvoice,
  faClipboardList,
  faShoppingCart,
  faUndo,
  faReply,
  faUniversity,
  faArrowRight,
  faSync,
  faBook,
  faArrowLeft,
  faUsers,
  faTasks,
  faCog,
  faChartLine,
  faFolderOpen
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
  // To handle dropdown for settings
  const [settingsDropdown, setSettingsDropdown] = useState(false);

  return (
    <nav className="sidebar">
      <div className="sidebar-item">
        <Link to="/dashboard">
          <FontAwesomeIcon className="nooi" icon={faChartBar} />
          <span className="sidetext">Dashboard</span>
        </Link>
        <div className="dropdown">
          <Link to="/dashboard/overview">Overview</Link>
          <Link to="/Adjustments">Adjustments</Link>
        </div>
      </div>

      <div className="sidebar-item">
        <Link to="/AP">
          <FontAwesomeIcon className="nooi" icon={faBoxes} />
          <span className="sidetext">Products</span>
        </Link>
        <div className="dropdown">
          <Link to="/AP">All Products</Link>
          <Link to="/CP">Creat Product</Link>
          <Link to="/PL">Print Label</Link>
          <Link to="/PD"> Product Details</Link>
          <Link to="/CS"> Count Stock</Link>
          <Link to="/UP"> Update Product </Link>
          <Link to="/Category">Category </Link>
          <Link to="/Brand">Brands </Link>
          <Link to="/Units">Units </Link>
        </div>
      </div>

      <div className="sidebar-item">
        <Link to="/CA">
          <FontAwesomeIcon className="nooi" icon={faExchangeAlt} />
          <span className="sidetext">Adjustment</span>
        </Link>
        <div className="dropdown">
          <Link to="/CA">Create Adjustments </Link>
          <Link to="/AA">All Adjustments</Link>
          <Link to="/Header">Header</Link>
        </div>
      </div>

      <div className="sidebar-item">
        <Link to="/AQ">
          <FontAwesomeIcon className="nooi" icon={faFileInvoice} />
          <span className="sidetext">Quotations</span>
        </Link>
        <div className="dropdown">
          <Link to="/CQ">Create Quotation</Link>
          <Link to="/AQ">All Quotations</Link>
        </div>
      </div>

      <div className="sidebar-item">
        <Link to="/APP">
          <FontAwesomeIcon className="nooi" icon={faClipboardList} />
          <span className="sidetext">Purchases</span>
        </Link>
        <div className="dropdown">
          <Link to="/CPP">Create Purchase</Link>
          <Link to="/APP">All Purchases</Link>
        </div>
      </div>

      <div className="sidebar-item">
        <Link to="/CR">
          <FontAwesomeIcon className="nooi" icon={faShoppingCart} />
          <span className="sidetext">Sales</span>
        </Link>
        <div className="dropdown">
          <Link to="/CR">Create Sale</Link>
          <Link to="/AS">All Sales</Link>
          <Link to="/POS">POS</Link>
          <Link to="/Ship">All Shipments</Link>
        </div>
      </div>

      <div className="sidebar-item">
        <Link to="/SR">
          <FontAwesomeIcon className="nooi" icon={faArrowRight} />
          <span className="sidetext">Sales Return</span>
        </Link>
      </div>

      <div className="sidebar-item">
        <Link to="/PR">
          <FontAwesomeIcon className="nooi" icon={faArrowLeft} />
          <span className="sidetext">Purchase Return</span>
        </Link>
      </div>

      <div className="sidebar-item">
        <Link to="/Ship">
          <FontAwesomeIcon className="nooi" icon={faUniversity} />
          <span className="sidetext">HRM</span>
        </Link>
        <div className="dropdown">
          <Link to="/Company">Company</Link>
          <Link to="/Department">Department</Link>
          <Link to="/Desig">Designation</Link>
          <Link to="/Ship">Office Shift</Link>
          <Link to="/Employ">Employes</Link>
          <Link to="/Ship">Attendece</Link>
          <Link to="/Ship">Holidays</Link>
          <Link to="/Payroll">Payroll</Link>
        </div>
      </div>

      <div className="sidebar-item">
        <Link to="/CT">
          <FontAwesomeIcon className="nooi" icon={faSync} />
          <span className="sidetext">Transfer</span>
        </Link>
        <div className="dropdown">
          <Link to="/CT">Create Transfer</Link>
          <Link to="/AT">All Transfer</Link>
        </div>
      </div>

      <div className="sidebar-item">
        <Link to="/LA">
          <FontAwesomeIcon className="nooi" icon={faBook} />
          <span className="sidetext">Accounting</span>
        </Link>
        <div className="dropdown">
          <Link to="/LA">List Accounts</Link>
          <Link to="/TM"> Transfer Money</Link>
          <Link to="/CE">  Create Expense </Link>
          <Link to="/AE">  All Expense </Link>
          <Link to="/CD">  Create Deposit </Link>
          <Link to="/LD">  List Deposit </Link>
          <Link to="/DC">   Deposit Category</Link>
        </div>
      </div>

      <div className="sidebar-item">
        <Link to="/SP">
          <FontAwesomeIcon className="nooi" icon={faUsers} />
          <span className="sidetext">Subscription Product</span>
        </Link>
      </div>

      <div className="sidebar-item">
        <Link to="/people">
          <FontAwesomeIcon className="nooi" icon={faUsers} />
          <span className="sidetext">People</span>
        </Link>
        <div className="dropdown">
          <Link to="/CM">Customers</Link>
          <Link to="/CM"> Suppliers</Link>
          <Link to="/PU">  Users  </Link>
        </div>
      </div>

      <div className="sidebar-item">
        <Link to="/ProjectList">
          <FontAwesomeIcon className="nooi" icon={faFolderOpen} />
          <span className="sidetext">Projects</span>
        </Link>
         <div className="dropdown">
          <Link to="/ProjectList">Project List</Link>
         
        </div>
      </div>

      <div className="sidebar-item">
        <Link to="/TL">
          <FontAwesomeIcon className="nooi" icon={faTasks} />
          <span className="sidetext">Tasks</span>
        </Link>

      </div>

      {/* Settings Dropdown */}
      <div
        className="sidebar-item"
        onMouseEnter={() => setSettingsDropdown(true)}
        onMouseLeave={() => setSettingsDropdown(false)}
        style={{ position: "relative" }}
      >
        <Link to="/settings">
          <FontAwesomeIcon className="nooi" icon={faCog} />
          <span className="sidetext">Settings</span>
        </Link>
        <div className={`dropdown settings-dropdown${settingsDropdown ? " show" : ""}`}>
          <Link to="/SS">System Settings</Link>
          <Link to="/settings/dynamic_appearance">Dynamic Appearance</Link>
          <Link to="/settings/languages">Languages</Link>
          <Link to="/settings/payment_methods">Payment Methods</Link>
          <Link to="/settings/sms_settings">Sms Settings</Link>
          <Link to="/settings/sms_templates">SMS Templates</Link>
          <Link to="/settings/mail_settings">Mail Settings</Link>
          <Link to="/settings/email_templates">Email Templates</Link>
          <Link to="/settings/pos_settings">POS Settings</Link>
          <Link to="/settings/module_settings">Module Settings</Link>
          <Link to="/settings/upgrade">Upgrade</Link>
          <Link to="/settings/payment_gateway">Payment Gateway</Link>
          <Link to="/settings/group_permissions">Group Permissions</Link>
        </div>
      </div>

      <div className="sidebar-item">
        <Link to="/PP">
          <FontAwesomeIcon className="nooi" icon={faChartLine} />
          <span className="sidetext">Profile Page </span>
        </Link>
      </div>
    </nav>
  );
};

export default SideBar;
