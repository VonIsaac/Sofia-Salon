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
    const checkoutContainer = document.getElementById('checkout-container'); // Make sure you have this element in your HTML

    const displayAllCheckout = data.map(checkout => {
        const containerLi = document.createElement('div'); // Use div for grid layout
        containerLi.classList.add('checkout-item'); // Class for styling

 // Create image element and set the data
 const images = document.createElement('img');
 images.src = '../public/hair-salon5252.logowik.com.webp'; // Use placeholder image for now
 images.alt = 'icons';
 images.classList.add('container-img'); // Class for styling
 containerLi.appendChild(images);

        const h1 = document.createElement('h3'); // Use h3 for better semantics
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
}





checkout()

