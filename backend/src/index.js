import express from 'express';
import feedbackRoutes from './routes/feedbackRoutes.js';

const app = express();
const PORT = 3000;
app.use(express.json());
app.use('/api/feedback',feedbackRoutes);

app.listen(PORT,() => {
    console.log(`Running on Port ${PORT}`);
});