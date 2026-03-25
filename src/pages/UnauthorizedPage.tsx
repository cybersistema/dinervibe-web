import { Link } from 'react-router-dom'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">403</h1>
        <p className="text-gray-600 mb-6">You don't have permission to view this page.</p>
        <Link to="/" className="text-indigo-600 hover:underline text-sm">← Back to Dashboard</Link>
      </div>
    </div>
  )
}
