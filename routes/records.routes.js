const express = require('express');

const recordRouter = express.Router();


const {
    getAllRecord,
    getRecordById,
    checkIn,
    checkOut,
    cancelRecord

} = require('../controllers/records.controller');


recordRouter.get('/',getAllRecord);
recordRouter.get('/:id',getRecordById);
recordRouter.post('/',checkIn);
recordRouter.patch('/:id',checkOut);
recordRouter.delete('/:id',cancelRecord);

module.exports = {
    recordRouter
};