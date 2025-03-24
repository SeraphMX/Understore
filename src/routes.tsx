import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Main Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import CategoryPage from './pages/CategoryPage';
import Checkout from './pages/Checkout';
import Notifications from './pages/Notifications';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import TrackOrder from './pages/TrackOrder';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Categories from './pages/admin/Categories';
import Promotions from './pages/admin/Promotions';
import Orders from './pages/admin/Orders';
import Messages from './pages/admin/Messages';
import Chat from './pages/admin/Chat';
import Requests from './pages/admin/Requests';
import Users from './pages/admin/Users';
import PaymentMethods from './pages/admin/config/PaymentMethods';
import ShippingZones from './pages/admin/config/ShippingZones';
import AdminFAQ from './pages/admin/config/AdminFAQ';
import ContactInfo from './pages/admin/config/ContactInfo';
import UsefulLinks from './pages/admin/config/UsefulLinks';

// Utility Pages
import PrivacyPolicy from './pages/utility/PrivacyPolicy';
import PublicTerms from './pages/utility/PublicTerms';
import PublicFAQ from './pages/utility/PublicFAQ';
import AuthTerms from './pages/utility/AuthTerms';
import AuthFAQ from './pages/utility/AuthFAQ';
import Help from './pages/utility/Help';
import Shipping from './pages/utility/Shipping';

// Components
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { view } = useSelector((state: RootState) => state.layout);

  // Admin Routes
  if (isAuthenticated && user?.role === 'admin' && view === 'admin') {
    return (
      <Routes>
        <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/productos" element={<AdminLayout><Products /></AdminLayout>} />
        <Route path="/admin/categorias" element={<AdminLayout><Categories /></AdminLayout>} />
        <Route path="/admin/promociones" element={<AdminLayout><Promotions /></AdminLayout>} />
        <Route path="/admin/pedidos" element={<AdminLayout><Orders /></AdminLayout>} />
        <Route path="/admin/mensajes" element={<AdminLayout><Messages /></AdminLayout>} />
        <Route path="/admin/chat" element={<AdminLayout><Chat /></AdminLayout>} />
        <Route path="/admin/solicitudes" element={<AdminLayout><Requests /></AdminLayout>} />
        <Route path="/admin/usuarios" element={<AdminLayout><Users /></AdminLayout>} />
        
        {/* Configuration Routes */}
        <Route path="/admin/configuracion/pagos" element={<AdminLayout><PaymentMethods /></AdminLayout>} />
        <Route path="/admin/configuracion/envios" element={<AdminLayout><ShippingZones /></AdminLayout>} />
        <Route path="/admin/configuracion/faq" element={<AdminLayout><AdminFAQ /></AdminLayout>} />
        <Route path="/admin/configuracion/contacto" element={<AdminLayout><ContactInfo /></AdminLayout>} />
        <Route path="/admin/configuracion/enlaces" element={<AdminLayout><UsefulLinks /></AdminLayout>} />
        
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    );
  }

  // Public Routes
  if (!isAuthenticated || !user?.isApproved) {
    return (
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="privacidad" element={<PrivacyPolicy />} />
          <Route path="terminos" element={<PublicTerms />} />
          <Route path="faq" element={<PublicFAQ />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    );
  }

  // User Routes
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="productos"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="productos/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="carrito"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="categoria/:category"
          element={
            <ProtectedRoute>
              <CategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="notificaciones"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="favoritos"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="perfil"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="rastrear"
          element={
            <ProtectedRoute>
              <TrackOrder />
            </ProtectedRoute>
          }
        />
        {/* Protected Utility Pages */}
        <Route
          path="privacidad"
          element={
            <ProtectedRoute>
              <PrivacyPolicy />
            </ProtectedRoute>
          }
        />
        <Route
          path="terminos"
          element={
            <ProtectedRoute>
              <AuthTerms />
            </ProtectedRoute>
          }
        />
        <Route
          path="faq"
          element={
            <ProtectedRoute>
              <AuthFAQ />
            </ProtectedRoute>
          }
        />
        <Route
          path="ayuda"
          element={
            <ProtectedRoute>
              <Help />
            </ProtectedRoute>
          }
        />
        <Route
          path="envios"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;