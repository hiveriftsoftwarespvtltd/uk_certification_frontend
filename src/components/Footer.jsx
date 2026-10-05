import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#333] text-[#999] pt-20 pb-12 text-[15px] border-t border-slate-700">
      <div className="max-w-[1140px] mx-auto px-4">
        {/* Top Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-8">
          <div className="md:col-span-4">
            <Link to="/" className="inline-block logo">
              <img src="/images/logo-light.png" alt="UK Certification" className="h-14 w-auto object-contain" />
            </Link>
          </div>
          <div className="md:col-span-5">
            <p className="leading-[26px]">
              ISO Stands for International Standards of Organization. ISO is an independent, non-governmental international organization with a membership of 162 national standard bodies.
            </p>
          </div>
          {/* <div className="md:col-span-3 flex md:justify-end">
            <ul className="flex items-center gap-2">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-[#999] hover:border-[#4267b2] hover:text-[#4267b2] flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-[#999] hover:border-[#1da1f2] hover:text-[#1da1f2] flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" /></svg>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-[#999] hover:border-[#0274b3] hover:text-[#0274b3] flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" /></svg>
                </a>
              </li>
            </ul>
          </div> */}
        </div>

        <hr className="border-t border-white/10 my-8" />

        {/* 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Contact Info */}
          <div>
            <h4 className="font-doris text-white text-[18px] mb-5">Contact Info</h4>
            <ul className="space-y-3">
              <li className="leading-relaxed">
                71-75 Shelton Street<br />
                London Greater London<br />
                WC2H 9JQ UNITED KINGDOM
              </li>
              <li>
                <a href="mailto:info@ukascert.com" className="hover:text-white transition-colors">
                  info@ukascert.com
                </a>
              </li>
 
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-doris text-white text-[18px] mb-5">Usefull Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Request A Quote</Link></li>
              <li><a href="/#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* ISO Services */}
          <div>
            <h4 className="font-doris text-white text-[18px] mb-5">ISO Services</h4>
            <ul className="space-y-3">
              <li><Link to="/iso-9001" className="hover:text-white transition-colors">ISO 9001:2015 Certification</Link></li>
              <li><Link to="/iso-14001" className="hover:text-white transition-colors">ISO 14001:2015 Certification</Link></li>
              <li><Link to="/iso-45001" className="hover:text-white transition-colors">ISO 45001:2018 Certification</Link></li>
              <li><Link to="/iso-20000" className="hover:text-white transition-colors">ISO 20000 Certification</Link></li>
              <li><Link to="/iso-22000" className="hover:text-white transition-colors">ISO 22000:2018 Certification</Link></li>
              <li><Link to="/iso-27001" className="hover:text-white transition-colors">ISO 27001:2017 Certification</Link></li>
            </ul>
          </div>

          {/* About UKAS Cert */}
          <div>
            <h4 className="font-doris text-white text-[18px] mb-5">About UKAS Cert</h4>
            <p className="leading-[26px]">
              We are the ISO Certification body accreditated with UAFL. All the requirements about ISO Certification and ISO auditing can be fulfilled by our highly experienced team of auditors. We are UK based Company. Each and every certificate issued by our company can be also verified at board website.
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-white/10 text-center text-[14px]">
          Copyright © {new Date().getFullYear()} ISO Solutions - <a href="https://www.ukascert.co.uk" target="_blank" rel="noreferrer" className="text-[#2095f2] hover:underline">All Rights Reserved</a>.
        </div>
      </div>
    </footer>
  )
}
