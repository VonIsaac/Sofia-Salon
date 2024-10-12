
const container = document.getElementById('main-container')


const data = [
    {
        id: 's1',
        img: '../public/services-images/salon-1s.jpg',
        name: 'Haircut and Styling',
        description: 'Customized haircuts and styling for all hair types.',
        price: 150,

    },

    {
        id: 's2',
        img: '../public/services-images/salon-2.jpg',
        name: 'Hair Coloring',
        description: 'Change or enhance your hair color with techniques like highlights and full color.',
        price: 1000
    },

    {
        id: 's3',
        img: '../public/services-images/salon-3.jpg',
        name: 'Hair Treatments',
        description: 'Restore and nourish your hair with deep conditioning or smoothing treatments.',
        price: 400
    },

    {
        id: 's4',
        img: '../public/services-images/salon-4.jpg',
        name: 'Manicure and Pedicure',
        description: 'Nail shaping, cuticle care, and polish for hands and feet.',
        price: 300
    },

    {
        id: 's5',
        img: '../public/services-images/salon-5.jpg',
        name: 'Facial Treatments:',
        description: 'Cleansing and moisturizing treatments tailored to your skins needs.',
        price: 800
    },

    {
        id: 's6',
        img: '../public/services-images/salon-6.jpg',
        name: 'Waxing and Hair Removal',
        description: 'Remove unwanted hair with waxing or threading techniques.',
        price: 450
    },

    {
        id: 's7',
        img: '../public/services-images/salon-7.jpg',
        name: 'Makeup Services',
        description: 'Professional makeup application for special occasions or everyday looks.',
        price: 1300
    },

    {
        id: 's8',
        img: '../public/services-images/salon-8.jpg',
        name: 'Massage Therapy',
        description: 'Relaxing or deep tissue massages to relieve stress and tension.',
        price: 800
    },

    {
        id: 's9',
        img: '../public/services-images/salon-9.jpg',
        name: 'Eyebrow and Eyelash Services',
        description: 'Enhance your brows and lashes with tinting, extensions, or lifts.',
        price: 600
    },

    {
        id: 's10',
        img: '../public/services-images/salon-10.jpg',
        name: 'Bridal and Event Packages',
        description: ' Complete hair and makeup services for brides and groups.',
        price: 10000
    },
];

function displayServices(data){

    const displayAllServices = data.map(items => {
        const btn = document.createElement('button')
        btn.classList.add('btns');
        btn.textContent = "Avail"

        const containerBorderUl = document.createElement('li');
        containerBorderUl.classList.add('container-border')

        //creat an element then acces the data and append to container.
        const images = document.createElement('img');
        images.src = items.img;
        images.alt = items.name
        images.classList.add('container-img')
        containerBorderUl.appendChild(images);

        // do it at names same as image how to get the data and creat the element
        const names = document.createElement('h1');
        names.classList.add('container-name')
        names.textContent = `${items.name}`
        containerBorderUl.appendChild(names);

        const descriptions = document.createElement('p');
        descriptions.classList.add('container-description')
        descriptions.textContent = `${items.description}`
        containerBorderUl.appendChild(descriptions);

        // creating new div from price and button
        const divs = document.createElement('div');
        divs.classList.add('container-prices-bts');

        //prices
        const prices = document.createElement('p');
        prices.classList.add('container-price')
        prices.textContent = `₱${items.price}`
        //append the prices in the div that created.
        divs.appendChild(prices)
        //then the divs are append in container 
        containerBorderUl.appendChild(divs)

        //buttons
        divs.appendChild(btn)

       

        return containerBorderUl;

    });

    displayAllServices.forEach(services => container.appendChild(services))
};

displayServices(data)
