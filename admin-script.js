document.getElementById('balanceForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const party = document.getElementById('party').value;
    const paymentAmount = document.getElementById('paymentAmount').value;
    const paymentDate = document.getElementById('paymentDate').value;

    // Here you would send the payment information to your server to update the balance
    // and backdate the payment if necessary.
    // For example:
    const payments = JSON.parse(localStorage.getItem('payments')) || [];
    payments.push({ party, paymentAmount, paymentDate });
    localStorage.setItem('payments', JSON.stringify(payments));

    alert('Payment applied successfully!');

    document.getElementById('resetButton').addEventListener('click', function () {
        if (confirm('Are you sure you want to reset all balances and payments to default?')) {
            localStorage.removeItem('payments');
            alert('Balances and payments have been reset to default.');
        }
    }
    )
});
