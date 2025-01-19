
async function getaAppointment(customer_name,  phone_number,  appointment_date){
    //covert into readable format
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const stringDate = new Date(appointment_date).toLocaleDateString('en-PH', options)
    const message = `Gooday ${customer_name}, the service that you avail are set in ${stringDate}, Thank you`;
    
    try{
        const response = await fetch('http://localhost/fashion-backend/sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                phone_numbers: [phone_number] // stored in array for Scalability like in the server side

            })
        });

        if(!response.ok){
            throw new Error(`Network response was not ok ${response.status}`);
        }

        const data = await response.json()
        console.log('Notification sent successfully:', data);

        alert(`Notification sent to ${customer_name}`);

    }catch(err){
        console.log(err)
        alert('Failed to send notification. Please try again.');
    }
}


// for apoinment name accepted only letters
function validateInput(input){
    const regex = /^[A-Za-z\s]*$/;
    if(!regex.test(input.value)){
        input.value = input.value.replace(/[^A-Za-z]/g, ""); // Remove invalid characters
    }
} 

document.querySelector('.form-appointment').addEventListener('submit', async (e) => {


    e.preventDefault();
    //get the name, num, date
    const apointmentName = document.getElementById('customer_name');
    const apointmentNumber = document.getElementById('phone_number');
    const apointmentDate = document.getElementById('appointment_date');

    const name = apointmentName.value;
    const number = apointmentNumber.value;
    const date = apointmentDate.value;
    const urlParams = new URLSearchParams(window.location.search);

    const serviceId = urlParams.get('id');
    //const userId = getUserId();

    try {
        const response = await fetch('http://localhost/fashion-backend/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                customer_name: name,
                phone_number: number,
                appointment_date: date,
                //user_id: userId,
                service_id: serviceId
            })
        });

        if (!response.ok) {

            throw new Error(`HTTP error! status: ${response.status}`);

        };

        console.log(response)

        if (response.ok) {
            alert('Succesfully Set Apointment')
            getaAppointment( name, number, date)
            window.location.href = '../features/services.html'
        }
        // 
        //clear the inputs fields when done taking apointmenst


    } catch (err) {
        alert(`An Error Occured${err.message}`)
        console.log('GOT AN ERROR')
    }

})