import express from 'express';
import { prisma } from '../prisma.js'

const router = express.Router();

router.get('/:barcode', async (req, res) => {
  const { barcode } = req.params;

  const asset = await prisma.asset.findUnique({
    where: { barcode },
    select: {
      model: {
        select: {
          name: true,
          brand: true
        }
      },
      barcode: true,
      serial_number: true,
      asset_type: true,
      tracking_status: true,
      availability_status: true,
      technical_status: true,
      location: {
        select: {
          warehouse: true,
          location:true
        }
      },
      cost: true,
      technical_specification: true,
      hold: {
        select: {
          created_by: {
            select: {
              email: true,
              name: true
            }
          },
          created_for: {
            select: {
              email: true,
              name: true
            }
          },
          created_at: true,
          customer: {
            select: {
              name: true
            }
          },
          from_dt: true,
          to_dt: true,
          notes: true,
          hold_number: true
        }
      },
      created_at: true,
      is_held: true
    }
  });
  if (!asset) {
    return res.status(404).json({ message: 'Asset not found' });
  }
  res.json(asset);
});

export default router;
