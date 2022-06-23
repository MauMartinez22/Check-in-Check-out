
const { Record } = require('../models/record.model');




const getAllRecord = async (req,res)=>{

    try {
        
        const records = await Record.findAll();

        res.status(200).json({
            status:'success',
            records
        });

    } catch (error) {
        console.log(error);
    }
};


const getRecordById = async (req,res)=>{
    
    const { id }=req.params

    
    const record = await Record.findOne({where:{ id }});

    
    if (!record) {
        return res.status(404).json({
            status:'error',
            message:'Record not found, please check credentials'
        });
        
    };

    res.status(200).json({
        status:'success',
        record
    });
};


const checkIn = async (req,res)=>{
    try {
        const { entranceTime, exitTime,status } = req.body
        const newCheckIn = await Record.create({
            entranceTime,
            exitTime,
            status
        });

        res.status(200).json({
            status:'success',
            newCheckIn,
            message:'Welcome!'
            
        });

        
    } catch (error) {
        console.log(error);
    };
};


const checkOut = async (req,res)=>{
    const { id } = req.params;
    const { exitTime } = req.body;

    const record = await Record.findOne({where : { id }});

    if (!record) {
        return res.status(404).json({
            status:'Error',
            message:'Record not found'
        });
    };

    await record.update({exitTime,status:'Out'});

    res.status(201).json({
        status:'success'
    });
};


const cancelRecord = async (req,res)=>{
    const {id}=req.params;

    const record = await Record.findOne({where : {id}});

    if (!record) {
        return res.status(404).json({
            status:'Error',
            message:'Record not found'
        });
    };

    await record.update({status:'cancelled'});

    res.status(201).json({
        status:"success"
    });

};

module.exports = {
    getAllRecord,
    getRecordById,
    checkIn,
    checkOut,
    cancelRecord
};