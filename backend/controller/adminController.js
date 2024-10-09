const user = require("../models/userModels"); 
const Verifier = require("../models/verifierModel");
const loan=require("../models/loanModel")
exports.createVerifier = async (req, res, next) => {
    try {
        const {userId} =req.body;
        const user1 = await user.findById(userId);
        
        if (!user1) {
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        if(user1.role === 1){
            return res.status(300).json({
                success:false,
                message:"User already a verifier"
            })
        }
        user1.role = 1;

        await user1.save();
        const newVerifier = new Verifier({
            user: userId,
            loanList: [],       
            pendingList: [],    
            assignedCases: [],  
        });

        await newVerifier.save(); 

        return res.status(201).json({ succcess:true, message: "User added as verifier successfully." });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Error creating verifier: ${error}`
        })
    }
};


exports.getAllLoans = async (req, res, next) => {
    try {
        const loans = await loan.find()
            .populate('applicant', 'name email')
            .populate({
                path: 'verifier',
                populate: {
                    path: 'user',
                    select: 'name email'
                }
            });

        return res.status(200).json({
            success: true,
            loans
        });
    } catch (error) {
        console.error('Error fetching loans:', error);

        return res.status(500).json({
            success: false,
            message: 'Server error while fetching loans',
            error: error.message,
        });
    }
};
exports.getAllUsers = async (req, res, next) =>{
    try{
        const users=await user.find();
        return res.status(200).json({
            success:true,
            users
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching users',
            error: error.message,
        });
    }
}