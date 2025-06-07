import express from 'express';
import { config } from 'dotenv';
config();
import cors from 'cors';
import seasonRouter from './routes/seasonRoutes';
import raceRouter from './routes/raceRoutes';
import teamRouter from './routes/teamRoutes';
import driverRouter from './routes/driverRoutes';
import resultRouter from './routes/resultRoutes';
import authRouter from './routes/authRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/v1/auth', authRouter);
app.use('/v1/seasons', seasonRouter);
app.use('/v1/races', raceRouter);
app.use('/v1/teams', teamRouter);
app.use('/v1/drivers', driverRouter);
app.use('/v1/results', resultRouter);

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.listen(PORT, () => console.log('Server is running on port', PORT));

 