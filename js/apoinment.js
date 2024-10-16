

document.querySelector('.form-appointment').addEventListener('submit' , async (e) => {
    e.preventDefault();
    //get the name, num, date
    const apointmentName = document.getElementById('customer_name');
    const apointmentNumber = document.getElementById('phone_number');
    const apointmentDate = document.getElementById('appointment_date');

    const name = apointmentName.value;
    const number = apointmentNumber.value;
    const date = apointmentDate.value;

    try{
        const response = await fetch('http://localhost/fashion-backend/checkout', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                username: name,
                usernumber: number,
                userdate: date,
            })
        });

        if(!response.ok){
            
            throw new Error(`HTTP error! status: ${response.status}`);
            
        };

        const saveApointment = await response.json();   
        document.cookie = `service_id=${saveApointment.service_id}; path=/;`
        console.log(saveApointment)
        if(response.ok){
            alert('Succesfully Set Apointment')
        }
        window.location.href = '../features/services.html'
        //clear the inputs fields when done taking apointmenst
       

    }catch(err){
        alert(`An Error Occured${err.message}`)
        console.log('GOT AN ERROR')
    }

})