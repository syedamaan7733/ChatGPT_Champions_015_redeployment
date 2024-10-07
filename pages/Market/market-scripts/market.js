// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
//Global MArket
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

function fetchData() {
  axios
    .get("https://chat-gpt-backend.vercel.app/get-coinmarket-data")
    .then(function (response) {
      const data = response.data.data.data;

      // Crypto count
      document.querySelector(
        ".global-mkt-wrapper li:nth-child(1) a"
      ).textContent = `${(data.total_cryptocurrencies / 1000).toFixed(1)}k+`;
      // console.log(data.data.data);

      // Exchanges count
      document.querySelector(
        ".global-mkt-wrapper li:nth-child(2) a"
      ).textContent = `${data.total_exchanges}`;

      // Market Cap and percentage change
      document.querySelector(
        ".global-mkt-wrapper li:nth-child(3) a"
      ).textContent = `$${(
        data.quote.USD.total_market_cap / 1000000000000
      ).toFixed(2)}T`;
      const marketCapChange = document.querySelector(
        ".global-mkt-wrapper li:nth-child(3) p"
      );
      const marketCapPercentageChange =
        data.quote.USD.total_market_cap_yesterday_percentage_change;
      marketCapChange.innerHTML = `<i class="fa-solid fa-sort-${
        marketCapPercentageChange < 0 ? "down" : "up"
      }"></i> ${Math.abs(marketCapPercentageChange).toFixed(2)}%`;
      marketCapChange.className = marketCapPercentageChange < 0 ? "down" : "up"; // Apply color

      // 24th Volume and percentage change
      document.querySelector(
        ".global-mkt-wrapper li:nth-child(4) a"
      ).textContent = `$${(
        data.quote.USD.total_volume_24h / 1000000000
      ).toFixed(2)}B`;
      const volumeChange = document.querySelector(
        ".global-mkt-wrapper li:nth-child(4) p"
      );
      const volumePercentageChange =
        data.quote.USD.total_volume_24h_yesterday_percentage_change;
      volumeChange.innerHTML = `<i class="fa-solid fa-sort-${
        volumePercentageChange < 0 ? "down" : "up"
      }"></i> ${Math.abs(volumePercentageChange).toFixed(2)}%`;
      volumeChange.className = volumePercentageChange < 0 ? "down" : "up"; // Apply color

      // Dominance (BTC and ETH)
      document.querySelector(
        "#dom-btc"
      ).textContent = `BTC: ${data.btc_dominance.toFixed(2)}%`;
      document.querySelector(
        "#dom-eth"
      ).textContent = `ETH: ${data.eth_dominance.toFixed(2)}%`;

      axios
        .get("https://api.alternative.me/fng/")
        .then((res) => {
          // Fear & Greed Index
          document.querySelector(
            ".global-mkt-wrapper li:nth-child(7) a"
          ).textContent = `${res.data.data[0].value}/100`;
        })
        .catch((err) => console.log(err));
      // Overall Market insights
      // Market Cap and percentage change
      document.querySelector(
        ".head-desc-wrapper p span:first-child"
      ).textContent = `$${(
        data.quote.USD.total_market_cap / 1000000000000
      ).toFixed(2)}T`;
      const marketCapChange1 = document.querySelector(
        ".head-desc-wrapper p span:nth-child(2)"
      );
      marketCapChange1.innerHTML = `<i class="fa-solid fa-sort-${
        marketCapPercentageChange < 0 ? "down" : "up"
      }"></i> ${Math.abs(marketCapPercentageChange).toFixed(2)}%`;
      marketCapChange1.className =
        marketCapPercentageChange < 0 ? "down" : "up"; // Apply color
      const marketIncDec = document.querySelector(
        ".head-desc-wrapper p span:nth-child(3)"
      );
      marketIncDec.innerHTML =
        marketCapPercentageChange < 0 ? "decrease" : "increase";
    })

    .catch(function (error) {
      console.error("Error fetching market data:", error);
    });
}

// Initial fetch when the page loads
fetchData();

// Refresh data every 5 minutes (300,000 ms)
setInterval(fetchData, 300000); // Adjust interval as necessary

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// Slide Section
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

function initSlider(sliderId, indicatorsId) {
  let currentSlide = 0;
  const slides = document.querySelectorAll(`#${sliderId} .slide`);
  const dots = document.querySelectorAll(`#${indicatorsId} .dot`);

  // Function to go to the specific slide
  function goToSlide(n) {
    currentSlide = (n + slides.length) % slides.length; // loop back
    document.querySelector(`#${sliderId}`).style.transform = `translateX(-${
      currentSlide * 100
    }%)`;
    updateDots();
  }

  // Function to update active dot
  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Auto slide every 3 seconds
  function autoSlide() {
    goToSlide(currentSlide + 1);
  }

  let sliderInterval = setInterval(autoSlide, 3000);

  // Add click event to each dot to navigate slides
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(sliderInterval); // Stop auto sliding
      goToSlide(index); // Go to clicked slide
      sliderInterval = setInterval(autoSlide, 3000); // Restart auto sliding
    });
  });
}

// Initialize both sliders
initSlider("slider1", "indicators1");
initSlider("slider2", "indicators2");

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// /Countdowm
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

// Set the countdown target to 5 days from now
let countdownDate = new Date().getTime() + 5 * 24 * 60 * 60 * 1000;

