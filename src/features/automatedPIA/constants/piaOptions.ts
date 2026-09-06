import type { DropdownOption } from '@/components/ui/ComboBox'

export const DEPARTMENT_OPTIONS: DropdownOption[] = [
  { label: 'Information Technology', value: 'it' },
  { label: 'Human Resources', value: 'hr' },
  { label: 'Finance', value: 'finance' },
  { label: 'Legal & Compliance', value: 'legal' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Operations', value: 'operations' },
  { label: 'Customer Support', value: 'customer-support' },
]

export const DATA_CATEGORY_OPTIONS = [
  { label: 'Basic Personal Data', value: 'basic' },
  { label: 'Sensitive Personal Data', value: 'sensitive' },
  { label: 'N/A', value: 'na' },
]

export const DATA_SUBJECT_OPTIONS = [
  { label: 'Customers', value: 'customers' },
  { label: 'Employees', value: 'employees' },
  { label: 'Students', value: 'students' },
  { label: 'Applicants', value: 'applicants' },
  { label: 'Suppliers / Partners', value: 'suppliers_partners' },
  { label: 'Others', value: 'others' },
  { label: 'N/A', value: 'na' },
]

export const LEGAL_BASIS_OPTIONS = [
  { label: 'Consent of the data subject', value: 'consent' },
  { label: 'Performance of a contract', value: 'contract_performance' },
  { label: 'Compliance with legal obligation', value: 'legal_obligation' },
  { label: 'Legitimate interests of the organization', value: 'legitimate_interests' },
  { label: 'Public task / exercise of official authority', value: 'public_task' },
  { label: 'Others', value: 'others' },
  { label: 'N/A', value: 'na' },
]

export const STORAGE_LOCATION_OPTIONS = [
  { label: 'On-premise servers', value: 'on_premise' },
  { label: 'Cloud-based systems', value: 'cloud' },
  { label: 'Third-party platforms', value: 'third_party' },
  { label: 'Others', value: 'others' },
  { label: 'N/A', value: 'na' },
]

export const DISPOSAL_METHOD_OPTIONS = [
  { label: 'Secure deletion', value: 'secure_deletion' },
  { label: 'Anonymization', value: 'anonymization' },
  { label: 'Physical destruction', value: 'physical_destruction' },
  { label: 'Others', value: 'others' },
  { label: 'N/A', value: 'na' },
]