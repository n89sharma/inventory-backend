import { Request, Response } from 'express'
import { prisma } from '../prisma.js'
import { getAssetsForQuery } from '../../generated/prisma/sql.js'

export async function getAssets(req: Request, res: Response) {
  try {
    const { brand, model, assetType, trackingStatus, location, meter } = req.query

    const assets = await prisma.$queryRawTyped(getAssetsForQuery(
      String(brand) ?? 'NOT_PROVIDED',
      String(model) ?? 'NOT_PROVIDED',
      String(assetType) ?? 'NOT_PROVIDED',
      String(trackingStatus) ?? 'NOT_PROVIDED',
      String(location) ?? 'NOT_PROVIDED',
      BigInt(String(meter)) ?? 999999999
    ))
    res.json(assets)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assets' })
  }
}