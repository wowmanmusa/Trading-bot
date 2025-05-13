// Generate mock order flow data for demonstration
export const generateMockOrderFlow = () => {
  const symbols = ['AAPL', 'TSLA', 'NVDA', 'AMD', 'SPY', 'QQQ', 'AMZN', 'MSFT', 'META', 'GOOGL', 'NFLX', 'GOOG'];
  const types = ['CALL', 'PUT', 'STOCK'];
  const sentiments = ['BULLISH', 'BEARISH', 'NEUTRAL'];
  
  const type = types[Math.floor(Math.random() * types.length)];
  const strike = Math.floor(Math.random() * 50) * 5 + 100;
  const volume = Math.floor(Math.random() * 50000) + 1000;
  const price = parseFloat((Math.random() * 20 + 1).toFixed(2));
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date(),
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    type: type,
    strike: type !== 'STOCK' ? strike : null,
    expiration: type !== 'STOCK' ? new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString() : null,
    volume: volume,
    price: price,
    totalValue: volume * price * (type !== 'STOCK' ? 100 : 1), // Options are 100 shares per contract
    openInterest: Math.floor(Math.random() * 100000),
    sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
    isBlock: Math.random() > 0.7,
    isDarkpool: Math.random() > 0.8,
    isSweep: Math.random() > 0.6,
    aggression: Math.floor(Math.random() * 100)
  };
};

// Generate historical data for charts
export const generateHistoricalData = (days = 30) => {
  const data = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date,
      bullishVolume: Math.floor(Math.random() * 100000000) + 50000000,
      bearishVolume: Math.floor(Math.random() * 100000000) + 50000000,
      neutralVolume: Math.floor(Math.random() * 50000000) + 25000000,
    });
  }
  
  return data;
};

// Generate mock notifications
export const generateMockNotification = (order) => {
  const templates = [
    `Large ${order.type} order: ${order.symbol} $${(order.totalValue / 1000000).toFixed(1)}M`,
    `Unusual activity detected: ${order.symbol} ${order.type}`,
    `${order.sentiment} sweep: ${order.symbol} ${order.type} ${order.volume.toLocaleString()} contracts`,
    `Dark pool print: ${order.symbol} $${(order.totalValue / 1000000).toFixed(1)}M`,
    `Block trade alert: ${order.symbol} ${order.type} strike $${order.strike}`
  ];
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    message: templates[Math.floor(Math.random() * templates.length)],
    timestamp: new Date(),
    severity: order.totalValue > 10000000 ? 'high' : 'medium'
  };
};