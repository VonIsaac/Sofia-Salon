// Function to get a specific cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Check for user_id cookie
const userId = getCookie('user_id');

if (!userId) {
    // If no user_id is found in cookies, redirect to login page
    window.location.href = '../log-in.html';  // Redirect to login
}