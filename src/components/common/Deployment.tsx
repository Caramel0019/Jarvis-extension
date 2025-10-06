import { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { ChevronLeft, RefreshCw } from 'lucide-react';
import DeleteDeployment from '../modals/DeleteDeployment';
import Alert from '../ui/Alert';
import { useTheme } from '../layout/ThemeContext';
import { useApi } from '@/hooks/useApi';
import type { DeploymentStatus } from '@/types/api';

interface DeploymentProps {
    setIsDeploymentId: React.Dispatch<React.SetStateAction<boolean>>;
    deploymentId: string | null;
}

const Deployment: React.FC<DeploymentProps> = ({ setIsDeploymentId, deploymentId }) => {
  const { theme, loading: themeLoading } = useTheme();
  const { getDeploymentStatus, loading: apiLoading } = useApi();
  
  const [deploymentDetails, setDeploymentDetails] = useState<DeploymentStatus | null>(null);
  const [isDeleteDeploymentOpen, setIsDeleteDeploymentOpen] = useState(false);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (deploymentId) {
      fetchDeploymentDetails();
    }
  }, [deploymentId]);

  const fetchDeploymentDetails = async () => {
    if (!deploymentId) return;
    
    const result = await getDeploymentStatus(deploymentId);
    if (result) {
      setDeploymentDetails(result);
    } else {
      handleAlert("error", "Failed to load deployment details");
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchDeploymentDetails();
    setIsRefreshing(false);
    handleAlert("success", "Deployment details refreshed");
  };

  const handleAlert = (type: string, message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 10000);
  };

  const handleDeleteSuccess = () => {
    handleAlert("success", "Deployment deleted successfully");
    setTimeout(() => {
      setIsDeploymentId(false);
    }, 1500);
  };

  if (themeLoading) return null;

  return (
    <main className="flex-1 p-4 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-between items-center mb-8"
        >
            <div className="flex items-center gap-3">
               <div
                 onClick={() => setIsDeploymentId(false)} 
                 className={`${theme === "light" ? 'text-black' : 'text-white'} cursor-pointer hover:opacity-70 transition-opacity`}
                >
                   <ChevronLeft size={35}/>
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing || apiLoading}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                  title="Refresh deployment details"
                >
                  <RefreshCw 
                    size={20} 
                    className={`${theme === "light" ? 'text-black' : 'text-white'} ${isRefreshing ? 'animate-spin' : ''}`}
                  />
                </button>
            </div>
            <h2 className={`text-2xl font-bold ${theme === "light" ? 'text-black' : 'text-white'}`}>
               Deployment
               <span className="text-gray-500 text-xl ml-2">({deploymentId})</span>
          </h2>
        </motion.div>

        {/* Loading State */}
        {apiLoading && !deploymentDetails && (
          <div className="flex items-center justify-center py-20">
            <RefreshCw size={32} className="animate-spin text-[#00D2FF]" />
          </div>
        )}

        {/* Deployment Details */}
        {deploymentDetails && (
          <section>
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.1 }}
               className={`glassmorphism-card p-6 ${theme === "light" ? "border-black/10 text-black bg-indigo-100 opacity-20" : "border-white/10 text-white bg-gray-900 opacity-5"} flex flex-col overflow-hidden border shadow-lg rounded-xl justify-between transition-all duration-300`}
            >
                <div>
                  <div className="flex justify-between mx-5 mt-2">
                    <h2 className={`text-2xl font-bold ${theme === "light" ? 'text-black' : 'text-white'}`}>
                      Deployment {deploymentDetails.deployment_id}
                    </h2>
                    <span 
                      className={`
                        ${
                          deploymentDetails.status_data.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : deploymentDetails.status_data.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : deploymentDetails.status_data.status === "terminated"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-gray-500/20 text-gray-400"
                        }
                        flex items-center text-sm font-semibold px-4 py-2 rounded-full
                      `}
                    >
                      <span 
                        className={`
                          ${
                            deploymentDetails.status_data.status === "active"
                            ? "bg-green-400"
                            : deploymentDetails.status_data.status === "pending"
                            ? "bg-yellow-400 animate-pulse"
                            : deploymentDetails.status_data.status === "terminated"
                            ? "bg-red-400"
                            : "bg-gray-400"
                          }
                          w-4 h-4 rounded-full mr-4
                        `}
                      ></span>
                      {deploymentDetails.status_data.status}
                    </span>
                  </div> 
                  
                  <div className="flex flex-col my-8">
                    <h2 className={`p-2 m-2 text-2xl font-bold ${theme === "light" ? 'text-black' : 'text-white'}`}>
                      Deployment Information
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-2 m-2">
                      <p>
                        <span className={`font-bold ${theme === "light" ? 'text-black' : 'text-white'}`}>
                          Deployment ID:
                        </span> {deploymentDetails.deployment_id}
                      </p>
                      <p>
                        <span className={`font-bold ${theme === "light" ? 'text-black' : 'text-white'}`}>
                          Provider:
                        </span> {deploymentDetails.status_data.provider}
                      </p>
                      <p>
                        <span className={`font-bold ${theme === "light" ? 'text-black' : 'text-white'}`}>
                          CPU:
                        </span> {deploymentDetails.status_data.resources.cpu} cores
                      </p>
                      <p>
                        <span className={`font-bold ${theme === "light" ? 'text-black' : 'text-white'}`}>
                          Memory:
                        </span> {deploymentDetails.status_data.resources.memory}
                      </p>
                      <p>
                        <span className={`font-bold ${theme === "light" ? 'text-black' : 'text-white'}`}>
                          Storage:
                        </span> {deploymentDetails.status_data.resources.storage}
                      </p>
                      <p>
                        <span className={`font-bold ${theme === "light" ? 'text-black' : 'text-white'}`}>
                          Wallet Address:
                        </span> {deploymentDetails.wallet_address}
                      </p>
                      <p>
                        <span className={`font-bold ${theme === "light" ? 'text-black' : 'text-white'}`}>
                          Last Updated:
                        </span> {new Date(deploymentDetails.status_data.last_updated).toLocaleString()}
                      </p>
                      <p>
                        <span className={`font-bold ${theme === "light" ? 'text-black' : 'text-white'}`}>
                          Timestamp:
                        </span> {new Date(deploymentDetails.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <footer className="flex items-center justify-between p-5 border-t border-white/10 mt-4">
                  <button
                    onClick={() => setIsDeploymentId(false)} 
                    className={`px-6 py-2 rounded-lg ${theme === "light" ? 'text-black border-black/20' : 'text-white border-white/20'} font-bold bg-transparent border hover:bg-white/10 transition-colors`}
                  >
                    Back
                  </button>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      className={`px-6 py-2 rounded-lg ${theme === "light" ? 'text-black border-black/20' : 'text-white border-white/20'} font-bold bg-transparent border hover:bg-white/10 transition-colors disabled:opacity-50`}             
                    >
                      {isRefreshing ? 'Updating...' : 'Update'}
                    </button>
                    <button 
                      onClick={() => setIsDeleteDeploymentOpen(true)}
                      className={`px-6 py-2 rounded-lg font-bold flex items-center justify-center gap-2 ${theme === "light" ? 'text-white' : 'text-black'} bg-red-500 hover:bg-red-600 hover:text-white shadow-lg shadow-red-200/20`}
                    >
                      Delete
                    </button>
                  </div>
                </footer>
            </motion.div>
        </section>
        )}

        {/* No Data State */}
        {!apiLoading && !deploymentDetails && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500">No deployment details found</p>
          </div>
        )}

        {deploymentDetails && (
          <DeleteDeployment 
            isOPen={isDeleteDeploymentOpen}
            onClose={() => setIsDeleteDeploymentOpen(false)}
            image={`Deployment ${deploymentDetails.deployment_id}`}
            deployment_id={deploymentDetails.deployment_id}
            onAlert={(type, message) => {
              handleAlert(type, message);
              if (type === "success") {
                handleDeleteSuccess();
              }
            }}
          />
        )}

        <Alert 
          isOpen={!!alert}
          onClose={() => setAlert(null)}
          type={alert?.type || ""}
          message={alert?.message || ""}
        />
    </main>
  );
};

export default Deployment;