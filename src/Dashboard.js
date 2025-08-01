// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faExpandArrowsAlt, faGlobe, faShoppingCart,
  faClipboardList, faArrowRight, faArrowLeft, faCog,
  faUser
} from '@fortawesome/free-solid-svg-icons';
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
  const [summary, setSummary] = useState({ sales: 0, purchases: 0, salesReturn: 0, purchaseReturn: 0 });
  const [weekly, setWeekly] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [paymentSalesData, setPaymentSalesData] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesRes = await axios.get('http://localhost:5001/Sales');
        const purchasesRes = await axios.get('http://localhost:5001/Purchases');

        setSummary({
          sales: salesRes.data.reduce((sum, sale) => sum + (sale.total || 0), 0),
          purchases: purchasesRes.data.reduce((sum, purchase) => sum + (purchase.total || 0), 0),
          salesReturn: 0,
          purchaseReturn: 0
        });

        setWeekly(salesRes.data.slice(-7).map(sale => ({
          date: new Date(sale.date).toLocaleDateString(),
          sales: sale.total || 0,
          purchases: purchasesRes.data.find(p => new Date(p.date).toLocaleDateString() === new Date(sale.date).toLocaleDateString())?.total || 0
        })));

        // SAFER aggregation for Top Products (with debug log)
        const productAggregation = {};
        salesRes.data.forEach(sale => {
          if (Array.isArray(sale.products)) {
            sale.products.forEach(product => {
              if (product && product.name) {
                if (!productAggregation[product.name]) productAggregation[product.name] = 0;
                productAggregation[product.name] += product.quantity || 0;
              }
            });
          }
        });

        // DEBUG LOG if empty!
        if (Object.keys(productAggregation).length === 0) {
          console.warn('No product sales found in Sales data:', salesRes.data);
        }

        const topProductsArr = Object.entries(productAggregation)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5);

        setTopProducts(topProductsArr);

        setPaymentSalesData(salesRes.data.slice(-7).map(sale => ({
          date: new Date(sale.date).toLocaleDateString(),
          sale: sale.total || 0,
          purchase: purchasesRes.data.find(p => new Date(p.date).toLocaleDateString() === new Date(sale.date).toLocaleDateString())?.total || 0
        })));

        setTopCustomers(salesRes.data.reduce((acc, sale) => {
          if (sale.customer) {
            const existing = acc.find(c => c.name === sale.customer);
            if (existing) existing.total += sale.total;
            else acc.push({ name: sale.customer, total: sale.total });
          }
          return acc;
        }, []).sort((a, b) => b.total - a.total).slice(0, 5));

      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    fetchData();
  }, []);

  const barChartData = {
    labels: weekly.map(w => w.date),
    datasets: [
      { label: 'Sales', data: weekly.map(w => w.sales), backgroundColor: 'rgba(124, 58, 237, 0.7)' },
      { label: 'Purchases', data: weekly.map(w => w.purchases), backgroundColor: 'rgba(196, 181, 253, 0.7)' }
    ]
  };

  const pieChartData = {
    labels: topProducts.map(p => p.name),
    datasets: [{
      data: topProducts.map(p => p.value),
      backgroundColor: [
        'rgba(124, 58, 237, 1)', 'rgba(124, 58, 237, 0.7)',
        'rgba(124, 58, 237, 0.5)', 'rgba(196, 181, 253, 0.7)',
        'rgba(196, 181, 253, 0.5)'
      ],
      borderWidth: 0
    }]
  };

  const lineChartData = {
    labels: paymentSalesData.map(item => item.date),
    datasets: [
      { label: 'Sale', data: paymentSalesData.map(item => item.sale), borderColor: 'rgba(124, 58, 237, 1)', backgroundColor: 'rgba(124, 58, 237, 0.1)', tension: 0.4 },
      { label: 'Purchase', data: paymentSalesData.map(item => item.purchase), borderColor: 'rgba(196, 181, 253, 1)', backgroundColor: 'rgba(196, 181, 253, 0.1)', tension: 0.4 }
    ]
  };

  const customerPieData = {
    labels: topCustomers.map(c => c.name),
    datasets: [{
      data: topCustomers.map(c => c.total),
      backgroundColor: [
        'rgba(124, 58, 237, 1)', 'rgba(124, 58, 237, 0.7)',
        'rgba(124, 58, 237, 0.5)', 'rgba(196, 181, 253, 0.7)',
        'rgba(196, 181, 253, 0.5)'
      ],
      borderWidth: 0
    }]
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
          <Link to="/pp">
            <FontAwesomeIcon icon={faUser} className="icon" />
          </Link>
          <div className="brand-name">STOCKY</div>
        </div>
      </header>

      <div className="dashboard-body">
        <Sidebar />

        <main className="main-content">
          <div className="filters">
            <select><option>Filter by warehouse</option></select>
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
              {topProducts.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#999', margin: '2rem 0' }}>
                  No sales data available for Top Products.
                </div>
              ) : (
                <Pie data={pieChartData} options={{ responsive: true, plugins: { legend: { position: 'right' } } }} />
              )}
            </div>
          </div>

          <div className="middle-section">
            {/* Stock Alert and Top Products tables */}
          </div>

          <div className="bottom-section-charts">
            <div className="chart-container">
              <h4>Payment Sale & Purchase</h4>
              <Line data={lineChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } }} />
            </div>
            <div className="chart-container pie-chart">
              <h4>Top 5 Customers Brand</h4>
              <Pie data={customerPieData} options={{ responsive: true, plugins: { legend: { position: 'right' } } }} />
            </div>
          </div>

          <div className="recent-sales-container">
            <h4>Recent Sales</h4>
            {/* Recent Sales table */}
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
