const express = require('express');
const { createItem, deleteItem, fetchItem, updateItem, searchItems, fetchItemById } = require('../controllers/itemController.js');
const auth = require('../middlewares/auth');
const itemRouter = express.Router();

itemRouter.post('/createItem',auth, createItem)
itemRouter.get('/getItem/:itemId',auth, fetchItem)
itemRouter.get('/search',auth, searchItems)
itemRouter.get('/get/:itemId',auth, fetchItemById)
itemRouter.put('/updateItem/:itemId',auth, updateItem)
itemRouter.delete('/deleteItem/:itemId', auth, deleteItem)

module.exports = itemRouter