import express from 'express'
import { getCars, getSingleCar } from '../controllers/carController.js'

const router = express.Router()

router.route('/get-cars').get(getCars)
router.route('/get-single-car/:id').get(getSingleCar)

export default router