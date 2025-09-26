import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getStockData } from '../services/alphaVantage'
import StockChart from '../components/StockChart'

const TradePage = ({ onBack }) => {
    const [selectedStock, setSelectedStock] = useState('AAPL')
    const [stockData, setStockData] = useState(null)
    const [tradeType, setTradeType] = useState('buy')
    const [quantity, setQuantity] = useState(1)
    const [orderType, setOrderType] = useState('market')
    const [limitPrice, setLimitPrice] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [portfolio, setPortfolio] = useState([
        { symbol: 'AAPL', quantity: 10, avgPrice: 175.50, currentPrice: 180.25 },
        { symbol: 'TSLA', quantity: 5, avgPrice: 220.00, currentPrice: 215.80 },
        { symbol: 'GOOGL', quantity: 3, avgPrice: 2800.00, currentPrice: 2850.75 }
    ])
    const [cashBalance, setCashBalance] = useState(25000.00)
    const [tradeHistory, setTradeHistory] = useState([
        { id: 1, symbol: 'AAPL', type: 'buy', quantity: 5, price: 175.50, date: '2024-01-15', status: 'filled' },
        { id: 2, symbol: 'TSLA', type: 'sell', quantity: 2, price: 220.00, date: '2024-01-14', status: 'filled' },
        { id: 3, symbol: 'GOOGL', type: 'buy', quantity: 1, price: 2800.00, date: '2024-01-13', status: 'filled' }
    ])

    const popularStocks = ['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'AMZN', 'NVDA', 'META', 'NFLX']

    useEffect(() => {
        loadStockData()
    }, [selectedStock])

    const loadStockData = async () => {
        setIsLoading(true)
        try {
            const data = await getStockData(selectedStock)
            setStockData(data)
            if (data && orderType === 'limit' && !limitPrice) {
                setLimitPrice(data.currentPrice.toFixed(2))
            }
        } catch (error) {
            console.error('Error loading stock data:', error)
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

    const calculateTotal = () => {
        if (!stockData) return 0
        const price = orderType === 'market' ? stockData.currentPrice : parseFloat(limitPrice) || 0
        return price * quantity
    }

    const calculatePortfolioValue = () => {
        return portfolio.reduce((total, holding) => {
            return total + (holding.currentPrice * holding.quantity)
        }, 0)
    }

    const calculateUnrealizedPnL = () => {
        return portfolio.reduce((total, holding) => {
            const pnl = (holding.currentPrice - holding.avgPrice) * holding.quantity
            return total + pnl
        }, 0)
    }

    const handleTrade = () => {
        if (!stockData) return

        const price = orderType === 'market' ? stockData.currentPrice : parseFloat(limitPrice)
        const total = price * quantity

        if (tradeType === 'buy' && total > cashBalance) {
            alert('Insufficient funds!')
            return
        }

        if (tradeType === 'sell') {
            const holding = portfolio.find(h => h.symbol === selectedStock)
            if (!holding || holding.quantity < quantity) {
                alert('Insufficient shares to sell!')
                return
            }
        }

        // Execute trade
        const newTrade = {
            id: tradeHistory.length + 1,
            symbol: selectedStock,
            type: tradeType,
            quantity: quantity,
            price: price,
            date: new Date().toISOString().split('T')[0],
            status: 'filled'
        }

        setTradeHistory(prev => [newTrade, ...prev])

        if (tradeType === 'buy') {
            setCashBalance(prev => prev - total)
            const existingHolding = portfolio.find(h => h.symbol === selectedStock)
            if (existingHolding) {
                const newQuantity = existingHolding.quantity + quantity
                const newAvgPrice = ((existingHolding.avgPrice * existingHolding.quantity) + total) / newQuantity
                setPortfolio(prev => prev.map(h =>
                    h.symbol === selectedStock
                        ? { ...h, quantity: newQuantity, avgPrice: newAvgPrice }
                        : h
                ))
            } else {
                setPortfolio(prev => [...prev, {
                    symbol: selectedStock,
                    quantity: quantity,
                    avgPrice: price,
                    currentPrice: stockData.currentPrice
                }])
            }
        } else {
            setCashBalance(prev => prev + total)
            setPortfolio(prev => prev.map(h =>
                h.symbol === selectedStock
                    ? { ...h, quantity: h.quantity - quantity }
                    : h
            ).filter(h => h.quantity > 0))
        }

        alert(`Trade executed successfully! ${tradeType.toUpperCase()} ${quantity} shares of ${selectedStock} at ${formatPrice(price)}`)
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
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Trading Platform</h1>
                        <p className="text-gray-600">Buy and sell stocks with real-time data</p>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Trading Panel */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="lg:col-span-2 space-y-6"
                >
                    {/* Stock Selection */}
                    <div className="professional-card">
                        <div className="professional-card-header">
                            <h3 className="professional-card-title">
                                <span className="text-2xl">📊</span>
                                Select Stock
                            </h3>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                            {popularStocks.map((symbol) => (
                                <button
                                    key={symbol}
                                    onClick={() => setSelectedStock(symbol)}
                                    className={`p-3 rounded-lg border transition-all ${selectedStock === symbol
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    {symbol}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chart */}
                    {stockData && (
                        <StockChart stockData={stockData} symbol={selectedStock} />
                    )}

                    {/* Trading Form */}
                    <div className="professional-card">
                        <div className="professional-card-header">
                            <h3 className="professional-card-title">
                                <span className="text-2xl">💼</span>
                                Place Order
                            </h3>
                        </div>

                        <div className="space-y-6">
                            {/* Trade Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => setTradeType('buy')}
                                        className={`px-4 py-2 rounded-lg border transition-all ${tradeType === 'buy'
                                                ? 'border-green-500 bg-green-50 text-green-700'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        Buy
                                    </button>
                                    <button
                                        onClick={() => setTradeType('sell')}
                                        className={`px-4 py-2 rounded-lg border transition-all ${tradeType === 'sell'
                                                ? 'border-red-500 bg-red-50 text-red-700'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        Sell
                                    </button>
                                </div>
                            </div>

                            {/* Order Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => setOrderType('market')}
                                        className={`px-4 py-2 rounded-lg border transition-all ${orderType === 'market'
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        Market
                                    </button>
                                    <button
                                        onClick={() => setOrderType('limit')}
                                        className={`px-4 py-2 rounded-lg border transition-all ${orderType === 'limit'
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        Limit
                                    </button>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                    className="input-professional"
                                />
                            </div>

                            {/* Limit Price */}
                            {orderType === 'limit' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Limit Price</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={limitPrice}
                                        onChange={(e) => setLimitPrice(e.target.value)}
                                        className="input-professional"
                                        placeholder="Enter limit price"
                                    />
                                </div>
                            )}

                            {/* Order Summary */}
                            {stockData && (
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-2">Order Summary</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Stock:</span>
                                            <span className="font-medium">{selectedStock}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Action:</span>
                                            <span className="font-medium capitalize">{tradeType}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Quantity:</span>
                                            <span className="font-medium">{quantity} shares</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Price:</span>
                                            <span className="font-medium">
                                                {orderType === 'market' ? formatPrice(stockData.currentPrice) : formatPrice(parseFloat(limitPrice) || 0)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between border-t pt-2">
                                            <span className="text-gray-900 font-semibold">Total:</span>
                                            <span className="font-bold text-gray-900">{formatPrice(calculateTotal())}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleTrade}
                                disabled={!stockData || isLoading}
                                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${tradeType === 'buy'
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-red-600 hover:bg-red-700'
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {isLoading ? 'Loading...' : `${tradeType.toUpperCase()} ${quantity} ${selectedStock}`}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Portfolio & Account Info */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="space-y-6"
                >
                    {/* Account Summary */}
                    <div className="professional-card">
                        <div className="professional-card-header">
                            <h3 className="professional-card-title">
                                <span className="text-2xl">💰</span>
                                Account Summary
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-600">Cash Balance</span>
                                    <span className="font-bold text-gray-900">{formatPrice(cashBalance)}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-600">Portfolio Value</span>
                                    <span className="font-bold text-gray-900">{formatPrice(calculatePortfolioValue())}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Unrealized P&L</span>
                                    <span className={`font-bold ${calculateUnrealizedPnL() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {formatPrice(calculateUnrealizedPnL())}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Portfolio Holdings */}
                    <div className="professional-card">
                        <div className="professional-card-header">
                            <h3 className="professional-card-title">
                                <span className="text-2xl">📈</span>
                                Portfolio
                            </h3>
                        </div>

                        <div className="space-y-3">
                            {portfolio.map((holding, index) => {
                                const pnl = (holding.currentPrice - holding.avgPrice) * holding.quantity
                                const pnlPercent = ((holding.currentPrice - holding.avgPrice) / holding.avgPrice) * 100

                                return (
                                    <div key={index} className="p-3 border border-gray-200 rounded-lg">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-semibold text-gray-900">{holding.symbol}</span>
                                            <span className="text-sm text-gray-600">{holding.quantity} shares</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm text-gray-600">Avg: {formatPrice(holding.avgPrice)}</span>
                                            <span className="text-sm text-gray-600">Current: {formatPrice(holding.currentPrice)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Value: {formatPrice(holding.currentPrice * holding.quantity)}</span>
                                            <span className={`text-sm font-medium ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {pnl >= 0 ? '+' : ''}{formatPrice(pnl)} ({pnlPercent >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%)
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Recent Trades */}
                    <div className="professional-card">
                        <div className="professional-card-header">
                            <h3 className="professional-card-title">
                                <span className="text-2xl">📋</span>
                                Recent Trades
                            </h3>
                        </div>

                        <div className="space-y-3">
                            {tradeHistory.slice(0, 5).map((trade) => (
                                <div key={trade.id} className="p-3 border border-gray-200 rounded-lg">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-gray-900">{trade.symbol}</span>
                                        <span className={`text-sm font-medium ${trade.type === 'buy' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {trade.type.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm text-gray-600">{trade.quantity} shares</span>
                                        <span className="text-sm text-gray-600">{formatPrice(trade.price)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-500">{trade.date}</span>
                                        <span className="text-xs text-green-600 font-medium">{trade.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default TradePage
