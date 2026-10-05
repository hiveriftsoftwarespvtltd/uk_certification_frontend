import {
  ShieldCheck,
  Award,
  GraduationCap,
  ClipboardCheck
} from 'lucide-react'

export const serviceCategories = [
  {
    id: 'management-system-certification',
    title: 'Management System Certification',
    shortTitle: 'Management Systems',
    icon: ShieldCheck,
    description:
      'Internationally accredited management system assessment and certification services under UAFL accreditation framework.',
    items: [
      { name: 'ISO Certification', path: '/iso-certification', code: 'ISO All', tag: 'Accredited' },
      { name: 'ISO 9001:2015 Certification', path: '/iso-9001', code: 'QMS', tag: 'Quality Management' },
      { name: 'ISO 14001:2015 Certification', path: '/iso-14001', code: 'EMS', tag: 'Environment' },
      { name: 'ISO 45001:2018 Certification', path: '/iso-45001', code: 'OH&S', tag: 'Health & Safety' },
      { name: 'ISO 22000:2018 Certification', path: '/iso-22000', code: 'FSMS', tag: 'Food Safety' },
      { name: 'ISO 27001:2013 Certification', path: '/iso-27001', code: 'ISMS', tag: 'Info Security' },
      { name: 'ISO 20000 Certification', path: '/iso-20000', code: 'ITSM', tag: 'IT Service' },
      { name: 'ISO 13485:2016 Certification', path: '/iso-13485', code: 'MD-QMS', tag: 'Medical Devices' },
      { name: 'ISO 15000-5:2014 Certification', path: '/iso-15000', code: 'ebXML', tag: 'Electronic Business' },
      { name: 'ISO 16603:2004 Certification', path: '/iso-16603', code: 'PPE', tag: 'Blood Penetration' },
      { name: 'ISO 16604:2004 Certification', path: '/iso-16604', code: 'PPE', tag: 'Pathogen Resistance' },
      { name: 'ISO 22612:2005 Certification', path: '/iso-22612', code: 'Bio Barrier', tag: 'Microbial Penetration' },
      { name: 'ISO 22610:2018 Certification', path: '/iso-22610', code: 'Surgical', tag: 'Wet Bacterial Barrier' },
      { name: 'ISO 15189:2012 Certification', path: '/iso-15189', code: 'Med Lab', tag: 'Medical Laboratories' }
    ]
  },
  {
    id: 'product-certification',
    title: 'Product Certification',
    shortTitle: 'Product Certification',
    icon: Award,
    description:
      'Rigorous compliance evaluation and certification for global market access, export conformity, and consumer safety.',
    items: [
      { name: 'CE Marking Certification', path: '/ce-certificate', code: 'CE', tag: 'European Conformity' },
      { name: 'RoHS Certification', path: '/rohs', code: 'RoHS', tag: 'Hazardous Substances' },
      { name: 'EN 14683:2017 Certification', path: '/en-14683', code: 'EN 14683', tag: 'Medical Face Masks' },
      { name: 'TS 16949:2016 Certification', path: '/ts-16949', code: 'IATF', tag: 'Automotive Quality' },
      { name: 'GMP Certification', path: '/gmp', code: 'GMP', tag: 'Good Manufacturing' },
      { name: 'Halal Certification', path: '/halal', code: 'Halal', tag: 'Islamic Shariah' },
      { name: 'HACCP Certification', path: '/haccp', code: 'HACCP', tag: 'Hazard Analysis' }
    ]
  },
  {
    id: 'training',
    title: 'Training Programs',
    shortTitle: 'Auditor Training',
    icon: GraduationCap,
    description:
      'Exemplar Global (RABQSA) aligned training programs to build individual auditor competencies and industry leadership.',
    items: [
      { name: 'Lead Auditor Training', path: '/lead-auditor-training', code: 'LAT', tag: 'Exemplar Global' },
      { name: 'Internal Auditor Training', path: '/internal-auditor-training', code: 'IAT', tag: 'Internal Assessment' },
      { name: 'Food Safety Supervisor Training', path: '/food-safety-supervisor-training', code: 'FSST', tag: 'Hygiene & Safety' }
    ]
  },
  {
    id: 'inspection-services',
    title: 'Inspection Services',
    shortTitle: 'Inspection Services',
    icon: ClipboardCheck,
    description:
      'Independent third-party inspection, technical evaluations, supply chain monitoring, and vendor qualification audits.',
    items: [
      { name: 'Third Party Inspection', path: '/third-party-inspection', code: 'TPI', tag: 'Independent Witness' },
      { name: 'Telecom Sector', path: '/telecom-sector', code: 'Telecom', tag: 'Infrastructure Audit' },
      { name: 'Third Party Inspection of Food Business', path: '/third-party-inspection-food', code: 'Food TPI', tag: 'Hygiene Rating' },
      { name: 'Export Inspection Agency', path: '/export-inspection-agency', code: 'Export', tag: 'Pre-Shipment' },
      { name: 'Textile Inspection Company', path: '/textile-inspection-company', code: 'Textile', tag: 'Quality Assurance' },
      { name: 'Fabric Inspection Company', path: '/fabric-inspection-company', code: 'Fabric', tag: 'Material Testing' },
      { name: 'Factory Audit', path: '/factory-audit', code: 'Factory', tag: 'Capacity & Ethical' },
      { name: 'Safety Audit', path: '/safety-audit', code: 'Safety', tag: 'Hazard Prevention' },
      { name: 'Compliance Audit', path: '/compliance-audit', code: 'Audit', tag: 'Regulatory Standards' }
    ]
  }
]

export const isoServices = serviceCategories[0].items
export const productServices = serviceCategories[1].items
export const trainingServices = serviceCategories[2].items
export const inspectionServices = serviceCategories[3].items
