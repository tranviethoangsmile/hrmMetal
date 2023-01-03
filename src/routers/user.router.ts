import express, { Request, Response, NextFunction, Router } from 'express';
const userRouters: Router = express.Router();

userRouters.get('/', (req, res) => {
    res.send('users!');
});

// userRouters.post('/', (req, res) => {
//     res.send('users post!');
// });

// userRouters.put('/', (req, res) => {
//     res.send('users!');
// });

// userRouters.delete('/', (req, res) => {
//     res.send('users!');
// });

export default userRouters;