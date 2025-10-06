// Base API Response
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  timestamp?: string;
}

// Authentication Types
export interface CreateSessionRequest {
  wallet_address: string;
  nonce: string;
  signature: string;
}

export interface SessionResponse {
  token: string;
  expires_in: number;
  wallet_address: string;
  created_at: string;
}

export interface ValidateSessionResponse {
  valid: boolean;
  wallet_address: string;
  validated_at: string;
}

// Voice Command Types
export interface VoiceCommandRequest {
  audio: File;
}

export interface VoiceCommand {
  action: string;
  target: string;
  image?: string;
  cpu?: string;
  memory?: string;
  storage?: string;
  ports?: number[];
}

export interface VoiceCommandResponse {
  raw_text: string;
  command: VoiceCommand;
  result: DeploymentResult;
  timestamp: string;
  wallet_address: string;
}

// Deployment Types
export interface CreateDeploymentRequest {
  image: string;
  cpu: number;
  memory: string;
  storage: string;
  ports?: number[];
  payment_amount?: number;
  payment_currency?: string;
}

export interface DeploymentResult {
  action: string;
  deployment_id: string;
  status: string;
  tx_hash: string;
  lease_id: string;
  provider_uri: string;
}

export interface CreateDeploymentResponse {
  success: boolean;
  deployment_id: string;
  tx_hash: string;
  lease_id: string;
  provider_uri: string;
  estimated_cost_uakt: number;
  timestamp: string;
}

export interface DeploymentStatus {
  deployment_id: string;
  status_data: {
    status: string;
    provider: string;
    resources: {
      cpu: number;
      memory: string;
      storage: string;
    };
    last_updated: string;
  };
  wallet_address: string;
  timestamp: string;
}

export interface DeploymentListItem {
  deployment_id: string;
  status: string;
  image: string;
  created_at: string;
}

export interface ListDeploymentsResponse {
  deployments: DeploymentListItem[];
  page: number;
  per_page: number;
  wallet_address: string;
  timestamp: string;
}

export interface TerminateDeploymentResponse {
  deployment_id: string;
  status: string;
  timestamp: string;
}

// Provider Types
export interface Provider {
  address: string;
  name: string;
  region: string;
  available_resources: {
    cpu: number;
    memory: number;
    storage: number;
  };
  pricing: {
    cpu_per_unit_per_block: number;
    memory_per_byte_per_block: number;
    storage_per_byte_per_block: number;
  };
  uptime: number;
  is_online: boolean;
}

export interface ProvidersResponse {
  data: {
    providers: Provider[];
    akt_price_usd: number;
    total_providers: number;
  };
  timestamp: string;
}

// Pricing Types
export interface PricingEstimateRequest {
  cpu: number;
  memory: string;
  storage: string;
}

export interface PricingEstimateResponse {
  pricing: {
    estimated_monthly_cost_uakt: number;
    estimated_monthly_cost_usd: number;
    akt_price_usd: number;
    available_providers: number;
    resource_breakdown: {
      cpu_units: number;
      memory_bytes: number;
      storage_bytes: number;
    };
  };
  timestamp: string;
}

// Error Types
export interface ApiError {
  error: string;
  retry_after?: string;
}

// Health Check
export interface HealthResponse {
  status: string;
  service: string;
  version: string;
  timestamp: string;
}