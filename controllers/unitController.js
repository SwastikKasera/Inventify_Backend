const unitModel = require("../models/UnitModel")

const addUnit = async (req,res)=>{
    const {unitName} = req.body
    try {
        if(!unitName){
            return res.status(400).json({
                message:"Fill unit name"
            })
        }
        const addedUnit = await unitModel.create({unitName})
        console.log(addedUnit)
        return res.status(201).json({
            message: "Unit added successfully"
        })
    } catch (error) {
        return res.status(501).json({
            message: "Error in saving unit in DB"
        })
    }
}

const fetchUnit = async (req,res)=>{
    try {
        const fetchedUnit = await unitModel.find();
        console.log(fetchedUnit)
        return res.status(201).json({
            message: "All item fetch from DB"
        })
    } catch (error) {
        return res.status(503).json({
            message: "Error in fetching Unit"
        })
    }
}

const updateUnit = async (req,res)=>{
    const {unitId} = req.params;
    try {
        const {unitName} = req.body;
        if(!unitName){
            return res.status(402).json({
                message: "Fill UnitName, it is blank"
            })
        }
        if(!unitId){
            return res.status(403).json({
                message: "UnitId not found"
            })
        }
        const updatedUnit = await unitModel.findByIdAndUpdate(unitId, {unitName}, {new:true});
        return res.status(200).json({
            message: "unit Updated",
            updatedUnit
        })
    } catch (error) {
        
    }
}

const deleteUnit = async (req,res)=>{
    const {unitId} = req.params
    try {
        if(!unitId){
            return res.status(400).json({
                message: "Unit Id Not Found"
            })
        }
        const deletedUnit = await unitModel.deleteOne({_id: unitId});
        if(!deletedUnit){
            return res.status(400).json({
                message: "Unit Not found"
            })
        }
        return res.status(200).json({
            message: "Unit Deleted Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in deleting Unit from DB",
            error: error
        })
    }
}

module.exports = {addUnit, fetchUnit, updateUnit, deleteUnit}