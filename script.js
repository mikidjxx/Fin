document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('getDataBtn').addEventListener('click', getFinancialData);
});

async function getFinancialData() {
    const symbol = document.getElementById('symbol').value;
    const API_KEY = 'FOMFYHMGJPNRUJTM'; // Sostituisci con la tua chiave API di Alpha Vantage
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const timeSeries = data['Time Series (5min)'];
        const labels = Object.keys(timeSeries).slice(0, 12).reverse();
        const prices = labels.map(time => parseFloat(timeSeries[time]['4. close']));

        const ctx = document.getElementById('financeChart').getContext('2d');
        if (window.financeChart) window.financeChart.destroy();
        window.financeChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: `${symbol} Prezzo di Chiusura`,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: prices,
                    fill: false,
                }]
            },
            options: {}
        });
    } catch (error) {
        console.error('Errore durante la richiesta di dati finanziari:', error);
    }
}
