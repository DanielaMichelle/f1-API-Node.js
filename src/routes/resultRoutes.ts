import express from 'express';
import {
    getRaceResultsBySeason,
    createResult
} from '../controllers/resultController';

const resultRouter = express.Router();


resultRouter.get('/season/:year/race/:place', getRaceResultsBySeason); // Get results for a specific race in a season
resultRouter.post('/', createResult); // Create a new result

export default resultRouter;