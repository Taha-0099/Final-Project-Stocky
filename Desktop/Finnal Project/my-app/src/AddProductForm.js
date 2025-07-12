import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './SideBar';
import './AddProductForm.css';

const AddProductForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ 
    productName: '',
    sku: '',
    barcodeType: 'Code 128 (C128)',
    units: 'Please Select',
    brand: 'Please Select',
    category: 'Please Select',
    subcategory: 'Please Select',
    manageStock: false,
    alertQuantity: '',
    productDescription: '',
    weight: '',
    serviceTime: '',
    applicableTax: 'None',
    sellingPriceTaxType: 'Exclusive',
    productType: 'Single',
    purchasePriceExc: '',
    purchasePriceInc: '',
    margin: '25.00',
    sellingPriceExc: '',
    sellingPriceInc: '',
    enableDescription: false,
    notForSelling: false,
    disableWooSync: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.productName,
      sku: formData.sku,
      barcodeType: formData.barcodeType,
      units: formData.units,
      brand: formData.brand,
      category: formData.category,
      subcategory: formData.subcategory,
      manageStock: formData.manageStock,
      alertQuantity: formData.alertQuantity,
      description: formData.productDescription,
      weight: formData.weight,
      serviceTime: formData.serviceTime,
      applicableTax: formData.applicableTax,
      sellingPriceTaxType: formData.sellingPriceTaxType,
      productType: formData.productType,
      purchasePriceExc: formData.purchasePriceExc,
      purchasePriceInc: formData.purchasePriceInc,
      margin: formData.margin,
      sellingPriceExc: formData.sellingPriceExc,
      sellingPriceInc: formData.sellingPriceInc,
      enableDescription: formData.enableDescription,
      notForSelling: formData.notForSelling,
      disableWooSync: formData.disableWooSync,
    };

    try {
      await axios.post('http://localhost:5001/FInalProject/products', payload);
      alert('Product submitted successfully!');
      navigate('/'); // Navigate to AP.js to display the updated list
    } catch (error) {
      console.error('Error submitting product:', error);
      alert('Failed to submit product!');
    }
  };

  return (
    <>
      <Sidebar />
      <header className="header">
        <div className="header-left">
          <span className="logo">Finnal Project</span>
          <span className="status-indicator"></span>
        </div>
      </header>

      <div className="form-container">
        <h1>Add new product</h1>
        <form className="product-form" onSubmit={handleSubmit}>
          {/* Include your existing fields here (omitted for brevity) */}
          
          <div className="form-buttons">
            <button type="submit" className="btn save">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProductForm;
