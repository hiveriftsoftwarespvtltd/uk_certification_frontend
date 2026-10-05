import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Plus,
  Minus
} from 'lucide-react'
import { api } from '../services/api'
import Swal from 'sweetalert2'

const bannerImages = [
  '/images/banner1.jpg',
  '/images/banner2.jpg',
  '/images/banner3.jpg'
]

const isoCards = [
  {
    title: 'ISO 9001:2015 Certificate',
    link: '/iso-9001',
    desc: 'ISO 9001:2015 specifies requirements for a quality management system'
  },
  {
    title: 'ISO 14001:2015 Certificate',
    link: '/iso-14001',
    desc: 'ISO 14001 Environmental Management System (EMS) is a systematic framework to manage the immediate and long term environmental'
  },
  {
    title: 'ISO 45001:2018 Certificate',
    link: '/iso-45001',
    desc: 'ISO 45001:2018 is a framework for an occupational health and safety (ohs) management system and is a part of the ISO 45001'
  },
  {
    title: 'ISO 20000:2011 Certificate',
    link: '/iso-20000',
    desc: 'This certificate authorizes an IT company to be reliable and one that delivers best product and are quality checked and verified.'
  },
  {
    title: 'ISO 22000:2018 Certificate',
    link: '/iso-22000',
    desc: 'ISO 22000 is an international standard that defines the requirements of a food safety management system covering all sizes of all organizations'
  },
  {
    title: 'ISO 27001:2013 Certificate',
    link: '/iso-27001',
    desc: 'The ISO 27001 is the standard that ensures the continued accessibility, confidentiality and integrity of information.'
  }
]

