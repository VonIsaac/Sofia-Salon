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


async function markAsdone(appointment_id, rowElement ){
    try{
         // Verify ID is correct
        const response =  await fetch('http://localhost/fashion-backend/appointment/done', {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                appointment_id: appointment_id, 
                rowElement: rowElement 
            })
        })


        const responseText = await response.text(); // Get the raw response text
        console.log(responseText); // Inspect the server's response

        if (!response.ok) {
            throw new Error(`Network response was not ok ${response.status}`);
        };
    }catch(err){
        console.error('There was a problem with the fetch all data in dashboard:', err);
    }
}

function displayDashboard(data) {
   
    const displayAllDashboard = data.map(dashboard => {
        //creating element
        const tr = document.createElement('tr');
        tr.id = 'appointment_id'
        const tdName = document.createElement('td');
        const tdService = document.createElement('td');
        const tdApoinments = document.createElement('td');
        const tdDate = document.createElement('td');
        const tdButton = document.createElement('td');
        const btn1 = document.createElement('button')
        const btn2 =document.createElement('button')

        //for classlist
        
        tdButton.classList.add('tdBtns');
        tdName.classList.add('table-name');
        tdService.classList.add('table-service');
        tdApoinments.classList.add('table-appoinments')
        tdDate.classList.add('table-date')
        

        // apeend the child
        btn2.textContent = 'Mark as Done'
        btn1.textContent = 'Notify'
        tdButton.appendChild(btn1)
        tdButton.appendChild(btn2)
        tdName.textContent = ` ${dashboard.customer_name}`
        tdService.textContent = `${dashboard.service_name}`
        tdApoinments.textContent = `${dashboard.phone_number}`
        tdDate.textContent = `${dashboard.appointment_date}`
        tr.appendChild(tdName);
        tr.appendChild(tdService);
        tr.appendChild(tdApoinments);
        tr.appendChild(tdDate)
        tr.appendChild(tdButton)

        btn2.addEventListener('click', () => {
           let tableRow = tr.style.backgroundColor = '#4ade80'
           console.log("click")
            markAsdone(dashboard.id, tableRow) // Pass the row element and id  to markAsDone
            
        });


        return tr;
    });

    //for each the  displayAllDashboard then the table container append it
    displayAllDashboard.forEach(dashboard => tableContainer.appendChild(dashboard))

}


getDashboardData()


