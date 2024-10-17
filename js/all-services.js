const serviceContainer = document.getElementById('main-container');

let generateServices =  async () => {

    try{
        const response = await fetch('http://localhost/fashion-backend/services', {
            method: 'GET', // Explicitly specifying GET method
            headers: {
              'Content-Type': 'application/json' // Optional headers, like specifying JSON response
            }
        });

        const textResponse = await response.text(); // Get the response as text
        console.log('Response text:', textResponse);

        if(!response.ok){
            throw new Error(`Network response was not ok ${response.status}`);
        };

        const data = await response.json()
        console.log(data)
        displayServices(data)

    
    }catch(err){
        console.error('There was a problem with the fetch operation:', err);
    }

}

function displayServices(data) {
    const displayAllServices = data.map(items => {
        const btn = document.createElement('button');
        btn.classList.add('btns');

        const containerBorderUl = document.createElement('li');
        containerBorderUl.classList.add('container-border');

        // Create image element and set the data
       /* const images = document.createElement('img');
        images.src = items.img;
        images.alt = items.name;
        images.classList.add('container-img');
        containerBorderUl.appendChild(images);*/

        // Create name element
        const names = document.createElement('h1');
        names.classList.add('container-name');
        names.textContent = `${items.service_name}`;
        containerBorderUl.appendChild(names);

        // Create description element
        const descriptions = document.createElement('p');
        descriptions.classList.add('container-description');
        descriptions.textContent = `${items.description}`;
        containerBorderUl.appendChild(descriptions);

        // Create div for price and button
        const divs = document.createElement('div');
        divs.classList.add('container-prices-bts');

        // Create price element
        const prices = document.createElement('p');
        prices.classList.add('container-price');
        prices.textContent = `₱${items.price}`;
        divs.appendChild(prices); // Append prices to the div

        // Append div to the container
        containerBorderUl.appendChild(divs);

        // Create button with a link to another page
        const a = document.createElement('a');
        a.textContent = 'Avail';
        a.href = `./services-inputs.html?id=${items.service_id}`;  // Passing ID via URL
        btn.appendChild(a);
        divs.appendChild(btn);

        return containerBorderUl;
    });

    displayAllServices.forEach(services => container.appendChild(services));
}
generateServices();