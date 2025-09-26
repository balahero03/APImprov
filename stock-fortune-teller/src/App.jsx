import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import FortunePage from './pages/FortunePage'
import DashboardPage from './pages/DashboardPage'
import TradePage from './pages/TradePage'
import TutorialsPage from './pages/TutorialsPage'
import AboutPage from './pages/AboutPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [stockData, setStockData] = useState(null)
  const [fortuneData, setFortuneData] = useState(null)

  const handleStockSubmit = (data) => {
    setStockData(data)
    setCurrentPage('fortune')
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
    setStockData(null)
    setFortuneData(null)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onStockSubmit={handleStockSubmit} />
      case 'fortune':
        return <FortunePage stockData={stockData} onBack={handleBackToHome} />
      case 'dashboard':
        return <DashboardPage onBack={handleBackToHome} />
      case 'trade':
        return <TradePage onBack={handleBackToHome} />
      case 'tutorials':
        return <TutorialsPage onBack={handleBackToHome} />
      case 'about':
        return <AboutPage onBack={() => setCurrentPage('home')} />
      default:
        return <HomePage onStockSubmit={handleStockSubmit} />
    }
  }

  return (
    <div className="min-h-screen fortune-gradient">
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onBackToHome={handleBackToHome}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-4 py-8"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App