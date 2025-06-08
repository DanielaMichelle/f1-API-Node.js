import express from 'express';
import {
    getAllDrivers,
    getDriverById,
    createDriver,
    updateDriver,
    getDriverBySlug
} from '../controllers/driverController';
import { authenticateToken } from '../middlewares/authMiddleware';

const driverRouter = express.Router();

driverRouter.get('/', authenticateToken, getAllDrivers); // Get all drivers
driverRouter.get('/id/:id', authenticateToken, getDriverById); // Get driver by ID
driverRouter.get('/slug/:slug', authenticateToken, getDriverBySlug); // Get driver by ID
driverRouter.post('/', authenticateToken, createDriver); // Create a new driver
driverRouter.patch('/:id', authenticateToken, updateDriver); // Update an existing driver

export default driverRouter;