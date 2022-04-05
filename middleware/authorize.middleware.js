const jwt = require("jsonwebtoken");
const { UserModel } = require("../users.model");

exports.authorize = () => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || "";
      const token = authHeader.replace("Bearer ", "");
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findById(payload.uid);
      if (!user || !user.token || user.token !== token) {
        res.status(401).json({ message: "Not authorized" });
        return;
      }
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
    }
  };
};
