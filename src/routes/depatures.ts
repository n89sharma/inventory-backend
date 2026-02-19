import express from 'express'
import { getAssetsForDeparture, getDepartures } from '../controllers/departureController.js'
import { validateDateRange } from '../middleware/validation.js'

const router = express.Router()

router.get('/', validateDateRange, getDepartures)
router.get('/:departureNumber', getAssetsForDeparture)

export default router