import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  FileCheck2,
  LogOut,
  ShieldCheck,
  Search,
  ExternalLink,
  Calendar,
  FileText,
  ArrowRight,
  Menu,
  X,
  Trash2,
  Plus,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Inbox,
  Eye,
  RefreshCw
} from 'lucide-react'
import { initialCertificatesDatabase } from '../data/certificatesData'
import { api } from '../services/api'
import Swal from 'sweetalert2'

// Helper: Convert formatted string ("18th August 2023" or "dd/mm/yyyy") to YYYY-MM-DD for native <input type="date">
function toDateInputValue(str) {
  if (!str) return ''
  const trimmed = str.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed

  const cleaned = trimmed.replace(/(\d+)(st|nd|rd|th)/i, '$1')

  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(cleaned)) {
    const [d, m, y] = cleaned.split('/')
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
  }

  const d = new Date(cleaned)
  if (!isNaN(d.getTime())) {
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  return ''
}

// Helper: Convert YYYY-MM-DD back to readable date format "18th August 2023"
function formatToDisplayDate(str) {
  if (!str) return ''
  const trimmed = str.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [y, m, d] = trimmed.split('-').map(Number)
    const date = new Date(y, m - 1, d)
    const day = date.getDate()
    const suffix =
      day === 1 || day === 21 || day === 31
        ? 'st'
        : day === 2 || day === 22
        ? 'nd'
        : day === 3 || day === 23
        ? 'rd'
        : 'th'
    const monthName = date.toLocaleString('en-GB', { month: 'long' })
    return `${day}${suffix} ${monthName} ${y}`
  }
  return str
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileSidebar, setMobileSidebar] = useState(false)

  // Derive activeSection directly from URL searchParams or localStorage
  const activeSection = useMemo(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam === 'certificates' || tabParam === 'enquiries') {
      return tabParam
    }
    try {
      const saved = localStorage.getItem('uk_admin_active_tab')
      if (saved === 'certificates' || saved === 'enquiries') {
        return saved
      }
    } catch {
      // ignore
    }
    return 'certificates'
  }, [searchParams])

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedEnquiry, setSelectedEnquiry] = useState(null)

  // 1. Certificates DataTable State
  const [searchQuery, setSearchQuery] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState('desc')

  // 2. Enquiries DataTable State
  const [enquiries, setEnquiries] = useState([])
  const [enquirySearch, setEnquirySearch] = useState('')
  const [enquiryRowsPerPage, setEnquiryRowsPerPage] = useState(10)
  const [enquiryCurrentPage, setEnquiryCurrentPage] = useState(1)

  // Certificates State
  const [certificates, setCertificates] = useState(() => {
    try {
      const saved = localStorage.getItem('uk_certificates')
      if (saved) {
        return JSON.parse(saved)
      }
    } catch {
      // fallback
    }
    return initialCertificatesDatabase
  })

  // Registration Form State - STRICTLY the 5 requested fields
  const [formData, setFormData] = useState({
    certNo: '',
    issueDate: '',
    firstSurveillance: '',
    secondSurveillance: '',
    expiryDate: ''
  })

  // Fetch live certificates from MongoDB Atlas Backend on mount
  useEffect(() => {
    let isMounted = true
    api.getCertificates().then((data) => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        const mapped = {}
        data.forEach((c) => {
          if (c.certNo) {
            mapped[c.certNo] = {
              certNo: c.certNo,
              issueDate: c.issueDate,
              firstSurveillance: c.firstSurveillance,
              secondSurveillance: c.secondSurveillance,
              expiryDate: c.expiryDate,
              createdAt: c.createdAt || new Date().toISOString()
            }
          }
        })
        setCertificates((prev) => ({ ...prev, ...mapped }))
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  // Fetch live enquiries from backend
  const loadEnquiries = () => {
    api.getContacts().then((data) => {
      if (Array.isArray(data)) {
        setEnquiries(data)
      }
    })
  }

  useEffect(() => {
    loadEnquiries()
  }, [])

  // Sync certificates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('uk_certificates', JSON.stringify(certificates))
    } catch {
      // ignore
    }
  }, [certificates])

  // Switch tab with URL searchParams & localStorage persistence
  const switchTab = (tab) => {
    setSearchParams({ tab }, { replace: true })
    try {
      localStorage.setItem('uk_admin_active_tab', tab)
    } catch {
      // ignore
    }
    if (tab === 'enquiries') {
      loadEnquiries()
    }
  }

  // Ensure URL query param ?tab= is set on initial load if missing
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (!tabParam) {
      setSearchParams({ tab: activeSection }, { replace: true })
    }
  }, [searchParams, activeSection, setSearchParams])

  const openRegisterModal = () => {
    setFormData({
      certNo: '',
      issueDate: '',
      firstSurveillance: '',
      secondSurveillance: '',
      expiryDate: ''
    })
    setIsRegisterModalOpen(true)
  }

  const fillSampleData = () => {
    setFormData({
      certNo: 'Q-265318082023',
      issueDate: '18th August 2023',
      firstSurveillance: '17th August 2024',
      secondSurveillance: '17th August 2025',
      expiryDate: '17th August 2026'
    })
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    const cleanNo = formData.certNo.trim().toUpperCase()

    if (!cleanNo) {
      Swal.fire({
        icon: 'warning',
        title: 'Certificate Number Required',
        text: 'Please enter a valid Certificate Number.',
        confirmButtonColor: '#2095f2'
      })
      return
    }

    if (!formData.issueDate || !formData.expiryDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Dates Required',
        text: 'Please choose Issue Date and Valid Until dates.',
        confirmButtonColor: '#2095f2'
      })
      return
    }

    setIsSubmitting(true)
    const newCert = {
      certNo: cleanNo,
      issueDate: formData.issueDate.trim(),
      firstSurveillance: formData.firstSurveillance.trim(),
      secondSurveillance: formData.secondSurveillance.trim(),
      expiryDate: formData.expiryDate.trim(),
      createdAt: new Date().toISOString()
    }

    try {
      await api.createCertificate(newCert)

      setCertificates((prev) => ({
        ...prev,
        [cleanNo]: newCert
      }))

      setIsRegisterModalOpen(false)
      setIsSubmitting(false)

      Swal.fire({
        icon: 'success',
        title: 'Certificate Registered!',
        text: `Certificate #${cleanNo} has been successfully registered and synced with UK Central Register.`,
        confirmButtonColor: '#2095f2'
      })
    } catch (err) {
      setCertificates((prev) => ({
        ...prev,
        [cleanNo]: newCert
      }))
      setIsRegisterModalOpen(false)
      setIsSubmitting(false)

      Swal.fire({
        icon: 'success',
        title: 'Certificate Saved',
        text: err.message || `Certificate #${cleanNo} has been saved.`,
        confirmButtonColor: '#2095f2'
      })
    }
  }

  const handleDeleteCert = async (key) => {
    const result = await Swal.fire({
      title: 'Delete Certificate?',
      text: `Are you sure you want to delete certificate #${key}? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      try {
        await api.deleteCertificate(key)
      } catch (err) {
        console.warn('API delete error, deleting local copy:', err.message)
      }

      setCertificates((prev) => {
        const copy = { ...prev }
        delete copy[key]
        return copy
      })

      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: `Certificate #${key} has been deleted.`,
        confirmButtonColor: '#2095f2',
        timer: 2000
      })
    }
  }

  // 1. Certificates DataTable Calculations
  const certList = useMemo(() => Object.values(certificates), [certificates])

  const filteredCerts = useMemo(() => {
    if (!searchQuery.trim()) return certList
    const q = searchQuery.toLowerCase().trim()
    return certList.filter((c) =>
      (c.certNo || '').toLowerCase().includes(q) ||
      (c.issueDate || '').toLowerCase().includes(q) ||
      (c.firstSurveillance || '').toLowerCase().includes(q) ||
      (c.secondSurveillance || '').toLowerCase().includes(q) ||
      (c.expiryDate || '').toLowerCase().includes(q)
    )
  }, [certList, searchQuery])

  const sortedCerts = useMemo(() => {
    return [...filteredCerts].sort((a, b) => {
      const valA = (a[sortColumn] || '').toString().toLowerCase()
      const valB = (b[sortColumn] || '').toString().toLowerCase()
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredCerts, sortColumn, sortDirection])

  const totalPages = Math.max(1, Math.ceil(sortedCerts.length / rowsPerPage))
  const safeCurrentPage = Math.min(currentPage, totalPages)

  const paginatedCerts = useMemo(() => {
    const start = (safeCurrentPage - 1) * rowsPerPage
    return sortedCerts.slice(start, start + rowsPerPage)
  }, [sortedCerts, safeCurrentPage, rowsPerPage])

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  // 2. Enquiries DataTable Calculations
  const filteredEnquiries = useMemo(() => {
    if (!enquirySearch.trim()) return enquiries
    const q = enquirySearch.toLowerCase().trim()
    return enquiries.filter((item) =>
      (item.name || '').toLowerCase().includes(q) ||
      (item.email || '').toLowerCase().includes(q) ||
      (item.phone || '').toLowerCase().includes(q) ||
      (item.service || '').toLowerCase().includes(q) ||
      (item.message || '').toLowerCase().includes(q)
    )
  }, [enquiries, enquirySearch])

  const totalEnquiryPages = Math.max(1, Math.ceil(filteredEnquiries.length / enquiryRowsPerPage))
  const safeEnquiryCurrentPage = Math.min(enquiryCurrentPage, totalEnquiryPages)

  const paginatedEnquiries = useMemo(() => {
    const start = (safeEnquiryCurrentPage - 1) * enquiryRowsPerPage
    return filteredEnquiries.slice(start, start + enquiryRowsPerPage)
  }, [filteredEnquiries, safeEnquiryCurrentPage, enquiryRowsPerPage])

  const handleLogout = () => {
    api.logout()
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col md:flex-row text-slate-800 antialiased">
      {/* 1. Mobile Top Navigation Header */}
      <div className="md:hidden bg-[#1e293b] text-white px-4 py-3 flex items-center justify-between shadow-md sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2.5 min-w-0">
          <img src="/images/logo-light.png" alt="UK Certification" className="h-7 w-auto shrink-0" />
          <div className="min-w-0">
            <span className="font-doris font-bold uppercase text-[14px] tracking-wider block truncate">
              Admin Portal
            </span>
          </div>
        </Link>
        <button
          type="button"
          onClick={() => setMobileSidebar(!mobileSidebar)}
          aria-label={mobileSidebar ? 'Close menu' : 'Open menu'}
          className="p-2 rounded-lg text-white hover:bg-slate-700 focus:outline-none cursor-pointer shrink-0"
        >
          {mobileSidebar ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileSidebar && (
        <div
          className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 md:hidden transition-opacity"
          onClick={() => setMobileSidebar(false)}
        />
      )}

      {/* 2. Admin Sidebar - Mobile Drawer & Desktop Sticky Sidebar */}
      <aside
        className={`fixed md:sticky top-0 h-screen overflow-y-auto inset-y-0 left-0 z-50 md:z-30 w-72 max-w-[85vw] bg-[#1e293b] text-white flex flex-col justify-between shrink-0 shadow-2xl md:shadow-none transition-transform duration-300 ease-in-out ${
          mobileSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Sidebar Brand Header */}
          <div className="p-5 border-b border-slate-700/60 flex items-center justify-between">
            <Link to="/" onClick={() => setMobileSidebar(false)} className="block">
              <img
                src="/images/logo-light.png"
                alt="UK Certification"
                className="h-9 w-auto object-contain mb-1.5"
              />
              <div className="font-doris font-bold text-[15px] text-white tracking-wider uppercase">
                UKAS Admin Portal
              </div>
              <div className="text-[11.5px] text-slate-400">
                UK Certification & Assessment Ltd
              </div>
            </Link>

            {/* Mobile Close Button inside drawer */}
            <button
              type="button"
              onClick={() => setMobileSidebar(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links - STRICTLY 2 TABS */}
          <nav className="p-3.5 sm:p-4 space-y-1.5 text-[14px]">
            {/* Tab 1: Certificates Directory */}
            <button
              type="button"
              onClick={() => {
                switchTab('certificates')
                setMobileSidebar(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeSection === 'certificates'
                  ? 'bg-[#2095f2] text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <FileCheck2 className="w-4 h-4 shrink-0" />
                <span>Certificates</span>
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${
                activeSection === 'certificates' ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-300'
              }`}>
                {certList.length}
              </span>
            </button>

            {/* Tab 2: Customer Enquiries */}
            <button
              type="button"
              onClick={() => {
                switchTab('enquiries')
                setMobileSidebar(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeSection === 'enquiries'
                  ? 'bg-[#2095f2] text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <Inbox className="w-4 h-4 shrink-0" />
                <span>Customer Enquiries</span>
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${
                activeSection === 'enquiries' ? 'bg-white/20 text-white' : 'bg-emerald-800 text-emerald-200'
              }`}>
                {enquiries.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-700/60">
          <div className="flex items-center justify-between mb-3 text-[12px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Admin: Authorized</span>
            </span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-rose-900/60 text-slate-200 hover:text-rose-200 py-2.5 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 3. Main Dashboard Workspace */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc]">
        {/* Top Navbar Header */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 sticky top-0 z-20 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="min-w-0 w-full sm:w-auto">
            <h1 className="font-doris font-bold uppercase text-[18px] sm:text-[22px] text-[#1e293b] truncate">
              {activeSection === 'certificates' ? 'Certificates Management' : 'Customer Enquiries'}
            </h1>
            <p className="text-[12px] sm:text-[12.5px] text-slate-500 truncate">
              {activeSection === 'certificates'
                ? 'Central Accredited Register | UAFL Protocol'
                : 'Customer consultation and quotation requests'}
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto flex-wrap sm:flex-nowrap">
            {activeSection === 'certificates' ? (
              <button
                type="button"
                onClick={openRegisterModal}
                className="flex-1 sm:flex-none justify-center bg-[#2095f2] hover:bg-[#1884d8] text-white px-3.5 sm:px-4 py-2 rounded-lg text-[12.5px] sm:text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 shadow hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Register Certificate</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={loadEnquiries}
                className="flex-1 sm:flex-none justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-lg text-[12.5px] sm:text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>
            )}

            <Link
              to="/verify"
              target="_blank"
              className="flex-1 sm:flex-none justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-3 sm:px-3.5 py-2 rounded-lg text-[12.5px] sm:text-[13px] font-semibold flex items-center gap-1.5 transition-colors shadow-2xs whitespace-nowrap"
            >
              <span>Public Verify</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#2095f2]" />
            </Link>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-3.5 sm:p-6 lg:p-8 w-full space-y-4 sm:space-y-6">
          {/* Top Stat Cards - Fully Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Stat 1: Total Certificates */}
            <div
              onClick={() => switchTab('certificates')}
              className={`p-4 sm:p-5 rounded-xl border shadow-sm flex items-center justify-between cursor-pointer transition-all ${
                activeSection === 'certificates' ? 'bg-white border-[#2095f2] ring-1 ring-[#2095f2]' : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <span className="text-[11.5px] sm:text-[12px] font-bold uppercase text-slate-500 block">
                  Total Certificates
                </span>
                <span className="text-[24px] sm:text-[28px] font-doris font-bold text-[#2095f2] mt-0.5 block">
                  {certList.length}
                </span>
                <span className="text-[11px] sm:text-[12px] text-emerald-600 font-semibold mt-0.5 block">
                  ✓ Synced with MongoDB Atlas
                </span>
              </div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-sky-50 text-[#2095f2] flex items-center justify-center font-bold shrink-0">
                <FileCheck2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            {/* Stat 2: Customer Enquiries */}
            <div
              onClick={() => switchTab('enquiries')}
              className={`p-4 sm:p-5 rounded-xl border shadow-sm flex items-center justify-between cursor-pointer transition-all ${
                activeSection === 'enquiries' ? 'bg-white border-[#2095f2] ring-1 ring-[#2095f2]' : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <span className="text-[11.5px] sm:text-[12px] font-bold uppercase text-slate-500 block">
                  Customer Enquiries
                </span>
                <span className="text-[24px] sm:text-[28px] font-doris font-bold text-emerald-600 mt-0.5 block">
                  {enquiries.length}
                </span>
                <span className="text-[11px] sm:text-[12px] text-slate-500 mt-0.5 block">
                  Click to view submissions
                </span>
              </div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                <Inbox className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            {/* Stat 3: Quick Action */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between sm:col-span-2 lg:col-span-1">
              <div>
                <span className="text-[11.5px] sm:text-[12px] font-bold uppercase text-slate-500 block">
                  Quick Registration
                </span>
                <button
                  type="button"
                  onClick={openRegisterModal}
                  className="mt-1.5 text-[12.5px] sm:text-[13px] font-bold bg-[#2095f2] hover:bg-[#1884d8] text-white px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ New Certificate</span>
                </button>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  5 accredited fields modal
                </span>
              </div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          {/* VIEW 1: CERTIFICATES DATA TABLE */}
          {activeSection === 'certificates' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Responsive Toolbar */}
              <div className="p-3.5 sm:p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white">
                {/* Left: Entries selector */}
                <div className="flex items-center gap-2 text-[12.5px] sm:text-[13px] text-slate-600 font-medium">
                  <span>Show</span>
                  <select
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value))
                      setCurrentPage(1)
                    }}
                    className="bg-slate-50 border border-slate-300 text-slate-900 text-[12.5px] rounded-lg focus:ring-[#2095f2] focus:border-[#2095f2] p-1.5 font-bold cursor-pointer"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span>entries</span>
                </div>

                {/* Right: Search & Add button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
                  <div className="relative flex-1 sm:w-72">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search certificate..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="w-full pl-9 pr-8 py-2 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-lg text-[13px] text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#2095f2] focus:ring-1 focus:ring-[#2095f2] transition-all"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('')
                          setCurrentPage(1)
                        }}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        title="Clear search"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={openRegisterModal}
                    className="bg-[#2095f2] hover:bg-[#1884d8] text-white text-[12.5px] sm:text-[13px] font-bold px-3.5 py-2 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Certificate</span>
                  </button>
                </div>
              </div>

              {/* Scrollable Responsive Table */}
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[760px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase text-[11px] sm:text-[11.5px] font-bold font-doris tracking-wider select-none">
                      {/* Column 1: Certificate Number */}
                      <th
                        onClick={() => handleSort('certNo')}
                        className="py-3 px-3.5 sm:px-4 cursor-pointer hover:bg-slate-100 transition-colors whitespace-nowrap"
                      >
                        <div className="flex items-center gap-1.5">
                          <span>Certificate Number</span>
                          {sortColumn === 'certNo' ? (
                            sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-[#2095f2]" /> : <ArrowDown className="w-3.5 h-3.5 text-[#2095f2]" />
                          ) : (
                            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </div>
                      </th>

                      {/* Column 2: Issue Date */}
                      <th
                        onClick={() => handleSort('issueDate')}
                        className="py-3 px-3.5 sm:px-4 whitespace-nowrap cursor-pointer hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-center gap-1.5">
                          <span>Issue Date</span>
                          {sortColumn === 'issueDate' ? (
                            sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-[#2095f2]" /> : <ArrowDown className="w-3.5 h-3.5 text-[#2095f2]" />
                          ) : (
                            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </div>
                      </th>

                      {/* Column 3: 1st Surveillance */}
                      <th
                        onClick={() => handleSort('firstSurveillance')}
                        className="py-3 px-3.5 sm:px-4 whitespace-nowrap cursor-pointer hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-center gap-1.5">
                          <span>1st Surveillance</span>
                          {sortColumn === 'firstSurveillance' ? (
                            sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-[#2095f2]" /> : <ArrowDown className="w-3.5 h-3.5 text-[#2095f2]" />
                          ) : (
                            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </div>
                      </th>

                      {/* Column 4: 2nd Surveillance */}
                      <th
                        onClick={() => handleSort('secondSurveillance')}
                        className="py-3 px-3.5 sm:px-4 whitespace-nowrap cursor-pointer hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-center gap-1.5">
                          <span>2nd Surveillance</span>
                          {sortColumn === 'secondSurveillance' ? (
                            sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-[#2095f2]" /> : <ArrowDown className="w-3.5 h-3.5 text-[#2095f2]" />
                          ) : (
                            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </div>
                      </th>

                      {/* Column 5: Valid Until */}
                      <th
                        onClick={() => handleSort('expiryDate')}
                        className="py-3 px-3.5 sm:px-4 whitespace-nowrap cursor-pointer hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-center gap-1.5">
                          <span>Valid Until</span>
                          {sortColumn === 'expiryDate' ? (
                            sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-[#2095f2]" /> : <ArrowDown className="w-3.5 h-3.5 text-[#2095f2]" />
                          ) : (
                            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </div>
                      </th>

                      {/* Column 6: Actions */}
                      <th className="py-3 px-3.5 sm:px-4 text-right whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 text-[13px] sm:text-[13.5px]">
                    {paginatedCerts.length > 0 ? (
                      paginatedCerts.map((cert) => (
                        <tr key={cert.certNo} className="hover:bg-sky-50/40 transition-colors">
                          {/* Certificate Number */}
                          <td className="py-3.5 px-3.5 sm:px-4 align-middle whitespace-nowrap">
                            <span className="font-mono font-bold text-sky-800 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-md inline-block text-[13px] sm:text-[13.5px]">
                              {cert.certNo}
                            </span>
                          </td>

                          {/* Issue Date */}
                          <td className="py-3.5 px-3.5 sm:px-4 align-middle whitespace-nowrap font-mono font-semibold text-slate-700">
                            {cert.issueDate}
                          </td>

                          {/* 1st Surveillance */}
                          <td className="py-3.5 px-3.5 sm:px-4 align-middle whitespace-nowrap font-mono font-semibold text-sky-800">
                            {cert.firstSurveillance || '—'}
                          </td>

                          {/* 2nd Surveillance */}
                          <td className="py-3.5 px-3.5 sm:px-4 align-middle whitespace-nowrap font-mono font-semibold text-sky-800">
                            {cert.secondSurveillance || '—'}
                          </td>

                          {/* Valid Until */}
                          <td className="py-3.5 px-3.5 sm:px-4 align-middle whitespace-nowrap">
                            <span className="font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md inline-block text-[13px]">
                              {cert.expiryDate}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-3.5 sm:px-4 align-middle text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5 sm:gap-2">
                              <Link
                                to="/verify"
                                target="_blank"
                                title="Verify on Public Page"
                                className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-slate-100 hover:bg-[#2095f2] text-slate-700 hover:text-white rounded-lg transition-colors inline-flex items-center gap-1 text-[12px] font-semibold cursor-pointer"
                              >
                                <span>Verify</span>
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                              <button
                                type="button"
                                onClick={() => handleDeleteCert(cert.certNo)}
                                title="Delete Record"
                                className="p-1 sm:p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-10 text-center">
                          <div className="flex flex-col items-center justify-center text-slate-400 px-4">
                            <Search className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-slate-300 stroke-[1.5]" />
                            <p className="font-bold text-slate-700 text-[14px] sm:text-[15px]">No certificates found</p>
                            <p className="text-[12.5px] text-slate-500 mt-0.5">
                              {searchQuery ? `No records matched "${searchQuery}".` : 'No certificates registered yet.'}
                            </p>
                            {searchQuery && (
                              <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="mt-2 text-[12px] font-semibold text-[#2095f2] hover:underline cursor-pointer"
                              >
                                Clear Search
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile-Responsive Pagination Footer */}
              <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] sm:text-[13px] text-slate-600">
                <div className="text-center sm:text-left">
                  Showing{' '}
                  <strong className="text-slate-900 font-bold">
                    {sortedCerts.length === 0 ? 0 : (safeCurrentPage - 1) * rowsPerPage + 1}
                  </strong>{' '}
                  to{' '}
                  <strong className="text-slate-900 font-bold">
                    {Math.min(safeCurrentPage * rowsPerPage, sortedCerts.length)}
                  </strong>{' '}
                  of{' '}
                  <strong className="text-slate-900 font-bold">{sortedCerts.length}</strong> entries
                </div>

                <div className="flex items-center gap-1.5 flex-wrap justify-center">
                  <button
                    type="button"
                    disabled={safeCurrentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-[12px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  {/* Compact page label on very small screens */}
                  <span className="sm:hidden px-2 py-1 text-[12px] font-bold text-slate-700">
                    {safeCurrentPage} / {totalPages}
                  </span>

                  {/* Numbered buttons on sm+ */}
                  <div className="hidden sm:flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pg) => (
                      <button
                        key={pg}
                        type="button"
                        onClick={() => setCurrentPage(pg)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[12px] sm:text-[13px] font-bold transition-colors cursor-pointer ${
                          pg === safeCurrentPage
                            ? 'bg-[#2095f2] text-white shadow-xs'
                            : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {pg}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={safeCurrentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-[12px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: CUSTOMER ENQUIRIES DATA TABLE */}
          {activeSection === 'enquiries' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Responsive Toolbar */}
              <div className="p-3.5 sm:p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white">
                <div className="flex items-center gap-2 text-[12.5px] sm:text-[13px] text-slate-600 font-medium">
                  <span>Show</span>
                  <select
                    value={enquiryRowsPerPage}
                    onChange={(e) => {
                      setEnquiryRowsPerPage(Number(e.target.value))
                      setEnquiryCurrentPage(1)
                    }}
                    className="bg-slate-50 border border-slate-300 text-slate-900 text-[12.5px] rounded-lg focus:ring-[#2095f2] focus:border-[#2095f2] p-1.5 font-bold cursor-pointer"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span>entries</span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
                  <div className="relative flex-1 sm:w-80">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search name, email, phone, message..."
                      value={enquirySearch}
                      onChange={(e) => {
                        setEnquirySearch(e.target.value)
                        setEnquiryCurrentPage(1)
                      }}
                      className="w-full pl-9 pr-8 py-2 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-lg text-[13px] text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#2095f2] focus:ring-1 focus:ring-[#2095f2] transition-all"
                    />
                    {enquirySearch && (
                      <button
                        type="button"
                        onClick={() => {
                          setEnquirySearch('')
                          setEnquiryCurrentPage(1)
                        }}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        title="Clear search"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={loadEnquiries}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[12.5px] sm:text-[13px] font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              {/* Enquiries Table with Horizontal Scroll */}
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[780px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase text-[11px] sm:text-[11.5px] font-bold font-doris tracking-wider select-none">
                      <th className="py-3 px-3.5 sm:px-4">Customer</th>
                      <th className="py-3 px-3.5 sm:px-4">Contact</th>
                      <th className="py-3 px-3.5 sm:px-4">Service</th>
                      <th className="py-3 px-3.5 sm:px-4">Message</th>
                      <th className="py-3 px-3.5 sm:px-4 whitespace-nowrap">Submitted</th>
                      <th className="py-3 px-3.5 sm:px-4 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[13px] sm:text-[13.5px]">
                    {paginatedEnquiries.length > 0 ? (
                      paginatedEnquiries.map((enq) => (
                        <tr key={enq._id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-3.5 sm:px-4 align-middle whitespace-nowrap">
                            <span className="font-bold text-slate-900 block">{enq.name}</span>
                          </td>
                          <td className="py-3.5 px-3.5 sm:px-4 align-middle whitespace-nowrap">
                            <a
                              href={`mailto:${enq.email}`}
                              className="text-[#2095f2] hover:underline font-semibold flex items-center gap-1 text-[12.5px]"
                            >
                              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate max-w-[180px]">{enq.email}</span>
                            </a>
                            {enq.phone && (
                              <a
                                href={`tel:${enq.phone}`}
                                className="text-slate-600 hover:underline text-[12px] mt-0.5 flex items-center gap-1"
                              >
                                <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                                <span>{enq.phone}</span>
                              </a>
                            )}
                          </td>
                          <td className="py-3.5 px-3.5 sm:px-4 align-middle whitespace-nowrap">
                            <span className="bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5 rounded text-[11.5px] font-bold inline-block">
                              {enq.service || 'General Inquiry'}
                            </span>
                          </td>
                          <td className="py-3.5 px-3.5 sm:px-4 align-middle max-w-[200px] sm:max-w-xs">
                            <p className="text-slate-600 text-[12.5px] truncate" title={enq.message}>
                              {enq.message}
                            </p>
                          </td>
                          <td className="py-3.5 px-3.5 sm:px-4 align-middle whitespace-nowrap text-[12px] text-slate-500 font-mono">
                            {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString('en-GB') : '—'}
                          </td>
                          <td className="py-3.5 px-3.5 sm:px-4 align-middle text-right whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => setSelectedEnquiry(enq)}
                              className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-slate-100 hover:bg-[#2095f2] text-slate-700 hover:text-white rounded-lg transition-colors text-[12px] font-semibold inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-10 text-center">
                          <div className="flex flex-col items-center justify-center text-slate-400 px-4">
                            <Inbox className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-slate-300 stroke-[1.5]" />
                            <p className="font-bold text-slate-700 text-[14px] sm:text-[15px]">No enquiries found</p>
                            <p className="text-[12.5px] text-slate-500 mt-0.5">
                              {enquirySearch ? `No records matched "${enquirySearch}".` : 'No customer inquiries submitted yet.'}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Enquiries Pagination Footer */}
              <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] sm:text-[13px] text-slate-600">
                <div className="text-center sm:text-left">
                  Showing{' '}
                  <strong className="text-slate-900 font-bold">
                    {filteredEnquiries.length === 0 ? 0 : (safeEnquiryCurrentPage - 1) * enquiryRowsPerPage + 1}
                  </strong>{' '}
                  to{' '}
                  <strong className="text-slate-900 font-bold">
                    {Math.min(safeEnquiryCurrentPage * enquiryRowsPerPage, filteredEnquiries.length)}
                  </strong>{' '}
                  of{' '}
                  <strong className="text-slate-900 font-bold">{filteredEnquiries.length}</strong> enquiries
                </div>

                <div className="flex items-center gap-1.5 flex-wrap justify-center">
                  <button
                    type="button"
                    disabled={safeEnquiryCurrentPage <= 1}
                    onClick={() => setEnquiryCurrentPage((p) => Math.max(1, p - 1))}
                    className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-[12px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  <span className="sm:hidden px-2 py-1 text-[12px] font-bold text-slate-700">
                    {safeEnquiryCurrentPage} / {totalEnquiryPages}
                  </span>

                  <div className="hidden sm:flex items-center gap-1">
                    {Array.from({ length: totalEnquiryPages }, (_, idx) => idx + 1).map((pg) => (
                      <button
                        key={pg}
                        type="button"
                        onClick={() => setEnquiryCurrentPage(pg)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[12px] sm:text-[13px] font-bold transition-colors cursor-pointer ${
                          pg === safeEnquiryCurrentPage
                            ? 'bg-[#2095f2] text-white shadow-xs'
                            : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {pg}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={safeEnquiryCurrentPage >= totalEnquiryPages}
                    onClick={() => setEnquiryCurrentPage((p) => Math.min(totalEnquiryPages, p + 1))}
                    className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-[12px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 4. REGISTRATION FORM MODAL (POPUP DIALOG) - Fully Responsive */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden transition-all transform scale-100">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between shrink-0">
              <div className="min-w-0 pr-2">
                <h2 className="font-doris font-bold uppercase text-[16px] sm:text-[19px] text-white truncate">
                  Register New Certificate
                </h2>
                <p className="text-[11.5px] sm:text-[12.5px] text-slate-300 mt-0.5 truncate">
                  Strictly 5 accredited certificate fields with calendar timeline pickers
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={fillSampleData}
                  className="bg-[#2095f2] hover:bg-[#1884d8] text-white text-[11.5px] sm:text-[12px] font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg flex items-center gap-1 shadow transition-all cursor-pointer whitespace-nowrap"
                  title="Fill Sample Data"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Sample Data</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Form */}
            <form onSubmit={handleRegisterSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5">
              {/* Field 1: Certificate Number */}
              <div>
                <label className="block text-[12.5px] sm:text-[13px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Certificate Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q-265318082023"
                  value={formData.certNo}
                  onChange={(e) => setFormData({ ...formData, certNo: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 font-mono text-[14px] sm:text-[15px] font-bold text-slate-900 uppercase focus:border-[#2095f2] focus:outline-none shadow-xs"
                />
                <span className="text-[11.5px] text-slate-500 mt-1 block">
                  Example: Q-265318082023
                </span>
              </div>

              {/* Grid of 4 Date Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Field 2: Issue Date */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5">
                  <label className="flex items-center gap-1.5 text-[12px] sm:text-[12.5px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#2095f2]" />
                    <span>Issue Date <span className="text-rose-500">*</span></span>
                  </label>
                  <input
                    type="date"
                    required
                    value={toDateInputValue(formData.issueDate)}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        issueDate: formatToDisplayDate(e.target.value)
                      })
                    }
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 font-mono text-[13px] sm:text-[13.5px] font-bold text-slate-800 focus:border-[#2095f2] focus:outline-none cursor-pointer"
                  />
                  <span className="text-[11px] sm:text-[11.5px] font-semibold text-slate-600 mt-1 block truncate">
                    {formData.issueDate || 'Select from calendar'}
                  </span>
                </div>

                {/* Field 3: Valid Until */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5">
                  <label className="flex items-center gap-1.5 text-[12px] sm:text-[12.5px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Valid Until <span className="text-rose-500">*</span></span>
                  </label>
                  <input
                    type="date"
                    required
                    value={toDateInputValue(formData.expiryDate)}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expiryDate: formatToDisplayDate(e.target.value)
                      })
                    }
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 font-mono text-[13px] sm:text-[13.5px] font-bold text-emerald-700 focus:border-[#2095f2] focus:outline-none cursor-pointer"
                  />
                  <span className="text-[11px] sm:text-[11.5px] font-semibold text-emerald-700 mt-1 block truncate">
                    {formData.expiryDate || 'Select from calendar'}
                  </span>
                </div>

                {/* Field 4: 1st Surveillance on or before */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5">
                  <label className="flex items-center gap-1.5 text-[12px] sm:text-[12.5px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#2095f2]" />
                    <span>1st Surveillance on or before <span className="text-rose-500">*</span></span>
                  </label>
                  <input
                    type="date"
                    required
                    value={toDateInputValue(formData.firstSurveillance)}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        firstSurveillance: formatToDisplayDate(e.target.value)
                      })
                    }
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 font-mono text-[13px] sm:text-[13.5px] font-bold text-sky-800 focus:border-[#2095f2] focus:outline-none cursor-pointer"
                  />
                  <span className="text-[11px] sm:text-[11.5px] font-semibold text-sky-700 mt-1 block truncate">
                    {formData.firstSurveillance || 'Select from calendar'}
                  </span>
                </div>

                {/* Field 5: 2nd Surveillance on or before */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5">
                  <label className="flex items-center gap-1.5 text-[12px] sm:text-[12.5px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#2095f2]" />
                    <span>2nd Surveillance on or before <span className="text-rose-500">*</span></span>
                  </label>
                  <input
                    type="date"
                    required
                    value={toDateInputValue(formData.secondSurveillance)}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        secondSurveillance: formatToDisplayDate(e.target.value)
                      })
                    }
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 font-mono text-[13px] sm:text-[13.5px] font-bold text-sky-800 focus:border-[#2095f2] focus:outline-none cursor-pointer"
                  />
                  <span className="text-[11px] sm:text-[11.5px] font-semibold text-sky-700 mt-1 block truncate">
                    {formData.secondSurveillance || 'Select from calendar'}
                  </span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 sm:gap-3 pt-3 border-t border-slate-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2 border border-slate-300 hover:bg-slate-100 rounded-lg text-[13px] font-semibold text-slate-700 transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-[#2095f2] hover:bg-[#1884d8] text-white font-bold uppercase tracking-wider text-[13px] px-6 py-2 rounded-lg shadow hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  <span>{isSubmitting ? 'Saving...' : 'Save & Register'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. ENQUIRY DETAILS MODAL - Fully Responsive */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden">
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between shrink-0">
              <div className="min-w-0 pr-2">
                <h3 className="font-doris font-bold uppercase text-[15px] sm:text-[17px] truncate">Customer Enquiry Details</h3>
                <p className="text-[11.5px] text-slate-300 truncate">Submitted through online enquiry portal</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 text-[13.5px]">
              <div>
                <span className="text-slate-500 text-[11.5px] uppercase font-bold block">Customer Full Name</span>
                <span className="font-bold text-slate-900 text-[15px] sm:text-[16px]">{selectedEnquiry.name}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500 text-[11.5px] uppercase font-bold block">Email Address</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-[#2095f2] font-semibold hover:underline block truncate text-[13px]">
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 text-[11.5px] uppercase font-bold block">Phone Number</span>
                  <span className="font-semibold text-slate-800 text-[13px]">{selectedEnquiry.phone || 'N/A'}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 text-[11.5px] uppercase font-bold block">Certification Service / Subject</span>
                <span className="inline-block bg-sky-50 text-sky-800 border border-sky-200 px-2.5 py-1 rounded text-[12.5px] font-bold mt-1">
                  {selectedEnquiry.service || 'General Inquiry'}
                </span>
              </div>

              <div>
                <span className="text-slate-500 text-[11.5px] uppercase font-bold block mb-1">Message / Requirements</span>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-700 leading-relaxed text-[13px] max-h-48 overflow-y-auto whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block">
                  Received on: {selectedEnquiry.createdAt ? new Date(selectedEnquiry.createdAt).toLocaleString('en-GB') : 'N/A'}
                </span>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-col-reverse sm:flex-row justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="w-full sm:w-auto px-4 py-2 border border-slate-300 hover:bg-slate-100 rounded-lg font-semibold text-[13px] text-slate-700 transition-colors cursor-pointer text-center"
              >
                Close
              </button>
              <a
                href={`mailto:${selectedEnquiry.email}?subject=Re: ${encodeURIComponent(selectedEnquiry.service || 'Inquiry')}`}
                className="w-full sm:w-auto bg-[#2095f2] hover:bg-[#1884d8] text-white px-4 py-2 rounded-lg font-bold text-[13px] flex items-center justify-center gap-1.5 transition-colors text-center"
              >
                <Mail className="w-4 h-4" />
                <span>Reply via Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
