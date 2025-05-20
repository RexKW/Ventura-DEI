// import { ActivityResponse, CreateActivityRequest, toActivityResponse, toActivityResponseList } from "../model/activity-model";
// import { Validation } from "../validation/validation";
// import { Activity, Schedule_Per_Day , Destination} from "@prisma/client"
// import { prismaClient } from "../application/database"
// import { ResponseError } from "../error/response-error"
// import { ActivityValidation } from "../validation/activity-validation";
// import { toDestinationResponse, DestinationResponse, toDestinationResponseList } from "../model/destination-model";

// export class DestinationService{
//     static async addDestination(api_id: number): Promise<Destination>{
//         const axios = require('axios');
//         const destination = await prismaClient.destination.findUnique({
//             where:{
//                 destination_api_id: api_id
//             }
//         })
//         if(destination){
//             return destination
//         }

//         const destinations = await this.getAllDestination()
//         const destinationDB = destinations.find(destination => destination.id === String(api_id));
//         const dbDestination = await prismaClient.destination.create({
//             data:{
//                 name: destinationDB.name,
//                 province: destinationDB.province,
//                 destination_api_id: parseInt(destinationDB.id, 10)
//             }
//         })

//         return dbDestination
        
        
        
//     }


//     static async getAllProvinces() {
//         const axios = require('axios');
//         const destinations = await axios.get('https://rexkw.github.io/api-wilayah-indonesia/api/provinces.json')

//         return destinations.data

        
//     }

//     static async getAllCitiesInProvince(provinceId: string){
//         const axios = require('axios');
//         const response = await axios.get(`https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
//         return response.data
//     }

//     static async getAllDestination(){
//         const provinces = await this.getAllProvinces();

//     const allCitiesPromises = provinces.map(async (province: { id: string; name: string }) => {
//         const cities = await this.getAllCitiesInProvince(province.id);


//         return cities.map(({ id, name }: Destination) => ({
//             id,
//             name: name.replace(/\b(KOTA |KABUPATEN )\b\s*/gi, ""),
//             province: province.name
//         }));
//     });


//     const allCities = (await Promise.all(allCitiesPromises)).flat();

//     return allCities;
//     }

//     static async getDestinationbyID(destinationId: string){
//         const axios = require('axios');
//         const destination = await axios.get(`https://emsifa.github.io/api-wilayah-indonesia/api/regency/${destinationId}.json`);

//         return destination
//     }

//     static async getDestinationDBbyID(destination_id: number){
//         const destination = await prismaClient.destination.findUnique({
//             where:{
//                 id: destination_id
//             }
//         })

//         if (!destination) {
//             throw new Error('Destination not found');
//         }

//         return destination
//     }

    


//     static async getDestinationbyName(name: string): Promise<DestinationResponse[]>{
//         const destination = await this.checkDestinationName(name)

//         return toDestinationResponseList(destination)
//     }



//     static async checkDestinationID(
//             destination_id: number
//         ): Promise<Destination> {
//             const destination = await prismaClient.destination.findUnique({
//                 where: {
//                     id: destination_id
//                 },
//             })
    
//             if (!destination) {
//                 throw new ResponseError(400, "Destination not found!")
//             }
    
//             return destination
//         }

//     static async checkDestinationName(
//         name: string
//     ): Promise<Destination[]> {
        
//         const destination = await prismaClient.destination.findMany({
//             where:{
//                 name: name
//             }
//         })

//         if (!destination) {
//             throw new ResponseError(400, "Destination not found!")
//         }

//         return destination
//     }


    

// }