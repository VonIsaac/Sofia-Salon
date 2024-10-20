const editAppointment = async(data) => {
    try{
        const response = await fetch(`http://localhost/fashion-backend/appointment/edit`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customer_name: data.customer_name,
                phone_number: data.phone_number,
                service_id: data.service_id,
                appointment_date: data.appointment_date,
                appointment_id: data.appointment_id
            })
            
        });

        return response;

    }catch(err){
        console.error('There was a problem with the fetch operation:', err);
    }

}