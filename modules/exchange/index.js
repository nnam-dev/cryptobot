async function fetchTicker(symbol,exchange) {
    try {
        const ticker = await exchange.fetchTicker(symbol);
        return ticker;
    } catch (error) {
        throw new Error(`Error fetching ticker data: ${error}`);
    }
}

module.exports={fetchTicker}
