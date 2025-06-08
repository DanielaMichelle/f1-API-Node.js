import express from 'express';
import {
    getRaceResultsBySeason,
    createResult
} from '../controllers/resultController';
import { authenticateToken } from '../middlewares/authMiddleware';

const resultRouter = express.Router();


resultRouter.get('/season/:year/race/:place', authenticateToken, getRaceResultsBySeason); // Get results for a specific race in a season
resultRouter.post('/', authenticateToken, createResult); // Create a new result

export default resultRouter;