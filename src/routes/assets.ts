import express from 'express';
import { prisma } from '../prisma.js'
import { getAssetDetails } from '../../generated/prisma/sql.js';
import { getAssetAccessories } from '../../generated/prisma/sql.js';

const router = express.Router();

router.get('/:barcode', async (req, res) => {
  const { barcode } = req.params;

  const assets = await prisma.$queryRawTyped(getAssetDetails(barcode))

  if (!assets || assets.length === 0) {
    return res.status(404).json({ message: 'Asset not found' });
  }
  res.json(assets[0]);
});

router.get('/:barcode/accessories', async (req, res) => {
  const { barcode } = req.params;

  const accessories = await prisma.$queryRawTyped(getAssetAccessories(barcode))

  console.log(accessories)
  if (!accessories || accessories.length === 0) {
    return res.status(404).json({ message: 'Accessories not found' });
  }
  res.json(accessories.map((a) => a.accessory));
});

export default router;
