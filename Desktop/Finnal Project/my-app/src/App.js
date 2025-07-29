import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthGuard   from './AuthGuard';
import Login       from './Login';
import Home        from './Home';
import Dashboard   from './Dashboard';
import AddUserForm from './AddUserForm';
import AdminPage   from './AdminPage';
import SCA         from './SCA';
import Suppliers   from './Suppliers';
import ImportContacts from './ImportContacts';
import ListProducts   from './ListProducts';
import AddProductForm from './AddProductForm';
import PrintLabels    from './PrintLabels';
import Adjustments    from './Adjustments';
import CP             from './CP';
import AP             from './AP';
import PD             from './PD';
import UP             from './UP';
import PL             from './PL';
import CA             from './CA';
import AA             from './AA';
import CQ             from './CQ';
import AQ             from './AQ';
import Units          from './Units';
import Category       from './Category';
import Brand          from './Brand';
import CreatePurchase from './CreatePurchase';
import AllPurchase    from './AllPurchase';
import CR             from './CR';
import AS             from './AS';
import Shipments      from './Shipments';
import SR             from './SR';
import PR             from './PR';
import Company        from './Company';
import Department     from './Department';
import POS            from './POS';
import Employ         from './Employ';
import Payroll        from './Payroll';
import Task           from './Task';
import Desination     from './Designation';
import CT             from './CT';
import AT             from './AT';
import LA             from './LA';
import SP             from './SP';
import CM             from './CM';
import PU             from './PU';
import ProjectL       from './ProjectL';
import TL             from './TL';
import PP             from './PP';
import AddEmploy      from './AddEmploy';
import Header         from './Header';
import ProjectList    from './ProjectList';
import Appearance     from './Appearance';
import PosSetting     from './PosSetting';
import Languages      from './Languages';
import CSR            from './CSR';
import SD             from './SD';
import SS from './SS';
import ES from './ES';
import { SettingsProvider } from './SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter basename="/Final-Project-Stocky">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Login />} />

          {/* Admin only */}
          <Route path="/AddUserForm"   element={<AuthGuard allowRoles={['admin']}><AddUserForm /></AuthGuard>} />
          <Route path="/homeAdmin"     element={<AuthGuard allowRoles={['admin']}><AdminPage /></AuthGuard>} />
          <Route path="/SCA"           element={<AuthGuard allowRoles={['admin']}><SCA /></AuthGuard>} />
          <Route path="/Suppliers"     element={<AuthGuard allowRoles={['admin']}><Suppliers /></AuthGuard>} />
          <Route path="/ES"     element={<AuthGuard allowRoles={['admin']}><ES /></AuthGuard>} />
          <Route path="/impcontact"    element={<AuthGuard allowRoles={['admin']}><ImportContacts /></AuthGuard>} />
          <Route path="/SD/:id"        element={<AuthGuard allowRoles={['admin']}><SD /></AuthGuard>} />
 <Route path="/SS" element={<AuthGuard allowRoles={['admin']}><SS /></AuthGuard>} />
          <Route path="/ListProducts"  element={<AuthGuard allowRoles={['admin']}><ListProducts /></AuthGuard>} />
          <Route path="/AddProduct"    element={<AuthGuard allowRoles={['admin']}><AddProductForm /></AuthGuard>} />
          <Route path="/PrintLabel"    element={<AuthGuard allowRoles={['admin']}><PrintLabels /></AuthGuard>} />
          <Route path="/Adjustments"   element={<AuthGuard allowRoles={['admin']}><Adjustments /></AuthGuard>} />
          <Route path="/CP"            element={<AuthGuard allowRoles={['admin']}><CP /></AuthGuard>} />
          <Route path="/AP"            element={<AuthGuard allowRoles={['admin']}><AP /></AuthGuard>} />
          <Route path="/PD/:id"        element={<AuthGuard allowRoles={['admin']}><PD /></AuthGuard>} />
          <Route path="/PD"            element={<AuthGuard allowRoles={['admin']}><PD /></AuthGuard>} />
          <Route path="/UP/:id"        element={<AuthGuard allowRoles={['admin']}><UP /></AuthGuard>} />
          <Route path="/UP"            element={<AuthGuard allowRoles={['admin']}><UP /></AuthGuard>} />
          <Route path="/PL"            element={<AuthGuard allowRoles={['admin']}><PL /></AuthGuard>} />
          <Route path="/Category"      element={<AuthGuard allowRoles={['admin']}><Category /></AuthGuard>} />
          <Route path="/Brand"         element={<AuthGuard allowRoles={['admin']}><Brand /></AuthGuard>} />
          <Route path="/CA"            element={<AuthGuard allowRoles={['admin']}><CA /></AuthGuard>} />
          <Route path="/AA"            element={<AuthGuard allowRoles={['admin']}><AA /></AuthGuard>} />
          <Route path="/Units"         element={<AuthGuard allowRoles={['admin']}><Units /></AuthGuard>} />
          <Route path="/CQ"            element={<AuthGuard allowRoles={['admin']}><CQ /></AuthGuard>} />
          <Route path="/AQ"            element={<AuthGuard allowRoles={['admin']}><AQ /></AuthGuard>} />
          {/* <Route path="/SD"            element={<AuthGuard allowRoles={['admin']}><SD /></AuthGuard>} /> */}
          <Route path="/CPP"           element={<AuthGuard allowRoles={['admin']}><CreatePurchase /></AuthGuard>} />
          <Route path="/APP"           element={<AuthGuard allowRoles={['admin']}><AllPurchase /></AuthGuard>} />
          <Route path="/Company"       element={<AuthGuard allowRoles={['admin']}><Company /></AuthGuard>} />
          <Route path="/Department"    element={<AuthGuard allowRoles={['admin']}><Department /></AuthGuard>} />
          <Route path="/Employ"        element={<AuthGuard allowRoles={['admin']}><Employ /></AuthGuard>} />
          <Route path="/Payroll"       element={<AuthGuard allowRoles={['admin']}><Payroll /></AuthGuard>} />
          <Route path="/CSR"           element={<AuthGuard allowRoles={['admin']}><CSR /></AuthGuard>} />
          <Route path="/Desig"         element={<AuthGuard allowRoles={['admin']}><Desination /></AuthGuard>} />
          <Route path="/CT"            element={<AuthGuard allowRoles={['admin']}><CT /></AuthGuard>} />
          <Route path="/AT"            element={<AuthGuard allowRoles={['admin']}><AT /></AuthGuard>} />
          <Route path="/LA"            element={<AuthGuard allowRoles={['admin']}><LA /></AuthGuard>} />
          <Route path="/SP"            element={<AuthGuard allowRoles={['admin']}><SP /></AuthGuard>} />
          <Route path="/CM"            element={<AuthGuard allowRoles={['admin']}><CM /></AuthGuard>} />
          <Route path="/PU"            element={<AuthGuard allowRoles={['admin']}><PU /></AuthGuard>} />
          <Route path="/ProjectL"      element={<AuthGuard allowRoles={['admin']}><ProjectL /></AuthGuard>} />
          <Route path="/TL"            element={<AuthGuard allowRoles={['admin']}><TL /></AuthGuard>} />
          <Route path="/add-employee"  element={<AuthGuard allowRoles={['admin']}><AddEmploy /></AuthGuard>} />
          <Route path="/PP"            element={<AuthGuard allowRoles={['admin']}><PP /></AuthGuard>} />
          <Route path="/Header"        element={<AuthGuard allowRoles={['admin']}><Header /></AuthGuard>} />
          <Route path="/ProjectList"   element={<AuthGuard allowRoles={['admin']}><ProjectList /></AuthGuard>} />
          <Route path="/Languages"     element={<AuthGuard allowRoles={['admin']}><Languages /></AuthGuard>} />
          <Route path="/Appearance"    element={<AuthGuard allowRoles={['admin']}><Appearance /></AuthGuard>} />
          <Route path="/PosSetting"    element={<AuthGuard allowRoles={['admin']}><PosSetting/></AuthGuard>} />

          {/* Sales + Admin shared routes */}
              <Route path="/ES/:id" element={<AuthGuard allowRoles={['admin', 'sales']}><ES /></AuthGuard>} />
          <Route path="/Dashboard"  element={<AuthGuard allowRoles={['admin', 'sales']}><Dashboard /></AuthGuard>} />
          <Route path="/CR"         element={<AuthGuard allowRoles={['admin', 'sales']}><CR /></AuthGuard>} />
          <Route path="/AS"         element={<AuthGuard allowRoles={['admin', 'sales']}><AS /></AuthGuard>} />
          <Route path="/SR"         element={<AuthGuard allowRoles={['admin', 'sales']}><SR /></AuthGuard>} />
          <Route path="/POS"        element={<AuthGuard allowRoles={['admin', 'sales']}><POS /></AuthGuard>} />
          <Route path="/Ship"       element={<AuthGuard allowRoles={['admin', 'sales']}><Shipments /></AuthGuard>} />

          {/* 404 */}
          <Route path="*" element={<div style={{textAlign:'center',marginTop:'5rem'}}>404 - Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  );

}

export default App;
