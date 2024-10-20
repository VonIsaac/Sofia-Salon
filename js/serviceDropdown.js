let generateServices = async () => {
    try {
        const response = await fetch('http://localhost/fashion-backend/services', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok ${response.status}`);
        }

        const data = await response.json();


        // Pass the data to populateServiceDropdown
        populateServiceDropdown(data);
        return data; // Return data for potential further use
    } catch (err) {
        console.error('There was a problem with the fetch operation:', err);
        return []; // Return empty array on error
    }
};

function populateServiceDropdown(services) {
    const serviceDropdown = document.getElementById('serviceNameDropdown');
    serviceDropdown.innerHTML = ''; // Clear existing options


        services.forEach(service => {
          
            const option = document.createElement('option');
            option.value = service.service_id; // Set the value to service ID
            option.textContent = service.service_name; // Display the service name
            serviceDropdown.appendChild(option);
        });
    } 

// Call generateServices to initiate the process
generateServices();
