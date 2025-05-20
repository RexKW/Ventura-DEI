import axios from "axios";

const getAllActivities = async (token:string, dayId: string) =>{
    try{
        const response = await axios.get(`http://localhost:3000/activities/allActivities/${dayId}`
            ,{
            headers: { "Content-Type": "application/json", "X-API-TOKEN": token}
        });
        return response.data

    }catch(error){
        console.error("Error fetching user:", error); 
        throw error; 
    }
}

const createActivity = async (token:string, dayId: string, name: string, description: string, start_time: Date, end_time: Date, type: string, cost: number, location_name: string, location_address: string, location_link: string, location_name2: string, location_address2: string, location_link2: string, method: string) =>{
    try{
        const response = await axios.post(`http://localhost:3000/activities/createActivity/${dayId}`,
        {
            name: name,
            description: description,
            start_time: start_time,
            end_time: end_time,
            type: type,
            cost: cost,
            location_name : location_name,
            location_address : location_address,
            location_link : location_link,
            location_name2: location_name2 || null,
            location_address2 : location_address2 || null,
            location_link2 : location_link2 || null,
            method : method || null


        },
        {
            headers: { "Content-Type": "application/json", "X-API-TOKEN": token}
        }
    );
        return response.data

    }catch(error){
        console.error("Error fetching user:", error); 
        throw error; 
    }
}

export {getAllActivities, createActivity}
