import express from 'express';
import { PrismaClient } from '@prisma/client';
import copierRoutes from './routes/copiers';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use('/copiers', copierRoutes);

app.get('/', (req, res) => {
  res.send('Copier Inventory API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
