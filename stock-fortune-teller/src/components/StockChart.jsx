import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

const StockChart = ({ stockData, symbol }) => {
    const [chartData, setChartData] = useState([])
    const [timeframe, setTimeframe] = useState('1D')
    const [chartType, setChartType] = useState('line')

    // Generate mock historical data based on current price
    useEffect(() => {
        if (stockData) {
            const generateHistoricalData = () => {
                const data = []
                const currentPrice = stockData.currentPrice
                const change = stockData.change
                const basePrice = currentPrice - change

                // Generate data points for the selected timeframe
                let points = 24 // 1 day = 24 hours
                if (timeframe === '1W') points = 7
                if (timeframe === '1M') points = 30
                if (timeframe === '3M') points = 90
                if (timeframe === '1Y') points = 365

                for (let i = 0; i < points; i++) {
                    const volatility = 0.02 // 2% volatility
                    const randomChange = (Math.random() - 0.5) * volatility * basePrice
                    const price = basePrice + (change * i / points) + randomChange

                    data.push({
                        time: timeframe === '1D' ? `${i}:00` :
                            timeframe === '1W' ? `Day ${i + 1}` :
                                timeframe === '1M' ? `${i + 1}` :
                                    timeframe === '3M' ? `Week ${Math.floor(i / 7) + 1}` :
                                        `Month ${Math.floor(i / 30) + 1}`,
                        price: Math.max(price, basePrice * 0.5), // Prevent negative prices
                        volume: Math.floor(Math.random() * stockData.volume * 0.1 + stockData.volume * 0.05)
                    })
                }

                // Add current price as the last point
                data.push({
                    time: 'Now',
                    price: currentPrice,
                    volume: stockData.volume
                })

                return data
            }

            setChartData(generateHistoricalData())
        }
    }, [stockData, timeframe])

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
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

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-lg">
                    <p className="text-gray-600 text-sm font-medium">{label}</p>
                    <p className="text-gray-900 font-semibold">
                        Price: {formatPrice(payload[0].value)}
                    </p>
                    {payload[1] && (
                        <p className="text-gray-600 text-sm">
                            Volume: {formatVolume(payload[1].value)}
                        </p>
                    )}
                </div>
            )
        }
        return null
    }

    if (!stockData || !chartData.length) {
        return (
            <div className="professional-card">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin text-4xl mb-4">📊</div>
                        <p className="text-gray-900">Loading chart data...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="professional-card"
        >
            <div className="professional-card-header">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="professional-card-title">
                            <span className="text-2xl">📈</span>
                            {symbol} Price Chart
                        </h3>
                        <p className="professional-card-subtitle">
                            Historical price movement and volume
                        </p>
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* Timeframe Selector */}
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            {['1D', '1W', '1M', '3M', '1Y'].map((tf) => (
                                <button
                                    key={tf}
                                    onClick={() => setTimeframe(tf)}
                                    className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${timeframe === tf
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    {tf}
                                </button>
                            ))}
                        </div>

                        {/* Chart Type Selector */}
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setChartType('line')}
                                className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${chartType === 'line'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Line
                            </button>
                            <button
                                onClick={() => setChartType('area')}
                                className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${chartType === 'area'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Area
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {/* Price Summary */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Current Price</p>
                        <p className="text-xl font-bold text-gray-900">
                            {formatPrice(stockData.currentPrice)}
                        </p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Change</p>
                        <p className={`text-xl font-bold ${stockData.change >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {stockData.change >= 0 ? '+' : ''}{formatPrice(stockData.change)}
                        </p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Change %</p>
                        <p className={`text-xl font-bold ${stockData.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {stockData.changePercent >= 0 ? '+' : ''}{stockData.changePercent.toFixed(2)}%
                        </p>
                    </div>
                </div>

                {/* Chart */}
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        {chartType === 'line' ? (
                            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="time"
                                    stroke="#6b7280"
                                    fontSize={12}
                                />
                                <YAxis
                                    stroke="#6b7280"
                                    fontSize={12}
                                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    stroke={stockData.change >= 0 ? "#16a34a" : "#dc2626"}
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{ r: 5, fill: stockData.change >= 0 ? "#16a34a" : "#dc2626" }}
                                />
                            </LineChart>
                        ) : (
                            <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="time"
                                    stroke="#6b7280"
                                    fontSize={12}
                                />
                                <YAxis
                                    stroke="#6b7280"
                                    fontSize={12}
                                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="price"
                                    stroke={stockData.change >= 0 ? "#16a34a" : "#dc2626"}
                                    fill={stockData.change >= 0 ? "rgba(22, 163, 74, 0.2)" : "rgba(220, 38, 38, 0.2)"}
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        )}
                    </ResponsiveContainer>
                </div>

                {/* Volume Chart */}
                <div className="h-32 w-full">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Volume</h4>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis
                                dataKey="time"
                                stroke="#6b7280"
                                fontSize={10}
                            />
                            <YAxis
                                stroke="#6b7280"
                                fontSize={10}
                                tickFormatter={(value) => formatVolume(value)}
                            />
                            <Area
                                type="monotone"
                                dataKey="volume"
                                stroke="#4f46e5"
                                fill="rgba(79, 70, 229, 0.2)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>
    )
}

export default StockChart
