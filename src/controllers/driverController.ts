import driverModel from '../models/driver';
import { Request, Response } from 'express';
import { Driver } from '../models/driver.interface';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const getAllDrivers = async (req: Request, res: Response): Promise<void> => {
    try {
        const drivers = await driverModel.findMany();
        if (drivers.length === 0) {
            res.status(404).json({ message: 'No drivers found' });
            return;
        }
        res.status(200).json(drivers);
    } catch (error) {
        console.error('Error fetching drivers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getDriverById = async (req: Request, res: Response): Promise<void> => {
    const driverId = Number(req.params.id);
    if (isNaN(driverId)) {
        res.status(400).json({ message: 'Invalid driver ID' });
        return;
    }

    try {
        const driver = await driverModel.findUnique({
            where: { id: driverId }
        });

        if (!driver) {
            res.status(404).json({ message: 'Driver not found' });
            return;
        }

        res.status(200).json(driver);
    } catch (error) {
        console.error('Error fetching driver:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getDriverBySlug = async(req: Request, res: Response): Promise<void> => {
    const slug = req.params.slug;
    if (!slug) {
        res.status(400).json({ message: 'Slug is required' });
        return;
    }
    try {
        const driver = await driverModel.findUnique({
            where: { slug }
        });

        if(!driver) {
            res.status(404).json({ message: 'Driver not found' });
            return;
        }
        res.status(200).json(driver);
    } catch (error) {
        console.error('Error fetching driver by slug:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createDriver = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, number, country, podiums, worldChamps, birthDate, imageUrl, active, teamId } = req.body as Driver;
        if(!name || !number || !country || !birthDate || !teamId) {
            res.status(400).json({ message: 'Name, number, country, birthDate and teamId are required, OPTIONAL: podiums, worldChamps, imageUrl, active' });
            return;
        }

        const newDriver = await driverModel.create({
            data: {
                name,
                number,
                country,
                podiums,
                worldChamps,
                birthDate: new Date(birthDate),
                imageUrl,
                active: active ?? true, // Default to true if not provided
                slug: name.toLowerCase().replace(/\s+/g, '-'), // Simple slug generation
                teamId
            }
        });
        res.status(201).json(newDriver);  
    } catch (error) {
        console.error('Error creating driver:', error);

        if( error instanceof PrismaClientKnownRequestError) {
            // P2002 error code indicates a unique constraint violation
            if (error.code === 'P2002') {
                res.status(409).json({ message: 'Driver with this number already exists for the team' });
                return;
            }
        }

        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateDriver = async (req: Request, res: Response): Promise<void> => {
    const driverId = Number(req.params.id);
    if(isNaN(driverId)) {
        res.status(400).json({ message: 'Invalid ID format' });
        return;
    }

    try {
        const driver = await driverModel.findUnique({
            where: { id: driverId }
        });
        if(!driver) {
            res.status(404).json({ message: 'Driver not found' });
            return;
        }

        const { name, number, country, podiums, worldChamps, birthDate, imageUrl, active, teamId } = req.body;

        const updatedDriver = await driverModel.update({
            where: { id: driverId },
            data: {
                name: name ?? driver.name,
                number: number ?? driver.number,
                country: country ?? driver.country,
                podiums: podiums ?? driver.podiums,
                worldChamps: worldChamps ?? driver.worldChamps,
                birthDate: birthDate ? new Date(birthDate) : driver.birthDate,
                imageUrl: imageUrl ?? driver.imageUrl,
                active: active ?? driver.active,
                teamId: teamId ?? driver.teamId
            }
        });

        res.status(200).json(updatedDriver);
    } catch (error) {
        console.error('Error updating driver:', error);
        if (error instanceof PrismaClientKnownRequestError) {
            // P2002 error code indicates a unique constraint violation
            if (error.code === 'P2002') {
                res.status(409).json({ message: 'Driver with this number already exists for the team' });
                return;
            }
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}