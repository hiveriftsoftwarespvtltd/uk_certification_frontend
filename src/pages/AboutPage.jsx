import { Link } from 'react-router-dom'
import SidebarServices from '../components/SidebarServices'

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen text-[#333]">
      {/* 1. Page Header matching .content-heading */}
      <section
        className="py-14 text-center text-white"
        style={{ background: 'radial-gradient(circle, #444, #000)' }}
      >
        <div className="max-w-[1140px] mx-auto px-4">
          <h1 className="font-doris font-bold uppercase text-[32px] sm:text-[38px] text-white">
            About Us
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
              <b>UK Certification and Assessment Ltd</b> is Directly accredited Certification Body since 2020 by UNITED AKKREDITERING FORUM LTD (UAFL) for QMS, EMS, ISMS and other ISO Standards and for Product Certifications with Accreditation No- UAFLCB-0108-001-20.
            </p>
            <p>
              <b>UK Certification and Assessment Ltd</b> is an Independent organization, founded in year 2020, at New Delhi, India. Organization is managed by highly dedicated & experienced professionals. We have build up credibility for our services of Management System Certification, third party inspection and Lead Auditor Training among the customers throughout ,by valuse added services delivery to Customer .Entire range of our services (Management System Certification, Lead Auditor Training & Third Party Inspection).
            </p>

            <h5 className="font-doris font-bold uppercase text-[19px] text-[#222] pt-3">
              Commitments
            </h5>
            <p>
              We are committed to work impartially, maintain the confidentiality, independence and leadership in Management System Certification, Lead Auditor Training and Third Party Inspection Services.
            </p>

            <h5 className="font-doris font-bold uppercase text-[19px] text-[#222] pt-3">
              Mission
            </h5>
            <p>
              We are a leading Certification Body in the field of Management System Certification, Third Party Inspection and Lead Auditor Training Services. By creating credibility among customers & stakeholders.
            </p>

            <h5 className="font-doris font-bold uppercase text-[19px] text-[#222] pt-3">
              Goal
            </h5>
            <ul className="list-disc pl-6 space-y-2 text-[15px]">
              <li>Our goal is to assist organization/ individual for achieving an international level of recognition.</li>
              <li>Enhancement of personal competency of participant through Lead Auditor Training/ Internal Auditor training program.</li>
              <li>Assisting organization in meeting and exceeding the business goal through value added certification services.</li>
              <li>Delivering the impartial Third Party Inspection services and building the confidence, credibility and reliability of customer over the product.</li>
            </ul>

            <h5 className="font-doris font-bold uppercase text-[19px] text-[#222] pt-3">
              What's Different About Us?
            </h5>
            <ul className="list-disc pl-6 space-y-2.5 text-[15px]">
              <li><b>Team</b> of highly experienced Auditor/ Lead Auditors/ Trainers/ Inspectors</li>
              <li><b>Team</b> of highly experienced Impaneled Technical Experts</li>
              <li><b>Industry knowledge and experience</b> – We understand the client’s business and its challenges</li>
              <li><b>Auditors, Trainer, Technical Experts and Inspectors are our major asset.</b> They have many years of experience in the management practices of the different industrial sectors. They appreciate the demands and challenges of client’s organization.</li>
              <li><b>Partnership approach</b> – We develop long-term business relationships with our clients because we listen to them and work together with them. Our inclusive approach makes the certification process more meaningful and relevant than simply awarding a piece of paper.</li>
              <li><b>Independence/ Impartiality</b> – We are not a consultant, we provide value added services to our clients to identify opportunities for improvement through professional and impartial manner. UK Certification and Assessment Ltd accreditation ensures our integrity and objectivity.</li>
            </ul>

            <h5 className="font-doris font-bold uppercase text-[19px] text-[#222] pt-3">
              Management System Certification Accreditation
            </h5>
            <p>
              We are an ISO Certification Company providing management System Certification (For ISO 9001, 14001, 45001, 22000, 27001 Certification). We are a service organization, built on the ‘Best in Class’ philosophy which has helped us to achieve an enviable reputation for service excellence within the ISO Certification Body community. We provide a common sense and practical approach to management system certification. Our Certification process is user friendly. Through the certification process, we ensure that the value-added assessment to the client, to see the result at each stage so that the client can generate improvements in the existing management system on an ongoing basis.
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-[15px]">
              <li>ISO 9001 Certification</li>
              <li>ISO 14001 Certification</li>
              <li>ISO 45001 Certification</li>
              <li>ISO 22000 Certification</li>
              <li>ISO 27001 Certification</li>
            </ul>

            <h5 className="font-doris font-bold uppercase text-[19px] text-[#222] pt-3">
              Lead Auditor Training/ Internal Auditor Training Certification
            </h5>
            <p>
              We are an Exemplar Global (RABQSA) certified training provider for Lead Auditor Training/ Internal Auditor Training (For <b>ISO 9001, 14001, 45001, 22000 & 27001 Management System Standard</b>). We have achieved international and industry recognition for world-class training design and delivery and has demonstrated the ability to remain at the forefront of excellence in Lead Auditor Training. The Lead Auditor Training/ Internal Auditor Training course delivered, has been designed based on the Exemplar Global (RABQSA) competency unit. For more information kindly visit <a href="https://www.exemplarglobal.org" target="_blank" rel="noreferrer" className="text-[#2095f2] hover:underline font-bold">www.exemplarglobal.org</a>.
            </p>

            <h5 className="font-doris font-bold uppercase text-[19px] text-[#222] pt-3">
              We Provides Following Lead Auditor Training/ Internal Auditor Training Courses
            </h5>
            <ul className="list-disc pl-6 space-y-1.5 text-[15px]">
              <li>ISO 9001/ QMS Training</li>
              <li>ISO 14001/ EMS Training</li>
              <li>ISO 45001 /OHSMS Training</li>
              <li>ISO 22000/ FSMS Training</li>
              <li>ISO 27001/ ISMS Training</li>
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
