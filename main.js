const crypto = {
    apiKey: '59e95dd1270ba0c3cfe391773538cf7bfd84e19a',
    // Get the information from the server
    fetchCrypto: function(coin) {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=' +
                coin +
                '&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h'
            )
            .then((response) => response.json())
            .then((data) => this.displayCrypto(data))
    },

    // Data formatting
    displayCrypto: function(data) {

        const { name } = data[0];
        const { market_cap_rank, current_price, ath, symbol, price_change_percentage_24h, circulating_supply, image } = data[0]
        console.log(name, market_cap_rank, current_price, ath, symbol, price_change_percentage_24h, circulating_supply);
        document.querySelector('.cryptoCoin').innerHTML = `${name}`
        document.querySelector('.price').innerHTML = ` $${current_price.toFixed(2)}`
        document.querySelector('.rank').innerHTML = ` #${market_cap_rank}`
        document.querySelector('.supply').innerHTML = ` ${circulating_supply} ${symbol}`
        document.querySelector('.percentage').innerHTML = ` ${price_change_percentage_24h.toFixed(2)}%`
        document.querySelector('.icon').src = `${image}`
        document.querySelector('.coins').classList.remove('loading')

        // Set color
        if (price_change_percentage_24h < 0) {
            document.querySelector('.percentage').style.color = 'red'
        } else if (price_change_percentage_24h > 0) {
            document.querySelector('.percentage').style.color = 'green'
        }
    },
    search: function() {
        const serched = document.querySelector('.search-bar').value;
        this.fetchCrypto(serched)
    }
}

// Event lister for serch button
document
    .querySelector('.search button')
    .addEventListener('click', function() {
        crypto.search();
    });

// Event listener for search bar
document
    .querySelector('.search-bar')
    .addEventListener('keypress', function(event) {
        if (event.key == 'Enter') {
            crypto.search();
        }
    })


crypto.fetchCrypto('bitcoin')