# Demo Mode - Stock Fortune Teller

## Overview
The Stock Fortune Teller application now includes a robust demo mode that ensures all features work even when the Alpha Vantage API is unavailable or rate-limited.

## Features in Demo Mode

### ✅ What Works
- **All UI Components**: Charts, dashboard, trading interface
- **Realistic Data**: Mock stock data with proper price movements
- **Interactive Charts**: Line and area charts with multiple timeframes
- **Trading Simulation**: Buy/sell functionality with portfolio tracking
- **Fortune Generation**: AI-powered stock predictions and analysis
- **Dashboard**: Market overview with watchlist and sentiment analysis

### 📊 Mock Data Details
- **Realistic Prices**: Based on actual stock price ranges
- **Volatility**: 5% random price movements for realistic simulation
- **Volume Data**: Random but realistic trading volumes
- **Trend Analysis**: Proper trend classification (rising, falling, volatile, flat)
- **Market Indices**: Simulated S&P 500, NASDAQ, DOW data

### 🎯 Demo Stocks
The following stocks have pre-configured realistic data:
- AAPL (Apple) - ~$180
- TSLA (Tesla) - ~$216
- GOOGL (Google) - ~$2,851
- MSFT (Microsoft) - ~$421
- AMZN (Amazon) - ~$145
- NVDA (NVIDIA) - ~$875
- META (Meta) - ~$486
- NFLX (Netflix) - ~$625

## How It Works

1. **API Fallback**: When the Alpha Vantage API fails, the app automatically switches to mock data
2. **User Notification**: A warning notification appears when demo mode is active
3. **Visual Indicator**: A "Demo Mode" badge shows in the interface
4. **Seamless Experience**: All features work identically with mock data

## Benefits

- **No Downtime**: App works 100% of the time
- **Realistic Testing**: Developers can test all features without API limits
- **User Education**: Users can explore the platform without real money
- **Offline Capability**: Works without internet connection (after initial load)

## Technical Implementation

- **Graceful Degradation**: API errors are caught and handled elegantly
- **Data Consistency**: Mock data follows the same structure as real API data
- **Performance**: Mock data loads instantly (no network delays)
- **Scalability**: Easy to add more stocks or modify data patterns

## Getting Started

1. Run the application: `npm run dev`
2. Enter any stock symbol (e.g., AAPL, TSLA, GOOGL)
3. If API is unavailable, you'll see the demo mode notification
4. All features work normally with realistic sample data

## Customization

To modify mock data or add new stocks, edit the `generateMockData` function in `src/services/alphaVantage.js`.

---

**Note**: This demo mode ensures the application provides a complete, professional experience regardless of external API availability.
