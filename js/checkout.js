const checkoutContainer = document.getElementById('checkout-container');

//let userId = getCookie('user_id');

let checkout = async () => {

    try {

        const response = await fetch(`http://localhost/fashion-backend/appointment?user_id=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            }
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok ${response.status}`);
        };


        const data = await response.json()


        displayCheckout(data)




    } catch (err) {
        console.error('There was a problem with the fetch operation:', err);
    }
}

async function initiatePayment(data){
    const params = {
        appointment_id: data.appointment_id,
        amount: data.amount
    }

    try {

        const response = await fetch(`http://localhost/fashion-backend/payment`, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok ${response.status}`);
        };


        const data = await response.json();

        console.log(data.data.attributes)

        window.location.href = data.data.attributes.checkout_url

        return data;

    } catch (err) {
        console.error('There was a problem with the fetch operation:', err);
    }
}

function resetEditForm() {
    document.getElementById('editForm').reset();
}

function displayCheckout(data) {
    const checkoutContainer = document.getElementById('checkout-container'); // Ensure this element exists
    if (data.message) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = data.message; // Use the message from the backend
        emptyMessage.classList.add('empty-cart-message'); // Optional: add a class for styling
        checkoutContainer.appendChild(emptyMessage);
        return;
    }

    const displayAllCheckout = data.map(checkout => {
        console.log(checkout)
        const containerLi = document.createElement('div');
        containerLi.classList.add('checkout-item');
 
        // Create image element and set the data
        const images = document.createElement('img');
        images.src = '../public/hair-salon5252.logowik.com.webp';
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

            const datePart = checkout.appointment_date.split(" ")[0];
            console.log(checkout)
            document.getElementById('appointment_id').value = checkout.appointment_id;
            document.getElementById('customerName').value = checkout.customer_name;
            // document.getElementById('serviceName').value = checkout.service_name;
            document.getElementById('phoneNumber').value = checkout.phone_number;
            document.getElementById('date').value = datePart;
            document.getElementById('serviceNameDropdown').value = checkout.service_id;
            console.log(checkout)

       

            const modal = document.getElementById('editModal');
            modal.style.display = "block";

           
          
        });

        btnsDiv.appendChild(editBtn);

        // Create the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Cancel';
        deleteBtn.classList.add('btn-delete');


         btnsDiv.appendChild(deleteBtn);
        containerLi.appendChild(btnsDiv);


        if (checkout.is_paid) {
            // Create a banner for paid checkout
            const paidBanner = document.createElement('div');
            paidBanner.classList.add('paid-banner');
            paidBanner.textContent = 'Payment Confirmed';
            containerLi.appendChild(paidBanner);



        } else {
            // If not paid, show the payment button
            const payBtn = document.createElement('button');
            payBtn.textContent = 'Pay';
            payBtn.classList.add('btn-payment');

            payBtn.addEventListener('click', () => {
                initiatePayment({appointment_id: checkout.appointment_id, amount: parseInt(checkout.price * 100)});
            });

            btnsDiv.appendChild(payBtn);
        }


        // Append to your container (as you already have)
     
        // Get delete modal elements
        const modalDelete = document.querySelector(".modal-delete");
        const confirmDeleteBtn = document.getElementById("confirmDelete");
        const closeModalBtn = document.getElementById("closeModal");

        // Show modal when delete button is clicked
        deleteBtn.addEventListener('click', function () {
            modalDelete.style.display = "block";
        });


        closeModalBtn.addEventListener('click', function () {
            modalDelete.style.display = "none";
        });


        confirmDeleteBtn.addEventListener('click', function () {
            modalDelete.style.display = "none";
            deleteAppointment(checkout.appointment_id);

            window.location.reload();

        });

      

        return containerLi;
    });

    // Append all checkout items to the checkout container
    displayAllCheckout.forEach(checkout => checkoutContainer.appendChild(checkout));

    // Modal functionality for edit modal
    const modal = document.getElementById('editModal');
    const deleteModal = document.querySelector('.modal-delete');
    const span = document.getElementsByClassName("close")[0];

    // Close the modal when the user clicks on <span> (x)
    span.onclick = function () {
        modal.style.display = "none";
        resetEditForm
    };

    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            resetEditForm()
        }

        if (event.target === deleteModal) {
            deleteModal.style.display = "none";
        }
    };

    // Handle form submission
    const editForm = document.getElementById('editForm');
    // Example of calling populateServiceDropdown with the services array
editForm.onsubmit = async function(event) {
    event.preventDefault(); // Prevent page refresh

    // Fetch the services data first, or have it available in the scope


    const selectedServiceId = document.getElementById('serviceNameDropdown').value;
    const customerName = document.getElementById('customerName').value;
    const date = document.getElementById('date').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const appointmentId = document.getElementById('appointment_id').value;

    let editParams = {
        customer_name: customerName,
        phone_number: phoneNumber,
        appointment_id: appointmentId,
        appointment_date: date,
        service_id: selectedServiceId
    };  


    console.log(editParams);

    await editAppointment(editParams)
    .then(() => {
        // Display a success message to the user
        alert('Appointment updated successfully!'); // You can replace this with a more user-friendly notification
       // window.location.reload(); // Reload the page to reflect changes
    })
    .catch((error) => {
        console.error('Error updating appointment:', error);
        alert('There was an error updating the appointment. Please try again.'); // Inform the user about the error
    });

    // Handle saving or further processing
};

}




checkout()