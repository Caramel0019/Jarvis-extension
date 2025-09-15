import React, { useState } from 'react'

const Deployments: React.FC = () => {
  const [deployments] = useState([
    { id: 1, name: 'Production API', status: 'active', version: 'v1.2.3' },
    { id: 2, name: 'Staging App', status: 'building', version: 'v1.3.0' },
    { id: 3, name: 'Development', status: 'failed', version: 'v1.3.1' },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'building': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Deployments</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {deployments.map((deployment) => (
            <div key={deployment.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{deployment.name}</h3>
                <p className="text-sm text-gray-500">Version {deployment.version}</p>
              </div>
              
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(deployment.status)}`}>
                {deployment.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Deployments