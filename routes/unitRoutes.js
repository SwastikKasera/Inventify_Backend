const express = require("express");
const unitRouter = express.Router();
const { addUnit, fetchUnit, updateUnit, deleteUnit } = require("../controllers/unitController");

unitRouter.post('/createUnit', addUnit);
unitRouter.get('/fetchUnit', fetchUnit);
unitRouter.put('/updateUnit/:unitId', updateUnit)
unitRouter.delete('/deleteUnit/:unitId', deleteUnit)

module.exports = unitRouter