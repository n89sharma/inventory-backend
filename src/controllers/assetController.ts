import { Request, Response } from 'express'
import { prisma } from '../prisma.js'
import { getAssetsForQuery } from '../../generated/prisma/sql.js'

const dbIgnoreFlag = 'NOT_PROVIDED'
const dbMap = (val: any) => (val ? String(val) : dbIgnoreFlag)

export async function getAssets(req: Request, res: Response) {
  try {
    const { brand, model, assetType, trackingStatus, location, meter } = req.query

    const assets = await prisma.$queryRawTyped(getAssetsForQuery(
      dbMap(brand),
      dbMap(model),
      dbMap(assetType),
      dbMap(trackingStatus),
      dbMap(location),
      meter ? BigInt(String(meter)) : 999999999
    ))
    res.json(assets)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assets' })
  }
}