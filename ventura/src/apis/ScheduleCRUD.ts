import axios from "axios";

const getAllDays = async (token:string, itinerary_id: string) =>{
    try{
        const response = await axios.get(`http://localhost:3000/activities/allDays/${itinerary_id}`
            ,{
            headers: { "Content-Type": "application/json", "X-API-TOKEN": token}
        });
        return response.data

    }catch(error){
        console.error("Error fetching days:", error); 
        throw error; 
    }
}

const getDay = async(token: string, day_id: string) =>{
    try{
        const response = await axios.get(`http://localhost:3000/days/${day_id}`
            ,{
            headers: { "Content-Type": "application/json", "X-API-TOKEN": token}
        });
        return response.data
    }catch(error){
        console.error("Error fetching day:", error); 
        throw error; 
    }
}

export {getAllDays, getDay}