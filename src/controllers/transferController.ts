import { Request, Response } from 'express'
import { getTransfers as getTransfersDb, getAssetsForTransfers as getAssetsForTransfersDb} from '../../generated/prisma/sql.js'
import { prisma } from '../prisma.js'

export async function getTransfers(req: Request, res: Response) {
  try {
    const { fromDate, toDate } = res.locals.parsedDates 
    const transfers = await prisma.$queryRawTyped(getTransfersDb(fromDate, toDate))
    res.json(transfers)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transfers' })
  }
}

export async function getAssetsForTransfer(req: Request, res: Response) {
  const { transferNumber } = req.params
  try {
    const assets = await prisma.$queryRawTyped(getAssetsForTransfersDb(transferNumber))
    res.json(assets)
  } catch (error) {
    res.status(500).json({ error:  `Failed to fetch assets for transfer ${transferNumber}` })
  }
}