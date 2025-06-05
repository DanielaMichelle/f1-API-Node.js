import express from 'express';
import { config } from 'dotenv';
config();
import cors from 'cors';
import seasonRouter from './routes/seasonRoutes';
import raceRouter from './routes/raceRoutes';
import teamRouter from './routes/teamRoutes';
import driverRouter from './routes/driverRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/v1/seasons', seasonRouter);
app.use('/v1/races', raceRouter);
app.use('/v1/teams', teamRouter);
app.use('/v1/drivers', driverRouter);

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.listen(PORT, () => console.log('Server is running on port', PORT));

 