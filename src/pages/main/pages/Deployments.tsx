import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search as SearchIcon, ArrowLeft, ArrowRight, Plus, Inbox } from 'lucide-react'
import CreateDeployment from '@/components/modals/CreateDeployment'
import DeleteDeployment from '@/components/modals/DeleteDeployment'

const Deployments: React.FC = () => {
  const [deployments] = useState([
    { 
      deployment_id: 'd123456789', 
      image: 'nginx:latest', 
      status: 'active',
      created_at: '2025-09-01T20:58:00.123456Z' 
    },
    { 
      deployment_id: 'd987654321', 
      image: 'redis:latest', 
      status: 'pending',
      created_at: '2025-09-01T20:58:00.123456Z'
    },
    { 
      deployment_id: 'd111111111', 
      image: 'mysql:latest', 
      status: 'terminated',
      created_at: '2025-09-01T20:58:00.123456Z' 
    },
    { 
      deployment_id: 'd111111111', 
      image: 'mysql:latest', 
      status: 'terminated',
      created_at: '2025-09-01T20:58:00.123456Z' 
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const filteredDeployments = deployments.filter(d =>
    d.image.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.deployment_id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const pageLimit = 10;
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(filteredDeployments.length / pageLimit) || 1

  const paginatedDeployments = filteredDeployments.slice(
    (currentPage - 1) * pageLimit,
    currentPage * pageLimit
  )

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1)
  }
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
  }

  const [isCreateDeploymentOpen, setIsCreateDeploymentOpen] = useState(false)
  const [isDeleteDeploymentOpen, setIsDeleteDeploymentOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8 flex flex-col">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="text-3xl font-bold text-white">
            Deployments
            <span className="text-gray-500 text-2xl">({ deployments.length })</span>
          </h2>
          <div className="relative">
            <input 
              type="text" 
              value={searchTerm}
              placeholder='Search by image, status, or ID...'
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="bg-[#1A1B3A] text-white border border-[#2d3748] rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#00D2FF] transition-all w-72"
            />
            <SearchIcon
              size={16}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'
            />
          </div>
        </motion.div>
        
        {/* Deployments List */}
        {filteredDeployments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ">
            {paginatedDeployments.map((deployment) => (
              <motion.div
                key={deployment.deployment_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glassmorphism-card overflow-hidden border border-white/10 shadow-2xl rounded-xl p-6 flex flex-col justify-between hover:border-[#00D2FF] transition-all duration-300 transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl text-white">{deployment.image}</h3>
                    <span 
                      className={`
                        ${
                          deployment.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : deployment.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : deployment.status === "terminated"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-gray-500/20 text-gray-400"
                        }
                        flex items-center text-xs font-semibold px-2 py-1 rounded-full
                      `}
                    >
                      <span 
                        className={`
                          ${
                            deployment.status === "active"
                            ? "bg-green-400"
                            : deployment.status === "pending"
                            ? "bg-yellow-400 animate-pulse"
                            : deployment.status === "terminated"
                            ? "bg-red-400"
                            : "bg-gray-400"
                          }
                          w-2 h-2  rounded-full mr-2
                        `}
                      ></span>
                      {deployment.status}
                    </span>
                  </div>
                  <div className="space-y-3 text-gray-500 text-sm">
                    <p>
                      <strong> Deployment ID: </strong>
                      {deployment.deployment_id}
                    </p>
                    <p>
                      <strong> Created At: </strong>
                      {deployment.created_at}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 mt-6">
                  <button 
                    className="text-xs font-semibold text-gray-500 hover:text-white transition-colors"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => setIsDeleteDeploymentOpen(true)}
                    className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 mt-16 flex-1">
            <Inbox size={48} className="mb-4 text-gray-500" />
            <p className="text-lg font-semibold">No deployments found</p>
            <p className="text-sm text-gray-500">
              Create your first deployment to get started 🚀
            </p>
          </div> 
        )}

        {/* Narv */}
        {filteredDeployments.length > 0 && totalPages > 1 && (
          <div className="mt-auto flex justify-center items-center sticky bottom-0 bg-[#0f0f1f] py-4">
            <nav className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === 1
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-white hover:bg-gray-300 hover:text-gray-800"
                }`}
              >
                <ArrowLeft size={24} />
              </button>
              <span className="px-4 py-2 rounded-lg bg-[#00D2FF] text-gray-800 font-bold text-sm">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-white hover:bg-gray-300 hover:text-gray-800"
                }`}
              >
                <ArrowRight size={24} />
              </button>
            </nav>
          </div>
        )}
      </main>

      <motion.button
        drag
        dragConstraints={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        whileDrag={{ scale: 1.1 }} 
        onClick={() => setIsCreateDeploymentOpen(true)}
        className="fixed bottom-8 right-8 bg-[#00D2FF] hover:bg-cyan-500 text-white font-bold rounded-full h-16 w-16 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        <Plus size={24} className='text-gray-100'/>
      </motion.button>

      {/* Modals */}
      <CreateDeployment 
        isOPen={isCreateDeploymentOpen}
        onClose={() => setIsCreateDeploymentOpen(false)}
      />
      {deployments.map((deployment) => (
        <DeleteDeployment 
          key={deployment.deployment_id}
          isOPen={isDeleteDeploymentOpen}
          onClose={() => setIsDeleteDeploymentOpen(false)}
          image={deployment.image}
          deployment_id={deployment.deployment_id}
        />
      ))}
    </div>
  )
}

export default Deployments
