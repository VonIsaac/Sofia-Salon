const tableContainer = document.getElementById('table-container');

let userId = getCookie('user_id');

const getDashboardData = async () => {

    try{
        const response = await fetch(`http://localhost/fashion-backend/appointments?user_id=${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
        });

        if(!response.ok){
            throw new Error(`Network response was not ok ${response.status}`)
        }

        const data = await response.json()
        console.log(data);

        displayDashboard(data)

    }catch(err){
        onsole.error('There was a problem with the fetch all data in dashboard:', err);
    }
};

function displayDashboard(data) {
   
    const displayAllDashboard = data.map(dashboard => {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        tr.textContent = `${dashboard.customer_name}`
        tr.appendChild(td)

        return tr;
    });

    displayAllDashboard.forEach(dashboard => tableContainer.appendChild(dashboard))

}


getDashboardData()


