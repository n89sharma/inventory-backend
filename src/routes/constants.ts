import express from 'express';
import { prisma } from '../prisma.js'
import { Accessory, AssetType, TrackingStatus, AvailabilityStatus, TechnicalStatus, Role, InvoiceType } from '../../generated/prisma/enums.js';

const router = express.Router();

router.get('/', async (req, res) => {
  res.json({
    coreFunctions: Object.values(Accessory),
    assetType: Object.values(AssetType),
    trackingStatus: Object.values(TrackingStatus),
    availabilityStatus: Object.values(AvailabilityStatus),
    technicalStatus: Object.values(TechnicalStatus),
    role: Object.values(Role),
    invoiceType: Object.values(InvoiceType)
  });
});

export default router;
