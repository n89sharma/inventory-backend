import express from 'express'
import { getAssetsForHold, getHolds } from '../controllers/holdController.js'
import { validateDateRange } from '../middleware/validation.js'

const router = express.Router()

router.get('/', validateDateRange, getHolds)
router.get('/:holdNumber', getAssetsForHold)

export default router