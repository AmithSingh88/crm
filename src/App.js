import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Login from './pages/login';
import Admin from './pages/Admin';
import RequireAuth from './component/RequireAuth';
import Customer from './pages/Customer';
import Engineer from './pages/Engineer';
import './App.css';
import NotFound from './component/Notfound';
import Unauthorized from './component/Unauthorised';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import 'bootstrap-icons/font/bootstrap-icons.css';


const ROLES = {
  'CUSTOMER': 'CUSTOMER',
  'ENGINEER': 'ENGINEER',
  'ADMIN': 'ADMIN'
}


function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          }
        />
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
          <Route path='/admin' exact element={<Admin />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.CUSTOMER]} />}>
          <Route path='/customer' element={<Customer />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.ENGINEER]} />}>
          <Route path='/engineer' element={<Engineer />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;



