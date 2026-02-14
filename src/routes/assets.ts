import express from 'express';
import { prisma } from '../prisma.js'

const router = express.Router();

router.get('/:barcode', async (req, res) => {
  const { barcode } = req.params;

  const asset = await prisma.asset.findUnique({
    relationLoadStrategy: 'join',
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
          warehouse: {
            select: {
              city_code: true,
              street: true
            }
          },
          location: true
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
      arrival: {
        select: {
          arrival_number: true,
          origin: {
            select: {
              name: true
            }
          },
          destination: {
            select: {
              city_code: true,
              street: true
            }
          },
          transporter: {
            select: {
              name: true
            }
          },
          created_by: {
            select: {
              email: true,
              name: true
            }
          },
          notes: true,
          created_at: true
        }
      },
      departure: {
        select: {
          departure_number: true,
          notes: true,
          created_by: {
            select: {
              email: true,
              name: true
            }
          },
          destination: {
            select: {
              name: true
            }
          },
          origin: {
            select: {
              city_code: true,
              street: true
            }
          },
          transporter: {
            select: {
              name: true
            }
          },
          sales_representative: {
            select: {
              email: true,
              name: true
            }
          },
          created_at: true
        }
      },
      created_at: true,
      is_held: true,
      purchase_invoice: {
        select: {
          invoice_number: true,
          is_cleared: true
        }
      }
    }
  });
  if (!asset) {
    return res.status(404).json({ message: 'Asset not found' });
  }
  res.json(asset);
});

export default router;
