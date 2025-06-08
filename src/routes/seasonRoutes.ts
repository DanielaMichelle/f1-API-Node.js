import express from 'express';
import { 
    getAllSeasons, 
    getSeasonById,
    createSeason,
    getRacesInSeason
} from '../controllers/seasonController';
import { authenticateToken } from '../middlewares/authMiddleware';

const seasonRouter = express.Router();

seasonRouter.get('/', authenticateToken, getAllSeasons); // get all seasons
seasonRouter.get('/:id', authenticateToken, getSeasonById); // get season by id
seasonRouter.post('/', authenticateToken, createSeason); // create season
seasonRouter.get('/:id/races', authenticateToken, getRacesInSeason); // get all races in a season

export default seasonRouter;