import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { generateFortune } from '../services/fortuneLogic'
import StockChart from '../components/StockChart'

const FortunePage = ({ stockData, onBack }) => {
  const [fortune, setFortune] = useState(null)
  const [isRevealing, setIsRevealing] = useState(true)

  useEffect(() => {
    if (stockData) {
      const generatedFortune = generateFortune(stockData)
      setFortune(generatedFortune)

      // Animate the reveal
      setTimeout(() => {
        setIsRevealing(false)
      }, 2000)
    }
  }, [stockData])

  if (!stockData || !fortune) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            🔮
          </motion.div>
          <div className="text-gray-900 text-xl font-medium">Reading the stars...</div>
        </div>
      </div>
    )
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

  const getFortuneClass = (trend) => {
    switch (trend) {
      case 'rising': return 'fortune-rising'
      case 'falling': return 'fortune-falling'
      case 'volatile': return 'fortune-volatile'
      case 'flat': return 'fortune-flat'
      default: return 'fortune-flat'
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Fortune Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fortune-card ${getFortuneClass(stockData.trend)} mb-12 relative overflow-hidden`}
      >
        {/* Background Animation */}
        <motion.div
          animate={{
            rotate: isRevealing ? 360 : 0,
            scale: isRevealing ? 1.2 : 1,
            opacity: isRevealing ? 0.3 : 0.1
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute top-8 right-8 text-8xl"
        >
          {fortune.emoji}
        </motion.div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mr-4"
              >
                {fortune.emoji}
              </motion.span>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {fortune.category}
                </h1>
                <div className="flex items-center justify-center space-x-4 text-gray-700">
                  <span className="font-semibold">{stockData.symbol}</span>
                  <span>•</span>
                  <span>Confidence: {fortune.confidence}%</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <p className="text-2xl font-medium leading-relaxed text-gray-900 mb-4">
                {fortune.message}
              </p>
              <p className="text-lg text-gray-700">
                {fortune.inflationContext}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stock Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mb-12"
      >
        <StockChart stockData={stockData} symbol={stockData.symbol} />
      </motion.div>

      {/* Market Data Cards */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Stock Data Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="professional-card"
        >
          <div className="professional-card-header">
            <h3 className="professional-card-title">
              <span className="text-2xl">📊</span>
              Stock Analysis
            </h3>
            <p className="professional-card-subtitle">
              Real-time market data for {stockData.symbol}
            </p>
          </div>

          <div className="data-grid">
            <div className="data-item">
              <span className="data-label">Current Price</span>
              <span className="data-value">{formatPrice(stockData.currentPrice)}</span>
            </div>
            <div className="data-item">
              <span className="data-label">Change</span>
              <span className={stockData.change >= 0 ? 'data-value-positive' : 'data-value-negative'}>
                {stockData.change >= 0 ? '+' : ''}{formatPrice(stockData.change)} ({stockData.changePercent >= 0 ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
              </span>
            </div>
            <div className="data-item">
              <span className="data-label">Volume</span>
              <span className="data-value">{formatVolume(stockData.volume)}</span>
            </div>
            <div className="data-item">
              <span className="data-label">High</span>
              <span className="data-value">{formatPrice(stockData.high)}</span>
            </div>
            <div className="data-item">
              <span className="data-label">Low</span>
              <span className="data-value">{formatPrice(stockData.low)}</span>
            </div>
            <div className="data-item">
              <span className="data-label">Open</span>
              <span className="data-value">{formatPrice(stockData.open)}</span>
            </div>
            <div className="data-item">
              <span className="data-label">Previous Close</span>
              <span className="data-value">{formatPrice(stockData.previousClose)}</span>
            </div>
            <div className="data-item">
              <span className="data-label">Trend</span>
              <span className="data-value capitalize">{stockData.trend}</span>
            </div>
          </div>
        </motion.div>

        {/* Macro Context Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="professional-card"
        >
          <div className="professional-card-header">
            <h3 className="professional-card-title">
              <span className="text-2xl">🌍</span>
              Macro Context
            </h3>
            <p className="professional-card-subtitle">
              Economic backdrop and market environment
            </p>
          </div>

          <div className="data-grid">
            <div className="data-item">
              <span className="data-label">Inflation Rate</span>
              <span className="data-value">{stockData.inflation.rate}%</span>
            </div>
            <div className="data-item">
              <span className="data-label">Period</span>
              <span className="data-value">{stockData.inflation.month}</span>
            </div>
            <div className="data-item">
              <span className="data-label">Trend</span>
              <span className="data-value capitalize">{stockData.inflation.trend}</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h4 className="text-gray-900 font-semibold mb-2 flex items-center">
              <span className="mr-2">💡</span>
              Market Context
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              Economic backdrop affects all investments. Current inflation levels of {stockData.inflation.rate}%
              influence market dynamics and investor sentiment, creating the environment in which {stockData.symbol} operates.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Advice Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="professional-card mb-12"
      >
        <div className="professional-card-header">
          <h3 className="professional-card-title">
            <span className="text-2xl">💡</span>
            Fortune's Wisdom
          </h3>
          <p className="professional-card-subtitle">
            Actionable insights based on your stock's analysis
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {fortune.advice.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + index * 0.1, duration: 0.4 }}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:bg-gray-100 transition-all duration-200"
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{index === 0 ? '🎯' : index === 1 ? '📈' : '⚡'}</div>
                <p className="text-gray-900 text-sm leading-relaxed">{tip}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="btn-primary"
        >
          <span className="mr-2">🔮</span>
          Read Another Fortune
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const shareText = `My ${stockData.symbol} fortune: ${fortune.message} 🔮`
            navigator.clipboard.writeText(shareText)
            alert('Fortune copied to clipboard!')
          }}
          className="btn-secondary"
        >
          <span className="mr-2">📤</span>
          Share Fortune
        </motion.button>
      </motion.div>
    </div>
  )
}

export default FortunePage