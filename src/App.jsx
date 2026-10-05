import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import VerifyPage from './pages/VerifyPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import AccreditationPage from './pages/AccreditationPage'
import CorporatePoliciesPage from './pages/CorporatePoliciesPage'
import CorporateMembershipPage from './pages/CorporateMembershipPage'
import ServicesPage from './pages/ServicesPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboard from './pages/AdminDashboard'
import GenericPage from './pages/GenericPage'

function AppContent() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Default.aspx" element={<HomePage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/about-us.aspx" element={<AboutPage />} />
          <Route path="/accreditation" element={<AccreditationPage />} />
          <Route path="/accreditation.aspx" element={<AccreditationPage />} />
          <Route path="/corporate-policies" element={<CorporatePoliciesPage />} />
          <Route path="/corporate-policies.aspx" element={<CorporatePoliciesPage />} />
          <Route path="/corporate-membership" element={<CorporateMembershipPage />} />
          <Route path="/corporate-membership.aspx" element={<CorporateMembershipPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services.aspx" element={<ServicesPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/verify.aspx" element={<VerifyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact.aspx" element={<ContactPage />} />
          <Route path="/enquiry" element={<ContactPage />} />
          <Route path="/enquiry.aspx" element={<ContactPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<GenericPage />} />
        </Routes>
      </div>
      {!isAdmin && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  )
}
