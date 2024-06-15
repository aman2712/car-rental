import jwt from 'jsonwebtoken'
import pool from '../utils/db.js'

const checkToken = (req, res, next) => {
    let token = req.get('Authorization')

    if(token){
        try {
            token = token.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            pool.query(`SELECT * FROM users WHERE id = '${decoded.id}'`, (error, results) => {
                if(error){
                    console.log(error);
                    res.status(401).json({message: error.sqlMessage})
                }else{
                    if(results.length === 1){
                        req.user = results[0]
                        next()
                    }
                }
            })

        } catch (error) {
            console.log(error);
            res.status(401).json({message: 'Not authorized, token failed!'})
        }
    }else{
        res.status(401).json({message: 'Not authorized, no token!'})
    }
}

export const admin = (req, res, next) => {
    if (req.user && req.user.admin === 1) {
      next()
    } else {
      res.status(401).json({message: 'Not authorized as admin'})
    }
  }
  

export default checkToken