import express from 'express';
import { PrismaClient, Accessory, AssetType, TrackingStatus, ExitStatus, TechnicalStatus, Role, InvoiceType } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  res.json({
    coreFunctions: Object.values(Accessory),
    assetType: Object.values(AssetType),
    trackingStatus: Object.values(TrackingStatus),
    exitStatus: Object.values(ExitStatus),
    technicalStatus: Object.values(TechnicalStatus),
    role: Object.values(Role),
    invoiceType: Object.values(InvoiceType)
  });
});

export default router;
