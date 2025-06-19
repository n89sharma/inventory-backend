import express from 'express';
import { PrismaClient } from '@prisma/client';
import assetRoutes from './routes/assets';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use('/assets', assetRoutes);

app.get('/', (req, res) => {
  res.send('Inventory API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
