import express from 'express';
import { prisma } from '../prisma.js'

const router = express.Router();

router.get('/:barcode', async (req, res) => {
  const { barcode } = req.params;

  const asset = await prisma.asset.findUnique({
    where: { barcode },
    include: {
      model: true,
      warehouse: true,
      location: true,
      technical_specification: true,
      cost: true,
      arrival: true,
      departure: true,
      asset_accessories: true,
      asset_errors: true,
      asset_parts: true,
      asset_transfers: true
    }
  });
  if (!asset) {
    return res.status(404).json({ message: 'Asset not found' });
  }
  res.json(asset);
});

export default router;
