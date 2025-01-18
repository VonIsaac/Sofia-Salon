document.querySelector('.form-login').addEventListener('submit', async function(event) {
    event.preventDefault();
    // Get form data
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const response = await fetch('http://localhost/fashion-backend/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            alert("Invalid credentials or something went wrong.");
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        // Store user_id in cookies upon successful login
        document.cookie = `user_id=${result.user_id}; path=/;`;
        document.cookie = `users=${result}; path=/;`;

        // Check if user is admin and redirect accordingly
        const userResponse = await fetch(`http://localhost/fashion-backend/user?user_id=${result.user_id}`);
        const userData = await userResponse.json();

        if (userData.is_admin) {
            alert('Admin login successful');
            window.location.href = './dashboard/index.html';  // Redirect to admin dashboard
        } else {
            alert('User login successful');
            window.location.href = './index.html';  // Redirect to regular user home page
        }

    } catch (error) {
        console.error('An error occurred:', error.message);
    } 
});
