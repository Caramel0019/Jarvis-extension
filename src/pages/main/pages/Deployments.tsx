import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search as SearchIcon, ArrowLeft, ArrowRight, Plus, Inbox, RefreshCw } from 'lucide-react'
import CreateDeployment from '@/components/modals/CreateDeployment'
import DeleteDeployment from '@/components/modals/DeleteDeployment'
import Alert from '@/components/ui/Alert'
import Deployment from '@/components/common/Deployment'
import { useTheme } from '@/components/layout/ThemeContext'
import { useApi } from '@/hooks/useApi'
import type { DeploymentListItem } from '@/types/api'

const Deployments: React.FC = () => {
  const { theme, toggleTheme, loading: themeLoading } = useTheme();
  const { listDeployments, loading: apiLoading } = useApi();
  
  const [deployments, setDeployments] = useState<DeploymentListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeploymentId, setIsDeploymentId] = useState(false);
  const [deploymentId, setDeploymentId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isCreateDeploymentOpen, setIsCreateDeploymentOpen] = useState(false);
  const [isDeleteDeploymentOpen, setIsDeleteDeploymentOpen] = useState(false);
  const [selectedDeployment, setSelectedDeployment] = useState<DeploymentListItem | null>(null);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const pageLimit = 10;

  // Fetch deployments on mount and page change
  useEffect(() => {
    fetchDeployments();
  }, [currentPage]);

  const fetchDeployments = async () => {
    const result = await listDeployments(currentPage, pageLimit);
    if (result) {
      setDeployments(result.deployments);
      setTotalPages(Math.ceil(result.deployments.length / pageLimit) || 1);
    } else {
      handleAlert("error", "Failed to load deployments");
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchDeployments();
    setIsRefreshing(false);
    handleAlert("success", "Deployments refreshed");
  };

  const filteredDeployments = deployments.filter(d =>
    d.image.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.deployment_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedDeployments = filteredDeployments.slice(
    (currentPage - 1) * pageLimit,
    currentPage * pageLimit
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handleAlert = (type: string, message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 10000);
  };

  const viewDeploymentDetails = (id: string) => {
    setDeploymentId(id);
    setIsDeploymentId(true);
  };

  const handleDeleteClick = (deployment: DeploymentListItem) => {
    setSelectedDeployment(deployment);
    setIsDeleteDeploymentOpen(true);
  };

  const handleDeploymentCreated = () => {
    fetchDeployments(); // Refresh list after creating deployment
  };

  const handleDeploymentDeleted = () => {
    fetchDeployments(); // Refresh list after deleting deployment
  };

  if (themeLoading) return null;

  return (
    <div className="flex min-h-screen">
      {isDeploymentId && (
        <Deployment 
          setIsDeploymentId={setIsDeploymentId}
          deploymentId={deploymentId}
        />
      )}
      {!isDeploymentId && (
        <main className="flex-1 p-8 flex flex-col">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-between items-center mb-8"
          >
            <div className="flex items-center gap-4">
              <h2 className={`text-3xl font-bold ${theme === "light" ? 'text-black' : 'text-white'}`}>
                Deployments
                <span className="text-gray-500 text-2xl">({deployments.length})</span>
              </h2>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing || apiLoading}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                title="Refresh deployments"
              >
                <RefreshCw 
                  size={20} 
                  className={`${theme === "light" ? 'text-black' : 'text-white'} ${isRefreshing ? 'animate-spin' : ''}`}
                />
              </button>
            </div>
            <div className="relative">
              <input 
                type="text" 
                value={searchTerm}
                placeholder='Search by image, status, or ID...'
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-[#1A1B3A] text-white border border-[#2d3748] rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#00D2FF] transition-all w-72"
              />
              <SearchIcon
                size={16}
                className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'
              />
            </div>
          </motion.div>
          
          {/* Loading State */}
          {apiLoading && !isRefreshing && (
            <div className="flex items-center justify-center py-20">
              <RefreshCw size={32} className="animate-spin text-[#00D2FF]" />
            </div>
          )}

          {/* Deployments List */}
          {!apiLoading && filteredDeployments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {paginatedDeployments.map((deployment) => (
                <motion.div
                  key={deployment.deployment_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`glassmorphism-card border ${theme === "light" ? "border-black/10 text-black bg-indigo-100 opacity-20" : "border-white/10 text-white bg-gray-900 opacity-5"} overflow-hidden shadow-lg rounded-xl p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className={`font-bold text-xl ${theme === "light" ? 'text-black' : 'text-white'}`}>
                        {deployment.image}
                      </h3>
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
                            w-2 h-2 rounded-full mr-2
                          `}
                        ></span>
                        {deployment.status}
                      </span>
                    </div>
                    <div className="space-y-3 text-gray-500 text-sm">
                      <p>
                        <strong>Deployment ID:</strong> {deployment.deployment_id}
                      </p>
                      <p>
                        <strong>Created At:</strong> {new Date(deployment.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-6">
                    <button
                      onClick={() => viewDeploymentDetails(deployment.deployment_id)} 
                      className={`text-xs font-semibold text-gray-500 ${theme === "light" ? '' : 'hover:text-white'} transition-colors`}
                    >
                      View Details 
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(deployment)}
                      className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : !apiLoading && (
            <div className="flex flex-col items-center justify-center text-gray-400 mt-16 flex-1">
              <Inbox size={48} className="mb-4 text-gray-500" />
              <p className="text-lg font-semibold">No deployments found</p>
              <p className="text-sm text-gray-500">
                Create your first deployment to get started 
              </p>
            </div> 
          )}

          {/* Pagination */}
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
      )}

      <motion.button
        drag
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        whileDrag={{ scale: 1.1 }} 
        onClick={() => setIsCreateDeploymentOpen(true)}
        className="fixed bottom-8 right-8 bg-[#00D2FF] hover:bg-cyan-500 text-white font-bold rounded-full h-16 w-16 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        <Plus size={24} className='text-gray-100'/>
      </motion.button>

      {/* Modals */}
      <CreateDeployment 
        isOPen={isCreateDeploymentOpen}
        onClose={() => {
          setIsCreateDeploymentOpen(false);
          handleDeploymentCreated();
        }}
        onAlert={handleAlert}
      />
      
      {selectedDeployment && (
        <DeleteDeployment 
          isOPen={isDeleteDeploymentOpen}
          onClose={() => {
            setIsDeleteDeploymentOpen(false);
            setSelectedDeployment(null);
            handleDeploymentDeleted();
          }}
          image={selectedDeployment.image}
          deployment_id={selectedDeployment.deployment_id}
          onAlert={handleAlert}
        />
      )}
      
      <Alert 
        isOpen={!!alert}
        onClose={() => setAlert(null)}
        type={alert?.type || ""}
        message={alert?.message || ""}
      />
    </div>
  );
};

export default Deployments;