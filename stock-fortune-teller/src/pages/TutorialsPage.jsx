import { useState } from 'react'
import { motion } from 'framer-motion'

const TutorialsPage = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('videos')
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [videoError, setVideoError] = useState(null)
    const [videoLoading, setVideoLoading] = useState(false)

    const videoTutorials = [
        {
            id: 1,
            title: "Stock Market Basics for Beginners",
            description: "Learn the fundamentals of stock market investing, including what stocks are, how markets work, and basic terminology.",
            videoId: "p7HKvqRI_Bo", // "How The Stock Exchange Works (For Dummies)" - Kurzgesagt
            duration: "6:30",
            level: "Beginner",
            category: "Basics"
        },
        {
            id: 2,
            title: "How to Read Stock Charts",
            description: "Master the art of technical analysis and learn how to interpret candlestick charts, trends, and patterns.",
            videoId: "G46QhbpSvwA", // "How to Read Candlestick Charts" - Trading 212
            duration: "10:15",
            level: "Beginner",
            category: "Technical Analysis"
        },
        {
            id: 3,
            title: "Understanding Market Indices",
            description: "Learn about S&P 500, NASDAQ, DOW JONES and how these indices reflect overall market performance.",
            videoId: "0PDJEcq-XiM", // "What Are Stock Market Indices?" - The Plain Bagel
            duration: "8:45",
            level: "Beginner",
            category: "Market Indices"
        },
        {
            id: 4,
            title: "Fundamental Analysis Explained",
            description: "Discover how to analyze companies using financial statements, earnings reports, and key metrics.",
            videoId: "8fD2a8bBjg8", // "Fundamental Analysis for Beginners" - The Plain Bagel
            duration: "18:12",
            level: "Intermediate",
            category: "Analysis"
        },
        {
            id: 5,
            title: "Risk Management in Trading",
            description: "Learn essential risk management strategies to protect your capital and minimize losses.",
            videoId: "3c88_Z0FFcE", // "Risk Management in Stock Trading" - Trading 212
            duration: "14:30",
            level: "Intermediate",
            category: "Risk Management"
        },
        {
            id: 6,
            title: "Portfolio Diversification",
            description: "Understand the importance of diversification and how to build a balanced investment portfolio.",
            videoId: "FcNtubVdJ0E", // "Portfolio Diversification Explained" - The Plain Bagel
            duration: "11:18",
            level: "Intermediate",
            category: "Portfolio"
        }
    ]

    const documentation = [
        {
            id: 1,
            title: "What is the Stock Market?",
            content: `The stock market is a collection of markets where stocks (pieces of ownership in businesses) are bought and sold. It's essentially a marketplace where investors can buy and sell shares of publicly traded companies.

Key Concepts:
• Stocks represent ownership in a company
• Stock prices fluctuate based on supply and demand
• Markets are influenced by company performance, economic conditions, and investor sentiment
• Trading happens on exchanges like NYSE and NASDAQ`
        },
        {
            id: 2,
            title: "Basic Stock Market Terminology",
            content: `Understanding these terms is crucial for any investor:

• Bull Market: A market that's rising or expected to rise
• Bear Market: A market that's falling or expected to fall
• IPO (Initial Public Offering): When a company first sells shares to the public
• Market Cap: Total value of a company's shares (Price × Shares Outstanding)
• P/E Ratio: Price-to-Earnings ratio, comparing stock price to company earnings
• Dividend: Payment made to shareholders from company profits
• Volume: Number of shares traded in a given period
• Bid/Ask: The price buyers are willing to pay (bid) vs. what sellers want (ask)`
        },
        {
            id: 3,
            title: "Types of Stock Orders",
            content: `Different ways to buy and sell stocks:

Market Order:
• Executes immediately at current market price
• Fastest execution but price may vary

Limit Order:
• Sets a specific price you're willing to pay/sell at
• Only executes if your price is met
• Better price control but may not execute

Stop Order:
• Triggers a market order when stock reaches a certain price
• Used for risk management and profit protection

Stop-Limit Order:
• Combines stop and limit order features
• Triggers at stop price but executes as limit order`
        },
        {
            id: 4,
            title: "Reading Stock Charts",
            content: `Stock charts show price movements over time:

Candlestick Charts:
• Green/White candles: Price closed higher than it opened
• Red/Black candles: Price closed lower than it opened
• Upper wick: Highest price during the period
• Lower wick: Lowest price during the period

Key Patterns:
• Support: Price level where stock tends to bounce up
• Resistance: Price level where stock tends to bounce down
• Trend Lines: Lines connecting price highs or lows
• Moving Averages: Average price over a specific period`
        },
        {
            id: 5,
            title: "Risk vs. Reward",
            content: `Understanding the relationship between risk and potential returns:

High Risk, High Reward:
• Growth stocks, small-cap companies, emerging markets
• Potential for significant gains but also significant losses

Low Risk, Low Reward:
• Blue-chip stocks, bonds, index funds
• More stable but typically lower returns

Risk Management Strategies:
• Diversification: Don't put all eggs in one basket
• Position Sizing: Don't risk more than you can afford to lose
• Stop Losses: Set predetermined exit points
• Research: Always understand what you're investing in`
        },
        {
            id: 6,
            title: "Building Your First Portfolio",
            content: `Steps to create a diversified investment portfolio:

1. Define Your Goals:
• Short-term (1-3 years): Savings, emergency fund
• Medium-term (3-10 years): House down payment, education
• Long-term (10+ years): Retirement, wealth building

2. Assess Your Risk Tolerance:
• Conservative: 70% bonds, 30% stocks
• Moderate: 50% bonds, 50% stocks
• Aggressive: 20% bonds, 80% stocks

3. Choose Your Investments:
• Index Funds: Low-cost, diversified exposure
• Individual Stocks: Higher risk, potential for higher returns
• ETFs: Exchange-traded funds for specific sectors

4. Regular Review and Rebalancing:
• Monitor performance quarterly
• Rebalance when allocations drift significantly`
        }
    ]

    const getLevelColor = (level) => {
        switch (level) {
            case 'Beginner': return 'bg-green-100 text-green-800'
            case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
            case 'Advanced': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Basics': return 'bg-blue-100 text-blue-800'
            case 'Technical Analysis': return 'bg-purple-100 text-purple-800'
            case 'Market Indices': return 'bg-indigo-100 text-indigo-800'
            case 'Analysis': return 'bg-pink-100 text-pink-800'
            case 'Risk Management': return 'bg-orange-100 text-orange-800'
            case 'Portfolio': return 'bg-teal-100 text-teal-800'
            default: return 'bg-gray-100 text-gray-800'
        }
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
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Stock Market Tutorials</h1>
                        <p className="text-gray-600">Learn the fundamentals of stock market investing with video tutorials and comprehensive guides</p>
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

            {/* Tab Navigation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mb-8"
            >
                <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${activeTab === 'videos'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <span className="mr-2">🎥</span>
                        Video Tutorials
                    </button>
                    <button
                        onClick={() => setActiveTab('docs')}
                        className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${activeTab === 'docs'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <span className="mr-2">📚</span>
                        Documentation
                    </button>
                </div>
            </motion.div>

            {/* Video Tutorials Section */}
            {activeTab === 'videos' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="space-y-6"
                >
                    {/* Video Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videoTutorials.map((video, index) => (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                                className="professional-card cursor-pointer hover:shadow-xl transition-all duration-300"
                                onClick={() => {
                                    setSelectedVideo(video)
                                    setVideoError(null)
                                    setVideoLoading(true)
                                }}
                            >
                                <div className="relative">
                                    <img
                                        src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                                        alt={video.title}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                        onError={(e) => {
                                            e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`
                                        }}
                                    />
                                    <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                                        {video.duration}
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        <div className="bg-red-600 text-white p-4 rounded-full">
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M8 5v10l8-5-8-5z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(video.level)}`}>
                                            {video.level}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(video.category)}`}>
                                            {video.category}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                        {video.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm line-clamp-3">
                                        {video.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Documentation Section */}
            {activeTab === 'docs' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {documentation.map((doc, index) => (
                            <motion.div
                                key={doc.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                                className="professional-card"
                            >
                                <div className="professional-card-header">
                                    <h3 className="professional-card-title">
                                        <span className="text-2xl">📖</span>
                                        {doc.title}
                                    </h3>
                                </div>

                                <div className="prose prose-gray max-w-none">
                                    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                                        {doc.content}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Video Modal */}
            {selectedVideo && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={() => {
                        setSelectedVideo(null)
                        setVideoError(null)
                        setVideoLoading(false)
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-900">{selectedVideo.title}</h3>
                            <button
                                onClick={() => {
                                    setSelectedVideo(null)
                                    setVideoError(null)
                                    setVideoLoading(false)
                                }}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="aspect-video mb-4">
                            {videoLoading && !videoError ? (
                                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="animate-spin text-4xl mb-4">📺</div>
                                        <p className="text-gray-600">Loading video...</p>
                                    </div>
                                </div>
                            ) : videoError ? (
                                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                                    <div className="text-center p-6">
                                        <div className="text-4xl mb-4">📺</div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Video Unavailable</h4>
                                        <p className="text-gray-600 mb-4">This video is currently unavailable. Please try again later.</p>
                                        <div className="space-y-2">
                                            <a
                                                href={`https://www.youtube.com/watch?v=${selectedVideo.videoId}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                            >
                                                Watch on YouTube
                                            </a>
                                            <button
                                                onClick={() => {
                                                    setVideoError(null)
                                                    setVideoLoading(true)
                                                }}
                                                className="block w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                            >
                                                Try Again
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                                    title={selectedVideo.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-lg"
                                    onLoad={() => setVideoLoading(false)}
                                    onError={() => {
                                        setVideoError(true)
                                        setVideoLoading(false)
                                    }}
                                ></iframe>
                            )}
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(selectedVideo.level)}`}>
                                    {selectedVideo.level}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedVideo.category)}`}>
                                    {selectedVideo.category}
                                </span>
                                <span className="text-sm text-gray-500">Duration: {selectedVideo.duration}</span>
                            </div>

                            <p className="text-gray-700">{selectedVideo.description}</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Quick Tips Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-12"
            >
                <div className="professional-card">
                    <div className="professional-card-header">
                        <h3 className="professional-card-title">
                            <span className="text-2xl">💡</span>
                            Quick Learning Tips
                        </h3>
                        <p className="professional-card-subtitle">
                            Essential advice for new investors
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-3xl mb-2">📚</div>
                            <h4 className="font-semibold text-gray-900 mb-2">Start with Basics</h4>
                            <p className="text-sm text-gray-600">Learn fundamental concepts before diving into complex strategies</p>
                        </div>

                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-3xl mb-2">🎯</div>
                            <h4 className="font-semibold text-gray-900 mb-2">Practice with Paper Trading</h4>
                            <p className="text-sm text-gray-600">Use virtual money to practice without risking real capital</p>
                        </div>

                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-3xl mb-2">📊</div>
                            <h4 className="font-semibold text-gray-900 mb-2">Follow Market News</h4>
                            <p className="text-sm text-gray-600">Stay informed about economic events and company news</p>
                        </div>

                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-3xl mb-2">⏰</div>
                            <h4 className="font-semibold text-gray-900 mb-2">Be Patient</h4>
                            <p className="text-sm text-gray-600">Investing is a long-term game, avoid emotional decisions</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default TutorialsPage
