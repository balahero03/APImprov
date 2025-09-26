// Fortune categories and their associated messages
const fortuneCategories = {
    rising: {
        emoji: '🌞',
        color: 'fortune-green',
        name: 'Rising Fortune',
        messages: [
            "Golden rays light your path 🌞. Growth and prosperity await!",
            "The stars align in your favor ✨. Your investment shines bright!",
            "Fortune smiles upon you 😊. The market dances to your tune!",
            "Like a phoenix rising 🦅, your stock soars to new heights!",
            "The winds of fortune blow strong 💨. Success is in the air!"
        ]
    },
    falling: {
        emoji: '⛈️',
        color: 'fortune-red',
        name: 'Storm Warning',
        messages: [
            "Beware the storm ⛈️, traveler. Clouds gather over markets.",
            "The tide turns against you 🌊. Patience will be your ally.",
            "Dark clouds loom ahead ☁️. But every storm passes in time.",
            "The market tests your resolve 💪. Stay strong through the tempest.",
            "Like winter's chill ❄️, this too shall pass with spring's warmth."
        ]
    },
    volatile: {
        emoji: '🎭',
        color: 'fortune-purple',
        name: 'Uncertain Times',
        messages: [
            "The dice are rolling 🎭. Fortune favors the bold... or the careful.",
            "Like a pendulum swinging ⚖️, the market seeks its balance.",
            "The winds of change blow wild 🌪️. Adaptability is your strength.",
            "In chaos lies opportunity 🎪. The wise see patterns in the storm.",
            "The market dances to its own rhythm 💃. Learn to follow its lead."
        ]
    },
    flat: {
        emoji: '😐',
        color: 'fortune-gray',
        name: 'Neutral Path',
        messages: [
            "Patience is your ally 😐. The river flows, yet slowly.",
            "Like a calm lake 🌊, your stock finds its peaceful center.",
            "Steady as the mountains 🏔️, your investment stands firm.",
            "The market breathes slowly 🫁. Sometimes stillness brings wisdom.",
            "In the quiet moments 🤫, great opportunities often hide."
        ]
    }
}

// Inflation impact modifiers
const inflationModifiers = {
    low: { // < 2%
        rising: "With inflation low, your gains shine even brighter! 💎",
        falling: "Low inflation provides a soft cushion for your journey. 🛡️",
        volatile: "Low inflation means less turbulence in your path. 🌤️",
        flat: "Stable prices create a peaceful backdrop for your investment. 🕊️"
    },
    moderate: { // 2-4%
        rising: "Moderate inflation adds fuel to your rising fortune! 🚀",
        falling: "Inflation's gentle pressure tests your resolve. 💪",
        volatile: "Inflation's dance creates interesting market rhythms. 💃",
        flat: "Steady inflation keeps the economic engine humming. ⚙️"
    },
    high: { // > 4%
        rising: "Even high inflation cannot dim your star's bright shine! ⭐",
        falling: "High inflation makes the storm more challenging to weather. 🌪️",
        volatile: "Inflation's wild swings add spice to the market's story. 🌶️",
        flat: "High inflation makes your steady path even more admirable. 🏆"
    }
}

// ML-like logic to determine fortune category
export const generateFortune = (stockData) => {
    const { trend, changePercent, inflation } = stockData

    // Determine inflation category
    let inflationCategory = 'moderate'
    if (inflation.rate < 2) inflationCategory = 'low'
    else if (inflation.rate > 4) inflationCategory = 'high'

    // Get base fortune category
    const baseFortune = fortuneCategories[trend]

    // Select random message from category
    const randomMessage = baseFortune.messages[Math.floor(Math.random() * baseFortune.messages.length)]

    // Get inflation modifier
    const inflationModifier = inflationModifiers[inflationCategory][trend]

    return {
        category: baseFortune.name,
        emoji: baseFortune.emoji,
        color: baseFortune.color,
        message: randomMessage,
        inflationContext: inflationModifier,
        confidence: calculateConfidence(stockData),
        advice: generateAdvice(stockData)
    }
}

// Calculate confidence level based on data quality
const calculateConfidence = (stockData) => {
    let confidence = 70 // Base confidence

    // Higher confidence for larger price movements
    if (Math.abs(stockData.changePercent) > 5) confidence += 15
    else if (Math.abs(stockData.changePercent) > 2) confidence += 10

    // Higher confidence for higher volume
    if (stockData.volume > 1000000) confidence += 10
    else if (stockData.volume > 100000) confidence += 5

    // Adjust for inflation stability
    if (stockData.inflation.trend === 'stable') confidence += 5

    return Math.min(confidence, 95) // Cap at 95%
}

// Generate contextual advice
const generateAdvice = (stockData) => {
    const { trend, changePercent, volume, inflation } = stockData

    const adviceList = []

    // Trend-based advice
    if (trend === 'rising') {
        adviceList.push("Consider taking some profits if you're up significantly")
        adviceList.push("Monitor for signs of overvaluation")
    } else if (trend === 'falling') {
        adviceList.push("This might be a buying opportunity if fundamentals are strong")
        adviceList.push("Set stop-losses to protect your capital")
    } else if (trend === 'volatile') {
        adviceList.push("Consider dollar-cost averaging to smooth out volatility")
        adviceList.push("High volatility can mean high opportunity")
    } else {
        adviceList.push("Patience is key - sometimes slow and steady wins")
        adviceList.push("Look for catalysts that might break the trend")
    }

    // Volume-based advice
    if (volume > 1000000) {
        adviceList.push("High volume suggests strong conviction in the move")
    } else if (volume < 100000) {
        adviceList.push("Low volume means the move might not be sustainable")
    }

    // Inflation-based advice
    if (inflation.rate > 4) {
        adviceList.push("High inflation environment - consider inflation-protected assets")
    } else if (inflation.rate < 2) {
        adviceList.push("Low inflation environment - growth stocks may perform well")
    }

    return adviceList.slice(0, 3) // Return top 3 pieces of advice
}
