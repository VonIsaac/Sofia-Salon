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
         const displayAllCheckout =  data.map(checkout => {

            const containerLi = document.createElement('li');
            containerLi.classList.add('containers')
            
            const h1 = document.createElement('h1');
            h1.textContent = `Name: ${checkout.customer_name}`
            h1.classList.add('names');
            containerLi.appendChild(h1);


            const serviceName = document.createElement('p');
            serviceName.textContent = `Service: ${checkout.service_name}`
            serviceName.classList.add('service');
            containerLi.appendChild(serviceName)


            const p = document.createElement('p');
            p.textContent = `Phone Number: ${checkout.phone_number}`
            p.classList.add('ps');
            containerLi.appendChild(p);


            const divs = document.createElement('div')
            divs.classList.add('btns')

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('all-btns')
            divs.appendChild(editBtn)


            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('all-btns');
            divs.appendChild(deleteBtn);


            containerLi.appendChild(divs)

            return containerLi


        })

        displayAllCheckout.forEach(checkout => checkoutContainer.appendChild(checkout));
    }

   




checkout()

