import express from 'express';
import { prisma } from '../prisma.js'

const router = express.Router();

router.get('/', async (req, res) => {

  const accessories = await prisma.accessory.findMany()
  const assetTypes = await prisma.assetType.findMany()
  const trackingStatuses = await prisma.trackingStatus.findMany()
  const availabilityStatuses = await prisma.availabilityStatus.findMany()
  const technicalStatuses = await prisma.technicalStatus.findMany()
  const roles = await prisma.role.findMany()
  const invoiceTypes = await prisma.invoiceType.findMany()

  res.json({
    coreFunctions: accessories.map((a) => a.accessory),
    assetTypes: assetTypes.map((a) => a.asset_type),
    trackingStatuses: trackingStatuses.map((t) => t.status),
    availabilityStatuses: availabilityStatuses.map((a) => a.status),
    technicalStatuses: technicalStatuses.map((t) => t.status),
    roles: roles.map((r) => r.role),
    invoiceTypes: invoiceTypes.map((i) => i.type)
  })
})

export default router;
