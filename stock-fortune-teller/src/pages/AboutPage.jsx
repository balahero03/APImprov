import { motion } from 'framer-motion'

const AboutPage = ({ onBack }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="professional-card"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
            className="text-6xl mb-6"
          >
            🔮
          </motion.div>
          <h1 className="text-5xl font-bold text-gradient mb-4">
            About Stock Fortune Teller
          </h1>
          <p className="text-xl text-gray-900">
            Where Finance Meets Mysticism
          </p>
        </motion.div>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/5 rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-4xl mr-4">✨</span>
              Our Mission
            </h2>
            <p className="text-gray-900/90 leading-relaxed text-lg">
              Stock Fortune Teller transforms boring financial data into engaging, mystical experiences.
              Instead of overwhelming charts and tables, we present market insights through fortune-telling
              metaphors, making finance accessible and fun for everyone. Our platform combines real-time
              market data with AI-powered analysis to deliver personalized investment insights wrapped in
              an enchanting, easy-to-understand format.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white/5 rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-4xl mr-4">🎯</span>
              How It Works
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">📊</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Analysis</h3>
                    <p className="text-gray-900/80 leading-relaxed">
                      We analyze real-time stock data including price movements, volume, and trends
                      to understand your stock's current performance and market position.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">🌍</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Macro Context</h3>
                    <p className="text-gray-900/80 leading-relaxed">
                      We consider broader economic factors like inflation rates to provide
                      context for your stock's performance in the current market environment.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">🔮</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Fortune Generation</h3>
                    <p className="text-gray-900/80 leading-relaxed">
                      Our algorithm combines technical and fundamental analysis to generate
                      personalized fortune messages with actionable insights and predictions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">🎨</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Visual Experience</h3>
                    <p className="text-gray-900/80 leading-relaxed">
                      Each fortune comes with emojis, colors, and animations that match the
                      market sentiment, making the experience engaging and memorable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-white/5 rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-4xl mr-4">🛠️</span>
              Technology Stack
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl mb-4">⚛️</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">React + Vite</h3>
                <p className="text-gray-900/70 text-sm">Modern frontend framework with lightning-fast development</p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tailwind CSS</h3>
                <p className="text-gray-900/70 text-sm">Utility-first styling with custom components</p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Framer Motion</h3>
                <p className="text-gray-900/70 text-sm">Smooth animations and micro-interactions</p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl mb-4">📡</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Alpha Vantage API</h3>
                <p className="text-gray-900/70 text-sm">Real-time market data and financial information</p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">ML Algorithm</h3>
                <p className="text-gray-900/70 text-sm">Intelligent fortune generation and analysis</p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Responsive Design</h3>
                <p className="text-gray-900/70 text-sm">Optimized for all devices and screen sizes</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-4xl mr-4">⚠️</span>
              Important Disclaimer
            </h2>
            <div className="space-y-4 text-gray-900/90 leading-relaxed">
              <p>
                <strong className="text-gray-900">Stock Fortune Teller is for entertainment and educational purposes only.</strong>
                The fortunes and advice provided are not financial recommendations and should not be considered as such.
              </p>
              <p>
                Always do your own research and consult with qualified financial advisors before making investment decisions.
                Past performance does not guarantee future results, and all investments carry risk of loss.
              </p>
              <p>
                The information provided is based on publicly available data and our proprietary algorithms, but market
                conditions can change rapidly and unpredictably. Use this tool as a starting point for your research,
                not as the sole basis for investment decisions.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="btn-primary text-lg px-8 py-4"
          >
            <span className="mr-2">🔮</span>
            Start Your Fortune Journey
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AboutPage