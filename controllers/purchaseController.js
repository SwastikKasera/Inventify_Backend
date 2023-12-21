const PurchaseModel = require('../models/PurchaseModel');
const CompanyModel = require('../models/CompanyModel')
const dateFormat = require('date-format')


const createPurchase = async (req, res) => {
  const companyId = req.user.companyId; // Assuming companyId is obtained from authentication
  const { customerId, paymentMode,materialRecieveDate, purchaseItemList, purchaseGrossAmount, totalPurchasedItem, purchaseCGSTAmount, purchaseSGSTAmount, purchaseNetAmount } = req.body;

  try {
    // Find the company to get the current purchase number
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Increment the purchase number and update the company
    company.purchaseNumber += 1;
    
    // Generate purchase bill ID
    const year = dateFormat('yyyy', new Date());
    const purchaseBillId = `${company.companyMark}/${year}/${company.purchaseNumber}`;
    
    const createdPurchase = await PurchaseModel.create({
      companyId,
      customerId,
      paymentMode,
      purchaseBillId,
      purchaseItemList,
      totalPurchasedItem,
      materialRecieveDate,
      purchaseGrossAmount,
      purchaseCGSTAmount,
      purchaseSGSTAmount,
      purchaseNetAmount,
    });
    
    await company.save();
    return res.status(201).json({
      message: 'Purchase created successfully',
      purchase: createdPurchase,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error in creating purchase',
      error: error.message,
    });
  }
};

const fetchPurchase = async (req,res)=>{
  const companyId = req.params.companyId
  try {
      const fetchedPurchase = await PurchaseModel.find({companyId});
      if(!fetchedPurchase){
          return res.status(401).json({
              message: "Purchase not fetched",
            })
          }
        return res.status(201).json({
          message: "All purchase fetch",
          info: fetchedPurchase
      })
  } catch (error) {
      return res.status(500).json({
          message: "Error in fetching purchase"
      })
  }
}

const fetchOnePurchase = async(req,res)=>{
  
  const purchaseId = req.params.purchaseId
  try {
    const onePurchasedData = await PurchaseModel.find({_id: purchaseId})
    if(onePurchasedData){
      return res.status(200).json({
        message: "Purchase Fetched",
        info: onePurchasedData
      })
    }else{
      return res.status(400).json({
        message: "Unable to fetch one purchase"
      })
    }
  } catch (error) {
    return res.status.json({
      message: "Error in fetching one purchased data"
    })
  }
}


const deletePurchase = async (req,res)=>{
  const purchaseId = req.params.purchaseId
  try {
    const deletedData = await PurchaseModel.deleteOne({_id: purchaseId})
    if(!deletedData){
      return res.status(400).json({
        message: "Purchase Not Deleted"
      })
    }
    return res.status(200).json({
      message: "Purchase Deleted Success"
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error in deleting purchase"
    })
  }
}

module.exports = { createPurchase, fetchPurchase, fetchOnePurchase, deletePurchase };