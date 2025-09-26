import axios from 'axios'

const ALPHA_VANTAGE_API_KEY = 'I6RZNUZF5CDV7AZ1'
const BASE_URL = 'https://www.alphavantage.co/query'

// Get intraday stock data for trend analysis
export const getIntradayData = async (symbol) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: 'TIME_SERIES_INTRADAY',
                symbol: symbol,
                interval: '5min',
                apikey: ALPHA_VANTAGE_API_KEY
            }
        })

        if (response.data['Error Message']) {
            throw new Error(response.data['Error Message'])
        }

        if (response.data['Note']) {
            throw new Error('API call frequency limit reached. Please try again later.')
        }

        return response.data
    } catch (error) {
        console.error('Error fetching intraday data:', error)
        throw error
    }
}

// Get global quote for current price and volume
export const getGlobalQuote = async (symbol) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: 'GLOBAL_QUOTE',
                symbol: symbol,
                apikey: ALPHA_VANTAGE_API_KEY
            }
        })

        if (response.data['Error Message']) {
            throw new Error(response.data['Error Message'])
        }

        if (response.data['Note']) {
            throw new Error('API call frequency limit reached. Please try again later.')
        }

        return response.data
    } catch (error) {
        console.error('Error fetching global quote:', error)
        throw error
    }
}

// Get inflation data (simulated for demo)
export const getInflationData = async () => {
    // For demo purposes, return simulated inflation data
    // In a real app, you'd use FRED API or similar
    return {
        rate: 3.2,
        month: 'August 2024',
        trend: 'stable'
    }
}

// Generate mock data for demo purposes
const generateMockData = (symbol) => {
    const basePrices = {
        'AAPL': 180.25,
        'TSLA': 215.80,
        'GOOGL': 2850.75,
        'MSFT': 420.50,
        'AMZN': 145.30,
        'NVDA': 875.20,
        'META': 485.60,
        'NFLX': 625.40
    }

    const basePrice = basePrices[symbol] || 100.00
    const volatility = 0.05 // 5% volatility
    const change = (Math.random() - 0.5) * basePrice * volatility
    const currentPrice = basePrice + change
    const changePercent = (change / basePrice) * 100

    // Determine trend based on change
    let trend = 'flat'
    if (changePercent > 2) trend = 'rising'
    else if (changePercent < -2) trend = 'falling'
    else if (Math.abs(changePercent) > 0.5) trend = 'volatile'

    return {
        symbol: symbol,
        currentPrice: Math.round(currentPrice * 100) / 100,
        change: Math.round(change * 100) / 100,
        changePercent: Math.round(changePercent * 100) / 100,
        volume: Math.floor(Math.random() * 50000000) + 10000000,
        high: Math.round((currentPrice + Math.random() * 5) * 100) / 100,
        low: Math.round((currentPrice - Math.random() * 5) * 100) / 100,
        open: Math.round((currentPrice + (Math.random() - 0.5) * 2) * 100) / 100,
        previousClose: Math.round((currentPrice - change) * 100) / 100,
        trend: trend,
        trendPercent: changePercent,
        inflation: {
            rate: 3.2,
            month: 'August 2024',
            trend: 'stable'
        },
        timestamp: new Date().toISOString(),
        isMockData: true
    }
}

// Main function to get all stock data
export const getStockData = async (symbol) => {
    try {
        // Try to get real data first
        const [intradayData, globalQuote, inflationData] = await Promise.all([
            getIntradayData(symbol),
            getGlobalQuote(symbol),
            getInflationData()
        ])

        // Process intraday data to determine trend
        const timeSeries = intradayData['Time Series (5min)']
        if (!timeSeries) {
            throw new Error('No intraday data available')
        }

        const timeEntries = Object.entries(timeSeries).slice(0, 10) // Last 10 data points
        const prices = timeEntries.map(([_, data]) => parseFloat(data['4. close']))

        // Calculate trend
        const firstPrice = prices[prices.length - 1]
        const lastPrice = prices[0]
        const priceChange = lastPrice - firstPrice
        const percentChange = (priceChange / firstPrice) * 100

        // Determine trend direction
        let trend = 'flat'
        if (percentChange > 2) trend = 'rising'
        else if (percentChange < -2) trend = 'falling'
        else if (Math.abs(percentChange) > 0.5) trend = 'volatile'

        // Process global quote
        const quote = globalQuote['Global Quote']
        if (!quote) {
            throw new Error('No quote data available')
        }

        return {
            symbol: symbol,
            currentPrice: parseFloat(quote['05. price']),
            change: parseFloat(quote['09. change']),
            changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
            volume: parseInt(quote['06. volume']),
            high: parseFloat(quote['03. high']),
            low: parseFloat(quote['04. low']),
            open: parseFloat(quote['02. open']),
            previousClose: parseFloat(quote['08. previous close']),
            trend: trend,
            trendPercent: percentChange,
            inflation: inflationData,
            timestamp: new Date().toISOString()
        }
    } catch (error) {
        console.warn('API unavailable, using mock data:', error.message)
        // Return mock data when API fails
        return generateMockData(symbol)
    }
}
