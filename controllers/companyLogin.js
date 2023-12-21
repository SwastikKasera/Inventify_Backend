const CompanyModel = require('../models/CompanyModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const companyLogin = async (req, res) => {
  const { companyEmail, companyPassword } = req.body;

  try {
    const company = await CompanyModel.findOne({ companyEmail });

    if (!company) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(companyPassword, company.companyPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Wrong Password' });
    }

    const token = jwt.sign({ companyId: company._id, role: company.role }, process.env.TOKEN_SECRET, {
      expiresIn: '2h',
    });

    console.log(token)
    return res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

const companySignup = async(req,res)=>{
    const {companyName,companyAddress,companyPassword, companyState,companyPincode,companyPan,companyGSTIN,companyMobile,companyEmail,companyBankName,companyBankAddress,companyBankAccount,companyBankIFSC,companyMark} = req.body
    const hashedPassword = await bcrypt.hash(companyPassword, 10)
    try {
      const resp = await CompanyModel.create({companyName,companyAddress,companyPassword: hashedPassword ,companyState,companyPincode,companyPan,companyGSTIN,companyMobile,companyEmail,companyBankName,companyBankAddress,companyBankAccount,companyBankIFSC,companyMark})
      if(resp){
        return res.status(200).json({
          message: "Company Registered Success"
        })
      }
      return res.status(400).json({
        message: "Fail to Register Company"
      })
    } catch (error) {
      return res.status(500).json({
        message: "Error in registering company"
      })
    }
}

module.exports = { companyLogin, companySignup };
