const tableContainer = document.getElementById('table-container');

let userId = getCookie('user_id');

const getDashboardData = async () => {

    try{
        //get the data from server
        const response = await fetch(`http://localhost/fashion-backend/appointments?user_id=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if(!response.ok){
            throw new Error(`Network response was not ok ${response.status}`)
        }

        const data = await response.json()
        console.log(data);

        displayDashboard(data)

    }catch(err){
        console.error('There was a problem with the fetch all data in dashboard:', err);
    }
};


async function markAsdone(appointment_id, rowElement, btn2) {
    try {
        // Verify ID is correct
        const response = await fetch(`http://localhost/fashion-backend/appointment/done`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ appointment_id: appointment_id })
        });

        const responseText = await response.text(); 
        console.log(responseText); 

        if (!response.ok) {
            throw new Error(`Network response was not ok ${response.status}`);
        }

        rowElement.style.backgroundColor = '#4ade80'; // Change row color to green
        btn2.style.display = 'none'; // Hide the "Mark as Done" button

    } catch (err) {
        console.error('There was a problem with marking as done:', err);
        alert('Failed to update appointment status. Please try again.');
    }
}


async function getNotify(customerName, phoneNumber, apoinmentDate){
    //covert into readable format
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const stringDate = new Date(apoinmentDate).toLocaleDateString('en-PH', options)
    const message = `Hello ${customerName}, this is a reminder for your upcomming appointment this ${stringDate}, Thank you`;
    try{
        const response = await fetch('http://localhost/fashion-backend/sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                phone_numbers: [phoneNumber] // stored in array for Scalability like in the server side

            })
        });

        if(!response.ok){
            throw new Error(`Network response was not ok ${response.status}`);
        }

        const data = await response.json()
        console.log('Notification sent successfully:', data);

        alert(`Notification sent to ${customerName}`);

    }catch(err){
        console.log(err)
        alert('Failed to send notification. Please try again.');
    }
}



function displayDashboard(data) {
    const displayAllDashboard = data.map(dashboard => {
        // Creating elements for each row
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdService = document.createElement('td');
        const tdApoinments = document.createElement('td');
        const tdDate = document.createElement('td');
        const tdButton = document.createElement('td');
        const btn1 = document.createElement('button');
        const btn2 = document.createElement('button');

        // Add classes
        tdButton.classList.add('tdBtns');
        tdName.classList.add('table-name');
        tdService.classList.add('table-service');
        tdApoinments.classList.add('table-appoinments');
        tdDate.classList.add('table-date');

        // Set button text
        btn2.textContent = 'Mark as Done';
        btn1.textContent = 'Notify';

        tdButton.appendChild(btn1);
        tdButton.appendChild(btn2);
        tdName.textContent = `${dashboard.customer_name}`;
        tdService.textContent = `${dashboard.service_name}`;
        tdApoinments.textContent = `${dashboard.phone_number}`;
        tdDate.textContent = `${dashboard.appointment_date}`;
        tr.appendChild(tdName);
        tr.appendChild(tdService);
        tr.appendChild(tdApoinments);
        tr.appendChild(tdDate);
        tr.appendChild(tdButton);

        if (dashboard.is_done) {
            // If marked as done, set the row background to green and hide the button
            tr.style.backgroundColor = '#4ade80';
            btn2.style.display = 'none';
        }

        // Add event listener for 'Mark as Done' button
        btn2.addEventListener('click', () => {
            console.log('Marking as done');
            markAsdone(dashboard.id, tr, btn2);
        });

        btn1.addEventListener('click', () => {
            console.log('sending Notif')
            getNotify(dashboard.customer_name, dashboard.phone_number, dashboard.appointment_date)
        })


        return tr;
    });

    // Append all rows to the table
    displayAllDashboard.forEach(dashboard => tableContainer.appendChild(dashboard));
};

getDashboardData();

