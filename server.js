const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const balances = {
  'WellHeartz': { principal: 10115, startDate: new Date('2023-06-21') },
  'Brian K. Gaddie': { principal: 2169.35, startDate: new Date('2023-06-21') }
};

const interestRate = 0.08;

function calculateInterest(name) {
  const balanceData = balances[name];
  const principal = balanceData.principal;
  const startDate = balanceData.startDate;
  const currentDate = new Date();
  const timeElapsed = currentDate - startDate;
  const daysElapsed = timeElapsed / (1000 * 60 * 60 * 24);
  const interest = (principal * interestRate * daysElapsed) / 365;
  return { principal, interest, total: principal + interest };
}

function calculateHistoricalInterest(name) {
  const balanceData = balances[name];
  const principal = balanceData.principal;
  const startDate = balanceData.startDate;
  const historicalData = [];
  
  for (let d = new Date(startDate); d <= new Date(); d.setDate(d.getDate() + 1)) {
    const timeElapsed = d - startDate;
    const daysElapsed = timeElapsed / (1000 * 60 * 60 * 24);
    const interest = (principal * interestRate * daysElapsed) / 365;
    historicalData.push({
      date: d.toISOString().split('T')[0],
      name,
      principal,
      interest
    });
  }

  return historicalData;
}

app.get('/interest', (req, res) => {
  const current = Object.keys(balances).map(name => ({ name, ...calculateInterest(name) }));
  const historical = Object.keys(balances).reduce((acc, name) => acc.concat(calculateHistoricalInterest(name)), []);
  res.json({ current, historical });
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
