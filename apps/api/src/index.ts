import express from 'express';
import router from './routes/routes.ts';

const app = express();
const PORT = 3000;
app.use(express.json());

app.use('/api/quran', router);

app.get('/', (req, res) => {
    res.send("Quran API is running. Use /api/quran to access the endpoints.");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});