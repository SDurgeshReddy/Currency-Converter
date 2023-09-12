import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CurrencyConverter() {
  const [exchangeRates, setExchangeRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    // Fetch exchange rates from an API (e.g., Open Exchange Rates API)
    axios.get(`https://api.openexchangerates.org/latest?base=${fromCurrency}`)
      .then((response) => {
        setExchangeRates(response.data.rates);
      })
      .catch((error) => {
        console.error('Error fetching exchange rates:', error);
      });
  }, [fromCurrency]);

  useEffect(() => {
    // Convert the amount when the currency or amount changes
    if (exchangeRates[toCurrency]) {
      const result = (amount * exchangeRates[toCurrency]).toFixed(2);
      setConvertedAmount(result);
    }
  }, [fromCurrency, toCurrency, amount, exchangeRates]);

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <div>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
        />
        <select
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
        >
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span>to</span>
        <select
          value={toCurrency}
          onChange={handleToCurrencyChange}
        >
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      {convertedAmount !== null && (
        <p>
          {amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}
        </p>
      )}
    </div>
  );
}

export default CurrencyConverter;
