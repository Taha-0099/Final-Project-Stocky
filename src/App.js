// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthGuard from './AuthGuard';
import Login from './Login';
import Home from './Home';
import AddUserForm from './AddUserForm';
import AdminPage from './AdminPage';
import SCA from './SCA';
import Suppliers from './Suppliers';
import ImportContacts from './ImportContacts';
import ListProducts from './ListProducts';
import AddProductForm from './AddProductForm';
import PrintLabels from './PrintLabels';
import Dashboard from './Dashboard';
import Adjustments from './Adjustments';
import CP from './CP';
import AP from './AP';
import PD from './PD';
import UP from './UP';
import PL from './PL';
import CA from './CA';
import AA from './AA';
import CQ from './CQ';
import AQ from './AQ';
import Units from './Units';
import Category from './Category';
import Brand from './Brand';
import CreatePurchase from './CreatePurchase';
import AllPurchase from './AllPurchase';
import CR from './CR';
import AS from './AS';
import Shipments from './Shipments';
import SR from './SR';
import PR from './PR';
import Company from './Company';
import Department from './Department';
import POS from './POS';
import Employ from './Employ';
import Payroll from './Payroll';
import Task from './Task';
import Desination from './Designation';
import CT from './CT';
import AT from './AT';
import LA from './LA';
import SP from './SP';
import CM from './CM';
import PU from './PU';
import ProjectL from './ProjectL';
import TL from './TL';
import PP from './PP';
import AddEmploy from './AddEmploy';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* All other routes require a valid token */}
        <Route
          path="/Home"
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        />
        <Route
          path="/UP/:id"
          element={
            <AuthGuard>
              <UP />
            </AuthGuard>
          }
        />
        <Route
          path="/AddUserForm"
          element={
            <AuthGuard>
              <AddUserForm />
            </AuthGuard>
          }
        />
        <Route
          path="/homeAdmin"
          element={
            <AuthGuard>
              <AdminPage />
            </AuthGuard>
          }
        />
        <Route
          path="/PD/:id"
          element={
            <AuthGuard>
              <PD />
            </AuthGuard>
          }
        />
        <Route
          path="/SCA"
          element={
            <AuthGuard>
              <SCA />
            </AuthGuard>
          }
        />
        <Route
          path="/Suppliers"
          element={
            <AuthGuard>
              <Suppliers />
            </AuthGuard>
          }
        />
        <Route
          path="/impcontact"
          element={
            <AuthGuard>
              <ImportContacts />
            </AuthGuard>
          }
        />
        <Route
          path="/ListProducts"
          element={
            <AuthGuard>
              <ListProducts />
            </AuthGuard>
          }
        />
        <Route
          path="/AddProduct"
          element={
            <AuthGuard>
              <AddProductForm />
            </AuthGuard>
          }
        />
        <Route
          path="/PrintLabel"
          element={
            <AuthGuard>
              <PrintLabels />
            </AuthGuard>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />
        <Route
          path="/Adjustments"
          element={
            <AuthGuard>
              <Adjustments />
            </AuthGuard>
          }
        />
        <Route
          path="/CP"
          element={
            <AuthGuard>
              <CP />
            </AuthGuard>
          }
        />
        <Route
          path="/AP"
          element={
            <AuthGuard>
              <AP />
            </AuthGuard>
          }
        />
        <Route
          path="/PD"
          element={
            <AuthGuard>
              <PD />
            </AuthGuard>
          }
        />
        <Route
          path="/UP"
          element={
            <AuthGuard>
              <UP />
            </AuthGuard>
          }
        />
        <Route
          path="/PL"
          element={
            <AuthGuard>
              <PL />
            </AuthGuard>
          }
        />
        <Route
          path="/Category"
          element={
            <AuthGuard>
              <Category />
            </AuthGuard>
          }
        />
        <Route
          path="/Brand"
          element={
            <AuthGuard>
              <Brand />
            </AuthGuard>
          }
        />
        <Route
          path="/CA"
          element={
            <AuthGuard>
              <CA />
            </AuthGuard>
          }
        />
        <Route
          path="/AA"
          element={
            <AuthGuard>
              <AA />
            </AuthGuard>
          }
        />
        <Route
          path="/Units"
          element={
            <AuthGuard>
              <Units />
            </AuthGuard>
          }
        />
        <Route
          path="/CQ"
          element={
            <AuthGuard>
              <CQ />
            </AuthGuard>
          }
        />
        <Route
          path="/AQ"
          element={
            <AuthGuard>
              <AQ />
            </AuthGuard>
          }
        />
        <Route
          path="/CPP"
          element={
            <AuthGuard>
              <CreatePurchase />
            </AuthGuard>
          }
        />
        <Route
          path="/APP"
          element={
            <AuthGuard>
              <AllPurchase />
            </AuthGuard>
          }
        />
        <Route
          path="/CR"
          element={
            <AuthGuard>
              <CR />
            </AuthGuard>
          }
        />
        <Route
          path="/AS"
          element={
            <AuthGuard>
              <AS />
            </AuthGuard>
          }
        />
        <Route
          path="/Ship"
          element={
            <AuthGuard>
              <Shipments />
            </AuthGuard>
          }
        />
        <Route
          path="/SR"
          element={
            <AuthGuard>
              <SR />
            </AuthGuard>
          }
        />
        <Route
          path="/PR"
          element={
            <AuthGuard>
              <PR />
            </AuthGuard>
          }
        />
        <Route
          path="/Company"
          element={
            <AuthGuard>
              <Company />
            </AuthGuard>
          }
        />
        <Route
          path="/Department"
          element={
            <AuthGuard>
              <Department />
            </AuthGuard>
          }
        />
        <Route
          path="/POS"
          element={
            <AuthGuard>
              <POS />
            </AuthGuard>
          }
        />
        <Route
          path="/Employ"
          element={
            <AuthGuard>
              <Employ />
            </AuthGuard>
          }
        />
        <Route
          path="/Payroll"
          element={
            <AuthGuard>
              <Payroll />
            </AuthGuard>
          }
        />
        <Route
          path="/tasks"
          element={
            <AuthGuard>
              <Task />
            </AuthGuard>
          }
        />
        <Route
          path="/Desig"
          element={
            <AuthGuard>
              <Desination />
            </AuthGuard>
          }
        />
        <Route
          path="/CT"
          element={
            <AuthGuard>
              <CT />
            </AuthGuard>
          }
        />
        <Route
          path="/AT"
          element={
            <AuthGuard>
              <AT />
            </AuthGuard>
          }
        />
        <Route
          path="/LA"
          element={
            <AuthGuard>
              <LA />
            </AuthGuard>
          }
        />
        <Route
          path="/SP"
          element={
            <AuthGuard>
              <SP />
            </AuthGuard>
          }
        />
        <Route
          path="/CM"
          element={
            <AuthGuard>
              <CM />
            </AuthGuard>
          }
        />
        <Route
          path="/PU"
          element={
            <AuthGuard>
              <PU />
            </AuthGuard>
          }
        />
        <Route
          path="/ProjectL"
          element={
            <AuthGuard>
              <ProjectL />
            </AuthGuard>
          }
        />
        <Route
          path="/TL"
          element={
            <AuthGuard>
              <TL />
            </AuthGuard>
          }

        />

<Route
  path="/Employ"
  element={
    <AuthGuard>
      <Employ />
    </AuthGuard>
  }
/>
<Route
  path="/add-employee"
  element={
    <AuthGuard>
      <AddEmploy />
    </AuthGuard>
  }
/>


        <Route
          path="/PP"
          element={
            <AuthGuard>
              <PP />
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
