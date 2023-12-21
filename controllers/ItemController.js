const Items = require("../models/ItemModel");

const createItem = async (req, res) => {
  const {itemName, itemHSNcode, itemTax, itemCGST, itemSGST} = req.body;

  try {
    // Create a new item using the Items model
    const newItem = await Items.create({
      companyId: req.user.companyId,
      itemName,
      itemHSNcode,
      itemTax,
      itemCGST,
      itemSGST,
    });

    res.status(201).json({
      message: "Item created successfully",
      item: newItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the item",
      error: error.message,
    });
    console.log(error.message);
  }
};

const fetchItem = async (req, res) => {
  const companyId = req.params.itemId;
  try {
    const fetchedItem = await Items.find({companyId: companyId});
    if (!fetchedItem) {
      return res.status(401).json({
        message: "Item Not found",
      });
    }
    return res.status(201).json({
      message: "All item fetch from DB",
      fetchedItem,
    });
  } catch (error) {
    return res.status(503).json({
      message: "Error in fetching Item",
    });
  }
};

const fetchItemById = async (req,res)=>{
  const itemId = req.params.itemId
  try {
    const item = await Items.find({_id: itemId})
  if(!item){
    return res.status(400).json({
      message: "Item not found"
    })
  }
  return res.status(200).json({
    message: "Item found when search by id",
    info: item
  })
  } catch (error) {
    return res.status(500).json({
      message: 'Error in searching items by id',
      error: error.message,
    });
  }

}

const searchItems = async (req, res) => {
  const searchQuery = req.query.search;

  try {
    const foundItems = await Items.find({
      itemName: { $regex: searchQuery, $options: 'i' }, // Case-insensitive search
    }) // Adjust the fields you want to return

    return res.status(200).json({
      message: 'Items found successfully',
      f_data: foundItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error in searching items',
      error: error.message,
    });
  }
};


const updateItem = async (req, res) => {
  const {itemName, itemHSNcode, itemTax} = req.body;

  try {
    if (!itemName || !itemHSNcode || !itemTax) {
      return res.status(400).json({
        message: "Fill all fields to edit item",
      });
    }

    const {itemId} = req.params;

    const editedItem = await Items.findByIdAndUpdate(itemId, {itemName, itemHSNcode, itemTax}, {new: true});

    if (!editedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    console.log("Edited item:\n", editedItem);
    return res.status(200).json({
      message: "Item Updated",
      updatedItem: editedItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating item in DB",
    });
  }
};

const deleteItem = async (req, res) => {
  const itemId = req.params.itemId; // Get the itemId from the route parameter

  try {
    // Find the item by ID and the associated company's ID
    const deletedItem = await Items.findOneAndDelete({
      _id: itemId,
      companyId: req.user.companyId,
    });

    if (!deletedItem) {
      return res.status(404).json({message: "Item not found or access denied"});
    }

    res.status(200).json({message: "Item deleted successfully", item: deletedItem});
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the item",
      error: error.message,
    });
  }
};

module.exports = {createItem, fetchItem,searchItems,fetchItemById, updateItem, deleteItem};
