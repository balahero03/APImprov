import { motion } from 'framer-motion'

const Navigation = ({ currentPage, onPageChange, onBackToHome }) => {
    const navItems = [
        { id: 'home', label: 'Fortune Teller', icon: '🔮' },
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'trade', label: 'Trade', icon: '💼' },
        { id: 'tutorials', label: 'Tutorials', icon: '🎓' },
        { id: 'about', label: 'About', icon: '📖' }
    ]

    return (
        <nav className="nav-professional">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-3"
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            className="text-3xl"
                        >
                            🔮
                        </motion.div>
                        <div>
                            <h1 className="text-xl font-bold text-gradient">Stock Fortune Teller</h1>
                            <p className="text-xs text-gray-600">Professional Market Insights</p>
                        </div>
                    </motion.div>

                    <div className="flex items-center space-x-2">
                        {navItems.map((item) => (
                            <motion.button
                                key={item.id}
                                onClick={() => onPageChange(item.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`nav-item ${currentPage === item.id ? 'nav-item-active' : 'nav-item-inactive'
                                    }`}
                            >
                                <span className="mr-2" style={{ fontSize: '1.125rem' }}>{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </motion.button>
                        ))}

                        {currentPage === 'fortune' && (
                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                onClick={onBackToHome}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-secondary ml-4"
                            >
                                <span className="mr-2">←</span>
                                Back to Fortune
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation