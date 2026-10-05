import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  CheckCircle2
} from 'lucide-react'

import { api } from '../services/api'
import Swal from 'sweetalert2'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')
    setIsLoading(true)

    try {
      await api.login(email, password)
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome back to UKAS Admin Portal.',
        timer: 1500,
        showConfirmButton: false
      })
      setSuccessMsg('Authentication successful! Redirecting to dashboard...')
      setTimeout(() => {
        navigate('/admin/dashboard')
      }, 1000)
    } catch (err) {
      const msg = err.message || 'Invalid email or password.'
      setErrorMsg(msg)
      Swal.fire({
        icon: 'error',
        title: 'Authentication Failed',
        text: msg,
        confirmButtonColor: '#2095f2'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f7f9] flex flex-col justify-center py-8 sm:py-12 px-3.5 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo */}
        <Link to="/" className="inline-block mb-3.5 p-2.5 sm:p-3 bg-[#222] rounded-lg shadow">
          <img
            src="/images/logo-light.png"
            alt="UK Certification and Assessment Ltd"
            className="h-9 sm:h-12 w-auto object-contain mx-auto"
          />
        </Link>
        <h2 className="font-doris font-bold uppercase text-[22px] sm:text-[26px] text-[#222] tracking-wide">
          Admin Portal Login
        </h2>
        <p className="mt-1 text-[13px] sm:text-[14px] text-slate-600 px-2">
          UK Certification and Assessment Management Console
        </p>
      </div>

      <div className="mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 sm:py-8 px-4 sm:px-10 shadow-lg rounded-xl border border-slate-200/80">
          {errorMsg && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-[13.5px] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-[13.5px] flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-[13.5px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Official Email Address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#ced4da] rounded-lg text-[14px] text-[#333] placeholder-slate-400 focus:outline-none focus:border-[#2095f2] focus:ring-1 focus:ring-[#2095f2] transition-colors"
                />
              </div>
            </div>

            {/* Password Field with Show/Hide Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[13.5px] font-bold text-slate-700 uppercase tracking-wider">
                  Admin Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[12px] text-[#2095f2] hover:underline font-semibold flex items-center gap-1 focus:outline-none"
                >
                  {showPassword ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide Password</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Show Password</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-2.5 bg-white border border-[#ced4da] rounded-lg text-[14px] text-[#333] placeholder-slate-400 focus:outline-none focus:border-[#2095f2] focus:ring-1 focus:ring-[#2095f2] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Options Row */}
            <div className="flex items-center text-[13px]">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#2095f2] rounded border-slate-300 focus:ring-[#2095f2]"
                />
                <span>Remember me</span>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#2095f2] hover:bg-[#1884d8] text-white font-bold uppercase tracking-wider text-[14px] py-2.5 px-4 rounded-lg shadow hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Security badge note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[12px] text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Secured 256-Bit SSL Encrypted Administrative Gateway</span>
        </div>

        <div className="mt-3 text-center">
          <Link to="/" className="text-[13px] text-[#2095f2] hover:underline font-semibold">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  )
}
