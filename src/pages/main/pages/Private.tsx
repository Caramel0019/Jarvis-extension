import { useState, useEffect } from 'react'
import { Plus, Server, Activity, DollarSign, Wifi, WifiOff, AlertCircle } from 'lucide-react'
import { API_BASE_URL } from '@/utils/constants'
import { useTheme } from '@/components/layout/ThemeContext'

interface AvailableResources {
  cpu: number
  memory: number
  storage: number
}

interface Pricing {
  cpu_per_unit_per_block: number
  memory_per_byte_per_block: number
  storage_per_byte_per_block: number
}

interface Provider {
  address: string
  name: string
  region: string
  available_resources: AvailableResources
  pricing: Pricing
  uptime: number
  is_online: boolean
}

interface ProvidersResponse {
  data: {
    providers: Provider[]
    akt_price_usd: number
    total_providers: number
  }
  timestamp: string
}

interface ResourceData {
  timestamps: string[]
  cpu: number[]
  memory: number[]
}

interface MetricsResponse {
  resource_data: ResourceData
  chart_config?: any
  timestamp: string
}

const Private = () => {
  const [providers, setProviders] = useState<Provider[]>([])
  const [aktPrice, setAktPrice] = useState<number>(0)
  const [totalProviders, setTotalProviders] = useState<number>(0)
  const [metricsData, setMetricsData] = useState<ResourceData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'providers' | 'monitoring'>('providers')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      await Promise.all([fetchProviders(), fetchMetrics()])
    } catch (err) {
      setError('Failed to fetch data. Please try again.')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)  
    }
  }

  const fetchProviders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/providers`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result: ProvidersResponse = await response.json()
      
      setProviders(result.data.providers || [])
      setAktPrice(result.data.akt_price_usd || 0)
      setTotalProviders(result.data.total_providers || 0)
    } catch (error) {
      console.error('Error fetching providers:', error)
      throw error
    }
  }

  const fetchMetrics = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/monitoring/metrics`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result: MetricsResponse = await response.json()
      
      // Filter out non-numeric 
      if (result.resource_data) {
        const filteredData = {
          timestamps: result.resource_data.timestamps.filter((_, i) => 
            typeof result.resource_data.cpu[i] === 'number' && 
            typeof result.resource_data.memory[i] === 'number'
          ),
          cpu: result.resource_data.cpu.filter((val): val is number => typeof val === 'number'),
          memory: result.resource_data.memory.filter((val): val is number => typeof val === 'number')
        }
        setMetricsData(filteredData)
      } else {
        setMetricsData(null)
      }
    } catch (error) {
      console.error('Error fetching metrics:', error)
      throw error
    }
  }

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const formatUptime = (uptime: number): string => {
    return (uptime * 100).toFixed(2) + '%'
  }

  const formatTimestamp = (timestamp: string): string => {
    try {
      const date = new Date(timestamp)
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    } catch {
      return timestamp
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className={`${ theme === 'light' ? "text-black" : "text-white"} text-xl`}>Loading dashboard...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-red-500/20 border border-red-500 rounded-xl p-6 max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="text-red-400" size={24} />
            <h3 className={`text-xl font-bold ${ theme === 'light' ? "text-black" : "text-white"}`}>Error Loading Data</h3>
          </div>
          <p className="text-red-200 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold ${ theme === 'light' ? "text-black" : "text-white"} mb-2`}>Private Dashboard</h1>
          <p className="text-cyan-500">Manage your cloud resources and monitor performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={` ${ theme === 'light' ? "bg-black/10 border-black/20" : "bg-white/10 border-white/20"} backdrop-blur-lg rounded-xl p-6 border `}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-500 text-sm mb-1">Total Providers</p>
                <p className={`${ theme === 'light' ? "text-black" : "text-white"} text-3xl font-bold`}>{totalProviders}</p>
              </div>
              <Server className="text-purple-400" size={40} />
            </div>
          </div>

          <div className={` ${ theme === 'light' ? "bg-black/10 border-black/20" : "bg-white/10 border-white/20"} backdrop-blur-lg rounded-xl p-6 border `}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-500 text-sm mb-1">AKT Price</p>
                <p className={`${ theme === 'light' ? "text-black" : "text-white"} text-3xl font-bold`}>${aktPrice.toFixed(4)}</p>
              </div>
              <DollarSign className="text-green-400" size={40} />
            </div>
          </div>

          <div className={` ${ theme === 'light' ? "bg-black/10 border-black/20" : "bg-white/10 border-white/20"} backdrop-blur-lg rounded-xl p-6 border `}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-500 text-sm mb-1">Active Status</p>
                <p className={`${ theme === 'light' ? "text-black" : "text-white"} text-3xl font-bold`}>
                  {providers.filter(p => p.is_online).length}/{providers.length}
                </p>
              </div>
              <Activity className="text-blue-400" size={40} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('providers')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'providers'
                ? 'bg-cyan-500 text-white'
                : 'bg-white/30 text-cyan-500 hover:bg-white/20'
            }`}
          >
            Providers
          </button>
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'monitoring'
                ? 'bg-cyan-500 text-white'
                : 'bg-white/30 text-cyan-500 hover:bg-white/20'
            }`}
          >
            Monitoring
          </button>
        </div>

        {/* Providers Tab */}
        {activeTab === 'providers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className={`text-2xl font-bold ${ theme === 'light' ? "text-black" : "text-white"}`}>Available Providers</h2>
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
                <Plus size={20} />
                Add Provider
              </button>
            </div>

            {providers.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-12 border border-white/20 text-center">
                <Server className="mx-auto text-purple-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-white mb-2">No Providers Available</h3>
                <p className="text-purple-300">Add a provider to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {providers.map((provider, index) => (
                  <div
                    key={index}
                    className={` ${ theme === 'light' ? "bg-black/10 border-black/20 " : "bg-white/10 border-white/20 "} backdrop-blur-lg rounded-xl p-6 border hover:border-cyan-400 transition-all`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className={`text-xl font-bold ${ theme === 'light' ? "text-black" : "text-white"} mb-1`}>{provider.name}</h3>
                        <p className="text-cyan-500 text-sm font-mono">{provider.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {provider.is_online ? (
                          <>
                            <Wifi className="text-green-400" size={20} />
                            <span className="text-green-400 font-semibold">Online</span>
                          </>
                        ) : (
                          <>
                            <WifiOff className="text-red-400" size={20} />
                            <span className="text-red-400 font-semibold">Offline</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-cyan-500 text-sm mb-1">Region</p>
                        <p className={`${ theme === 'light' ? "text-black" : "text-white"} font-semibold`}>{provider.region}</p>
                      </div>
                      <div>
                        <p className="text-cyan-500 text-sm mb-1">Uptime</p>
                        <p className={`${ theme === 'light' ? "text-black" : "text-white"} font-semibold`}>{formatUptime(provider.uptime)}</p>
                      </div>
                      <div>
                        <p className="text-cyan-500 text-sm mb-1">CPU Available</p>
                        <p className={`${ theme === 'light' ? "text-black" : "text-white"} font-semibold`}>{provider.available_resources.cpu} units</p>
                      </div>
                      <div>
                        <p className="text-cyan-500 text-sm mb-1">Memory</p>
                        <p className={`${ theme === 'light' ? "text-black" : "text-white"} font-semibold`}>{formatBytes(provider.available_resources.memory)}</p>
                      </div>
                    </div>

                    <div className={`border-t ${ theme === 'light' ? "border-black/20" : "border-white/20"} pt-4`}>
                      <p className="text-cyan-500 text-sm mb-2">Pricing</p>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className={`${ theme === 'light' ? "text-black/70" : "text-white/70"} text-xs`}>CPU/block</p>
                          <p className={`${ theme === 'light' ? "text-black" : "text-white"} font-semibold`}>{provider.pricing.cpu_per_unit_per_block}</p>
                        </div>
                        <div>
                          <p className={`${ theme === 'light' ? "text-black/70" : "text-white/70"} text-xs`}>Memory/byte/block</p>
                          <p className={`${ theme === 'light' ? "text-black" : "text-white"} font-semibold`}>{provider.pricing.memory_per_byte_per_block}</p>
                        </div>
                        <div>
                          <p className={`${ theme === 'light' ? "text-black/70" : "text-white/70"} text-xs`}>Storage/byte/block</p>
                          <p className={`${ theme === 'light' ? "text-black" : "text-white"} font-semibold`}>{provider.pricing.storage_per_byte_per_block}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Monitoring Tab */}
        {activeTab === 'monitoring' && (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${ theme === 'light' ? "text-black" : "text-white"}`}>System Resource Usage</h2>

            {!metricsData || metricsData.cpu.length === 0 ? (
              <div className={` ${ theme === 'light' ? "bg-black/10 border-black/20" : "bg-white/10 border-white/20"} backdrop-blur-lg rounded-xl p-6 border `}>
                <Activity className="mx-auto text-purple-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-white mb-2">No Metrics Data</h3>
                <p className="text-purple-300">Monitoring data is not available</p>
              </div>
            ) : (
              <>
                <div className={` ${ theme === 'light' ? "bg-black/10 border-black/20" : "bg-white/10 border-white/20"} backdrop-blur-lg rounded-xl p-6 border `}>
                  <div className="mb-6">
                    <h3 className={`text-lg font-semibold ${ theme === 'light' ? "text-black" : "text-white"} mb-4`}>Resource Usage Over Time</h3>
                    <div className="h-64 flex items-end justify-between gap-2">
                      {metricsData.cpu.map((cpuVal, i) => {
                        const memVal = metricsData.memory[i] || 0
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full flex flex-col gap-1">
                              <div 
                                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all hover:from-blue-400 hover:to-blue-300"
                                style={{ height: `${cpuVal * 2}px` }}
                                title={`CPU: ${cpuVal}%`}
                              />
                              <div 
                                className="w-full bg-gradient-to-t from-pink-500 to-pink-400 rounded-t transition-all hover:from-pink-400 hover:to-pink-300"
                                style={{ height: `${memVal * 2}px` }}
                                title={`Memory: ${memVal}%`}
                              />
                            </div>
                            <span className="text-cyan-500 text-xs">
                              {formatTimestamp(metricsData.timestamps[i])}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span className={`${ theme === 'light' ? "text-black" : "text-white"} text-sm`}>CPU Usage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-pink-500 rounded"></div>
                      <span className={`${ theme === 'light' ? "text-black" : "text-white"} text-sm`}>Memory Usage</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={` ${ theme === 'light' ? "bg-black/10 border-black/20" : "bg-white/10 border-white/20"} backdrop-blur-lg rounded-xl p-6 border `}>
                    <h3 className={`text-lg font-semibold ${ theme === 'light' ? "text-black" : "text-white"} mb-4`}>Current CPU Usage</h3>
                    <div className="text-5xl font-bold text-blue-400 mb-2">
                      {typeof metricsData.cpu[metricsData.cpu.length - 1] === 'number' 
                        ? metricsData.cpu[metricsData.cpu.length - 1].toFixed(1) 
                        : '0.0'}%
                    </div>
                    <p className="text-cyan-500">Average load</p>
                  </div>

                  <div className={` ${ theme === 'light' ? "bg-black/10 border-black/20" : "bg-white/10 border-white/20"} backdrop-blur-lg rounded-xl p-6 border `}>
                    <h3 className={`text-lg font-semibold ${ theme === 'light' ? "text-black" : "text-white"} mb-4`}>Current Memory Usage</h3>
                    <div className="text-5xl font-bold text-pink-400 mb-2">
                      {typeof metricsData.memory[metricsData.memory.length - 1] === 'number' 
                        ? metricsData.memory[metricsData.memory.length - 1].toFixed(1) 
                        : '0.0'}%
                    </div>
                    <p className="text-cyan-500">Of total memory</p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Private