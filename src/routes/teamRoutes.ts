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

const teamRouter = express.Router();

teamRouter.get('/', getAllTeams); // Get all teams
teamRouter.get('/id/:id', getTeamById); // Get team by ID
teamRouter.get('/slug/:slug', getTeamBySlug); // Get team by slug')
teamRouter.post('/', createTeam); // Create a new team
teamRouter.get('/:id/drivers', getDriversInTeam); // Get drivers in a specific team
teamRouter.patch('/:id/add-championship', addWorldChampionship); // Add a world championship to a team
teamRouter.patch('/:id/active', updateTeamStatus); // Update team status (active/inactive)
teamRouter.patch('/:id/logo', updateTeamLogo); // Update team logo
export default teamRouter;