const faqs = [
  {
    question: 'What is ISO Certification ?',
    answer: 'ISO Certification is a seal of approval from a 3rd party body that a company runs to one of the internationally recognised ISO management systems. The certification can be used to tender for business as a proof of a companys credibility but also to install confidence in the potential client that you will keep your promises.'
  },
  {
    question: 'How much time it will take in getting final certificate ?',
    answer: 'On providing the correct documents and information of business you can obtain the final certificate within 2-3 working Days.'
  },
  {
    question: 'How do I know that I am an ISO certified entity ?',
    answer: 'When you get ISO certified you will receive a certificate bearing a unique certificate number. Using such unique number over accreditations body website you can verify that your business is an ISO certified entity.'
  },
  {
    question: 'I am small business or startup with less than 10 employees. Is ISO certification relavent for me?',
    answer: 'Definitely. The revised version of the standard is as relevant to small as well as large organisations. Irrespective of your size, it will enable you to drive improvement in your business and increase customer satisfaction.'
  },
  {
    question: 'How to get ISO certified?',
    answer: 'ISO itself, does not issue any certificates. This task is performed by external certification bodies. Thus, start out by searching for certification bodies.'
  },
  {
    question: 'How much do ISO certificates cost?',
    answer: 'ISO certification costs differ based on the size of the company and the level of its operations and proceedings. There are also audit costs in some cases.'
  },
  {
    question: 'Do you provide ISO Certification in my town?',
    answer: 'Yes, UK Certification and Assessment Ltd is an online platform serving all over India all you need is internet connection on your mobile or desktop and we are ready to get your job done.'
  }
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [openFaq, setOpenFaq] = useState(0)
  const [formDone, setFormDone] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await api.submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        service: 'Request For Quotation (Homepage)',
        message: form.message.trim()
      })

      Swal.fire({
        icon: 'success',
        title: 'Quotation Request Sent!',
        text: 'Thank you! Your quotation request has been received. Our auditors will review and contact you shortly.',
        confirmButtonColor: '#2095f2',
        timer: 3000
      })

      setFormDone(true)
      setForm({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setFormDone(false), 6000)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Error',
        text: err.message || 'Failed to submit quotation request. Please try again or email info@ukascert.com.',
        confirmButtonColor: '#2095f2'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white text-black/80">
      {/* 1. BANNER SECTION (Slider + Form) */}
      <section className="py-8 bg-white">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Carousel (col-md-7) */}
            <div className="md:col-span-7 relative h-[360px] sm:h-[400px] overflow-hidden bg-black shadow-sm">
              {bannerImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Banner ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right Form (col-md-5) */}
            <div className="md:col-span-5">
              <div
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  padding: '30px 30px 15px',
                  border: '6px solid #fff',
                  boxShadow: '0 5px 10px rgba(0,0,0,0.2), 0 5px 10px rgba(0,0,0,0.1) inset',
                  borderRadius: '5px'
                }}
              >
                <h5 className="font-doris font-bold uppercase text-[20px] text-[#222] mb-3">
                  REQUEST FOR QUOTATION
                </h5>

                {formDone ? (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-center rounded text-[14px]">
                    Thank you! Your quotation request has been sent.
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Name..."
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-[#ced4da] rounded px-3 py-2 text-[14px] text-[#495057] focus:border-[#2095f2] focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email..."
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-[#ced4da] rounded px-3 py-2 text-[14px] text-[#495057] focus:border-[#2095f2] focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Phone No..."
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-[#ced4da] rounded px-3 py-2 text-[14px] text-[#495057] focus:border-[#2095f2] focus:outline-none"
                      />
                    </div>
                    <div>
                      <textarea
                        rows={3}
                        required
                        placeholder="Description..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full border border-[#ced4da] rounded px-3 py-2 text-[14px] text-[#495057] focus:border-[#2095f2] focus:outline-none resize-none"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#2095f2] hover:bg-[#1884d8] text-white px-6 py-2.5 rounded text-[14px] font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer disabled:opacity-70"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Request'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WRAP1: REQUEST FOR QUOTATION BLUE STRIP */}
      <section className="bg-[#2095f2] text-white py-10 mt-14">
        <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-doris text-[35px] font-bold leading-tight !text-white">
              Request for quotation
            </h3>
            <h6 className="text-[25px] uppercase font-normal mt-1 !text-white">
              PROPOSAL & SAMPLE ISO CERTIFICATE
            </h6>
          </div>
          <div>
            <Link
              to="/contact"
              className="bg-white !text-[#222] hover:bg-slate-100 rounded-[50px] px-10 py-2.5 uppercase font-bold text-[14px] tracking-wide inline-block shadow transition-transform hover:scale-105"
            >
              GET A QUOTE
            </Link>
          </div>
        </div>
      </section>

      {/* 3. WRAP2: WELCOME SECTION */}
      <section className="py-20 text-center">
        <div className="max-w-[1140px] mx-auto px-4">
          <h3 className="font-doris text-[30px] font-bold uppercase text-[#222] heading-underline">
            Welcome to UK Certification and Assessment Ltd
          </h3>
          <h6 className="text-[15px] leading-[25px] text-black/80 font-normal mt-6 max-w-4xl mx-auto text-center">
            We Provide all System certifications and Product Certication in Delhi NCR Mumbai Bangalore Pune Maharashtra India like ISO 9001:2015, ISO 14001:2015 Certification, ISO 45001:2018 Certification, CE Marking Certification, RoHS Certiication, Halal Certification. We are most reputed ISO Certificate service provider firm in All countries including India and other countries of the world,registered in UK. All the requirements about ISO Certification and ISO auditing can be fulfilled by our highly experienced team of Auditors. We provide the services that enhances processes through effective utilization of people that results in enhanced performance.
          </h6>
        </div>
      </section>

      {/* 4. WRAP3: ISO PRICE TABLE */}
      <section className="pb-20 text-center">
        <div className="max-w-[1140px] mx-auto px-4">
          <h3 className="font-doris text-[30px] font-bold uppercase text-[#222] heading-underline mb-12">
            ISO Price Table
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Box 1 */}
            <div className="border border-[#eee] p-10 bg-white shadow-sm">
              <h5 className="font-doris font-bold uppercase text-[20px] text-[#222]">ISO 9001:2015</h5>
              <h1 className="font-doris text-[40px] my-4 text-[#2095f2]">----</h1>
              <hr className="my-5 border-[#eee]" />
              <h6 className="text-[16px] my-3 text-[#222] font-bold">Get Certified</h6>
            </div>

            {/* Box 2 */}
            <div className="border border-[#eee] p-10 bg-white shadow-sm">
              <h5 className="font-doris font-bold uppercase text-[20px] text-[#222]">ISO 14001:2015</h5>
              <h1 className="font-doris text-[40px] my-4 text-[#2095f2]">----</h1>
              <hr className="my-5 border-[#eee]" />
              <h6 className="text-[16px] my-3 text-[#222] font-bold">Get Certified</h6>
            </div>
          </div>

          <div className="mt-12">
            <Link
              to="/contact"
              className="bg-[#2095f2] hover:bg-[#1884d8] text-white px-8 py-3 rounded text-[16px] font-bold uppercase tracking-wider inline-block shadow transition-colors"
            >
              Download Application Form
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WRAP1 DARK: COMPLETE DETAILS & SAMPLE */}
      <section className="bg-[#222] py-10">
        <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-doris text-[35px] font-bold leading-tight !text-white">
              Request for quotation
            </h3>
            <h6 className="text-[25px] uppercase font-normal mt-1 !text-white">
              Complete Details & Sample ISO Certificate
            </h6>
          </div>
          <div>
            <Link
              to="/contact"
              className="bg-white !text-[#222] hover:bg-slate-100 rounded-[50px] px-10 py-2.5 uppercase font-bold text-[14px] tracking-wide inline-block shadow transition-transform hover:scale-105"
            >
              Arrange Callback
            </Link>
          </div>
        </div>
      </section>

      {/* 6. WRAP4: ISO CERTIFICATES */}
      <section className="py-20">
        <div className="max-w-[1140px] mx-auto px-4">
          <h3 className="font-doris text-[30px] font-bold uppercase text-[#222] heading-underline text-center mb-12">
            ISO Certificates
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isoCards.map((card, i) => (
              <div key={i} className="text-center group">
                <span className="text-[40px] text-[#2095f2] inline-block mb-3">
                  <Copy className="w-10 h-10 mx-auto" />
                </span>
                <h5 className="font-doris uppercase font-bold text-[18px] text-[#222] group-hover:text-[#2095f2] mb-2.5 transition-colors">
                  <Link to={card.link}>{card.title}</Link>
                </h5>
                <p className="text-[15px] leading-[25px] text-black/80">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WRAP1 DARK: STILL CONFUSED */}
      <section className="bg-[#222] py-10">
        <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-doris text-[35px] font-bold leading-tight !text-white">
              Still Confused!
            </h3>
            <h6 className="text-[25px] uppercase font-normal mt-1 !text-white">
              Take Free Advisor Consultation
            </h6>
          </div>
          <div>
            <Link
              to="/contact"
              className="bg-white !text-[#222] hover:bg-slate-100 rounded-[50px] px-10 py-2.5 uppercase font-bold text-[14px] tracking-wide inline-block shadow transition-transform hover:scale-105"
            >
              Arrange Callback
            </Link>
          </div>
        </div>
      </section>

      {/* 8. WRAP5: BENEFITS OF ISO CERTIFICATION */}
      <section className="py-20 bg-white">
        <div className="max-w-[1140px] mx-auto px-4">
          <h3 className="font-doris text-[30px] font-bold uppercase text-[#222] heading-underline text-center mb-12">
            Benefits of ISO Certification
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Customers are far more likely to contact a company if it uses an ISO 9001 logo in the marketing of its products or services.',
              'ISO certification an essential requirement before carrying on business with a new vendor & eligibility to enter global markets.',
              'Build credibility internationally.',
              'Ease in getting public and private contracts.',
              'Improve marketability. Get More Tenders-Required in Tender filing.',
              'A certified quality management system demonstrates entity commitment to quality product or services and customer satisfaction.'
            ].map((text, idx) => (
              <div
                key={idx}
                className="relative bg-white p-5 pl-20 shadow-[0_19px_38px_rgba(0,0,0,.1),0_15px_12px_rgba(0,0,0,.02)] rounded-[4px] text-[15px] leading-[25px] text-black/80 min-h-[140px] flex items-center"
              >
                <span className="absolute top-[26px] left-[12px] bg-[#2095f2] text-white w-[55px] text-center rounded-[10px] font-bold text-[28px] py-2">
                  {idx + 1}
                </span>
                <div>{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. WRAP6: PROCESS OF CERTIFICATION */}
      <section
        className="py-20"
        style={{ background: 'radial-gradient(circle, #444, #000)' }}
      >
        <div className="max-w-[1140px] mx-auto px-4">
          <h3 className="font-doris text-[30px] font-bold uppercase !text-[#2095f2] heading-underline text-center mb-12">
            Process of Certification
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Call us:',
                desc: 'Your ISO certification is just a call away.. Your Queries are our responsibility we as a team try to resolve all your queries making you learn.'
              },
              {
                title: 'We are listening :',
                desc: 'We listen to your opinion and suggest you the certification that will go best with your requirements. Your satisfaction is our passion.'
              },
              {
                title: 'Submit your Documents:',
                desc: 'Your certification is just few far from you. Just submit your required documents and we will implement your certification in process.'
              },
              {
                title: 'Sample Certificate:',
                desc: 'We believe that your certificate must be of your choice thats why we present to you a temporary copy of your certificate after you pay us an initial amount. You are free to keep your reviews and make required changes.'
              },
              {
                title: 'Verify Certificate:',
                desc: 'We believe to ask for full payment once you are completely satisfied thats why after making all required changes we offer you your Certificate and make all the payments clear.'
              },
              {
                title: 'We are listening :',
                desc: 'We listen to your opinion and suggest you the certification that will go best with your requirements. Your satisfaction is our passion.'
              }
            ].map((step, idx) => (
              <div key={idx} className="relative pl-20 mt-4">
                <span className="absolute left-0 top-0 rounded-full bg-[#555] p-3 text-[35px] text-white">
                  <Check className="w-8 h-8" />
                </span>
                <h6 className="text-[17px] font-bold mb-2.5 !text-white">{step.title}</h6>
                <p className="text-[15px] leading-[25px] !text-white/90">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. WRAP7: DOCUMENTS REQUIRE FOR ISO CERTIFICATION */}
      <section className="py-20 text-center">
        <div className="max-w-[1140px] mx-auto px-4">
          <h3 className="font-doris text-[30px] font-bold uppercase text-[#222] heading-underline mb-12">
            Documents Require for ISO Certification
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Business Registration Proof', img: '/images/icon1.png' },
              { title: 'Letter Head/Visiting card', img: '/images/icon2.png' },
              { title: 'Sale & Purchase Invoice', img: '/images/icon3.png' },
              { title: 'Description of Business', img: '/images/icon4.png' }
            ].map((doc, idx) => (
              <div key={idx} className="mt-6 flex flex-col items-center">
                <h6 className="font-bold text-[16px] mb-4 text-[#222]">{doc.title}</h6>
                <img src={doc.img} alt={doc.title} className="w-[100px] h-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. WRAP1 DARK: COMPLETE LIST OF DOCUMENT REQUIRED */}
      <section className="bg-[#222] py-10">
        <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-doris text-[35px] font-bold leading-tight !text-white">
              Request For Quotation
            </h3>
            <h6 className="text-[25px] uppercase font-normal mt-1 !text-white">
              Complete List of Document Required
            </h6>
          </div>
          <div>
            <Link
              to="/contact"
              className="bg-white !text-[#222] hover:bg-slate-100 rounded-[50px] px-10 py-2.5 uppercase font-bold text-[14px] tracking-wide inline-block shadow transition-transform hover:scale-105"
            >
              Arrange Callback
            </Link>
          </div>
        </div>
      </section>

      {/* 12. WRAP8: FAQ SECTION */}
      <section id="faq" className="py-20">
        <div className="max-w-[1140px] mx-auto px-4">
          <h3 className="font-doris text-[30px] font-bold uppercase text-[#222] heading-underline text-center mb-12">
            FAQ-Frequently Asked Questions
          </h3>

          <div className="space-y-3 max-w-4xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div key={idx} className="border border-[#eee] rounded overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-3.5 bg-white hover:bg-slate-50 flex items-center justify-between gap-4 font-bold text-[16px] text-[#222]"
                  >
                    <span>{faq.question}</span>
                    <span className="text-[#2095f2]">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="p-4 border-t border-[#eee] text-[15px] leading-[25px] text-black/80 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 13. WRAP9: PILLARS / BADGES */}
      <section className="py-20 text-center border-t border-[#eee]">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: 'ASSURED CUSTOMER SATISFACTION', img: '/images/icon5.png' },
              { title: 'CLIENT DATA CONFIDENTIALITY', img: '/images/icon6.png' },
              { title: 'NO HIDDEN FEES', img: '/images/icon7.png' },
              { title: 'SECURE ONLINE PAYMENT', img: '/images/icon8.png' }
            ].map((pillar, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <img src={pillar.img} alt={pillar.title} className="mb-5 h-16 w-auto object-contain" />
                <h6 className="font-bold text-[16px] uppercase text-[#222]">{pillar.title}</h6>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
