import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Notification = ({ message, type = 'info', duration = 5000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false)
                setTimeout(() => onClose?.(), 300) // Wait for animation to complete
            }, duration)
            return () => clearTimeout(timer)
        }
    }, [duration, onClose])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(() => onClose?.(), 300)
    }

    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-200 text-green-800'
            case 'error':
                return 'bg-red-50 border-red-200 text-red-800'
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800'
            default:
                return 'bg-blue-50 border-blue-200 text-blue-800'
        }
    }

    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✅'
            case 'error':
                return '❌'
            case 'warning':
                return '⚠️'
            default:
                return 'ℹ️'
        }
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`fixed top-4 right-4 z-50 max-w-sm w-full p-4 rounded-lg border shadow-lg ${getTypeStyles()}`}
                >
                    <div className="flex items-start space-x-3">
                        <span className="text-lg flex-shrink-0">{getIcon()}</span>
                        <div className="flex-1">
                            <p className="text-sm font-medium">{message}</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <span className="sr-only">Close</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Notification
