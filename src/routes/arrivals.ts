import express from 'express'
import { createArrival, getArrivals, getAssetsForArrival } from '../controllers/arrivalController.js'
import { validateDateRange } from '../middleware/validation.js'

const router = express.Router()

router.get('/', validateDateRange, getArrivals)
router.post('/', createArrival)
router.get('/:arrivalNumber', getAssetsForArrival)

export default router