import express from 'express'
import { createArrival, getArrivals, getAssetsForArrival } from '../controllers/arrivalController.js'
import { DateRangeWithWarehouseSchema, validateQuery } from '../middleware/validation.js'

const router = express.Router()

router.get('/', validateQuery(DateRangeWithWarehouseSchema), getArrivals)
router.post('/', createArrival)
router.get('/:arrivalNumber', getAssetsForArrival)

export default router