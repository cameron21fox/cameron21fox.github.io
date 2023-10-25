function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'root' && password === 'root') {
        // If login is successful, redirect to the main page
        window.location.href = 'admin.html';
    } else {
        alert('Invalid username or password');
    }
}