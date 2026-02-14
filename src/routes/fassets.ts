import express from 'express';
import { prisma } from '../prisma.js'
import { getAssetDetails } from '../../generated/prisma/sql.js';

const router = express.Router();

router.get('/:barcode', async (req, res) => {
  const { barcode } = req.params;

  const asset = await prisma.$queryRawTyped(getAssetDetails(barcode))

  if (!asset) {
    return res.status(404).json({ message: 'Asset not found' });
  }
  res.json(asset);
});

export default router;
