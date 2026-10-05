import { Link, useLocation } from 'react-router-dom'
import {
  isoServices,
  trainingServices,
  inspectionServices
} from '../data/servicesCatalog'

export default function SidebarServices() {
  const location = useLocation()
  const currentPath = location.pathname.toLowerCase().replace(/\.aspx$/, '')

  const renderLink = (item, idx) => {
    const isActive = currentPath === item.path.toLowerCase()
    return (
      <li key={idx}>
        <Link
          to={item.path}
          className={`sidebar-link ${
            isActive
              ? '!bg-[#2095f2] !text-white !border-l-[#0b3b60] font-bold shadow-sm'
              : ''
          }`}
        >
          {item.name}
        </Link>
      </li>
    )
  }

  return (
    <aside className="sidebar space-y-6">
      {/* ISO Certification Services */}
      <div>
        <h5 className="font-doris font-bold uppercase text-[19px] text-[#222] mb-3">
          ISO Certification Services
        </h5>
        <ul className="space-y-1">
          {isoServices.map(renderLink)}
        </ul>
      </div>

      {/* Training */}
      <div>
        <h5 className="font-doris font-bold uppercase text-[19px] text-[#222] mb-3">
          Training
        </h5>
        <ul className="space-y-1">
          {trainingServices.map(renderLink)}
        </ul>
      </div>

      {/* Inspection Services */}
      <div>
        <h5 className="font-doris font-bold uppercase text-[19px] text-[#222] mb-3">
          Inspection Services
        </h5>
        <ul className="space-y-1">
          {inspectionServices.map(renderLink)}
        </ul>
      </div>
    </aside>
  )
}
