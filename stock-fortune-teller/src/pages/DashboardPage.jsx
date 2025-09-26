import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getStockData } from '../services/alphaVantage'
import StockChart from '../components/StockChart'

const DashboardPage = ({ onBack }) => {
    const [watchlist, setWatchlist] = useState([])
    const [marketData, setMarketData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const popularStocks = ['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'AMZN', 'NVDA', 'META', 'NFLX']

    useEffect(() => {
        loadMarketData()
    }, [])

    const loadMarketData = async () => {
        setIsLoading(true)
        try {
            const promises = popularStocks.slice(0, 6).map(symbol => getStockData(symbol))
            const results = await Promise.all(promises)
            setWatchlist(results.filter(data => data !== null))
        } catch (error) {
            console.error('Error loading market data:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price)
    }

    const formatVolume = (volume) => {
        if (volume >= 1000000) {
            return `${(volume / 1000000).toFixed(1)}M`
        } else if (volume >= 1000) {
            return `${(volume / 1000).toFixed(1)}K`
        }
        return volume.toString()
    }

    const getChangeColor = (change) => {
        return change >= 0 ? 'text-green-600' : 'text-red-600'
    }

    const getChangeBgColor = (change) => {
        return change >= 0 ? 'bg-green-50' : 'bg-red-50'
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Market Dashboard</h1>
                        <p className="text-gray-600">Real-time market overview and stock analysis</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onBack}
                        className="btn-secondary"
                    >
                        <span className="mr-2">←</span>
                        Back to Fortune Teller
                    </motion.button>
                </div>
            </motion.div>

            {/* Market Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="professional-card"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Market Cap</p>
                            <p className="text-2xl font-bold text-gray-900">$45.2T</p>
                            <p className="text-sm text-green-600">+2.3%</p>
                        </div>
                        <div className="text-3xl">🌍</div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="professional-card"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">S&P 500</p>
                            <p className="text-2xl font-bold text-gray-900">4,567.89</p>
                            <p className="text-sm text-green-600">+1.2%</p>
                        </div>
                        <div className="text-3xl">📊</div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="professional-card"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">NASDAQ</p>
                            <p className="text-2xl font-bold text-gray-900">14,234.56</p>
                            <p className="text-sm text-red-600">-0.8%</p>
                        </div>
                        <div className="text-3xl">💻</div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="professional-card"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">DOW JONES</p>
                            <p className="text-2xl font-bold text-gray-900">34,567.89</p>
                            <p className="text-sm text-green-600">+0.5%</p>
                        </div>
                        <div className="text-3xl">📈</div>
                    </div>
                </motion.div>
            </div>

            {/* Watchlist */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="professional-card mb-8"
            >
                <div className="professional-card-header">
                    <h3 className="professional-card-title">
                        <span className="text-2xl">⭐</span>
                        Top Stocks Watchlist
                    </h3>
                    <p className="professional-card-subtitle">
                        Real-time prices and performance
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center h-32">
                        <div className="text-center">
                            <div className="animate-spin text-4xl mb-4">📊</div>
                            <p className="text-gray-900">Loading market data...</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {watchlist.map((stock, index) => (
                            <motion.div
                                key={stock.symbol}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{stock.symbol}</h4>
                                        <p className="text-sm text-gray-600">Current Price</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">{formatPrice(stock.currentPrice)}</p>
                                        <p className={`text-sm font-medium ${getChangeColor(stock.change)}`}>
                                            {stock.change >= 0 ? '+' : ''}{formatPrice(stock.change)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <span>Volume: {formatVolume(stock.volume)}</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getChangeBgColor(stock.change)} ${getChangeColor(stock.change)}`}>
                                        {stock.trend}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>

            {/* Featured Chart */}
            {watchlist.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="mb-8"
                >
                    <StockChart stockData={watchlist[0]} symbol={watchlist[0].symbol} />
                </motion.div>
            )}

            {/* Market Insights */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
                {/* Market News */}
                <div className="professional-card">
                    <div className="professional-card-header">
                        <h3 className="professional-card-title">
                            <span className="text-2xl">📰</span>
                            Market News
                        </h3>
                        <p className="professional-card-subtitle">
                            Latest market updates and insights
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                title: "Tech Stocks Rally on AI Optimism",
                                summary: "Major technology companies see significant gains following positive AI developments.",
                                time: "2 hours ago",
                                impact: "positive"
                            },
                            {
                                title: "Federal Reserve Maintains Interest Rates",
                                summary: "Central bank keeps rates steady, signaling continued economic stability.",
                                time: "4 hours ago",
                                impact: "neutral"
                            },
                            {
                                title: "Energy Sector Faces Headwinds",
                                summary: "Oil prices decline amid concerns over global demand and supply.",
                                time: "6 hours ago",
                                impact: "negative"
                            }
                        ].map((news, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 mb-1">{news.title}</h4>
                                        <p className="text-sm text-gray-600 mb-2">{news.summary}</p>
                                        <p className="text-xs text-gray-500">{news.time}</p>
                                    </div>
                                    <div className={`w-3 h-3 rounded-full ml-4 ${news.impact === 'positive' ? 'bg-green-500' :
                                        news.impact === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                                        }`}></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Market Sentiment */}
                <div className="professional-card">
                    <div className="professional-card-header">
                        <h3 className="professional-card-title">
                            <span className="text-2xl">🎯</span>
                            Market Sentiment
                        </h3>
                        <p className="professional-card-subtitle">
                            Current market mood and indicators
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Fear & Greed Index</span>
                                <span className="text-sm font-bold text-gray-900">65 (Greed)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">VIX (Volatility)</span>
                                <span className="text-sm font-bold text-gray-900">18.5</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '37%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Put/Call Ratio</span>
                                <span className="text-sm font-bold text-gray-900">0.85</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Market Outlook</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Current market sentiment suggests moderate optimism with low volatility.
                                The Fear & Greed Index indicates investors are showing confidence,
                                while the VIX remains at comfortable levels.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default DashboardPage
