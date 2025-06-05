import teamModel from "../models/team";
import { Request, Response } from "express";
import { Team } from "../models/team.interface";

export const getAllTeams = async (req: Request, res: Response) : Promise<void> => {
    try {
        const teams = await teamModel.findMany();
        if (teams.length === 0) {
            res.status(404).json({ message: 'No teams found' });
            return;
        }
        res.status(200).json(teams);
    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTeamById = async (req: Request, res: Response) : Promise<void> => {
    const id = Number(req.params.id);
    try {
        const team = await teamModel.findUnique({ 
            where: { id } 
        });
        if (!team) {
            res.status(404).json({ message: `Team with id ${id} not found` });
            return;
        }
        res.status(200).json(team);
    } catch (error) {
        console.error('Error fetching team:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createTeam = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { name, fullName, country, teamChief,  entryYear, worldChamps, active, logoUrl} = req.body as Team;
        if (!name || !fullName || !country || !teamChief || !entryYear) {
            res.status(400).json({ message: 'All fields are required (name, fullName, country, teamChief, entryYear, OPTIONAL: worldChamps, active, logoUrl)' });
            return;
        }
        const newTeam = await teamModel.create({
            data: { name, fullName, country, teamChief, entryYear, worldChamps, active, logoUrl },
        });
        res.status(201).json(newTeam);
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getDriversInTeam = async (req: Request, res: Response) : Promise<void> => {
    const teamId = Number(req.params.id);
    if (isNaN(teamId)) {
        res.status(400).json({ message: 'Invalid team ID' });
        return;
    }
    
    try {
        const team = await teamModel.findUnique({
            where: { id: teamId },
            include: {drivers: true } // Include drivers in the response
        });
        if(!team) {
            res.status(404).json({ message: `Team with id ${teamId} not found` });
            return;
        }

        const drivers = team.drivers;
        if(!drivers || drivers.length === 0) {
            res.status(404).json({ message: `No drivers found for team with id ${teamId}` });
            return;
        }
        res.status(200).json(drivers);
    } catch (error) {
        console.error('Error fetching drivers for team:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const addWorldChampionship = async (req: Request, res: Response) : Promise<void> => {
    const teamId = Number(req.params.id);
    if (isNaN(teamId)) {
        res.status(400).json({ message: 'Invalid team ID' });
        return;
    }

    try {
        const team = await teamModel.findUnique({
            where: { id: teamId }
        });

        if (!team) {
            res.status(404).json({ message: `Team with id ${teamId} not found` });
            return;
        }

        const updatedTeam = await teamModel.update({
            where: { id: teamId },
            data: {
                worldChamps: { increment: 1 } // Increment the worldChamps by 1
            }
        });
        res.status(200).json(updatedTeam);
    } catch (error) {
        console.error('Error updating world championship:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateTeamStatus = async (req: Request, res: Response) : Promise<void> => {
    const teamId = Number(req.params.id);
    if (isNaN(teamId)) {
        res.status(400).json({ message: 'Invalid team ID' });
        return;
    }

    const { isActive } = req.body;
    if(typeof isActive !== 'boolean') {
        res.status(400).json({ message: 'isActive field must be a boolean' });
        return;
    }

    try {
        const team = await teamModel.findUnique({
            where: { id: teamId }
        });

        if (!team) {
            res.status(404).json({ message: `Team with id ${teamId} not found` });
            return;
        }

        const updatedTeam = await teamModel.update({
            where: { id: teamId },
            data: {
                active: isActive // Update the active status
            }
        });
        res.status(200).json(updatedTeam);
    } catch (error) {
        console.error('Error updating team status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateTeamLogo = async (req: Request, res: Response) : Promise<void> => {
    const teamId = Number(req.params.id);
    if (isNaN(teamId)) {
        res.status(400).json({ message: 'Invalid team ID' });
        return;
    }

    const { logoUrl } = req.body;
    if (!logoUrl || typeof logoUrl !== 'string') {
        res.status(400).json({ message: 'logoUrl must be a valid string' });
        return;
    }

    try {
        const team = await teamModel.findUnique({
            where: { id: teamId }
        });

        if (!team) {
            res.status(404).json({ message: `Team with id ${teamId} not found` });
            return;
        } 

        const updatedTeam = await teamModel.update({
            where: { id: teamId },
            data: {
                logoUrl // Update the logoUrl
            }
        });
        res.status(200).json(updatedTeam);
    } catch (error) {
        console.error('Error updating team logo:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};