import { useState, useEffect } from 'react'
import { ExtensionStorage } from '../utils/storage'

export const useStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(defaultValue)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ExtensionStorage.get<T>(key).then((storedValue) => {
      setValue(storedValue ?? defaultValue)
      setLoading(false)
    })
  }, [key, defaultValue])

  const updateValue = async (newValue: T) => {
    setValue(newValue)
    await ExtensionStorage.set(key, newValue)
  }

  return { value, updateValue, loading }
}