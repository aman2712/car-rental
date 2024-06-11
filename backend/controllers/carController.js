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
        res.status(200).json(results)
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