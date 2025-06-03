import express from 'express';
import { 
    getAllSeasons, 
    getSeasonById,
    createSeason,
    getRacesInSeason
} from '../controllers/seasonController';

const seasonRouter = express.Router();

seasonRouter.get('/', getAllSeasons); // get all seasons
seasonRouter.get('/:id', getSeasonById); // get season by id
seasonRouter.post('/', createSeason); // create season
seasonRouter.get('/:id/races', getRacesInSeason); // get all races in a season

export default seasonRouter;