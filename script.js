document.addEventListener('DOMContentLoaded', async () => {
    const displayArea = document.getElementById('displayArea');
  
    const updateInterestDisplay = async () => {
      try {
        const response = await fetch('http://localhost:3000/calculate-interest');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
  
        displayArea.innerHTML = '';
        data.forEach(entry => {
          const balanceInfo = document.createElement('div');
          balanceInfo.innerHTML = `<strong>${entry.date} - ${entry.name}</strong>: Total: $${entry.total.toFixed(2)} (Principal: $${entry.principal.toFixed(2)}, Interest: $${entry.interest.toFixed(2)})`;
          displayArea.appendChild(balanceInfo);
        });
      } catch (error) {
        displayArea.innerText = 'Failed to load interest data.';
        console.error('Failed to load interest data:', error);
      }
    };
  
    updateInterestDisplay();
  
    window.downloadSpreadsheet = async () => {
      try {
        const response = await fetch('http://localhost:3000/download');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'historical_interest_data.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Failed to download file:', error);
      }
    };
  });
  