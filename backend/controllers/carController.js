import pool from '../utils/db.js'

// ROUTE: /api/get-cars
// METHOD: GET
// SECURED: FALSE
// DESC: to get fleet of all cars available
export const getCars = (req, res) => {
    pool.query('SELECT * FROM cars', (error, results) => {
        if(error){
            return res.status(500).json({message: 'Internal Server Error'})
        }
        return res.status(200).json(results)
    })
}

// ROUTE: /api/get-single-car
// METHOD: GET
// SECURED: FALSE
// DESC: to get a single car
export const getSingleCar = (req, res) => {
    const id = req.params.id
    pool.query(`SELECT * FROM cars WHERE id = ${id}`, (error, results) => {
        if(error){
            return res.status(500).json({message: 'Internal Server Error'})
        }
        if(results.length !== 1){
            return res.status(404).json({message: 'No car found'})
        }
        return res.status(200).json(results[0])
    })
}

// ROUTE: /api/car/reserve
// METHOD: POST
// SECURED: TRUE
// DESC: to reserve a booking
export const reserveCar = (req, res) => {
    const { car_id, user_id, name, email, phone, pickup, dropoff, start_date, end_date, preferences } = req.body
    pool.query(`SELECT * FROM reservations WHERE ('${start_date}' < end_date) AND ('${end_date}' > start_date) AND car_id = '${car_id}'`, (error, results) => {
        if(error){
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
        if(results.length > 0){
            return res.status(400).json({message: 'Car not available in specified duration'})
        }else{
            pool.query('INSERT INTO reservations (car_id, user_id, name, email, phone, pickup, dropoff, start_date, end_date, preferences) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [car_id, user_id, name, email, phone, pickup, dropoff, start_date, end_date, preferences], (error, results) => {
                if(error){
                    console.log(error);
                    return res.status(500).json({message: error.sqlMessage})
                }
                return res.status(200).json({message: 'Reservation made'})
            })
        }
    })
}

// ROUTE: /api/car/get-bookings/:id
// METHOD: GET
// SECURED: TRUE
// DESC: to get all bookings of specific user
export const getUserBookings = (req, res) => {
    const id = req.params.id
    pool.query(`SELECT * FROM reservations LEFT JOIN cars ON reservations.car_id = cars.id WHERE user_id = ${id}`, (error, results) => {
        if(error){
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
        return res.status(200).json(results)
    })
}

// ROUTE: /api/car/get-all-bookings
// METHOD: GET
// SECURED: TRUE | ADMIN
// DESC: to get all bookings
export const getAllBookings = (req, res) => {
    pool.query(`SELECT * FROM reservations LEFT JOIN cars ON reservations.car_id = cars.id`, (error, results) => {
        if(error){
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
        return res.status(200).json(results)
    })
}

// ROUTE: /api/car/delete-car/:id
// METHOD: DELETE
// SECURED: TRUE | ADMIN
// DESC: to delete a car
export const deleteCar = (req, res) => {
    const id = req.params.id
    pool.query(`DELETE FROM cars WHERE id = '${id}'`, (error, results) => {
        if(error){
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }
        return res.status(200).json({message: 'OK'})
    })
}

// ROUTE: /api/car/add-car
// METHOD: POST
// SECURED: TRUE | ADMIN
// DESC: to add a car
export const addCar = (req, res) => {
    const { title, image, type, rating, price, transmission, seats, fuel } = req.body
    pool.query('INSERT INTO cars(title, image, type, rating, price, transmission, seats, fuel) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [title, image, type, rating, price, transmission, seats, fuel], (error, results) => {
        if(error){
            return res.status(500).json({message: error.sqlMessage})
        }
        return res.status(200).json({message: 'Added successfully'})
    })
}