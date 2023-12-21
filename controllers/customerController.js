const CustomerModel = require('../models/CustomerModel');

const createCustomer = async (req, res) => {
  const companyId = req.user.companyId;
  const { customerName, customerAddress,customerEmail, customerMobile, customerGSTIN } = req.body;

  try {
    if (!customerName || !customerAddress || !customerEmail || !customerMobile || !customerGSTIN) {
      return res.status(400).json({
        message: "Fill all customer details"
      });
    }

    const createdCustomer = await CustomerModel.create({ companyId, customerName, customerAddress,customerEmail, customerMobile, customerGSTIN });

    if (!createdCustomer) {
      return res.status(401).json({
        message: "Customer not created"
      });
    }

    return res.status(201).json({
      message: "Customer created successfully"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in creating customer",
      error: error.message
    });
  }
};

const fetchCustomer = async (req, res) => {
  const companyId = req.user.companyId;

  try {
    const fetchedCustomer = await CustomerModel.find({ companyId });

    if (!fetchedCustomer || fetchedCustomer.length === 0) {
      return res.status(402).json({
        message: "Fetched Customer not found"
      });
    }

    return res.status(200).json({
      message: "Customer data fetched successfully",
      f_data: fetchedCustomer
    });
  } catch (error) {
    return res.status(501).json({
      message: "Error in fetching CUSTOMER"
    });
  }
};

const fetchOneCustomer = async (req,res)=>{
  const customerId = req.params.customerId
  try {
    const fetchedOneCustomer = await CustomerModel.find({_id: customerId});
    if(!fetchedOneCustomer){
      return res.status(400).json({
        message: "Customer not found"
      })
    }
    return res.status(200).json({
      message: "Customer Found",
      info: fetchedOneCustomer
    })
  } catch (error) {
    return res.status(501).json({
      message: "Error in fetching one customer"
    });
  }
}

const updateCustomer = async (req, res) => {
  const { customerName, customerAddress, customerMobile, customerGSTIN } = req.body;
  const customerId = req.params.customerId;

  try {
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      { _id: customerId },
      { customerName, customerAddress, customerMobile, customerGSTIN },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(400).json({
        message: "Customer Not Updated"
      });
    }

    return res.status(201).json({
      message: "Customer Updated Successfully",
      updatedCustomer
    });
  } catch (error) {
    return res.status(501).json({
      message: "Error in updating customer",
      error: error.message
    });
  }
};

const deleteCustomer = async (req, res) => {
  const customerId = req.params.customerId;

  try {
    const deletedCustomer = await CustomerModel.deleteOne({ _id: customerId });

    if (!deletedCustomer) {
      return res.status(400).json({
        message: "Customer not deleted"
      });
    }

    return res.status(200).json({
      message: "Customer deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in deleting customer"
    });
  }
};
const searchCustomer = async (req, res) => {
  const companyId = req.user.companyId;
  const searchQuery = req.query.search; // Get the search query from request

  try {
    const fetchedCustomer = await CustomerModel.find({
      companyId,
      customerName: { $regex: searchQuery, $options: 'i' }, // Case-insensitive search
    });

    if (!fetchedCustomer || fetchedCustomer.length === 0) {
      return res.status(402).json({
        message: "Fetched Customer not found"
      });
    }

    return res.status(200).json({
      message: "Customer data fetched successfully",
      f_data: fetchedCustomer
    });
  } catch (error) {
    return res.status(501).json({
      message: "Error in fetching CUSTOMER"
    });
  }
};



module.exports = { createCustomer, fetchCustomer,fetchOneCustomer, updateCustomer, deleteCustomer, searchCustomer };