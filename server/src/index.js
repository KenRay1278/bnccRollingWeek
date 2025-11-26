import express from 'express';
import cors from 'cors';
import feedbackRoutes from './routes/feedbackRoutes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/feedback',feedbackRoutes);

app.listen(PORT,() => {
    console.log(`Running on Port ${PORT}`);
});