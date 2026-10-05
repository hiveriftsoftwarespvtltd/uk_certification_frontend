import { useState } from 'react'
import { MapPin, Mail, Clock, Send, CheckCircle2 } from 'lucide-react'
import { api } from '../services/api'
import Swal from 'sweetalert2'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await api.submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        service: form.subject.trim() || 'General Inquiry',
        message: form.message.trim()
      })

      Swal.fire({
        icon: 'success',
        title: 'Enquiry Received!',
        text: 'Thank you! Your enquiry has been saved and forwarded to our certification team.',
        confirmButtonColor: '#2095f2',
        timer: 3000
      })

      setSubmitted(true)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Error',
        text: err.message || 'Failed to submit enquiry. Please try again or email info@ukascert.com.',
        confirmButtonColor: '#2095f2'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white min-h-screen text-[#333]">
      {/* Page Title */}
      <section
        className="py-14 text-center text-white"
        style={{ background: 'radial-gradient(circle, #444, #000)' }}
      >
        <div className="max-w-[1140px] mx-auto px-4">
          <h1 className="font-doris font-bold uppercase text-[32px] sm:text-[38px] text-white">
            Contact UKAS Cert
          </h1>
          <p className="text-[15px] sm:text-[16px] text-white/90 mt-2 font-medium">
            Get in touch with our global certification auditors and assessment specialists
          </p>
        </div>
      </section>

      <div className="max-w-[1140px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Contact Details Cards */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-[#f8f9fa] border border-[#dee2e6] rounded-md p-6 shadow-sm space-y-6">
              <h2 className="font-doris font-bold uppercase text-[20px] text-[#222] pb-3 border-b border-slate-200">
                Head Office & Support
              </h2>

              <div className="flex items-start gap-4 text-[15px]">
                <div className="w-10 h-10 rounded-lg bg-sky-100 text-[#2095f2] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#222] text-[16px]">United Kingdom Registered Office</h3>
                  <p className="mt-1 leading-relaxed text-[#555]">
                    71-75 Shelton Street<br />
                    London Greater London<br />
                    WC2H 9JQ UNITED KINGDOM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-[15px]">
                <div className="w-10 h-10 rounded-lg bg-sky-100 text-[#2095f2] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#222] text-[16px]">Official Email Enquiries</h3>
                  <p className="mt-1">
                    <a href="mailto:info@ukascert.com" className="text-[#2095f2] font-semibold hover:underline block">
                      info@ukascert.com
                    </a>
                   
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-[15px]">
                <div className="w-10 h-10 rounded-lg bg-sky-100 text-[#2095f2] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#222] text-[16px]">Fast Turnaround</h3>
                  <p className="mt-1 leading-relaxed text-[#555]">
                    Audits, draft reviews, and certificate delivery within 2–3 working days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="md:col-span-7">
            <div className="bg-[#f8f9fa] border border-[#dee2e6] rounded-md p-6 sm:p-8 shadow-sm">
              <h2 className="font-doris font-bold uppercase text-[22px] text-[#222] mb-1">
                Send Us a Message
              </h2>
              <p className="text-[15px] text-[#555] mb-6">
                Fill in the details below to request a customized quote, audit schedule, or certificate consultation.
              </p>

              {submitted ? (
                <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-[18px] font-bold text-emerald-900">Message Delivered Successfully!</h3>
                  <p className="text-[15px] text-emerald-700 max-w-md mx-auto">
                    Thank you for reaching out to UK Certification and Assessment Ltd. One of our lead auditors will review your requirements and respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[15px] font-bold text-[#333] mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-white text-[15px] px-3.5 py-2.5 rounded border border-[#ced4da] focus:border-[#2095f2] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[15px] font-bold text-[#333] mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-white text-[15px] px-3.5 py-2.5 rounded border border-[#ced4da] focus:border-[#2095f2] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[15px] font-bold text-[#333] mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91-XXXXXXXXXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-white text-[15px] px-3.5 py-2.5 rounded border border-[#ced4da] focus:border-[#2095f2] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[15px] font-bold text-[#333] mb-1">Subject / Certification Area</label>
                      <input
                        type="text"
                        placeholder="e.g. ISO 9001:2015 Quotation"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full bg-white text-[15px] px-3.5 py-2.5 rounded border border-[#ced4da] focus:border-[#2095f2] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[15px] font-bold text-[#333] mb-1">Message / Requirements</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Please specify your organization scope, number of employees, location, and preferred timeline..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-white text-[15px] px-3.5 py-2.5 rounded border border-[#ced4da] focus:border-[#2095f2] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 bg-[#2095f2] hover:bg-[#1884d8] text-white font-bold text-[15px] uppercase px-8 py-3 rounded shadow transition-all cursor-pointer disabled:opacity-70"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
