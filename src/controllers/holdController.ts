import { Request, Response } from 'express'
import { getHolds as getHoldsDb, getAssetsForHold as getAssetsForHoldDb} from '../../generated/prisma/sql.js'
import { prisma } from '../prisma.js'

export async function getHolds(req: Request, res: Response) {
  try {
    const { fromDate, toDate } = res.locals.parsedDates 
    const holds = await prisma.$queryRawTyped(getHoldsDb(fromDate, toDate))
    res.json(holds)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch holds' })
  }
}

export async function getAssetsForHold(req: Request, res: Response) {
  const { holdNumber } = req.params
  try {
    const assets = await prisma.$queryRawTyped(getAssetsForHoldDb(holdNumber))
    res.json(assets)
  } catch (error) {
    res.status(500).json({ error:  `Failed to fetch assets for hold ${holdNumber}` })
  }
}