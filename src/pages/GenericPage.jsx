import { useLocation, Link } from 'react-router-dom'
import SidebarServices from '../components/SidebarServices'
import servicesData from '../data/servicesData.json'

export default function GenericPage() {
  const location = useLocation()
  
  // Extract clean slug from path (e.g. "/iso-certification" or "/iso-certification.aspx" -> "iso-certification")
  const slug = location.pathname
    .toLowerCase()
    .replace(/^\//, '')
    .replace(/\.aspx$/, '')

  const pageData = servicesData[slug]

  const title = pageData?.title || slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  const contentHtml = pageData?.content || `
    <h5>${title}</h5>
    <p>We provide comprehensive accredited assessment, inspection, and certification services compliant with international standards.</p>
    <p>Please contact our certification team or request a formal quotation to get detailed scope information and audit schedules.</p>
  `

  return (
    <div className="bg-white min-h-screen text-[#333]">
      {/* 1. Page Header (.content-heading) */}
      <section
        className="py-14 text-center text-white"
        style={{ background: 'radial-gradient(circle, #444, #000)' }}
      >
        <div className="max-w-[1140px] mx-auto px-4">
          <h1 className="font-doris font-bold uppercase text-[32px] sm:text-[38px] text-white">
            {title}
          </h1>
        </div>
      </section>

      {/* 2. Main Content & Sidebar (Left: Sidebar, Right: Genuine Content) */}
      <div className="max-w-[1140px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column (order-2 md:order-1): Sidebar */}
          <div className="md:col-span-4 order-2 md:order-1">
            <SidebarServices />
          </div>

          {/* Right Column (order-1 md:order-2): Authentic Page Content */}
          <main className="md:col-span-8 order-1 md:order-2 space-y-4 text-[15px] leading-[25px] text-black/80 dynamic-content">
            <div
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
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
