import raceModel from '../models/race';
import { Request, Response } from 'express';
import { Race } from '../models/race.interface';

export const getAllRaces = async (req: Request, res: Response ) : Promise<void> => {
    try {
        const allRaces = await raceModel.findMany();
        if(allRaces.length === 0) {
            res.status(404).json({ message: 'Races not found' });
            return;
        }
        res.status(200).json(allRaces);
    } catch (error) {
        console.error('Error fetching races:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getRaceById = async (req: Request, res: Response) : Promise<void> => {
    const raceId = Number(req.params.id);
    if (isNaN(raceId)) {
        res.status(400).json({ message: 'Invalid race ID' });
        return;
    }

    try {
        const race = await raceModel.findUnique({
            where: { id: raceId }
        });

        if(!race) {
            res.status(404).json({ message: `Race with id ${raceId} not found` });
            return;
        }
        res.status(200).json(race);
    } catch (error) {
        console.error('Error fetching race:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createRace = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { name, place, circuit, date, seasonId } = req.body as Race;
        if(!name || !place || !circuit || !date || !seasonId) {
            res.status(400).json({ message: 'All fields are required (name, place, circuit, date and seasonId)' });
            return;
        }
        const slugName = name.toLowerCase().replace(/\s+/g, '-');
        
        const newRace = await raceModel.create({
            data: {
                name, 
                place,
                circuit,
                date: new Date(date), // Ensure date is a Date object
                slug: slugName, // Set the slug before creation
                seasonId: Number(seasonId) // Ensure seasonId is an integer
            }
        });
        res.status(201).json(newRace);
    } catch (error) {
        console.error('Error creating race:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getResultsForRace = async (req: Request, res: Response) : Promise<void> => {
    try {
        const raceId = Number(req.params.id);

        if (isNaN(raceId)) {
            res.status(400).json({ message: 'Invalid race ID' });
            return;
        }
        
        const race = await raceModel.findUnique({
            where: { id: raceId },
            include: {
                results: true // Include results in the response
            }
        });

        if(!race) {
            res.status(404).json({ message: `Race with id ${raceId} not found` });
            return;
        }

        const resuts = race.results;
        if(!race || resuts.length === 0) {
            res.status(404).json({ message: `No results found for race with id ${raceId}` });
            return;
        }
        res.status(200).json(resuts);
    } catch (error) {
        console.error('Error fetching results for race:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
        
};