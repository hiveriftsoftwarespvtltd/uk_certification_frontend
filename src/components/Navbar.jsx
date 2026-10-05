import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { serviceCategories } from '../data/servicesCatalog'

export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [activeServiceCategory, setActiveServiceCategory] = useState(serviceCategories[0].id)
  const [mobileSubcategory, setMobileSubcategory] = useState(null)

  const currentPath = location.pathname.toLowerCase().replace(/\.aspx$/, '')

  const isAboutActive = [
    '/about-us',
    '/accreditation',
    '/corporate-policies',
    '/corporate-membership'
  ].includes(currentPath)

  const allServicePaths = serviceCategories.flatMap((cat) =>
    cat.items.map((i) => i.path.toLowerCase())
  )

  const isServicesActive =
    currentPath === '/services' || allServicePaths.includes(currentPath)

  const isPathActive = (targetPath) => currentPath === targetPath.toLowerCase()

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  const closeMenu = () => {
    setMobileOpen(false)
    setActiveDropdown(null)
    setMobileSubcategory(null)
  }

  return (
    <>
      {/* 1. Top Black Header Bar (.top) */}
      <section className="bg-[#222] py-2.5 px-4">
        <div className="max-w-[1140px] mx-auto flex items-center justify-between">
          <Link to="/" onClick={closeMenu} className="inline-block py-1">
            <img
              src="/images/logo-light.png"
              alt="UK Certification and Assessment Ltd"
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </Link>
          <div className="text-right text-xs text-white/70 hidden sm:block">
            <span className="text-white/90">Registration: UK Assessment Body</span>
          </div>
        </div>
      </section>

      {/* 2. White Sticky Navbar (header) */}
      <header className="sticky top-0 bg-white border-t border-[#eee] shadow-[0_2px_10px_rgba(0,0,0,0.1)] z-50">
        <div className="max-w-[1140px] mx-auto px-4 flex items-center justify-between">
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center text-[15px] uppercase nav-link-doris">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `py-3.5 px-3.5 font-bold transition-colors ${
                  isActive ? 'text-[#2095f2]' : 'text-black/60 hover:text-[#2095f2]'
                }`
              }
            >
              <b>Home</b>
            </NavLink>

            {/* About Us Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className={`py-3.5 px-3.5 font-bold flex items-center gap-1 transition-colors uppercase ${
                  isAboutActive ? 'text-[#2095f2]' : 'text-black/60 hover:text-[#2095f2]'
                }`}
              >
                <b>About Us</b>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block w-56 bg-white text-slate-700 shadow-xl border border-slate-100 rounded-b py-2 z-50 normal-case text-[14px]">
                <Link
                  to="/about-us"
                  className={`block px-4 py-2 transition-colors ${
                    isPathActive('/about-us') ? 'bg-[#2095f2] !text-white font-semibold' : 'hover:bg-[#2095f2] hover:text-white'
                  }`}
                >
                  About Us
                </Link>
                <Link
                  to="/accreditation"
                  className={`block px-4 py-2 transition-colors ${
                    isPathActive('/accreditation') ? 'bg-[#2095f2] !text-white font-semibold' : 'hover:bg-[#2095f2] hover:text-white'
                  }`}
                >
                  Accreditation
                </Link>
                <Link
                  to="/corporate-policies"
                  className={`block px-4 py-2 transition-colors ${
                    isPathActive('/corporate-policies') ? 'bg-[#2095f2] !text-white font-semibold' : 'hover:bg-[#2095f2] hover:text-white'
                  }`}
                >
                  Corporate Policies
                </Link>
                <Link
                  to="/corporate-membership"
                  className={`block px-4 py-2 transition-colors ${
                    isPathActive('/corporate-membership') ? 'bg-[#2095f2] !text-white font-semibold' : 'hover:bg-[#2095f2] hover:text-white'
                  }`}
                >
                  Corporate Membership
                </Link>
              </div>
            </div>

            {/* Services Multi-level Dropdown */}
            <div className="relative group">
              <NavLink
                to="/services"
                className={`py-3.5 px-3.5 font-bold flex items-center gap-1 transition-colors uppercase ${
                  isServicesActive
                    ? 'text-[#2095f2]'
                    : 'text-black/60 hover:text-[#2095f2]'
                }`}
              >
                <b>Services</b>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
              </NavLink>

              <div className="absolute left-0 top-full hidden group-hover:flex w-[820px] bg-white text-slate-700 shadow-2xl border border-slate-100 rounded-b z-50 normal-case text-[14px] overflow-hidden">
                {/* Category List (Left Column) */}
                <div className="w-[280px] bg-[#f8fafc] border-r border-slate-200/80 p-3 space-y-1.5 shrink-0">
                  <div className="px-3 py-1.5 text-[11px] font-doris font-bold uppercase tracking-wider text-slate-500">
                    Service Categories
                  </div>
                  {serviceCategories.map((cat) => {
                    const isHovered = activeServiceCategory === cat.id
                    const CatIcon = cat.icon
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onMouseEnter={() => setActiveServiceCategory(cat.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-md flex items-center justify-between text-[13.5px] font-semibold transition-all ${
                          isHovered
                            ? 'bg-[#2095f2] text-white shadow-sm'
                            : 'text-slate-700 hover:bg-slate-200/60'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <CatIcon className={`w-4 h-4 ${isHovered ? 'text-white' : 'text-[#2095f2]'}`} />
                          {cat.title}
                        </span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isHovered ? 'translate-x-0.5' : 'opacity-40'}`} />
                      </button>
                    )
                  })}

                  <div className="pt-3 border-t border-slate-200/80 mt-2 px-1">
                    <Link
                      to="/services"
                      onClick={closeMenu}
                      className="block text-center bg-white border border-[#2095f2] text-[#2095f2] hover:bg-[#2095f2] hover:text-white rounded py-2 text-[12px] font-bold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      View All Services Overview
                    </Link>
                  </div>
                </div>

                {/* Subdropdown Items Grid (Right Column) */}
                <div className="flex-1 p-5 bg-white flex flex-col justify-between">
                  <div>
                    {(() => {
                      const currentCat =
                        serviceCategories.find((c) => c.id === activeServiceCategory) ||
                        serviceCategories[0]
                      return (
                        <>
                          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                            <h4 className="font-doris font-bold text-[#222] text-[16px] uppercase">
                              {currentCat.title}
                            </h4>
                            <span className="text-[12px] text-slate-500 font-medium">
                              {currentCat.items.length} Standards & Programs
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                            {currentCat.items.map((item, idx) => (
                              <Link
                                key={idx}
                                to={item.path}
                                onClick={closeMenu}
                                className={`px-2.5 py-1.5 rounded text-[13px] hover:bg-[#2095f2] hover:text-white transition-colors flex items-center justify-between group/item ${
                                  isPathActive(item.path)
                                    ? 'bg-[#2095f2] text-white font-bold'
                                    : 'text-slate-700'
                                }`}
                              >
                                <span className="truncate">{item.name}</span>
                                <span className={`text-[10px] font-mono px-1 rounded uppercase shrink-0 ml-1.5 ${
                                  isPathActive(item.path)
                                    ? 'bg-white/20 text-white'
                                    : 'bg-slate-100 text-slate-600 group-hover/item:bg-white/20 group-hover/item:text-white'
                                }`}>
                                  {item.code}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </>
                      )
                    })()}
                  </div>

                  <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-[12px] text-slate-500">
                    <span>Accredited Assessment & Fast Turnaround</span>
                    <Link to="/contact" onClick={closeMenu} className="text-[#2095f2] font-bold hover:underline">
                      Get Quotation & Audit Scope →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Policy & Procedure Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="py-3.5 px-3.5 font-bold text-black/60 hover:text-[#2095f2] flex items-center gap-1 transition-colors uppercase"
              >
                <b>Policy and Procedure</b>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block w-72 bg-white text-slate-700 shadow-xl border border-slate-100 rounded-b py-2 z-50 normal-case text-[14px]">
                <Link to="/appeal-complaints" className="block px-4 py-2 hover:bg-[#2095f2] hover:text-white transition-colors">
                  Appeal & Complaints Handling
                </Link>
                <Link to="/ukas-impartiality-policy" className="block px-4 py-2 hover:bg-[#2095f2] hover:text-white transition-colors">
                  UKAS Impartiality Policy
                </Link>
                <Link to="/certification-process" className="block px-4 py-2 hover:bg-[#2095f2] hover:text-white transition-colors">
                  Certification Process
                </Link>
                <Link to="/right-and-duty" className="block px-4 py-2 hover:bg-[#2095f2] hover:text-white transition-colors">
                  Right and Duty of Certified Org
                </Link>
                <Link to="/ukas-rules" className="block px-4 py-2 hover:bg-[#2095f2] hover:text-white transition-colors">
                  UKAS Rules for Use of Logo
                </Link>
              </div>
            </div>

            <NavLink
              to="/verify"
              className={({ isActive }) =>
                `py-3.5 px-3.5 font-bold transition-colors ${
                  isActive ? 'text-[#2095f2]' : 'text-black/60 hover:text-[#2095f2]'
                }`
              }
            >
              <b>Verify Certificate</b>
            </NavLink>

            <NavLink
              to="/enquiry"
              className={({ isActive }) =>
                `py-3.5 px-3.5 font-bold transition-colors ${
                  isActive ? 'text-[#2095f2]' : 'text-black/60 hover:text-[#2095f2]'
                }`
              }
            >
              <b>Enquiry</b>
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `py-3.5 px-3.5 font-bold transition-colors ${
                  isActive ? 'text-[#2095f2]' : 'text-black/60 hover:text-[#2095f2]'
                }`
              }
            >
              <b>Contact Us</b>
            </NavLink>
          </nav>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden py-3 text-slate-800"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 text-sm uppercase font-bold nav-link-doris">
            <Link to="/" onClick={closeMenu} className="block py-2 text-[#2095f2] border-b border-slate-100">
              Home
            </Link>
            <div className="border-b border-slate-100 py-1">
              <button
                type="button"
                onClick={() => toggleDropdown('mobileAbout')}
                className="w-full flex items-center justify-between py-2 text-black/70 uppercase font-bold"
              >
                <span>About Us</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'mobileAbout' ? 'rotate-180 text-[#2095f2]' : ''}`} />
              </button>
              {activeDropdown === 'mobileAbout' && (
                <div className="pl-4 pb-2 space-y-1.5 normal-case font-normal text-[14px]">
                  <Link to="/about-us" onClick={closeMenu} className="block py-1 text-slate-700 hover:text-[#2095f2]">
                    About Us
                  </Link>
                  <Link to="/accreditation" onClick={closeMenu} className="block py-1 text-slate-700 hover:text-[#2095f2]">
                    Accreditation
                  </Link>
                  <Link to="/corporate-policies" onClick={closeMenu} className="block py-1 text-slate-700 hover:text-[#2095f2]">
                    Corporate Policies
                  </Link>
                  <Link to="/corporate-membership" onClick={closeMenu} className="block py-1 text-slate-700 hover:text-[#2095f2]">
                    Corporate Membership
                  </Link>
                </div>
              )}
            </div>
            {/* Mobile Services Accordion */}
            <div className="border-b border-slate-100 py-1">
              <button
                type="button"
                onClick={() => toggleDropdown('mobileServices')}
                className="w-full flex items-center justify-between py-2 text-black/70 uppercase font-bold"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeDropdown === 'mobileServices' ? 'rotate-180 text-[#2095f2]' : ''
                  }`}
                />
              </button>
              {activeDropdown === 'mobileServices' && (
                <div className="pl-3 pb-2 space-y-2 normal-case font-normal text-[14px]">
                  <Link
                    to="/services"
                    onClick={closeMenu}
                    className="block py-1 text-[#2095f2] font-bold"
                  >
                    View All Services Overview →
                  </Link>
                  {serviceCategories.map((cat) => (
                    <div key={cat.id} className="border-l-2 border-slate-200 pl-3">
                      <button
                        type="button"
                        onClick={() =>
                          setMobileSubcategory(
                            mobileSubcategory === cat.id ? null : cat.id
                          )
                        }
                        className="w-full flex items-center justify-between py-1 text-slate-800 font-semibold text-[13.5px]"
                      >
                        <span>{cat.title}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${
                            mobileSubcategory === cat.id ? 'rotate-180 text-[#2095f2]' : ''
                          }`}
                        />
                      </button>
                      {mobileSubcategory === cat.id && (
                        <div className="pl-2 py-1 space-y-1 text-[13px]">
                          {cat.items.map((item, idx) => (
                            <Link
                              key={idx}
                              to={item.path}
                              onClick={closeMenu}
                              className="block py-0.5 text-slate-600 hover:text-[#2095f2]"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Link to="/certification-process" onClick={closeMenu} className="block py-2 text-black/70 border-b border-slate-100">
              Policy and Procedure
            </Link>
            <Link to="/verify" onClick={closeMenu} className="block py-2 text-black/70 border-b border-slate-100">
              Verify Certificate
            </Link>
            <Link to="/enquiry" onClick={closeMenu} className="block py-2 text-black/70 border-b border-slate-100">
              Enquiry
            </Link>
            <Link to="/contact" onClick={closeMenu} className="block py-2 text-black/70">
              Contact Us
            </Link>
          </div>
        )}
      </header>
    </>
  )
}
