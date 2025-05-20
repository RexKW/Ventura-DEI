import express from "express"
import { AuthController } from "../controllers/user-controller"
import axios from 'axios';

export const publicRouter = express.Router()

publicRouter.post("/api/register", AuthController.register)
publicRouter.post("/api/login", AuthController.login)

publicRouter.get(
    '/hotel-offers',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
        const { query, radius = '5', radiusUnit = 'KM' } = req.query;
        // Replace with your actual token
        const AMADEUS_TOKEN = 'YOUR_IMMEDIATE_ACCESS_TOKEN';
  
        const amadeusRes = await axios.get(
          'https://test.api.amadeus.com/v2/shopping/hotel-offers',
          {
            headers: { Authorization: `Bearer ${AMADEUS_TOKEN}` },
            params: { query, radius, radiusUnit },
          }
        );
  
        // forward the JSON exactly as Amadeus sent it
        res.json(amadeusRes.data);
      } catch (err) {
        console.error('Error proxying hotel-offers:', err);
        next(err);
      }
    }
  );