document.querySelector('.form-signup').addEventListener('submit', async function(event) {
    event.preventDefault();
    const passwordInput = document.getElementById('password');
    //check if pass less than 8 num
   

    // Get form data
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');



    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;


    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return; // Stop further execution
    }
    try {
        const response = await fetch('http://localhost/fashion-backend/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: name,
                email: email,
                password: password,
                is_admin: false
            })
        });

        if (!response.ok) {
            alert("Something went wrong");
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert('Account Successfully Created');
        window.location.href = './log-in.html';  

        // Clear input fields
        nameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
});
