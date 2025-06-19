import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const copiers = await prisma.copier.findMany({
    select: {
      id: true,
      barcode: true,
      serialNumber: true,
      make: true,
      model: true,
      meterCount: true,
      status: true
    }
  });
  res.json(copiers);
});

export default router;
