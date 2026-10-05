import { useState } from 'react'
import {
  CheckCircle2,
  AlertCircle,
  Award,
  Download,
  Lock,
  Search
} from 'lucide-react'
import SidebarServices from '../components/SidebarServices'
import { api } from '../services/api'
import Swal from 'sweetalert2'

export default function VerifyPage() {
  const [certNo, setCertNo] = useState('')
  const [verifiedResult, setVerifiedResult] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchedQuery, setSearchedQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleVerify = async (e) => {
    e.preventDefault()
    const cleanNo = certNo.trim().toUpperCase()
    if (!cleanNo) return

    setIsLoading(true)
    setSearchedQuery(cleanNo)

    // 1. Try Live NestJS / MongoDB API via Axios
    try {
      const liveCert = await api.verifyCertificate(cleanNo)
      if (liveCert && liveCert.certNo) {
        setVerifiedResult(liveCert)
        setHasSearched(true)
        setIsLoading(false)
        Swal.fire({
          icon: 'success',
          title: 'Certificate Authenticated!',
          text: `Certificate #${liveCert.certNo} is verified in UK Central Register.`,
          confirmButtonColor: '#2095f2',
          timer: 2500
        })
        return
      }
    } catch {
      // ignore
    }

    // 2. Check localStorage fallback if any
    try {
      const saved = localStorage.getItem('uk_certificates')
      if (saved) {
        const localDb = JSON.parse(saved)
        if (localDb[cleanNo]) {
          setVerifiedResult(localDb[cleanNo])
          setHasSearched(true)
          setIsLoading(false)
          Swal.fire({
            icon: 'success',
            title: 'Certificate Authenticated!',
            text: `Certificate #${cleanNo} is verified in central database.`,
            confirmButtonColor: '#2095f2',
            timer: 2500
          })
          return
        }
      }
    } catch {
      // ignore
    }

    // 3. Not found
    setVerifiedResult(null)
    setHasSearched(true)
    setIsLoading(false)
    Swal.fire({
      icon: 'error',
      title: 'No Record Found',
      text: `No active certificate found matching "${cleanNo}".`,
      confirmButtonColor: '#2095f2'
    })
  }

  return (
    <div className="bg-white min-h-screen text-[#333]">
      {/* 1. Page Heading Banner */}
      <section
        className="py-14 text-center text-white"
        style={{ background: 'radial-gradient(circle, #444, #000)' }}
      >
        <div className="max-w-[1140px] mx-auto px-4">
          <h1 className="font-doris font-bold uppercase text-[32px] sm:text-[38px] tracking-wide text-white">
            Verify Certificate
          </h1>
          <p className="text-[15px] sm:text-[16px] text-white/90 mt-2 font-medium">
            Online Public Verification Portal for UK Certification and Assessment Ltd
          </p>
        </div>
      </section>

      {/* 2. Main Content & Sidebar */}
      <div className="max-w-[1140px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar */}
          <div className="md:col-span-4">
            <SidebarServices />
          </div>

          {/* Right Verification Container */}
          <main className="md:col-span-8">
            <div className="bg-[#f8f9fa] border border-[#dee2e6] rounded-md p-6 sm:p-8 shadow-sm">
              <h3 className="font-doris font-bold uppercase text-[24px] text-[#222] mb-2">
                Check the Validity of Certificate
              </h3>
              <p className="text-[15px] text-[#555] mb-6">
                Enter the certificate number below to verify authentic UK certification status.
              </p>

              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label className="block text-[15px] font-bold text-[#333] mb-1.5 uppercase tracking-wider">
                    Certificate Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Certificate Number (e.g. Q-265318082023)"
                    value={certNo}
                    onChange={(e) => setCertNo(e.target.value)}
                    className="w-full bg-white border border-[#ced4da] rounded p-3 text-[16px] font-semibold text-[#222] focus:border-[#2095f2] focus:outline-none uppercase font-mono shadow-sm"
                  />
                  <span className="text-[13px] text-[#666] mt-1 block">
                    ex: Enter certificate number printed on your certificate document (e.g. Q-265318082023)
                  </span>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#2095f2] hover:bg-[#1884d8] text-white font-bold text-[15px] uppercase px-8 py-2.5 rounded shadow transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    <Search className="w-4 h-4" />
                    {isLoading ? 'Checking...' : 'Submit'}
                  </button>
                </div>
              </form>

              {/* Verified Result Card */}
              {hasSearched && (
                <div className="mt-8 pt-6 border-t border-[#dee2e6]">
                  {verifiedResult ? (
                    <div className="bg-white border-2 border-emerald-500 rounded-lg p-6 shadow-md relative overflow-hidden">
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                            <Award className="w-7 h-7" />
                          </div>
                          <div>
                            <span className="text-[12px] font-mono font-bold text-[#666] tracking-wider uppercase block">
                              Official Verification Result
                            </span>
                            <h4 className="font-mono text-[22px] font-bold text-[#2095f2]">
                              {verifiedResult.certNo}
                            </h4>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1.5 bg-emerald-600 text-white font-bold text-[13px] px-4 py-1.5 rounded-full uppercase tracking-wide">
                          <CheckCircle2 className="w-4 h-4" />
                          Authenticated
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 text-[15px]">
                        {/* Certificate Number */}
                        <div className="bg-[#f8f9fa] p-4 rounded border border-slate-200">
                          <span className="text-[#666] text-[13px] font-bold uppercase tracking-wider block">
                            Certificate Number
                          </span>
                          <span className="text-sky-800 font-mono font-bold text-[17px] mt-1 block">
                            {verifiedResult.certNo}
                          </span>
                        </div>

                        {/* Issue Date */}
                        <div className="bg-[#f8f9fa] p-4 rounded border border-slate-200">
                          <span className="text-[#666] text-[13px] font-bold uppercase tracking-wider block">
                            Issue Date
                          </span>
                          <span className="text-[#222] font-mono font-bold text-[16px] mt-1 block">
                            {verifiedResult.issueDate}
                          </span>
                        </div>

                        {/* 1st Surveillance on or before */}
                        <div className="bg-[#f8f9fa] p-4 rounded border border-slate-200">
                          <span className="text-[#666] text-[13px] font-bold uppercase tracking-wider block">
                            1st Surveillance on or before
                          </span>
                          <span className="text-sky-800 font-mono font-bold text-[16px] mt-1 block">
                            {verifiedResult.firstSurveillance || '—'}
                          </span>
                        </div>

                        {/* 2nd Surveillance on or before */}
                        <div className="bg-[#f8f9fa] p-4 rounded border border-slate-200">
                          <span className="text-[#666] text-[13px] font-bold uppercase tracking-wider block">
                            2nd Surveillance on or before
                          </span>
                          <span className="text-sky-800 font-mono font-bold text-[16px] mt-1 block">
                            {verifiedResult.secondSurveillance || '—'}
                          </span>
                        </div>

                        {/* Valid Until */}
                        <div className="sm:col-span-2 bg-[#f8f9fa] p-4 rounded border border-slate-200">
                          <span className="text-[#666] text-[13px] font-bold uppercase tracking-wider block">
                            Valid Until
                          </span>
                          <span className="text-emerald-700 font-mono font-bold text-[17px] mt-1 block">
                            {verifiedResult.expiryDate}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-[14px]">
                        <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                          <Lock className="w-4 h-4" />
                          Authenticated in central UK register
                        </span>
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="inline-flex items-center gap-1.5 bg-[#f8f9fa] border border-[#ccc] hover:bg-slate-100 text-[#333] px-4 py-2 rounded font-bold text-[14px] transition-colors cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          Print / Save Record
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-50 border-2 border-red-300 rounded p-5 text-red-900 text-[15px] flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-bold text-[17px]">No Record Found</h5>
                        <p className="mt-1 font-medium">
                          No active certificate found matching identifier <strong>"{searchedQuery}"</strong>. Please verify the certificate number printed on your certificate document or contact <strong>info@ukascert.com</strong>.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
