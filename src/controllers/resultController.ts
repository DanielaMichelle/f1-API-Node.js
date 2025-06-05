import resultModel from '../models/result';
import seasonModel from '../models/season';
import { Request, Response } from 'express';
import { Result } from '../models/result.interface';

export const getRaceResultsBySeason  = async (req: Request, res: Response): Promise<void> => {
    const seasonYear = Number(req.params.year);
    if (isNaN(seasonYear)) {
        res.status(400).json({ error: 'Invalid season year' });
        return;
    }
    const raceName = req.params.place;
    try {
        const season = await seasonModel.findFirst({
            where: {
                year: {
                    equals: seasonYear
                }
            },
            include: { races: true }
        });
        if (!season) {
            res.status(404).json({ error: 'Season not found' });
            return;
        }      

        const race = season.races.find(r => r.slug === raceName);
        if(!race) {
            res.status(404).json({ message: `Race with name ${raceName} not found in season ${seasonYear}` });
            return;
        }

        const results = await resultModel.findMany({
            where: { raceId: race.id }
        });
        
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createResult = async (req: Request, res: Response): Promise<void> => {
    const { position, points, time, driverId, raceId } = req.body as Result;

    if (!position || !points || !time || !driverId || !raceId) {
        res.status(400).json({ error: 'All fields are required position, points, time, driverId and raceId' });
        return;
    }

    try {
        const newResult = await resultModel.create({
            data: {
                position,
                points,
                time,
                driverId,
                raceId
            }
        });

        res.status(201).json(newResult);
    } catch (error) {
        console.error('Error creating result:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}