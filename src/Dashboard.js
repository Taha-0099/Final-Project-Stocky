import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faExpandArrowsAlt, faGlobe, faShoppingCart,
  faClipboardList, faArrowRight, faArrowLeft, faCog ,
  faUser,
  faEnvelope,
  faLock,
  faCamera,
  faPhone,
  faPaperPlane,
  
  

} from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend, ArcElement, PointElement, LineElement
} from 'chart.js';
import { Link } from 'react-router-dom';
import Sidebar from './SideBar';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const [summary, setSummary] = useState({ sales:0, purchases:0, salesReturn:0, purchaseReturn:0 });
  const [weekly, setWeekly] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [stockAlert, setStockAlert] = useState([]);
  const [paymentSalesData, setPaymentSalesData] = useState([]);
  const [recentSales, setRecentSales] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    // Main stats
    axios.get('http://localhost:5001/Stats')
      .then(res => {
        setSummary(res.data.summary);
        setWeekly(res.data.weekly);
        setTopProducts(res.data.topProducts);
      })
      .catch(err => console.error('Error loading stats:', err));

    // Stock alerts
    axios.get('http://localhost:5001/StockAlert')
      .then(res => setStockAlert(res.data))
      .catch(err => console.error('Error loading stock alerts:', err));

    // Payment & Sales data for line chart
    axios.get('http://localhost:5001/PaymentSales')
      .then(res => setPaymentSalesData(res.data))
      .catch(err => console.error('Error loading payment sales:', err));

    // Recent sales
    axios.get('http://localhost:5001/RecentSales')
      .then(res => setRecentSales(res.data))
      .catch(err => console.error('Error loading recent sales:', err));

    // Top customers
    axios.get('http://localhost:5001/TopCustomers')
      .then(res => setTopCustomers(res.data))
      .catch(err => console.error('Error loading top customers:', err));
  }, []);

  // Build bar chart data from weekly
  const barChartData = {
    labels: weekly.map(w => w.date),
    datasets: [
      {
        label: 'Sales',
        data: weekly.map(w => w.sales),
        backgroundColor: 'rgba(124, 58, 237, 0.7)'
      },
      {
        label: 'Purchases',
        data: weekly.map(w => w.purchases),
        backgroundColor: 'rgba(196, 181, 253, 0.7)'
      }
    ]
  };

  // Pie chart for top products
  const pieChartData = {
    labels: topProducts.length
      ? topProducts.map(p => p.name)
      : ['Macbook pro', 'sunglasses', 'earphones', 'Banana', 'Strawberry'],
    datasets: [
      {
        data: topProducts.length
          ? topProducts.map(p => p.value)
          : [28,25,18,15,14],
        backgroundColor: [
          'rgba(124, 58, 237, 1)',
          'rgba(124, 58, 237, 0.7)',
          'rgba(124, 58, 237, 0.5)',
          'rgba(196, 181, 253, 0.7)',
          'rgba(196, 181, 253, 0.5)'
        ],
        borderWidth: 0
      }
    ]
  };

  // Demo fallbacks for bottom charts
  const demoLineLabels    = ['2023-01','2023-02','2023-03','2023-04','2023-05','2023-06'];
  const demoLineSaleData  = [200,300,250,400,350,300];
  const demoLineBuyData   = [150,200,180,250,220,200];

  // Line chart for Payment Sale & Purchase
  const lineChartData = {
    labels: paymentSalesData.length
      ? paymentSalesData.map(item => item.date)
      : demoLineLabels,
    datasets: [
      {
        label: 'Sale',
        data: paymentSalesData.length
          ? paymentSalesData.map(item => item.sale)
          : demoLineSaleData,
        borderColor: 'rgba(124, 58, 237, 1)',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        tension: 0.4
      },
      {
        label: 'Purchase',
        data: paymentSalesData.length
          ? paymentSalesData.map(item => item.purchase)
          : demoLineBuyData,
        borderColor: 'rgba(196, 181, 253, 1)',
        backgroundColor: 'rgba(196, 181, 253, 0.1)',
        tension: 0.4
      }
    ]
  };

  // Demo fallback for customer pie
  const demoCustomerLabels = ['Cust. A','Cust. B','Cust. C','Cust. D','Cust. E'];
  const demoCustomerData   = [30,25,25,20,15];

  // Top customers pie chart
  const customerPieData = {
    labels: topCustomers.length
      ? topCustomers.map(c => c.name)
      : demoCustomerLabels,
    datasets: [
      {
        data: topCustomers.length
          ? topCustomers.map(c => c.amount)
          : demoCustomerData,
        backgroundColor: [
          'rgba(124, 58, 237, 1)',
          'rgba(124, 58, 237, 0.7)',
          'rgba(124, 58, 237, 0.5)',
          'rgba(196, 181, 253, 0.7)',
          'rgba(196, 181, 253, 0.5)'
        ],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="dashboard-container">
 <header className="dashboard-header">
        <div className="logo-section">
          <div className="logo">S</div>
          <FontAwesomeIcon icon={faBars} className="icon" />
        </div>
        <div className="header-icons">
          <button className="pos-btn">POS</button>
          <FontAwesomeIcon icon={faExpandArrowsAlt} className="icon" />
          <FontAwesomeIcon icon={faGlobe} className="icon" />
          {/* link on profile icon to PP page */}
          <Link to="/pp">
            <FontAwesomeIcon icon={faUser} className="icon" />
          </Link>
          <div className="brand-name">STOCKY</div>
        </div>
      </header>

      <div className="dashboard-body">
        <Sidebar/>

        <main className="main-content">
          <div className="filters">
            <select>
              <option>Filter by warehouse</option>
            </select>
            <input type="text" readOnly value="2025-05-14 - 2025-05-14" />
          </div>

          <div className="summary-cards">
            <div className="card">
              <FontAwesomeIcon icon={faShoppingCart} className="card-icon" />
              <div><p>Sales</p><h3>$ {summary.sales.toFixed(2)}</h3></div>
            </div>
            <div className="card">
              <FontAwesomeIcon icon={faClipboardList} className="card-icon" />
              <div><p>Purchases</p><h3>$ {summary.purchases.toFixed(2)}</h3></div>
            </div>
            <div className="card">
              <FontAwesomeIcon icon={faArrowRight} className="card-icon" />
              <div><p>Sales Return</p><h3>$ {summary.salesReturn.toFixed(2)}</h3></div>
            </div>
            <div className="card">
              <FontAwesomeIcon icon={faArrowLeft} className="card-icon" />
              <div><p>Purchases Return</p><h3>$ {summary.purchaseReturn.toFixed(2)}</h3></div>
            </div>
          </div>

          <div className="top-section-charts">
            <div className="chart-container">
              <h4>This Week Sales & Purchases</h4>
              <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            </div>
            <div className="chart-container pie-chart">
              <h4>Top Selling Products (2025)</h4>
              <Pie data={pieChartData} options={{ responsive: true, plugins: { legend: { position: 'right' } } }} />
            </div>
          </div>

          <div className="middle-section">
            {/* Stock Alert and Top Products tables (unchanged) */}
          </div>

          <div className="bottom-section-charts">
            <div className="chart-container">
              <h4>Payment Sale & Purchase</h4>
              <Line data={lineChartData} options={{ 
                responsive: true, 
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true } }
              }} />
            </div>
            <div className="chart-container pie-chart">
              <h4>Top 5 Customers Brand</h4>
              <Pie data={customerPieData} options={{ responsive: true, plugins: { legend: { position: 'right' } } }} />
            </div>
          </div>

          <div className="recent-sales-container">
            <h4>Recent Sales</h4>
            {/* Recent Sales table unchanged */}
          </div>
        </main>
      </div>

      <button className="settings-button">
        <FontAwesomeIcon icon={faCog} />
      </button>
    </div>
  );
};

export default Dashboard;
