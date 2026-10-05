import { Link } from 'react-router-dom'
import SidebarServices from '../components/SidebarServices'

export default function CorporatePoliciesPage() {
  return (
    <div className="bg-white min-h-screen text-[#333]">
      {/* 1. Page Header (.content-heading) */}
      <section
        className="py-14 text-center text-white"
        style={{ background: 'radial-gradient(circle, #444, #000)' }}
      >
        <div className="max-w-[1140px] mx-auto px-4">
          <h1 className="font-doris font-bold uppercase text-[32px] sm:text-[38px] text-white">
            Corporate Policies
          </h1>
        </div>
      </section>

      {/* 2. Main Content & Sidebar */}
      <div className="max-w-[1140px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar */}
          <div className="md:col-span-4 order-2 md:order-1">
            <SidebarServices />
          </div>

          {/* Right Content */}
          <main className="md:col-span-8 order-1 md:order-2 space-y-5 text-[15px] leading-[25px] text-black/80">
            <p>
              We at UK Certification and Assessment Ltd are committed to working impartially, maintain the confidentiality, independence, and leadership in Management System Certification , Third Party Inspection and Training services for the satisfaction of the customer, interested party and demonstrating the compliance in accreditation requirements of ISO/IEC 17021-1:2015, ISO 17020 :2012 and Accreditation Requirement of AB , through
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[15px]">
              <li>Consistent implementation of Quality Management System</li>
              <li>Consistent improvement in Certification Process ,inspection & Training</li>
              <li>Involvement of all employees in achieving goal</li>
              <li>Development of Knowledge and Skill through training at each level of employee</li>
              <li>Meeting the Compliance of Accreditation requirement</li>
            </ul>
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
