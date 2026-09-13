// GENERATED from the architecture plan — do not edit by hand.
// The complete route table, derived from the plan. Rendered by the App.tsx shell
// inside the provider tree. Re-derived every attempt — never edit by hand.

import { Routes, Route, Outlet } from 'react-router-dom'
import RequireAdmin from '@/components/RequireAdmin'
import RequireAuth from '@/components/RequireAuth'
import { SiteLayout } from '@/shell'
import AdminLayout from '@/components/AdminLayout'
import { siteConfig } from '@/config/siteConfig'

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ClientDashboardPage from './pages/ClientDashboardPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import LookbookPage from './pages/LookbookPage';
import LookbookEntryDetailPage from './pages/LookbookEntryDetailPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsPage from './pages/ProductsPage';
import SignupPage from './pages/SignupPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminInquiriesPage from './pages/AdminInquiriesPage';
import AdminLookbookPage from './pages/AdminLookbookPage';
import AdminProductsPage from './pages/AdminProductsPage';
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import GalleryPage from './pages/GalleryPage';
import AdminMediaPage from './pages/admin/AdminMediaPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/inquiries" element={<AdminInquiriesPage />} />
        <Route path="/admin/lookbook" element={<AdminLookbookPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/media" element={<AdminMediaPage />} />
      </Route>
      <Route element={<SiteLayout config={siteConfig}><Outlet /></SiteLayout>}>
        {/* Outlet receives the matched child route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/client-dashboard" element={<ClientDashboardPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/lookbook" element={<LookbookPage />} />
        <Route path="/lookbook-entry/:id" element={<LookbookEntryDetailPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route element={<RequireAuth><Outlet /></RequireAuth>}>
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
