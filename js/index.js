// Function to get a cookie by name
function getCookie(name) {
    let cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        // Removing whitespace at the beginning of the cookie name and compare it
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }

    // Return null if not found
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}


function getUserId(){
    const userId = getCookie('user_id');

    return userId;
}





if (getUserId()) {
    const authButton = document.querySelector('.auth-button');
    authButton.innerHTML = '<a class="aside-btns" href="#" id="logout-btn">Logout</a>';

    // Add event listener to the logout button
    document.getElementById('logout-btn').addEventListener('click', function (event) {
        event.preventDefault(); 
        deleteCookie('user_id');
        alert("You have been logged out.");
        location.reload(); 
    });
}
