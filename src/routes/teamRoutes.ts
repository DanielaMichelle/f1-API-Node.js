import express from 'express';
import {
    getAllTeams,
    getTeamById,
    createTeam,
    getDriversInTeam,
    addWorldChampionship,
    updateTeamStatus, 
    updateTeamLogo,
    getTeamBySlug
} from '../controllers/teamController';
import { authenticateToken } from '../middlewares/authMiddleware';

const teamRouter = express.Router();

teamRouter.get('/', authenticateToken, getAllTeams); // Get all teams
teamRouter.get('/id/:id', authenticateToken,  getTeamById); // Get team by ID
teamRouter.get('/slug/:slug', authenticateToken, getTeamBySlug); // Get team by slug')
teamRouter.post('/', authenticateToken, createTeam); // Create a new team
teamRouter.get('/:id/drivers', authenticateToken, getDriversInTeam); // Get drivers in a specific team
teamRouter.patch('/:id/add-championship', authenticateToken, addWorldChampionship); // Add a world championship to a team
teamRouter.patch('/:id/active', authenticateToken, updateTeamStatus); // Update team status (active/inactive)
teamRouter.patch('/:id/logo', authenticateToken, updateTeamLogo); // Update team logo
export default teamRouter;