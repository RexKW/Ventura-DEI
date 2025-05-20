"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const itinerary_controller_1 = require("../controllers/itinerary-controller");
const activity_controller_1 = require("../controllers/activity-controller");
const accomodation_controller_1 = require("../controllers/accomodation-controller");
const budget_controller_1 = require("../controllers/budget-controller");
const auth_middleware_1 = require("../middleware/auth-middleware");
// import { DestinationController } from "../controllers/destination-controller"
const user_controller_1 = require("../controllers/user-controller");
// import { LocationController } from "../controllers/location-controller";
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use(auth_middleware_1.authMiddleware);
exports.apiRouter.post("/itinerary/create", itinerary_controller_1.ItineraryController.createNewItinerary);
exports.apiRouter.get("/itinerary/ownedTrips", itinerary_controller_1.ItineraryController.getAllItinerary);
exports.apiRouter.get("/itinerary/:itineraryId(\\d+)", itinerary_controller_1.ItineraryController.getItinerary);
exports.apiRouter.get("/itinerary/invitedTrips", itinerary_controller_1.ItineraryController.getAllInvitedItinerary);
exports.apiRouter.put("/itinerary/updateTrip/:itineraryId(\\d+)", itinerary_controller_1.ItineraryController.updateItinerary);
exports.apiRouter.delete("/itinerary/deleteTrip/:itineraryId(\\d+)", itinerary_controller_1.ItineraryController.deleteItinerary);
// apiRouter.get("/itinerary/allJourneys/:itineraryId(\\d+)", ItineraryController.allJourney)
// apiRouter.post("/itinerary/createJourney/:destinationId(\\d+)", ItineraryController.selectDestination)
// apiRouter.get("/itinerary/explore", ItineraryController.exploreItinerary)
// apiRouter.get("/itinerary/journey/:itineraryDestinationId(\\d+)", ItineraryController.getJourney)
// apiRouter.put("/itinerary/updateJourney/:itineraryDestinationId(\\d+)", ItineraryController.updateJourney)
// apiRouter.delete("/itinerary/deleteJourney/:itineraryDestinationId(\\d+)", ItineraryController.deleteJourney)
exports.apiRouter.post("/itinerary/cloneItinerary/:itineraryId(\\d+)", itinerary_controller_1.ItineraryController.cloneItinerary);
// apiRouter.get("/destinations/all", DestinationController.getAllDestinations)
// apiRouter.get("/destinations/:destinationId(\\d+)", DestinationController.getDestination)
// Add AccomodationController routes
exports.apiRouter.post("/accommodations/create", accomodation_controller_1.AccomodationController.createAccomodation); // Fetch or create accommodation
exports.apiRouter.post("/accommodations/getSaved", accomodation_controller_1.AccomodationController.getSavedAccomodations);
// apiRouter.put(
//   "/itinerary/updateJourneyAccommodation/:itineraryDestinationId(\\d+)", 
//   ItineraryController.updateAccomodation
// ); // Update the accommodation for a specific itinerary destination
// apiRouter.get(
//     "/itinerary/checkAccommodation/:itineraryDestinationId",
//     ItineraryController.checkAccommodation
//   );
//   apiRouter.get(
//     "/accommodations/:accommodationId",
//     ItineraryController.getAccommodationDetails
//   );
exports.apiRouter.get("/days/:dayId(\\d+)", activity_controller_1.ActivityController.getDay);
exports.apiRouter.get("/activities/allDays/:itineraryDestinationId(\\d+)", activity_controller_1.ActivityController.getAllDays);
exports.apiRouter.get("/activities/allActivities/:dayId(\\d+)", activity_controller_1.ActivityController.getAllActivities);
exports.apiRouter.post("/activities/createActivity/:dayId(\\d+)", activity_controller_1.ActivityController.createActivity);
exports.apiRouter.post("/activities/createActivities/", activity_controller_1.ActivityController.createActivities);
exports.apiRouter.get("/activities/getActivity/:activityId(\\d+)", activity_controller_1.ActivityController.getActivity);
exports.apiRouter.delete("/activities/deleteActivity/:activityId(\\d+)", activity_controller_1.ActivityController.deleteActivity);
exports.apiRouter.put("/activities/updateActivity/:activityId(\\d+)", activity_controller_1.ActivityController.updateActivity);
exports.apiRouter.get("/budget/plannedBudget/:itineraryId(\\d+)", budget_controller_1.BudgetController.plannedBudget);
exports.apiRouter.get("/budget/actualBudget/:itineraryId(\\d+)", budget_controller_1.BudgetController.actualBudget);
exports.apiRouter.post("/budget/create/:itineraryId(\\d+)", budget_controller_1.BudgetController.createBudget);
exports.apiRouter.put("/budget/update/:itineraryId(\\d+)", budget_controller_1.BudgetController.updateBudget);
exports.apiRouter.post("/users/logout", user_controller_1.AuthController.logout);
exports.apiRouter.get("/users/info", user_controller_1.AuthController.getUser);
exports.apiRouter.get("/users/all", user_controller_1.AuthController.allUsers);
exports.apiRouter.get("/users/role/:itineraryId(\\d+)", user_controller_1.AuthController.userRole);
// Add LocationController routes
// apiRouter.get("/locations", LocationController.getAllLocations); // Fetch all locations
// //apiRouter.post("/locations", LocationController.createLocation); // Create a location
// apiRouter.get("/locations/getOrCreate", LocationController.getOrCreateLocation); // Get or create a location by place_id and categories
// apiRouter.get("/locations/:locationId(\\d+)", LocationController.getLocationById);
// apiRouter.get("/location/seed")|
