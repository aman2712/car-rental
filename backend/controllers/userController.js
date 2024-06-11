import pool from '../utils/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// ROUTE: /api/register
// METHOD: POST
// SECURED: FALSE
// DESC: to register a user
export const registerUser = (req, res) => {
    const { name, email, password } = req.body

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash], (error, results) => {
        if(error){
            return res.status(500).json({message: error.sqlMessage})
        }
        const token = jwt.sign({name, email}, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })
    
        return res.status(200).json({name, email, token})
    })
}

// ROUTE: /api/login
// METHOD: POST
// SECURED: FALSE
// DESC: to login a user
export const loginUser = (req, res) => {
    const { email, password } = req.body

    pool.query(`SELECT * FROM users WHERE email = '${email}'`, (error, results) => {
        if(error){
            return res.status(500).json({message: 'Internal Server Error'})
        }
        if(results.length !== 1){
            return res.status(404).json({message: 'No such user found'})

        }
        const correctPassword = bcrypt.compareSync(password, results[0].password)
        if(correctPassword){
            const token = jwt.sign({name: results[0].name, email}, process.env.JWT_SECRET, {
                expiresIn: '30d'
            })
            return res.status(200).json({id: results[0].id, name: results[0].name, email, token})
        }else{
            return res.status(401).json({message: 'Incorrect pasword!'})
        }
    })
}