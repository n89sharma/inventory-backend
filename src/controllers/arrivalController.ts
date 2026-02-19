import { Request, Response } from 'express'
import { getArrivals as getArrivalsDb, getAssetsForArrival as getAssetsForArrivalDb } from '../../generated/prisma/sql.js'
import { prisma } from '../prisma.js'

export async function getArrivals(req: Request, res: Response) {
  try {
    const { fromDate, toDate } = res.locals.parsedDates
    const arrivals = await prisma.$queryRawTyped(getArrivalsDb(fromDate, toDate))
    res.json(arrivals)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch arrivals' })
  }
}

export async function getAssetsForArrival(req: Request, res: Response) {
  const { arrivalNumber } = req.params
  try {
    const assets = await prisma.$queryRawTyped(getAssetsForArrivalDb(arrivalNumber))
    res.json(assets)
  } catch (error) {
    res.status(500).json({ error:  `Failed to fetch assets for arrival ${arrivalNumber}` })
  }
}
