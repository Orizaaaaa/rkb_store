
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import DashboardUser from './pages/user/dashboard';
import DashboardOfficer from './pages/officer/dashboard';
import DashboardAdmin from './pages/admin/dashboard';
import CategoryAdmin from './pages/admin/category';
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
import DetailProductAdmin from './pages/admin/detailProduct';
import AddProductAdmin from './pages/admin/addProduct';
import DetailProductUser from './pages/user/detailProduct';



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
            <Route path="/dashboard-user/detail-product" element={<DetailProductUser />} />
          </Route>

          {/* Protected Routes for Officers */}
          <Route element={<PrivateRoute allowedRoles={['officer']} />}>
            <Route path="/dashboard-officer" element={<DashboardOfficer />} />
          </Route>

          {/* Protected Routes for Admins */}
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/dashboard-admin" element={<DashboardAdmin />} />
            <Route path="/kategori-admin" element={<CategoryAdmin />} />
            <Route path="/product-admin" element={<ProductAdmin />} />
            <Route path="/product-admin/add-product" element={<AddProductAdmin />} />
            <Route path="/product-admin/detail-product-admin" element={<DetailProductAdmin />} />
            <Route path="/transaction-admin" element={<Transaction />} />
            <Route path="/transaction-admin/detail-transaction" element={<DetailTransaction />} />
            <Route path="/customer-admin" element={<Customer />} />
          </Route>
        </Routes>
      </Provider>

    </AuthProvider>
  )
}

export default App
