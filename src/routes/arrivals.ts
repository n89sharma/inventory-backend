import express from 'express'
import { createArrival, getArrivals, getAssetsForArrival, getArrivalForEdit, updateArrival } from '../controllers/arrivalController.js'
import { DateRangeWithWarehouseSchema, validateQuery } from '../middleware/validation.js'

const router = express.Router()

router.get('/', validateQuery(DateRangeWithWarehouseSchema), getArrivals)
router.post('/', createArrival)
router.get('/:arrivalNumber/edit', getArrivalForEdit)
router.get('/:arrivalNumber', getAssetsForArrival)
router.put('/:arrivalNumber', updateArrival)

export default router