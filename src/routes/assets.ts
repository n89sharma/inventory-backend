import express from 'express';
import { prisma } from '../prisma.js'
import { getAssetComments, getAssetDetails, getAssetAccessories, getAssetErrors } from '../../generated/prisma/sql.js';

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

  res.json(accessories.map((a) => a.accessory));
});

router.get('/:barcode/errors', async (req, res) => {
  const { barcode } = req.params;

  const errors = await prisma.$queryRawTyped(getAssetErrors(barcode))

  res.json(errors);
});

router.get('/:barcode/comments', async (req, res) => {
  const { barcode } = req.params;

  const comments = await prisma.$queryRawTyped(getAssetComments(barcode))

  res.json(comments);
});

export default router;
