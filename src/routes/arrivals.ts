import express from 'express'
import { getArrivals, getAssetsForArrival } from '../controllers/arrivalController.js'
import { validateBarcode, validateDateRange } from '../middleware/validation.js'

const router = express.Router()

router.get('/', validateDateRange, getArrivals)
router.get('/:arrivalNumber', getAssetsForArrival)

export default router