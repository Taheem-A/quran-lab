import express from 'express';
import cors from 'cors';
import router from './routes/routes.ts';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/quran', router);

app.get('/', (req, res) => {
    res.send("Quran API is running. Use /api/quran to access the endpoints.");
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});