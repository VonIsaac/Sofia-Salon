const serviceContainer = document.getElementById('main-container');

let generateServices =  async () => {

    try{
        const response = await fetch('http://localhost/fashion-backend/services', {
            method: 'GET', // Explicitly specifying GET method
            headers: {
              'Content-Type': 'application/json' // Optional headers, like specifying JSON response
            }
        });

      
        if(!response.ok){
            throw new Error(`Network response was not ok ${response.status}`);
        };

        const data = await response.json();

        displayServices(data)

        return data;

    
    }catch(err){
        console.error('There was a problem with the fetch operation:', err);
    }

}

function displayServices(data) {
    const displayAllServices = data.map(items => {
        const containerBorderUl = document.createElement('div'); // Use div for grid layout
        containerBorderUl.classList.add('service-item'); // Use the same class for styling

        // Create image element and set the data
        const images = document.createElement('img');
        images.src = '../public/hair-salon5252.logowik.com.webp'; // Use placeholder image for now
        images.alt = 'icons';
        images.classList.add('container-img'); // Class for styling
        containerBorderUl.appendChild(images);

        // Create name element
        const names = document.createElement('h3'); // Use h3 instead of h1 for better semantics
        names.classList.add('container-name');
        names.textContent = items.service_name;
        containerBorderUl.appendChild(names);

        // Create description element
        const descriptions = document.createElement('p');
        descriptions.classList.add('container-description');
        descriptions.textContent = items.description;
        containerBorderUl.appendChild(descriptions);

        // Create div for price and button
        const divs = document.createElement('div');
        divs.classList.add('container-prices-bts');

        // Create price element
        const prices = document.createElement('p');
        prices.classList.add('container-price');
        prices.textContent = `₱${items.price}`;
        divs.appendChild(prices); // Append prices to the div

        // Create button with a link to another page
        const btn = document.createElement('button');
        btn.classList.add('btn-available'); // Use the btn-available class for styling
        const a = document.createElement('a'); // Create a link inside the button
        a.textContent = 'Avail';
        a.href = `./services-inputs.html?id=${items.service_id}`;  // Passing ID via URL
        a.style.color = 'white'; // Button text color
        a.style.textDecoration = 'none'; // Remove underline from link
        btn.appendChild(a);
        divs.appendChild(btn);

        // Append div to the container
        containerBorderUl.appendChild(divs);

        return containerBorderUl;
    });

    // Use a container for the grid layout
    const serviceContainer = document.createElement('div');
    serviceContainer.classList.add('services-grid'); // Apply grid class
    displayAllServices.forEach(services => serviceContainer.appendChild(services));

    // Append the service container to the main DOM element
    document.getElementById('main-content').appendChild(serviceContainer); 
}

// Function to populate the service dropdown

generateServices();