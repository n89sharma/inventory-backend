import express from 'express';
import assetRoutes from './routes/assets.js';

const app = express();

app.use(express.json());
app.use('/assets', assetRoutes);

app.get('/', (req, res) => {
  res.send('Inventory API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
