const User = require("../models/user")
module.exports = async (req, res, next) => {
  try {
    const {userId} = req;
    const userDoc = await User.findById(userId).select("userType");
    if(userDoc.role !== "instructor"){
      throw new Error("Unauthorized admin.")
    }
    req.userId = userId;
    next();
  } catch (error) {
    return res.status("401").json({
      isSuccess: false,
      message: error.message,
    });
  }
};
