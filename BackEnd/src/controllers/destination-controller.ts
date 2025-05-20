// import { NextFunction, Request, Response } from "express";
// import { UserService } from "../services/auth-service";
// import { DestinationService } from "../services/destination-service";

// export class DestinationController {
//     static async getAllDestinations(req: Request, res: Response, next: NextFunction): Promise<void> {
//         try {
//             const response = await DestinationService.getAllDestination();
//             res.status(200).json({
//                 data: JSON.parse(JSON.stringify(response))
//             });
//         } catch (error) {
//             next(error);
//         }
//     }

//     static async getDestination(req: Request, res: Response, next: NextFunction){
//         try{
//             console.log(req.params);
//             const destinationId = Number(req.params.destinationId);
//             const response = await DestinationService.getDestinationDBbyID(destinationId)
//             res.status(200).json({
//                 data: JSON.parse(JSON.stringify(response))
//             })
//         }catch(error){
//             next(error)
//         }
//     }


//     static async deleteItinenerary(req: Request, res: Response, next: NextFunction) {
//         try {
//             const request = req.body;
//             const response = await UserService.login(request);
//             res.status(200).json({
//                 data: response,
//             });
//         } catch (error) {
//             next(error);
//         }
//     }

//     static async updateItinerary(req: Request, res: Response, next: NextFunction): Promise<void> {
//         try {
//             const request = req.body;
//             const response = await UserService.login(request);
//             res.status(200).json({
//                 data: response,
//             });
//         } catch (error) {
//             next(error);
//         }
//     }

//     static selectDestination(req: Request, res: Response): void {
//         // Implementation of selectDestination
//     }
// }