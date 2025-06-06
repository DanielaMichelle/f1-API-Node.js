import seasonModel from '../models/season';
import { Request, Response } from 'express';
import { Season } from '../models/season.interface';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const getAllSeasons = async (req: Request, res: Response) : Promise<void> => {
    try {
        const allSeasons = await seasonModel.findMany();
        if (allSeasons.length === 0) {
            res.status(404).json({ message: 'No seasons found' });
            return;
        }
        res.status(200).json(allSeasons);
    } catch (error) {
        console.error('Error fetching seasons:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getSeasonById = async (req: Request, res: Response) : Promise<void> => {
    const seasonId = Number(req.params.id);
    if(isNaN(seasonId)) {
        res.status(400).json({ message: 'Invalid season ID' });
        return;
    }

    try {
        const season = await seasonModel.findUnique({
            where: { id: seasonId }
        });

        if(!season) {
            res.status(404).json({ message: `Season with id ${seasonId} not found` });
            return;
        }
        res.status(200).json(season);
    } catch (error) {
        console.error('Error fetching season:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const createSeason = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { year, name } = req.body as Season;
        if(!year || !name) {
            res.status(400).json({ message: 'Year and name are required' });
            return;
        }

        const existingSeason = await seasonModel.findFirst({ 
            where: { year } 
        });
        if(existingSeason) {
            res.status(400).json({ message: `Season with year ${year} already exists` });
            return;
        };


        const newSeason = await seasonModel.create({
            data: {
                year,
                name
            }
        });
        res.status(201).json(newSeason);

    } catch (error) {
        console.error('Error creating season:', error);
        if(error instanceof PrismaClientKnownRequestError) {
            if(error.code === 'P2002') {
                res.status(409).json({ message: 'Season with this year already exists' });
                return;
            }
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getRacesInSeason = async(req: Request, res: Response) : Promise<void> => {
    const seasonId = Number(req.params.id);
    if(isNaN(seasonId)) {
        res.status(400).json({ message: 'Invalid season ID' });
        return;
    }
    try {
        const season = await seasonModel.findUnique({
            where: { id: seasonId },
            include: {
                races: true 
            }
        })

        if(!season) {
            res.status(404).json({ message: `Season with id ${seasonId} not found` });
            return;
        }

        const races = season.races;
        if(!races || races.length === 0) {
            res.status(404).json({ message: 'Races not found for this season' });
            return;
        }

        res.status(200).json(races);
    } catch (error) {
        console.error('Error fetching races in season:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

