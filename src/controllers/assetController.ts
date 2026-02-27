import { Request, Response } from 'express'
import { prisma } from '../prisma.js'
import { getAssetsForQuery } from '../../generated/prisma/sql.js'
import { z } from 'zod'

const AssetQuerySchema = z.object({
  model: z.string(),
  trackingStatusId: z.string().optional().transform(Number),
  availabilityStatusId: z.string().optional().transform(Number),
  technicalStatusId: z.string().optional().transform(Number),
  warehouseId: z.string().optional().transform(Number),
  meter: z.string().optional().transform(Number)
})

export async function getAssets(req: Request, res: Response) {
  try {
    const result = AssetQuerySchema.safeParse(req.query)

    if (!result.success) {
      return res.status(400).json({ error: 'Request parameters incorrect' })
    }

    const { model, trackingStatusId, availabilityStatusId, technicalStatusId, warehouseId, meter } = result.data

    const assets = await prisma.$queryRawTyped(getAssetsForQuery(
      model,
      !!trackingStatusId ? trackingStatusId : 999999999999,
      !!availabilityStatusId ? availabilityStatusId : 999999999999,
      !!technicalStatusId ? technicalStatusId : 999999999999,
      !!warehouseId ? warehouseId : 999999999999,
      !!meter ? meter : 999999999999
    ))
    res.json(assets)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assets' })
  }
}