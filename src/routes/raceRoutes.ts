import express from 'express';
import {
    getAllRaces,
    getRaceById,
    createRace,
    getResultsForRace
} from '../controllers/raceController';
import { authenticateToken } from '../middlewares/authMiddleware';

const raceRouter = express.Router();

raceRouter.get('/', authenticateToken, getAllRaces); // get all races
raceRouter.get('/:id', authenticateToken, getRaceById); // get race by id
raceRouter.post('/', authenticateToken, createRace); // create race
raceRouter.get('/:id/results', authenticateToken, getResultsForRace); // get results for race 
export default raceRouter;

