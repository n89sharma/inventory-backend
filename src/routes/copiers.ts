import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:barcode', async (req, res) => {
  const { barcode } = req.params;
  
  const copiers = await prisma.asset.findUnique({
    where: { barcode },
    include: {
      brand: true,
      model: true,
      warehouse: true,
      location: true,
      technical_specification: true,
      cost: true,
      arrival: true,
      departure: true
    }
  });
  if (!copier) {
    return res.status(404).json({ message: 'Copier not found' });
  }
  res.json(copiers);
});

export default router;
