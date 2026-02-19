import express from 'express'
import { getAssetsForTransfer, getTransfers } from '../controllers/transferController.js'
import { validateDateRange } from '../middleware/validation.js'

const router = express.Router()

router.get('/', validateDateRange, getTransfers)
router.get('/:transferNumber', getAssetsForTransfer)

export default router