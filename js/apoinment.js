/*async function getaAppointment(customerName, phoneNumber, apoinmentDate){
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
}*/

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
    const userId = getUserId();

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

        }
        // window.location.href = '../features/services.html'
        //clear the inputs fields when done taking apointmenst


    } catch (err) {
        alert(`An Error Occured${err.message}`)
        console.log('GOT AN ERROR')
    }

})