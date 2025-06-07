import express from 'express';
import {
    getAllDrivers,
    getDriverById,
    createDriver,
    updateDriver,
    getDriverBySlug
} from '../controllers/driverController';

const driverRouter = express.Router();

driverRouter.get('/', getAllDrivers); // Get all drivers
driverRouter.get('/id/:id', getDriverById); // Get driver by ID
driverRouter.get('/slug/:slug', getDriverBySlug); // Get driver by ID
driverRouter.post('/', createDriver); // Create a new driver
driverRouter.patch('/:id', updateDriver); // Update an existing driver

export default driverRouter;