import React from 'react'
import Modal from '../ui/Modal';
import { useTheme } from '../layout/ThemeContext';

interface LoadingProps {
  isOpen: boolean; 
  size: 'sm' | 'md' | 'lg';
  text: string;
}

const Loading: React.FC<LoadingProps> = ({ size, text, isOpen }) => {
  const { theme, toggleTheme, loading } = useTheme();
  
  if (loading) return null; // avoid flicker on load

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div>
      {isOpen && (
      <Modal>
      <div className="flex flex-col overflow-hidden  shadow-2xl rounded-xl duration-300">
      <div className="flex items-center space-x-2">
        <svg
          className={`animate-spin ${sizeClasses[size]} ${ theme === "light" ? 'text-cyan-800' : 'text-cyan-600'} `}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span className={` text-sm ${ theme === "light" ? 'text-gray-800' : 'text-gray-400'}`}>{text}</span>
      </div>
      </div>
      </Modal>
      )}
    </div>
  )
}

export default Loading
