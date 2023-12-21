const SaleModel = require('../models/SaleModel')
const CompanyModel = require('../models/CompanyModel')
const dateFormat = require('date-format')


const createSale = async (req, res) => {
  const companyId = req.user.companyId; // Assuming companyId is obtained from authentication
  const { customerId, paymentMode, saleItemList, saleGrossAmount, totalSaledItem, saleCGSTAmount, saleSGSTAmount, saleNetAmount } = req.body;

  try {
    // Find the company to get the current sale number
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Increment the sale number and update the company
    company.saleNumber += 1;
    
    // Generate sale bill ID
    const year = dateFormat('yyyy', new Date());
    const saleBillId = `${company.companyMark}/${year}/${company.saleNumber}`;
    
    const createdSale = await SaleModel.create({
      companyId,
      customerId,
      paymentMode,
      saleBillId,
      saleItemList,
      totalSaledItem,
      saleGrossAmount,
      saleCGSTAmount,
      saleSGSTAmount,
      saleNetAmount,
    });
    
    await company.save();
    console.log("Sale added");
    return res.status(201).json({
      message: 'sale created successfully',
      sale: createdSale,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error in creating sale',
      error: error.message,
    });
  }
};

const fetchSale = async (req,res)=>{
  const companyId = req.params.companyId
  try {
      const fetchedSale = await SaleModel.find({companyId});
      if(!fetchedSale){
          return res.status(401).json({
              message: "sale not fetched",
            })
          }
        return res.status(201).json({
          message: "All sale fetch",
          info: fetchedSale
      })
  } catch (error) {
      return res.status(500).json({
          message: "Error in fetching sale"
      })
  }
}

const fetchOneSale = async(req,res)=>{
  
  const saleId = req.params.saleId
  try {
    const oneSaledData = await SaleModel.find({_id: saleId})
    if(oneSaledData){
      return res.status(200).json({
        message: "sale Fetched",
        info: oneSaledData
      })
    }else{
      return res.status(400).json({
        message: "Unable to fetch one sale"
      })
    }
  } catch (error) {
    return res.status.json({
      message: "Error in fetching one saled data"
    })
  }
}


const deleteSale = async (req,res)=>{
  const saleId = req.params.saleId
  try {
    const deletedData = await SaleModel.deleteOne({_id: saleId})
    if(!deletedData){
      return res.status(400).json({
        message: "sale Not Deleted"
      })
    }
    return res.status(200).json({
      message: "sale Deleted Success"
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error in deleting sale"
    })
  }
}

module.exports = { createSale, fetchSale, fetchOneSale, deleteSale };