import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFilter, faChartLine, faExclamationTriangle, faInfoCircle, 
  faExclamationCircle, faDollarSign, faFileInvoiceDollar, 
  faSyncAlt, faArrowDown 
} from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './AdminPage.css';
import Sidebar from './SideBar';

const AdminPage = () => {
  // Sample data for the charts
  const salesLast30DaysData = [
    { date: '1 Jan 2025', sales: 10 },
    { date: '2 Jan 2025', sales: 15 },
    { date: '3 Jan 2025', sales: 12 },
    { date: '4 Jan 2025', sales: 18 },
    { date: '5 Jan 2025', sales: 20 },
    { date: '6 Jan 2025', sales: 22 },
    { date: '7 Jan 2025', sales: 25 },
    { date: '8 Jan 2025', sales: 28 },
    { date: '9 Jan 2025', sales: 30 },
    { date: '10 Jan 2025', sales: 35 },
    { date: '11 Jan 2025', sales: 32 },
    { date: '12 Jan 2025', sales: 38 },
    { date: '13 Jan 2025', sales: 40 },
    { date: '14 Jan 2025', sales: 42 },
    { date: '15 Jan 2025', sales: 45 },
    { date: '16 Jan 2025', sales: 48 },
    { date: '17 Jan 2025', sales: 50 },
    { date: '18 Jan 2025', sales: 55 },
    { date: '19 Jan 2025', sales: 52 },
    { date: '20 Jan 2025', sales: 58 },
    { date: '21 Jan 2025', sales: 60 },
    { date: '22 Jan 2025', sales: 62 },
    { date: '23 Jan 2025', sales: 65 },
    { date: '24 Jan 2025', sales: 68 },
    { date: '25 Jan 2025', sales: 70 },
    { date: '26 Jan 2025', sales: 75 },
    { date: '27 Jan 2025', sales: 80 },
    { date: '28 Jan 2025', sales: 85 },
    { date: '29 Jan 2025', sales: 90 },
    { date: '30 Jan 2025', sales: 180 }
  ];

  const salesCurrentYearData = [
    { month: 'Jan 2025', sales: 50000 },
    { month: 'Feb 2025', sales: 60000 },
    { month: 'Mar 2025', sales: 75000 },
    { month: 'Apr 2025', sales: 90000 },
    { month: 'May 2025', sales: 120000 },
    { month: 'Jun 2025', sales: 200000 },
    { month: 'Jul 2025', sales: 150000 },
    { month: 'Aug 2025', sales: 100000 },
    { month: 'Sep 2025', sales: 80000 },
    { month: 'Oct 2025', sales: 70000 },
    { month: 'Nov 2025', sales: 60000 },
    { month: 'Dec 2025', sales: 50000 }
  ];

  const stockAlertData = [
    { product: 'Dairy of a Wimpy Kid (B000001)', location: 'Awesome Shop', stock: '5.00 PCS' },
    { product: 'I Robot by Issac Asimov(B000008)', location: 'Awesome Shop', stock: '10.00 PCS' },
    { product: 'Apple iPhone 15 - 256GB (B000711)', location: 'Awesome Shop', stock: '15.00 PCS' },
    { product: 'Apple MacBook Air - 256GB (B000871)', location: 'Awesome Shop', stock: '10.00 PCS' },
    { product: 'Apple MacBook Air - 512GB (B000872)', location: 'Awesome Shop', stock: '12.00 PCS' },
    { product: 'Apple iPhone 8 - 64GB (B000875)', location: 'Awesome Shop', stock: '15.00 PCS' },
    { product: 'Your Business (B000913)', location: 'Awesome Shop', stock: '20.00 PCS' },
    { product: 'Acer Aspire 5 15" - Black (B000917)', location: 'Awesome Shop', stock: '25.00 PCS' },
    { product: 'Apple iPhone 7 - 128G - Black (B000973)', location: 'Awesome Shop', stock: '15.00 PCS' },
    { product: 'Logitech Craft Keyboard (B000978)', location: 'Awesome Shop', stock: '30.00 PCS' }
  ];

  const metricCards = [
    { 
      title: 'Revenue', 
      value: '$ 18,167,432.48', 
      icon: faDollarSign, 
      bgColor: 'bg-green-100', 
      textColor: 'text-green-500' 
    },
    { 
      title: 'Purchase', 
      value: '$ 10,754,681.94', 
      icon: faFileInvoiceDollar, 
      bgColor: 'bg-blue-100', 
      textColor: 'text-blue-500' 
    },
    { 
      title: 'Due', 
      value: '$ 1,609.89', 
      icon: faExclamationCircle, 
      bgColor: 'bg-red-100', 
      textColor: 'text-red-500' 
    },
    { 
      title: 'Customers', 
      value: '6.00', 
      icon: faInfoCircle, 
      bgColor: 'bg-yellow-100', 
      textColor: 'text-yellow-500' 
    },
    { 
      title: 'Sales', 
      value: '$ 75,351,984.00', 
      icon: faDollarSign, 
      bgColor: 'bg-green-100', 
      textColor: 'text-green-500' 
    },
    { 
      title: 'Return', 
      value: '$ 75,265,694.00', 
      icon: faArrowDown, 
      bgColor: 'bg-purple-100', 
      textColor: 'text-purple-500' 
    },
    { 
      title: 'Out of Stock Items', 
      value: '0.00', 
      icon: faExclamationTriangle, 
      bgColor: 'bg-orange-100', 
      textColor: 'text-orange-500' 
    },
    { 
      title: 'Suppliers', 
      value: '0.00', 
      icon: faSyncAlt, 
      bgColor: 'bg-indigo-100', 
      textColor: 'text-indigo-500' 
    }
  ];

  return (
    <>
    <Sidebar/>
    <div className="admin-header">
        <div className="admin-header-title">
          Welcome Admin, <span>👋</span>
        </div>
        <button className="filter-button">
          <FontAwesomeIcon icon={faFilter} />
          <span>Filter by date</span>
        </button>
      </div>
    <div className="admin-container">
      {/* Header */}
    

      {/* Metric Cards */}
      <div className="metrics-container">
        {metricCards.map((card, index) => (
          <div key={index} className="metric-card">
            <div className={`metric-icon ${card.bgColor} ${card.textColor}`}>
              <FontAwesomeIcon icon={card.icon} />
            </div>
            <div className="metric-info">
              <span className="metric-title">{card.title}</span>
              <span className="metric-value">{card.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Sales Last 30 Days Chart */}
        <section className="chart-section">
          <div className="section-title">
            <FontAwesomeIcon icon={faChartLine} className="section-icon-blue" />
            <span>Sales Last 30 Days</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={salesLast30DaysData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" name="Awesome Shop" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Sales Current Financial Year Chart */}
        <section className="chart-section">
          <div className="section-title">
            <FontAwesomeIcon icon={faChartLine} className="section-icon-blue" />
            <span>Sales Current Financial Year</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={salesCurrentYearData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" name="Awesome Shop" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Payment Due Sections */}
        <div className="grid-section">
          {/* Sales Payment Due */}
          <section className="chart-section">
            <div className="section-title">
              <FontAwesomeIcon icon={faExclamationTriangle} className="section-icon-yellow" />
              <span>Sales Payment Due</span>
              <FontAwesomeIcon icon={faInfoCircle} className="section-icon-info" />
            </div>
            <div className="table-actions">
              <button className="table-button">Export CSV</button>
              <button className="table-button">Export Excel</button>
              <button className="table-button">Print</button>
              <button className="table-button">Column visibility</button>
              <button className="table-button">Export PDF</button>
            </div>
            <div className="location-select">
              <select className="select-field">
                <option>Select location</option>
              </select>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Invoice No.</th>
                    <th>Due Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="4" className="no-data">No data available in table</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <button className="pagination-button" disabled>Previous</button>
              <button className="pagination-button" disabled>Next</button>
            </div>
          </section>

          {/* Purchase Payment Due */}
          <section className="chart-section">
            <div className="section-title">
              <FontAwesomeIcon icon={faExclamationTriangle} className="section-icon-yellow" />
              <span>Purchase Payment Due</span>
              <FontAwesomeIcon icon={faInfoCircle} className="section-icon-info" />
            </div>
            <div className="table-actions">
              <button className="table-button">Export CSV</button>
              <button className="table-button">Export Excel</button>
              <button className="table-button">Print</button>
              <button className="table-button">Column visibility</button>
              <button className="table-button">Export PDF</button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Supplier</th>
                    <th>Reference No</th>
                    <th>Due Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="4" className="no-data">No data available in table</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <button className="pagination-button" disabled>Previous</button>
              <button className="pagination-button" disabled>Next</button>
            </div>
          </section>
        </div>

        {/* Product Stock Alert */}
        <section className="chart-section">
          <div className="section-title">
            <FontAwesomeIcon icon={faExclamationCircle} className="section-icon-yellow" />
            <span>Product Stock Alert</span>
            <FontAwesomeIcon icon={faInfoCircle} className="section-icon-info" />
          </div>
          <div className="table-actions">
            <button className="table-button">Export CSV</button>
            <button className="table-button">Export Excel</button>
            <button className="table-button">Print</button>
            <button className="table-button">Column visibility</button>
            <button className="table-button">Export PDF</button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Location</th>
                  <th>Current stock</th>
                </tr>
              </thead>
              <tbody>
                {stockAlertData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product}</td>
                    <td>{item.location}</td>
                    <td>{item.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default AdminPage;