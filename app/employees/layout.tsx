import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata(
  'Employee Analytics - Classic Models',
  'Analysis of employee name patterns, first and last name lengths, job titles, and email domains. Understand organizational naming structures and patterns.',
  '/employees',
  [
    'employee analytics',
    'employee data',
    'name patterns',
    'job title analysis',
    'organizational patterns',
  ]
)

export default function EmployeesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
