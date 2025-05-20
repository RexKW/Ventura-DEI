import axios from "axios"


const getAllOwnedItineraries = async (token:string) =>{
    try{
        const response = await axios.get("http://localhost:3000/itinerary/ownedTrips"
            ,{
            headers: { "Content-Type": "application/json", "X-API-TOKEN": token}
        });
        return response.data

    }catch(error){
        console.error("Error fetching user:", error); 
        throw error; 
    }
}

const createItinerary = async (token:string, name: string, start_date: string, end_date: string, request: string, accomodation_budget: number, transporation_budget: number, culinary_budget: number, entertainment_budget: number,misc_budget: number) =>{
    try{
        const response = await axios.post("http://localhost:3000/itinerary/create",
            {
                name: name,
                start_date: start_date,
                end_date: end_date,
                request: request,
                accomodation_budget: accomodation_budget,
                transporation_budget: transporation_budget,
                culinary_budget: culinary_budget,
                entertainment_budget: entertainment_budget,
                misc_budget: misc_budget
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

const getItinerary = async (token:string, itinerary_id: string) => {
    try{
        const response = await axios.get(`http://localhost:3000/itinerary/${itinerary_id}`,
            {
                headers: { "Content-Type": "application/json", "X-API-TOKEN": token}
            }
        )

        return response.data;
    }catch(error){
        console.error("Error fetching user:", error); 
        throw error; 
    }
}


export{getAllOwnedItineraries, createItinerary, getItinerary}