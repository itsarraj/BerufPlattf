import { FiX, FiCheck, FiAlertCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi'

interface ToastProps {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  onClose: (id: string) => void
}

export default function Toast({ id, message, type, onClose }: ToastProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheck className="h-5 w-5 text-green-500" />
      case 'error':
        return <FiAlertCircle className="h-5 w-5 text-red-500" />
      case 'info':
        return <FiInfo className="h-5 w-5 text-blue-500" />
      case 'warning':
        return <FiAlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return <FiInfo className="h-5 w-5 text-blue-500" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      default:
        return 'bg-blue-50 border-blue-200'
    }
  }

  return (
    <div
      className={`${getBgColor()} border rounded-lg shadow-lg p-4 min-w-[300px] max-w-md flex items-start`}
    >
      <div className="mr-3 mt-0.5">
        {getIcon()}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="ml-4 text-gray-400 hover:text-gray-500"
      >
        <FiX className="h-5 w-5" />
      </button>
    </div>
  )
}