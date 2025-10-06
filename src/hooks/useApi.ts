import { useState, useCallback } from 'react';
import { apiClient, apiHelpers } from '../utils/api';
import { API_ENDPOINTS, DEFAULTS } from '../utils/constants';
import { AuthStorage } from '../utils/storage';
import type {
  CreateSessionRequest, 
  SessionResponse,
  ValidateSessionResponse,
  VoiceCommandResponse,
  CreateDeploymentRequest,
  CreateDeploymentResponse,
  DeploymentStatus,
  ListDeploymentsResponse,
  TerminateDeploymentResponse,
  ProvidersResponse,
  PricingEstimateRequest,    
  PricingEstimateResponse,
  HealthResponse,
} from '../types/api';

//Hook for API operations
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle async operations
  const handleAsync = useCallback(async <T>(
    operation: () => Promise<T>
  ): Promise<T | null> => {
    try { 
      setLoading(true);
      setError(null);
      const result = await operation();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('API Error:', errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Health Check
  const checkHealth = useCallback(async (): Promise<HealthResponse | null> => {
    return handleAsync(async () => {
      const response = await apiClient.get<HealthResponse>(API_ENDPOINTS.HEALTH);
      return apiHelpers.getData(response);
    });
  }, [handleAsync]);

  // Authentication
  const createSession = useCallback(async (
    sessionData: CreateSessionRequest
  ): Promise<SessionResponse | null> => {
    return handleAsync(async () => {
      const response = await apiClient.post<SessionResponse>(
        API_ENDPOINTS.AUTH.SESSION,
        sessionData
      );
      const data = apiHelpers.getData(response);
      
      // Store auth data
      await AuthStorage.setToken(data.token);
      await AuthStorage.setWalletAddress(data.wallet_address);
      await AuthStorage.setTokenExpires(Date.now() + (data.expires_in * 1000));
      
      return data;
    });
  }, [handleAsync]);

  const refreshSession = useCallback(async (): Promise<SessionResponse | null> => {
    return handleAsync(async () => {
      const response = await apiClient.post<SessionResponse>(API_ENDPOINTS.AUTH.REFRESH);
      const data = apiHelpers.getData(response);
      
      // Update auth data
      await AuthStorage.setToken(data.token);
      await AuthStorage.setTokenExpires(Date.now() + (data.expires_in * 1000));
      
      return data;
    });
  }, [handleAsync]);

  const validateSession = useCallback(async (): Promise<ValidateSessionResponse | null> => {
    return handleAsync(async () => {
      const response = await apiClient.get<ValidateSessionResponse>(API_ENDPOINTS.AUTH.VALIDATE);
      return apiHelpers.getData(response);
    });
  }, [handleAsync]);

  const logout = useCallback(async (): Promise<void> => {
    await AuthStorage.clearAuth();
    setError(null);
  }, []);

  // Voice Commands
  const processVoiceCommand = useCallback(async (
    audioFile: File
  ): Promise<VoiceCommandResponse | null> => {
    return handleAsync(async () => {
      const formData = new FormData();
      formData.append('audio', audioFile);
      
      const response = await apiClient.postFormData<VoiceCommandResponse>(
        API_ENDPOINTS.VOICE.COMMAND,
        formData
      );
      return apiHelpers.getData(response);
    });
  }, [handleAsync]);

  // Deployments
  const createDeployment = useCallback(async (
    deploymentData: CreateDeploymentRequest
  ): Promise<CreateDeploymentResponse | null> => {
    return handleAsync(async () => {
      const response = await apiClient.post<CreateDeploymentResponse>(
        API_ENDPOINTS.DEPLOYMENTS,
        deploymentData
      );
      return apiHelpers.getData(response);
    });
  }, [handleAsync]);

  const getDeploymentStatus = useCallback(async (
    deploymentId: string
  ): Promise<DeploymentStatus | null> => {
    return handleAsync(async () => {
      const response = await apiClient.get<DeploymentStatus>(
        API_ENDPOINTS.DEPLOYMENT_STATUS(deploymentId)
      );
      return apiHelpers.getData(response);
    });
  }, [handleAsync]);

  const listDeployments = useCallback(async (
    page: number = DEFAULTS.PAGE,
    perPage: number = DEFAULTS.PER_PAGE
  ): Promise<ListDeploymentsResponse | null> => {
    return handleAsync(async () => {
      const response = await apiClient.get<ListDeploymentsResponse>(
        `${API_ENDPOINTS.DEPLOYMENTS}?page=${page}&per_page=${perPage}`
      );
      return apiHelpers.getData(response);
    });
  }, [handleAsync]);

  const terminateDeployment = useCallback(async (
    deploymentId: string
  ): Promise<TerminateDeploymentResponse | null> => {
    return handleAsync(async () => {
      const response = await apiClient.delete<TerminateDeploymentResponse>(
        API_ENDPOINTS.DEPLOYMENT_DELETE(deploymentId)
      );
      return apiHelpers.getData(response);
    });
  }, [handleAsync]);

  // Providers
  const getProviders = useCallback(async (): Promise<ProvidersResponse | null> => {
    return handleAsync(async () => {
      const response = await apiClient.get<ProvidersResponse>(API_ENDPOINTS.PROVIDERS);
      return apiHelpers.getData(response);
    });
  }, [handleAsync]);

  // Pricing
  const estimatePricing = useCallback(async (
    pricingData: PricingEstimateRequest
  ): Promise<PricingEstimateResponse | null> => {
    return handleAsync(async () => {
      const response = await apiClient.post<PricingEstimateResponse>(
        API_ENDPOINTS.PRICING.ESTIMATE,
        pricingData
      );
      return apiHelpers.getData(response);
    });
  }, [handleAsync]);

  // Utility functions
  const isAuthenticated = useCallback(async (): Promise<boolean> => {
    const token = await AuthStorage.getToken();
    const isValid = await AuthStorage.isTokenValid();
    return !!(token && isValid);
  }, []);

  const getWalletAddress = useCallback(async (): Promise<string | null> => {
    return AuthStorage.getWalletAddress();
  }, []);

  return {
    // State
    loading,
    error,
    
    // Health
    checkHealth,
    
    // Authentication
    createSession,
    refreshSession,
    validateSession,
    logout,
    isAuthenticated,
    getWalletAddress,
    
    // Voice Commands
    processVoiceCommand,
    
    // Deployments
    createDeployment,
    getDeploymentStatus,
    listDeployments,
    terminateDeployment,
    
    // Providers
    getProviders,
    
    // Pricing
    estimatePricing,
    
    // Utilities
    clearError: () => setError(null),
  };
};