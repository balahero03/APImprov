import { useState } from 'react'
import { motion } from 'framer-motion'
import { getStockData } from '../services/alphaVantage'
import Notification from '../components/Notification'

const HomePage = ({ onStockSubmit }) => {
    const [stockSymbol, setStockSymbol] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [notification, setNotification] = useState(null)
    const [demoMode, setDemoMode] = useState(false)

    const popularStocks = ['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'AMZN', 'NVDA', 'META', 'NFLX']

    const handleSubmit = async (symbol) => {
        if (!symbol) {
            setError('Please enter a stock symbol')
            return
        }

        setIsLoading(true)
        setError('')

        try {
            const data = await getStockData(symbol.toUpperCase())
            onStockSubmit(data)

            // Check if we're using mock data (API failed)
            if (data.isMockData) {
                setDemoMode(true)
                setNotification({
                    message: 'Using demo data - API unavailable. All features work with realistic sample data.',
                    type: 'warning',
                    duration: 8000
                })
            } else {
                setDemoMode(false)
            }
        } catch (err) {
            setError('Failed to fetch stock data. Please try again.')
            console.error('Error fetching stock data:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleRandomStock = () => {
        const randomStock = popularStocks[Math.floor(Math.random() * popularStocks.length)]
        setStockSymbol(randomStock)
        handleSubmit(randomStock)
    }

    return (
        <div className="max-w-6xl mx-auto">
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    duration={notification.duration}
                    onClose={() => setNotification(null)}
                />
            )}
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mb-8"
                >
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                        className="text-8xl mb-6"
                    >
                        🔮
                    </motion.div>
                    <h1 className="text-6xl font-bold text-gradient mb-4">
                        Stock Fortune Teller
                    </h1>
                    {demoMode && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center px-4 py-2 bg-yellow-100 border border-yellow-300 rounded-full text-yellow-800 text-sm font-medium mb-4"
                        >
                            <span className="mr-2">🎭</span>
                            Demo Mode - Using Sample Data
                        </motion.div>
                    )}
                    <p className="text-2xl text-gray-900 mb-2">
                        Discover Your Stock's Mystical Destiny
                    </p>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                        Transform boring financial data into engaging, mystical experiences with real market insights and professional analysis
                    </p>
                </motion.div>
            </motion.div>

            {/* Main Input Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="professional-card mb-12"
            >
                <div className="professional-card-header">
                    <h2 className="professional-card-title">
                        <span className="text-3xl">📈</span>
                        Enter Stock Symbol
                    </h2>
                    <p className="professional-card-subtitle">
                        Get real-time market analysis and mystical fortune insights
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-900 font-semibold mb-3 text-lg">
                            Stock Symbol
                        </label>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={stockSymbol}
                                onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
                                placeholder="e.g., AAPL, TSLA, GOOGL"
                                className="input-professional flex-1"
                                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(stockSymbol)}
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleSubmit(stockSymbol)}
                                disabled={isLoading}
                                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                        />
                                        Analyzing...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <span className="mr-2">🔮</span>
                                        Get Fortune
                                    </span>
                                )}
                            </motion.button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-transparent text-gray-600 font-medium">or</span>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleRandomStock}
                        disabled={isLoading}
                        className="w-full py-6 glass-strong text-gray-900 font-semibold rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        <div className="flex items-center justify-center space-x-3">
                            <motion.span
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="text-3xl group-hover:scale-110 transition-transform duration-300"
                            >
                                🎡
                            </motion.span>
                            <div className="text-left">
                                <div className="text-xl font-bold">Spin the Wheel</div>
                                <div className="text-sm text-gray-600">Get a random stock fortune</div>
                            </div>
                        </div>
                    </motion.button>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl flex items-center"
                        >
                            <span className="text-xl mr-3">⚠️</span>
                            <span className="font-medium">{error}</span>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Popular Stocks Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="professional-card"
            >
                <div className="professional-card-header">
                    <h3 className="professional-card-title">
                        <span className="text-2xl">⭐</span>
                        Popular Stocks
                    </h3>
                    <p className="professional-card-subtitle">
                        Quick access to trending market symbols
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                    {popularStocks.map((stock, index) => (
                        <motion.button
                            key={stock}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSubmit(stock)}
                            disabled={isLoading}
                            className="btn-ghost py-3 px-4 rounded-lg text-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all duration-200"
                        >
                            <div className="font-bold text-lg text-gray-900">{stock}</div>
                            <div className="text-xs text-gray-600 mt-1">Click to analyze</div>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Features Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-16 grid md:grid-cols-3 gap-6"
            >
                <div className="professional-card text-center">
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Data</h3>
                    <p className="text-gray-700">
                        Live market data from Alpha Vantage API with professional analysis
                    </p>
                </div>

                <div className="professional-card text-center">
                    <div className="text-4xl mb-4">🔮</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Mystical Insights</h3>
                    <p className="text-gray-700">
                        AI-powered fortune generation based on market trends and patterns
                    </p>
                </div>

                <div className="professional-card text-center">
                    <div className="text-4xl mb-4">💡</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Advice</h3>
                    <p className="text-gray-700">
                        Actionable investment insights tailored to your stock's performance
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default HomePage