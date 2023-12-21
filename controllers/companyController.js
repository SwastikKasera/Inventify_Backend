const CompanyModel = require('../models/CompanyModel');
const bcrypt = require('bcrypt')

const createCompany = async (req,res)=>{
    const {companyName,companyAddress,companyState,companyPincode, companyPan, companyGSTIN,companyMobile,companyEmail,companyBankName, companyBankAddress,companyBankAccount,companyBankIFSC, companyPassword, companyMark} = req.body;

    try {
        if(!companyName || !companyAddress || !companyState || !companyPincode || !companyPan || !companyGSTIN || !companyMobile || !companyEmail || !companyBankName || !companyBankAddress || !companyBankAccount || !companyBankIFSC || !companyPassword || !companyMark){
            return res.status(400).json({
                message: "Fill all company details",
            })
        }
        const companyExist = await CompanyModel.findOne({ companyEmail: companyEmail.toLowerCase() });
        if(companyExist){
            return res.status(400).json({
                message: "Company Email already Exist"
            })
        }
        const hashedPassword = await bcrypt.hash(companyPassword, 10);
        const createdCompany = await CompanyModel.create({companyName,companyAddress,companyState,companyPincode,companyPan,companyGSTIN,companyMobile,companyEmail,companyBankName, companyBankAddress,companyBankAccount,companyBankIFSC, companyPassword: hashedPassword, companyMark})
        return res.status(201).json({
            message: "Company Added successfully",
            c_data: createdCompany
        })
    } catch (error) {
        return res.status(500).json({
            message: "error in creating company",
            error: error.message
        })
    }
}

const fetchCompany = async (req,res)=>{
    const companyId = req.params.companyId

    try {
        const companyData = await CompanyModel.find({_id: companyId})
        if(!companyData){
            return res.status(400).json({
                message: "Company Not Found"
            })
        }
        return res.status(200).json({
            message: "Company Data Fetched",
            info: companyData
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in fetching Company Data"
        })
    }
    
}

module.exports = {createCompany, fetchCompany}