// Update the countdown every 1 second
let countdownFunction = setInterval(function () {
  // Get the current time
  let now = new Date().getTime();

  // Find the time difference between now and the countdown date
  let distance = countdownDate - now;

  // Calculate days, hours, minutes, and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the countdown element
  document.getElementById("countdown").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // If the countdown is finished, display some text
  if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// polulating the table
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

// Animation

const view_animation = (cur_state, animate) => {
  document.addEventListener("DOMContentLoaded", function () {
    // Select all elements with the current state class
    document.querySelectorAll(`.${cur_state}`).forEach((element) => {
      // Remove the current state class and add the animation class
      element.classList.remove(`${cur_state}`);
      element.classList.add(`${animate}`);
    });
  });
};
view_animation("fade-up", "animate-fadeUp");
view_animation("vanish", "animate-appear");
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// polulating the table
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

const apiEndpoint =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "	CG-FsyvQgVi1Nh2kTBk3HU2icLx",
  },
};
const randomImgSrc = [
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/22974.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/28321.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/3773.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/4847.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/6536.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/28782.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5665.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2087.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/29587.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/8000.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2087.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/10791.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5176.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/7950.svg",
];

fetch(`https://chat-gpt-backend.vercel.app/get-percent-data`)
  .then((response) => response.json())
  .then((data) => {
    const response1 = data;
    const alternate = response1.data.data;
    fetch(apiEndpoint, options)
      .then((response) => response.json())
      .then((data) => {
        const tableBody = document.querySelector("tbody");
        data.forEach((coin, index) => {
          // Web Socketing  the Price

          const ws = new WebSocket(
            `wss://stream.binance.com:9443/ws/${coin.symbol}usdt@trade`
          );

          // Event listener for receiving data from the WebSocket
          ws.onmessage = function (event) {
            const priceData = JSON.parse(event.data);
            const currentPrice = parseFloat(priceData.p); // 'p' is the price field from the Binance trade event
            updatePrice(`.coin-price${index}`, currentPrice); // Function to update the price in the table
          };

          // Create a new row

          const row = document.createElement("tr");
          row.style.cursor = "pointer";

          // Columns for each data point
          row.innerHTML = `
          <td><i class="fa-regular fa-star"></i></td>
          <td class="coin-rank" style="text-align: center;"><p>${
            coin.market_cap_rank
          }</p></td>
          <td class="coin-name" style="text-align: start;">
            <a href="/pages/Market/coin-detail.html" style="display: flex;" href="#">
              <img class="coin-logo" src="${coin.image}" alt="${coin.name}">
              <p>${coin.name}</p>
              <p class="coin-symbol">${coin.symbol.toUpperCase()}</p>
            </a>
          </td>
          <td style="text-align: end;"><span class="coin-price${index}">$${coin.current_price.toLocaleString()}</span></td>
          <td class="percentage_change" style="text-align: end;">
  <span style="color: ${
    alternate[index].quote.USD.percent_change_1h >= 0
      ? " rgb(2, 192, 2)"
      : "red"
  }">
    <i class="${
      alternate[index].quote.USD.percent_change_1h >= 0
        ? "fa-solid fa-sort-up"
        : "fa-solid fa-sort-down"
    }"></i> ${
            alternate[index].quote.USD.percent_change_1h?.toFixed(2) || "N/A"
          }%</span>
</td>
<td class="percentage_change" style="text-align: end;">
  <span style="color: ${
    coin.price_change_percentage_24h >= 0 ? " rgb(2, 192, 2)" : "red"
  }">
    <i class="${
      coin.price_change_percentage_24h >= 0
        ? "fa-solid fa-sort-up"
        : "fa-solid fa-sort-down"
    }"></i> ${coin.price_change_percentage_24h.toFixed(2)}%</span>
</td>
<td class="percentage_change" style="text-align: end;">
  <span style="color: ${
    alternate[index].quote.USD.percent_change_7d >= 0
      ? " rgb(2, 192, 2)"
      : "red"
  }">
    <i class="${
      alternate[index].quote.USD.percent_change_7d >= 0
        ? "fa-solid fa-sort-up"
        : "fa-solid fa-sort-down"
    }"></i> ${
            alternate[index].quote.USD.percent_change_7d?.toFixed(2) || "N/A"
          }%</span>
</td>

          <td style="text-align: end;"><span>$${coin.market_cap.toLocaleString()}</span></td>
          <td class="vol-24h" style="text-align: end;">
            <p>$${coin.total_volume.toFixed(4).toLocaleString()}</p>
            <p>${(coin.total_volume / coin.current_price).toFixed(
              4
            )} ${coin.symbol.toUpperCase()}</p>
          </td>
          <td style="text-align: end;"><p>${coin.circulating_supply.toLocaleString()} ${coin.symbol.toUpperCase()}</p></td>
          <td class="coin-chart" style="text-align: end;">
            <img src="https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${
              coin.market_cap_rank
            }.svg" alt="${coin.name} 7d chart"
            onerror="this.onerror=null;this.src=randomImgSrc[Math.floor(Math.random() * 15)];">
          </td>
        `;

          // Append the row to the table body
          tableBody.appendChild(row);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  });

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// Price Ticker
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

function updatePrice(coinSymbol, price) {
  const priceElement = document.querySelector(`${coinSymbol}`);

  // Check if price increased or decreased to apply the animation
  const previousPrice = parseFloat(priceElement.innerText);
  priceElement.innerText = price.toFixed(2);

  if (price > previousPrice) {
    // Apply green animation for price rise
    priceElement.classList.add("price-up");
    priceElement.classList.remove("price-down");
  } else if (price < previousPrice) {
    // Apply red animation for price drop
    priceElement.classList.add("price-down");
    priceElement.classList.remove("price-up");
  } else {
    priceElement.classList.remove("price-up", "price-down");
  }
}
