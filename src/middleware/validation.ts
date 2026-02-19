import { isAfter } from 'date-fns'
import { Request, Response, NextFunction } from 'express'

export function validateBarcode(req: Request, res: Response, next: NextFunction) {
  const barcode = req.body.barcode || req.params.barcode || req.query.barcode
  
  if (!barcode) {
    return res.status(400).json({ error: 'Barcode is required' })
  }
  
  if (!/^[A-Z]{3}-[A-Z]{2}-\d{6}$/.test(barcode)) {
    return res.status(400).json({ error: 'Invalid barcode format' })
  }
  
  next()
}

export function validateDateRange(req: Request, res: Response, next: NextFunction) {
  if (!req.query.fromDate) {
    return res.status(400).json({ error: "fromDate not provided" })
  }

  const fromDate = new Date(String(req.query.fromDate))
  const toDate = req.query.toDate ? new Date(String(req.query.toDate)) : new Date()
  
  if (isAfter(fromDate, toDate)) {
    return res.status(400).json({ error: "fromDate must be before toDate" })
  }

  res.locals.parsedDates = {
    fromDate: fromDate,
    toDate: toDate
  }
  
  next()
}