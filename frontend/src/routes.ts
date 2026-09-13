// GENERATED from the architecture plan — do not edit by hand.
// The complete navigation contract: every page, its route, and its nav
// metadata. Link via ROUTES.*, render nav from routeTable — never hardcode
// a path string. This file imports NOTHING by design (cycle-safe).

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CLIENT_DASHBOARD: '/client-dashboard',
  CONTACT: '/contact',
  LOGIN: '/login',
  LOOKBOOK: '/lookbook',
  LOOKBOOK_ENTRY_DETAIL: '/lookbook-entry/:id',
  PRODUCT_DETAIL: '/product/:id',
  PRODUCTS: '/products',
  SIGNUP: '/signup',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_INQUIRIES: '/admin/inquiries',
  ADMIN_LOOKBOOK: '/admin/lookbook',
  ADMIN_PRODUCTS: '/admin/products',
  NOT_FOUND: '*',
  CART: '/cart',
  CHECKOUT: '/checkout',
  GALLERY: '/gallery',
  ADMIN_MEDIA: '/admin/media',
} as const;

export type RouteGate = 'public' | 'auth' | 'admin';

export interface RouteEntry {
  key: keyof typeof ROUTES;
  path: string;
  page: string;        // component name, e.g. 'AdminOrdersPage'
  importPath: string;  // string metadata only — App.tsx does the importing
  label: string;
  gate: RouteGate;     // 'public' | 'auth' (login) | 'admin' (login + role)
  nav: boolean;
}

export const routeTable: RouteEntry[] = [
  { key: 'HOME', path: ROUTES.HOME, page: 'HomePage', importPath: './pages/HomePage', label: 'Home', gate: 'public', nav: true },
  { key: 'ABOUT', path: ROUTES.ABOUT, page: 'AboutPage', importPath: './pages/AboutPage', label: 'About', gate: 'public', nav: true },
  { key: 'CLIENT_DASHBOARD', path: ROUTES.CLIENT_DASHBOARD, page: 'ClientDashboardPage', importPath: './pages/ClientDashboardPage', label: 'Client Dashboard', gate: 'public', nav: true },
  { key: 'CONTACT', path: ROUTES.CONTACT, page: 'ContactPage', importPath: './pages/ContactPage', label: 'Contact', gate: 'public', nav: true },
  { key: 'LOGIN', path: ROUTES.LOGIN, page: 'LoginPage', importPath: './pages/LoginPage', label: 'Login', gate: 'public', nav: false },
  { key: 'LOOKBOOK', path: ROUTES.LOOKBOOK, page: 'LookbookPage', importPath: './pages/LookbookPage', label: 'Lookbook', gate: 'public', nav: true },
  { key: 'LOOKBOOK_ENTRY_DETAIL', path: ROUTES.LOOKBOOK_ENTRY_DETAIL, page: 'LookbookEntryDetailPage', importPath: './pages/LookbookEntryDetailPage', label: 'Lookbook Entry', gate: 'public', nav: false },
  { key: 'PRODUCT_DETAIL', path: ROUTES.PRODUCT_DETAIL, page: 'ProductDetailPage', importPath: './pages/ProductDetailPage', label: 'Product', gate: 'public', nav: false },
  { key: 'PRODUCTS', path: ROUTES.PRODUCTS, page: 'ProductsPage', importPath: './pages/ProductsPage', label: 'Products', gate: 'public', nav: true },
  { key: 'SIGNUP', path: ROUTES.SIGNUP, page: 'SignupPage', importPath: './pages/SignupPage', label: 'Signup', gate: 'public', nav: false },
  { key: 'ADMIN_DASHBOARD', path: ROUTES.ADMIN_DASHBOARD, page: 'AdminDashboardPage', importPath: './pages/AdminDashboardPage', label: 'Dashboard', gate: 'admin', nav: true },
  { key: 'ADMIN_INQUIRIES', path: ROUTES.ADMIN_INQUIRIES, page: 'AdminInquiriesPage', importPath: './pages/AdminInquiriesPage', label: 'Inquiries', gate: 'admin', nav: true },
  { key: 'ADMIN_LOOKBOOK', path: ROUTES.ADMIN_LOOKBOOK, page: 'AdminLookbookPage', importPath: './pages/AdminLookbookPage', label: 'Lookbook', gate: 'admin', nav: true },
  { key: 'ADMIN_PRODUCTS', path: ROUTES.ADMIN_PRODUCTS, page: 'AdminProductsPage', importPath: './pages/AdminProductsPage', label: 'Products', gate: 'admin', nav: true },
  { key: 'NOT_FOUND', path: ROUTES.NOT_FOUND, page: 'NotFoundPage', importPath: './pages/NotFoundPage', label: 'Not Found', gate: 'public', nav: false },
  { key: 'CART', path: ROUTES.CART, page: 'CartPage', importPath: './pages/CartPage', label: 'Cart', gate: 'public', nav: false },
  { key: 'CHECKOUT', path: ROUTES.CHECKOUT, page: 'CheckoutPage', importPath: './pages/CheckoutPage', label: 'Checkout', gate: 'auth', nav: false },
  { key: 'GALLERY', path: ROUTES.GALLERY, page: 'GalleryPage', importPath: './pages/GalleryPage', label: 'Gallery', gate: 'public', nav: true },
  { key: 'ADMIN_MEDIA', path: ROUTES.ADMIN_MEDIA, page: 'AdminMediaPage', importPath: './pages/admin/AdminMediaPage', label: 'Media', gate: 'admin', nav: true },
];
