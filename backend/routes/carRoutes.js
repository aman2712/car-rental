import express from 'express'
import { getCars, getSingleCar, getUserBookings, reserveCar, addCar, deleteCar, getAllBookings } from '../controllers/carController.js'
import checkToken, { admin } from '../middlewares/checkToken.js'

const router = express.Router()

router.route('/get-cars').get(getCars)
router.route('/get-single-car/:id').get(getSingleCar)
router.route('/reserve').post(checkToken, reserveCar)
router.route('/get-bookings/:id').get(checkToken, getUserBookings)
router.route('/get-all-bookings').get(checkToken, admin, getAllBookings)
router.route('/add-car').post(checkToken, admin, addCar)
router.route('/delete-car/:id').delete(checkToken, admin, deleteCar)

export default router