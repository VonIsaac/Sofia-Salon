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
        console.log(result)
        alert('Login successful');
        window.location.href = './index.html    ';  

      
    } catch (error) {
        console.error('An error occurred:', error.message);
    } 
});
