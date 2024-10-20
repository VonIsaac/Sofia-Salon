const deleteAppointment = async(appointment_id) => {
    try{
        const response = await fetch(`http://localhost/fashion-backend/appointment/cancel`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                appointment_id: appointment_id,
            })
            
        });

        return response;

    }catch(err){
        console.error('There was a problem with the fetch operation:', err);
    }
}