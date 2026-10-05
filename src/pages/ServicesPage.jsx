import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  CheckCircle2
} from 'lucide-react'
import SidebarServices from '../components/SidebarServices'
import { serviceCategories } from '../data/servicesCatalog'

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('all')

  const displayedCategories =
    activeTab === 'all'
      ? serviceCategories
      : serviceCategories.filter((c) => c.id === activeTab)

  return (
    <div className="bg-white min-h-screen text-[#333]">
      {/* 1. Page Header (.content-heading) */}
      <section
        className="py-14 text-center text-white"
        style={{ background: 'radial-gradient(circle, #444, #000)' }}
      >
        <div className="max-w-[1140px] mx-auto px-4">
          <h1 className="font-doris font-bold uppercase text-[32px] sm:text-[38px] text-white">
            Our Services
          </h1>
          <p className="text-[15px] sm:text-[16px] text-white/90 mt-2 max-w-2xl mx-auto font-medium">
            Accredited Management System Certification, Product Conformity, Professional Auditor Training & Third-Party Inspection
          </p>
        </div>
      </section>

      {/* 2. Main Content & Sidebar */}
      <div className="max-w-[1140px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column (order-2 md:order-1): Sidebar */}
          <div className="md:col-span-4 order-2 md:order-1">
            <SidebarServices />
          </div>

          {/* Right Column (order-1 md:order-2): Services Directory */}
          <main className="md:col-span-8 order-1 md:order-2 space-y-8">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded text-[13px] font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'all'
                    ? 'bg-[#2095f2] text-white shadow-sm'
                    : 'bg-[#f5f5f5] text-[#555] hover:bg-slate-200'
                }`}
              >
                All Services ({serviceCategories.reduce((acc, c) => acc + c.items.length, 0)})
              </button>
              {serviceCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 py-2 rounded text-[13px] font-bold uppercase tracking-wider transition-colors ${
                    activeTab === cat.id
                      ? 'bg-[#2095f2] text-white shadow-sm'
                      : 'bg-[#f5f5f5] text-[#555] hover:bg-slate-200'
                  }`}
                >
                  {cat.shortTitle} ({cat.items.length})
                </button>
              ))}
            </div>

            {/* Category Sections */}
            <div className="space-y-10">
              {displayedCategories.map((category) => {
                const CategoryIcon = category.icon
                return (
                  <section key={category.id} className="space-y-4">
                    <div className="flex items-center gap-3 pb-2 border-b-2 border-[#2095f2]">
                      <div className="w-10 h-10 rounded-lg bg-sky-100 text-[#2095f2] flex items-center justify-center shrink-0">
                        <CategoryIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="font-doris font-bold uppercase text-[20px] text-[#222]">
                          {category.title}
                        </h2>
                        <p className="text-[13px] text-[#666] leading-tight">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {category.items.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          className="group bg-[#f9fafb] hover:bg-white border border-[#e5e7eb] hover:border-[#2095f2] rounded-lg p-4 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-[11px] font-mono font-bold bg-[#e0f2fe] text-[#0369a1] px-2 py-0.5 rounded uppercase">
                                {item.code}
                              </span>
                              <span className="text-[11px] font-medium text-slate-500">
                                {item.tag}
                              </span>
                            </div>
                            <h3 className="font-bold text-[15px] text-[#222] group-hover:text-[#2095f2] transition-colors leading-snug">
                              {item.name}
                            </h3>
                          </div>

                          <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[13px] text-[#2095f2] font-semibold">
                            <span>View Full Details</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>

            {/* Why Choose UKAS Cert Value Box */}
            <div className="bg-[#f8f9fa] border border-[#dee2e6] rounded-xl p-6 sm:p-7 space-y-4">
              <h3 className="font-doris uppercase font-bold text-[19px] text-[#222]">
                Our Assurance & Accreditation Standards
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[14px]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span>UAFL Directly Accredited Certification Body since 2020</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span>Exemplar Global (RABQSA) Certified Training Design</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span>Turnaround of final certificate within 2-3 working days</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span>Online Public Certificate Verification with Unique Certificate ID</span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* 3. Callout Strip (.wrap1) */}
      <section className="bg-[#2095f2] text-white py-10 mt-10">
        <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-doris text-[32px] sm:text-[35px] font-bold leading-tight !text-white">
              Request for Quotation
            </h3>
            <h6 className="text-[20px] sm:text-[25px] uppercase font-normal mt-1 !text-white">
              Proposal & Sample ISO Certificate
            </h6>
          </div>
          <div>
            <Link
              to="/contact"
              className="bg-white !text-[#222] hover:bg-slate-100 rounded-[50px] px-10 py-2.5 uppercase font-bold text-[14px] tracking-wide inline-block shadow transition-transform hover:scale-105"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
