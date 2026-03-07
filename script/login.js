
console.log('login page is working');

document.getElementById('loginBtn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission
    const username = document.querySelector('input[placeholder="Enter your username"]').value;
    const password = document.querySelector('input[placeholder="Enter your password"]').value;

    // Add your login logic here
    console.log('Username:', username);
    console.log('Password:', password);

    if (username === 'admin' && password === 'admin123') {
        alert('Login successful!');

        window.location.assign("/home.html");
       
    } else {
        alert('Invalid username or password. Please try again.');
    }

});



