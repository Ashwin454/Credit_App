const Verifier= require("../models/verifierModel");
const loan= require("../models/loanModel");

exports.getVerifierLoans = async (req, res) => {
    try {
        const { _id } = req.user;

        const verifier = await Verifier.findOne({user: _id})
            .populate({
                path: 'pendingList',
                populate: {
                    path: 'applicant', // Populate applicant details
                    select: 'name email' // Only fetch name and email of applicant
                }
            })
            .populate({
                path: 'loanList',
                populate: {
                    path: 'applicant', // Populate applicant details
                    select: 'name email' // Only fetch name and email of applicant
                }
            });

        if (!verifier) {
            return res.status(404).json({
                success: false,
                message: 'Verifier not found'
            });
        }

        return res.status(200).json({
            success: true,
            pendingList: verifier.pendingList,
            loanList: verifier.loanList
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `An error occurred: ${error.message}`
        });
    }
};

exports.updateVerStatus = async (req, res, next) => {
    try {
        const { loanId, verificationStatus } = req.body;

        const validStatuses = ['verified', 'not_verified', 'pending'];
        if (!validStatuses.includes(verificationStatus)) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification status provided."
            });
        }

        const loan1 = await loan.findById(loanId);

        if (!loan1) {
            return res.status(404).json({
                success: false,
                message: "Loan not found."
            });
        }

        loan1.verificationStatus = verificationStatus;
        
        await loan1.save();

        return res.status(200).json({
            success: true,
            message: "Loan verification status updated successfully.",
            loan1
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Some error occurred: ${error.message}`
        });
    }
};


