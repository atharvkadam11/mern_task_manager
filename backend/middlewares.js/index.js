const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { ACCESS_TOKEN_SECRET } = process.env;


exports.verifyAccessToken = async (req, res, next) => {

  const cors = require('cors');  
  // app.use(cors());
  
  
  // const cors = require('cors');    
  // const corsOpts = {
  //     origin: '*',
  //     credentials: true,
  //     methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
  //     allowedHeaders: ['Content-Type'],
  //     exposedHeaders: ['Content-Type']
  // };
  // app.use(cors(corsOpts));

  const token = req.header("Authorization");
  if (!token) return res.status(400).json({ status: false, msg: "Token not found" });
  let user;
  try {
    user = jwt.verify(token, "Rj2S?RVe9[]8-dCS6A**&b5Tsg$gwbg~Bd{*QTK");
  }
  catch (err) {
    return res.status(401).json({ status: false, msg: "Invalid token" });
  }

  try {
    user = await User.findById(user.id);
    if (!user) {
      return res.status(401).json({ status: false, msg: "User not found" });
    }

    req.user = user;
    next();
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}