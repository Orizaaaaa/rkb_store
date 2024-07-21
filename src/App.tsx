
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import DashboardUser from './pages/user/dashboard';
import DetailReportUser from './pages/user/detailReport';
import CreateReportUser from './pages/user/crateReport';
import AllReportUser from './pages/user/allReport';
import MyReportUser from './pages/user/myReport';
import DashboardOfficer from './pages/officer/dashboard';
import DetailRaportOfficer from './pages/officer/detailReport';
import MyReportOfficer from './pages/officer/myReport';
import SubmitReportAdmin from './pages/admin/submitReport';
import DashboardAdmin from './pages/admin/dashboard';
import CategoryAdmin from './pages/admin/category';
import SubmitReportOfficer from './pages/officer/submitReport';
import OfficerList from './pages/admin/officerList';
import UnitKerjaAdmin from './pages/admin/unitKerja';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import { AuthProvider } from './hooks/auth/AuthContext';
import PrivateRoute from './hooks/auth/PrivateRoute';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Transaction from './pages/admin/transaction';
import DetailTransaction from './pages/admin/detailTransaction';
import Customer from './pages/admin/customer';
import ProductAdmin from './pages/admin/product';



function App() {

  return (
    <AuthProvider>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes for Users */}
          <Route element={<PrivateRoute allowedRoles={['user']} />}>
            <Route path="/dashboard-user" element={<DashboardUser />} />
            <Route path="/dashboard-user/buat-laporan-user" element={<CreateReportUser />} />
            <Route path="/dashboard-user/detail-laporan-user/:id" element={<DetailReportUser />} />
            <Route path="/semua-laporan-user" element={<AllReportUser />} />
            <Route path="/laporan-saya-user" element={<MyReportUser />} />
          </Route>

          {/* Protected Routes for Officers */}
          <Route element={<PrivateRoute allowedRoles={['officer']} />}>
            <Route path="/dashboard-officer" element={<DashboardOfficer />} />
            <Route path="/laporan-saya-officer" element={<MyReportOfficer />} />
            <Route path="/laporan-saya-officer/detail-laporan/:id" element={<DetailRaportOfficer />} />
            <Route path="/dashboard-officer/submit-laporan-officer/:id" element={<SubmitReportOfficer />} />
          </Route>

          {/* Protected Routes for Admins */}
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/dashboard-admin" element={<DashboardAdmin />} />
            <Route path="/kategori-admin" element={<CategoryAdmin />} />
            <Route path="/product-admin" element={<ProductAdmin />} />
            <Route path="/transaction-admin" element={<Transaction />} />
            <Route path="/transaction-admin/detail-transaction" element={<DetailTransaction />} />
            <Route path="/customer-admin" element={<Customer />} />
            <Route path="/laporan-admin/submit-laporan-admin/:id" element={<SubmitReportAdmin />} />
            <Route path="/petugas-admin" element={<OfficerList />} />
            <Route path="/unit-kerja-admin" element={<UnitKerjaAdmin />} />
          </Route>
        </Routes>
      </Provider>

    </AuthProvider>
  )
}

export default App
