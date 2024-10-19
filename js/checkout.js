const checkoutContainer = document.getElementById('checkout-container');

let userId = getCookie('user_id');

let checkout = async () => {

    try{

        const response = await fetch(`http://localhost/fashion-backend/appointment?user_id=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            }
        });

        if(!response.ok){
            throw new Error(`Network response was not ok ${response.status}`);
        };
        console.log(response)

        const data = await response.json()
        console.log(data);

        displayCheckout(data) 
    
        


    }catch(err){
        console.error('There was a problem with the fetch operation:', err);
    }
}
    
function displayCheckout(data) {
    const checkoutContainer = document.getElementById('checkout-container'); // Ensure this element exists

    const displayAllCheckout = data.map(checkout => {
        const containerLi = document.createElement('div');
        containerLi.classList.add('checkout-item');

        // Create image element and set the data
        const images = document.createElement('img');
        images.src = '../public/hair-salon5252.logowik.com.webp'; // Use placeholder image
        images.alt = 'icons';
        images.classList.add('container-img');
        containerLi.appendChild(images);

        const h1 = document.createElement('h3');
        h1.textContent = `Name: ${checkout.customer_name}`;
        h1.classList.add('names');
        containerLi.appendChild(h1);

        const serviceName = document.createElement('p');
        serviceName.textContent = `Service: ${checkout.service_name}`;
        serviceName.classList.add('service');
        containerLi.appendChild(serviceName);

        const phone = document.createElement('p');
        phone.textContent = `Phone Number: ${checkout.phone_number}`;
        phone.classList.add('phone');
        containerLi.appendChild(phone);

        // Create div for buttons
        const btnsDiv = document.createElement('div');
        btnsDiv.classList.add('btns');

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('btn-edit');

        // Add click event to open the modal
        editBtn.addEventListener('click', () => {
            // Set the values in the modal
            document.getElementById('customerName').value = checkout.customer_name;
            document.getElementById('serviceName').value = checkout.service_name;
            document.getElementById('phoneNumber').value = checkout.phone_number;

            // Show the modal
            const modal = document.getElementById('editModal');
            modal.style.display = "block";
        });

        btnsDiv.appendChild(editBtn);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Cancel';
        deleteBtn.classList.add('btn-delete');
        btnsDiv.appendChild(deleteBtn);

        containerLi.appendChild(btnsDiv);

        return containerLi;
    });

    // Append all checkout items to the checkout container
    displayAllCheckout.forEach(checkout => checkoutContainer.appendChild(checkout));

    // Modal functionality
    const modal = document.getElementById('editModal');
    const span = document.getElementsByClassName("close")[0];

    // Close the modal when the user clicks on <span> (x)
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // Handle form submission
    const editForm = document.getElementById('editForm');
    editForm.onsubmit = function(event) {
        event.preventDefault(); // Prevent page refresh
        // Handle the save changes logic here (e.g., send updated data to the server)
        
        // Close the modal after saving
        modal.style.display = "none";
    }
}





checkout()

