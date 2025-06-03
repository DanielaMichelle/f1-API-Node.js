import express from 'express';
import {
    getAllRaces,
    getRaceById,
    createRace,
    getResultsForRace
} from '../controllers/raceController';

const raceRouter = express.Router();

raceRouter.get('/', getAllRaces); // get all races
raceRouter.get('/:id', getRaceById); // get race by id
raceRouter.post('/', createRace); // create race
raceRouter.get('/:id/results', getResultsForRace); // get results for race 
export default raceRouter;

