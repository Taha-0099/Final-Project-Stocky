import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faTrash,
  faMoneyBillWave,
  faBarcode,
  faSearch,
  faStore,
  faUser,
  faPrint,
  faSave,
  faTimes,
  faImage,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import SideBar from './SideBar';
import './POS.css';
import './SidebarDrawer.css';

const POS = () => {
  const [customer, setCustomer] = useState('walk-in-customer');
  const [warehouse, setWarehouse] = useState('Warehouse 1');
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError('');
    axios.get('http://localhost:5001/Products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, []);

  const handleSearch = useCallback(e => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const getTotalStock = (product) => {
    const q1 = product.openingStock1 || 0;
    const q2 = product.openingStock2 || 0;
    return q1 + q2;
  };

  const getProductPrice = (product) => {
    return Number(product.productPrice || product.price || product.sellingPrice || product.salePrice || 0);
  };

  const calculateTotal = useCallback(
    () => cartItems.reduce((sum, item) => {
      const price = getProductPrice(item);
      return sum + price * item.quantity;
    }, 0),
    [cartItems]
  );

  const calculatePayable = useCallback(() => {
    const subtotal = calculateTotal();
    const taxAmt = (subtotal * tax) / 100;
    return (subtotal + taxAmt + shipping - discount).toFixed(2);
  }, [calculateTotal, tax, discount, shipping]);

  const addToCart = useCallback(product => {
    const priceVal = getProductPrice(product);
    setCartItems(prev => {
      const exists = prev.find(i => i._id === product._id);
      if (exists) {
        return prev.map(i =>
          i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { 
        ...product, 
        quantity: 1, 
        price: priceVal,
        displayPrice: priceVal 
      }];
    });
  }, []);

  const removeFromCart = useCallback(
    id => setCartItems(prev => prev.filter(i => i._id !== id)),
    []
  );

  const updateQuantity = useCallback((id, qty) => {
    setCartItems(prev => {
      if (qty <= 0) return prev.filter(i => i._id !== id);
      return prev.map(i => (i._id === id ? { ...i, quantity: qty } : i));
    });
  }, []);

  const filteredProducts = useMemo(
    () => products.filter(p => {
      const nm = p.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const cm = p.codeProduct?.includes(searchTerm);
      const br = p.brand?.toLowerCase().includes(searchTerm.toLowerCase());
      const cat = p.category?.toLowerCase().includes(searchTerm.toLowerCase());
      return nm || cm || br || cat;
    }),
    [products, searchTerm]
  );
  
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const resetForm = () => {
    setCartItems([]);
    setTax(0);
    setDiscount(0);
    setShipping(0);
  };

  // --- Sidebar Drawer Render ---
  return (
    <div className="pos-container">
      {/* Sidebar Drawer & Overlay */}
      <div className={`sidebar-drawer-overlay ${drawerOpen ? "open" : ""}`} onClick={() => setDrawerOpen(false)}></div>
      <div className={`sidebar-drawer ${drawerOpen ? "open" : ""}`}>
        <button className="sidebar-drawer-close-btn" onClick={() => setDrawerOpen(false)} aria-label="Close sidebar">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <SideBar />
      </div>

      {/* Main POS UI */}
      <header className="pos-header">
        <button
          className="sidebar-drawer-header-btn"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open sidebar"
          style={{
            background: "none",
            border: "none",
            color: "#7c53c3",
            fontSize: "1.75rem",
            cursor: "pointer",
            marginRight: "14px"
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="pos-logo">
          <FontAwesomeIcon icon={faStore} style={{ marginRight: "5px" }} />
          POS System
        </div>
        <div className="pos-actions">
          <button className="action-btn"><FontAwesomeIcon icon={faSave} /></button>
          <button className="action-btn"><FontAwesomeIcon icon={faPrint} /></button>
        </div>
      </header>

      <div className="pos-main">
        {/* CART SECTION */}
        <section className="pos-cart-section">
          <div className="customer-info">
            <div className="info-field">
              <FontAwesomeIcon icon={faUser} />
              <input value={customer} onChange={e => setCustomer(e.target.value)} />
              <button className="clear-btn" onClick={() => setCustomer('')}>&times;</button>
            </div>
            <div className="info-field">
              <FontAwesomeIcon icon={faStore} />
              <input value={warehouse} onChange={e => setWarehouse(e.target.value)} />
              <button className="clear-btn" onClick={() => setWarehouse('')}>&times;</button>
            </div>
          </div>

          <div className="cart-table-container">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Code</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length === 0 ? (
                  <tr key="no-data">
                    <td colSpan="6" className="no-data">Cart is empty</td>
                  </tr>
                ) : cartItems.map(item => {
                    const price = getProductPrice(item);
                    const subtotal = price * item.quantity;
                    return (
                      <tr key={item._id}>
                        <td>
                          <div className="cart-product-info">
                            <strong>{item.name}</strong>
                            {item.brand && <div className="product-brand">{item.brand}</div>}
                          </div>
                        </td>
                        <td>{item.codeProduct || 'N/A'}</td>
                        <td>${price.toFixed(2)}</td>
                        <td>
                          <div className="quantity-control">
                            <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                          </div>
                        </td>
                        <td>${subtotal.toFixed(2)}</td>
                        <td>
                          <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                            <FontAwesomeIcon icon={faTrash}/>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div className="cart-total">
            <div className="total-calculation">
              <div className="calculation-row">
                <span>Subtotal:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="calculation-row">
                <span>Tax ({tax}%):</span>
                <span>${((calculateTotal() * tax) / 100).toFixed(2)}</span>
              </div>
              <div className="calculation-row">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="calculation-row">
                <span>Discount:</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="total-bar">
              <span>Total:</span>
              <span>${calculatePayable()}</span>
            </div>
            
            <div className="extra-charges">
              <div className="charge-item">
                <label>Tax %</label>
                <input 
                  type="number" 
                  value={tax} 
                  onChange={e => setTax(Number(e.target.value) || 0)}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
              <div className="charge-item">
                <label>Discount $</label>
                <input 
                  type="number" 
                  value={discount} 
                  onChange={e => setDiscount(Number(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="charge-item">
                <label>Shipping $</label>
                <input 
                  type="number" 
                  value={shipping} 
                  onChange={e => setShipping(Number(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="pos-actions-footer">
              <button className="action-btn reset" onClick={resetForm}>
                <FontAwesomeIcon icon={faTrash}/> Reset
              </button>
              <button 
                className="action-btn pay" 
                onClick={() => setShowPaymentModal(true)}
                disabled={cartItems.length === 0}
              >
                <FontAwesomeIcon icon={faMoneyBillWave}/> Pay Now
              </button>
              <button className="action-btn draft">
                <FontAwesomeIcon icon={faSave}/> Draft
              </button>
              <button className="action-btn recent">
                <FontAwesomeIcon icon={faShoppingCart}/> Recent
              </button>
            </div>
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <section className="pos-products-section">
          <div className="products-header">
            <button className="category-btn">
              <FontAwesomeIcon icon={faBarcode}/> Categories
            </button>
            <button className="brands-btn">
              <FontAwesomeIcon icon={faImage}/> Brands
            </button>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {loading ? (
            <div className="loading-message">
              Loading products...
            </div>
          ) : (
            <div className="products-grid">
              {currentProducts.length === 0 ? (
                <div className="no-products">
                  {searchTerm ? 'No products found matching your search.' : 'No products available.'}
                </div>
              ) : (
                currentProducts.map(p => {
                  const priceVal = getProductPrice(p);
                  return (
                    <div key={p._id} className="product-card" onClick={() => addToCart(p)}>
                      <div className="product-img">
                        {p.imgurl ? (
                          <img src={p.imgurl} alt={p.name} onError={(e) => {
                            e.target.src = '/placeholder-image.jpg';
                          }}/>
                        ) : (
                          <div className="no-image">No Image</div>
                        )}
                        <span className="product-price">${priceVal.toFixed(2)}</span>
                      </div>
                      <div className="product-info">
                        <h4>{p.name}</h4>
                        {p.codeProduct && (
                          <p><strong>Code:</strong> {p.codeProduct}</p>
                        )}
                        {p.brand && (
                          <p><strong>Brand:</strong> {p.brand}</p>
                        )}
                        {p.category && (
                          <p><strong>Category:</strong> {p.category}</p>
                        )}
                        {p.unit && (
                          <p><strong>Unit:</strong> {p.unit}</p>
                        )}
                        {(p.openingStock1 !== undefined || p.openingStock2 !== undefined) && (
                          <p className="stock-info">
                            <strong>Stock:</strong> 
                            <span className={getTotalStock(p) <= 5 ? 'low-stock' : 'normal-stock'}>
                              {getTotalStock(p)}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
          
          {!loading && totalPages > 1 && (
            <div className="pagination">
              <button 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(cp => cp - 1)}
              >
                {'<'}
              </button>
              {Array.from({length: totalPages}, (_, i) => (
                <button 
                  key={i} 
                  className={currentPage === i + 1 ? 'active' : ''} 
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                disabled={currentPage === totalPages} 
                onClick={() => setCurrentPage(cp => cp + 1)}
              >
                {'>'}
              </button>
            </div>
          )}
        </section>
      </div>

      {showPaymentModal && (
        <EnhancedPaymentModal 
          total={calculatePayable()} 
          customer={customer}
          cartItems={cartItems}
          onConfirm={() => {
            resetForm(); 
            setShowPaymentModal(false);
            alert('Payment processed successfully!');
          }} 
          onClose={() => setShowPaymentModal(false)}
        />
      )}  
    </div>
  );
};

// ENHANCED PAYMENT MODAL COMPONENT (matching screenshot)
function EnhancedPaymentModal({ total, customer, cartItems, onConfirm, onClose }) {
  const [payingAmount, setPayingAmount] = useState(total);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [paymentNotes, setPaymentNotes] = useState('');
  const [saleNotes, setSaleNotes] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('Choose Account');
  const [sendEmail, setSendEmail] = useState(false);
  const [sendSMS, setSendSMS] = useState(false);
  const [payments, setPayments] = useState([
    { id: 1, method: 'Cash', amount: total, isActive: true }
  ]);

  const totalPaying = payments.reduce((sum, payment) => sum + parseFloat(payment.amount || 0), 0);
  const balance = (totalPaying - parseFloat(total)).toFixed(2);
  const changeReturn = balance;

  const quickAmounts = [15.00, 20.00, 50.00, 100.00, 200.00, 500.00];

  const handleKeypadClick = (value) => {
    if (value === 'clear') {
      setPayingAmount('0');
    } else if (value === '0' && payingAmount === '0') {
      return;
    } else if (payingAmount === '0') {
      setPayingAmount(value);
    } else {
      setPayingAmount(prev => prev + value);
    }
  };

  const handleQuickAmount = (amount) => {
    setPayingAmount(amount.toString());
    setPayments(prev => prev.map((payment, index) => 
      index === 0 ? { ...payment, amount: amount.toString() } : payment
    ));
  };

  const addAnotherPayment = () => {
    const newPayment = {
      id: payments.length + 1,
      method: 'Cash',
      amount: '',
      isActive: false
    };
    setPayments([...payments, newPayment]);
  };

  const updatePayment = (id, field, value) => {
    setPayments(payments.map(payment => 
      payment.id === id ? { ...payment, [field]: value } : payment
    ));
  };

  const removePayment = (id) => {
    if (payments.length > 1) {
      setPayments(payments.filter(payment => payment.id !== id));
    }
  };

  return (
    <div className="enhanced-modal-overlay">
      <div className="enhanced-payment-modal">
        <header className="enhanced-pm-header" style={{ borderBottom: "1px solid #e5dbfa", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 400, fontSize: 16, color: "#222" }}>Payment</span>
          <span style={{ color: "#37c999", fontWeight: 600, fontSize: 18 }}>${total}</span>
          <button className="enhanced-pm-close" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes}/>
          </button>
        </header>
        <div className="enhanced-pm-body" style={{ display: 'flex', flexDirection: 'row', background: "#fff", marginTop: 0, padding: '38px 32px 24px 32px', gap: 36 }}>
          {/* LEFT PANE */}
          <div style={{ flex: 0.9, maxWidth: 270 }}>
            {/* Top summary card */}
            <div style={{
              background: "#f5f0ff", 
              borderRadius: 11,
              marginBottom: 25,
              boxShadow: "0 1px 7px #b393e722",
              padding: "14px 18px 12px 20px"
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <FontAwesomeIcon icon={faUser} style={{ color: '#7c53c3', marginRight: 6 }} />
                <span style={{ fontWeight: 600, fontSize: 15 }}>{customer}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: 13, marginBottom: 4 }}>
                <FontAwesomeIcon icon={faShoppingCart} style={{ color: "#a892e8", fontSize: 15, marginRight: 7 }} />
                <span>{cartItems.length} items</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', fontSize: 13, gap: 1 }}>
                <span>Total Paying: <b>${payments[0].amount || total}</b></span>
                <span>Balance: <b>${balance}</b></span>
                <span>Change Return: <b>${changeReturn}</b></span>
              </div>
            </div>

            {/* Payment form fields */}
            <div style={{ marginBottom: 10 }}>
              <div className="form-group">
                <label>Paying Amount *</label>
                <input 
                  type="text" 
                  value={payingAmount} 
                  onChange={(e) => setPayingAmount(e.target.value)}
                  className="paying-amount-input"
                />
              </div>
              <div className="form-group">
                <label>Payment choice *</label>
                <div className="payment-choice-container">
                  <select 
                    value={paymentMethod} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="payment-choice-select"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Mobile Payment">Mobile Payment</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Check">Check</option>
                  </select>
                  <button className="remove-payment-btn" style={{marginLeft: 4}}>×</button>
                </div>
              </div>
            </div>

            <button className="add-another-payment-btn" onClick={addAnotherPayment}>
              <FontAwesomeIcon icon={faPlus} /> Add Another Payment Option
            </button>
            {/* Popular Tenders */}
            <div className="popular-tenders-section" style={{ marginTop: 15 }}>
              <label>Popular Tendered</label>
              <div className="quick-amounts">
                {quickAmounts.map((amount, index) => (
                  <button 
                    key={index}
                    className="quick-amount-btn"
                    onClick={() => handleQuickAmount(amount)}
                  >
                    ${amount.toFixed(2)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* RIGHT PANE */}
          <div style={{ flex: 1.3, minWidth: 320, maxWidth: 430 }}>
            {/* Keypad */}
            <div className="numeric-keypad" style={{ marginBottom: 18 }}>
              <div className="keypad-row">
                <button onClick={() => handleKeypadClick('1')}>1</button>
                <button onClick={() => handleKeypadClick('2')}>2</button>
                <button onClick={() => handleKeypadClick('3')}>3</button>
              </div>
              <div className="keypad-row">
                <button onClick={() => handleKeypadClick('4')}>4</button>
                <button onClick={() => handleKeypadClick('5')}>5</button>
                <button onClick={() => handleKeypadClick('6')}>6</button>
              </div>
              <div className="keypad-row">
                <button onClick={() => handleKeypadClick('7')}>7</button>
                <button onClick={() => handleKeypadClick('8')}>8</button>
                <button onClick={() => handleKeypadClick('9')}>9</button>
              </div>
              <div className="keypad-row">
                <button className="clear-btn" onClick={() => handleKeypadClick('clear')}>clear</button>
                <button onClick={() => handleKeypadClick('0')}>0</button>
                <button onClick={() => handleKeypadClick('.')}>.</button>
              </div>
            </div>
            {/* Notes section */}
            <div className="notes-section">
              <div className="notes-row">
                <div className="note-group">
                  <label>Payment notes</label>
                  <textarea 
                    value={paymentNotes}
                    onChange={(e) => setPaymentNotes(e.target.value)}
                    placeholder="Add payment notes..."
                  />
                </div>
                <div className="note-group">
                  <label>Sale notes</label>
                  <textarea 
                    value={saleNotes}
                    onChange={(e) => setSaleNotes(e.target.value)}
                    placeholder="Add sale notes..."
                  />
                </div>
              </div>
            </div>
            {/* Account select */}
            <div className="account-section">
              <label>Account</label>
              <select 
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="account-select"
              >
                <option>Choose Account</option>
                <option>Cash Account</option>
                <option>Bank Account</option>
                <option>Credit Account</option>
              </select>
            </div>
            {/* Email/SMS */}
            <div className="communication-section">
              <div className="comm-options">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={sendEmail}
                    onChange={(e) => setSendEmail(e.target.checked)}
                  />
                  Send Email
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={sendSMS}
                    onChange={(e) => setSendSMS(e.target.checked)}
                  />
                  Send SMS
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="enhanced-pm-footer">
          <button 
            className="pay-button" 
            onClick={onConfirm}
            disabled={totalPaying < parseFloat(total)}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}

export default POS;
