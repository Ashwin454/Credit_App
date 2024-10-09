const jwt = require("jsonwebtoken");
const user = require("../models/userModels.js");
exports.isAuthenticated = async (req, res, next) => {
    try {
       const token = req.cookies.token;
       if(token=="j:null"){
            return res.status(401).json({
                success:false,
                message:"Not logged in currently"
            })
       }
       const decodedData= jwt.verify(token, process.env.JWT_SECRET);
       const user1=await user.findOne({email: decodedData.email})
       if(!user1){
        return res.status(401).json({
            success:false,
            message:"Not logged in currently"
        })
       }
       req.user=user1;
       next(); 
    } catch (error) {
       res.status(500).json({
          success: false,
          message: `Internal server errorrrrrr: ${error}`,
       });
    }
 };

 exports.isAdmin = async(req, res, next)=>{
   try{
         const userId = req.user._id; 
         const user1 = await user.findById(userId);
             
         if (!user1) {
            return res.status(404).json({success: false, message: "User not found." });
         }
     
         if (user1.role !== 2) { 
            return res.status(403).json({success: false, message: "Access denied. Admins only." });
         }

         next(); 
      } catch (error) {
         res.status(500).json({ message: `Internal server error: ${error}` });
      }
 }

 exports.isVerifier = async (req, res, next) => {
   try {
       const userId = req.user._id; 
       const user1 = await user.findById(userId);
       
       if (!user1) {
           return res.status(404).json({success:false,  message: "User not found." });
       }

       if (user1.role !== 1) { 
           return res.status(403).json({success:false, message: "Access denied. Verifiers only." });
       }

       next(); 
   } catch (error) {
       res.status(500).json({success:false, message: `Internal server error: ${error}` });
   }
};

