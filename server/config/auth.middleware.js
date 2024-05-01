const jwt = require("jsonwebtoken");

const JwtUtil = {
  generateToken(user) {
    // console.log(user, "user???");
    const exp = Math.floor(Date.now() / 1000) + 5 * 60 * 60;
    const token = jwt.sign(
      { user, exp },
      Buffer.from(process.env.JWT_SECRET, "base64")
    );
    console.log(token, "token");
    return token;
  },
  verifyToken(token) {
    return jwt.verify(token, Buffer.from(process.env.JWT_SECRET, "base64"));
  },
};

const getTokenFromHeader = (token) => {
  if (
    (token && token.split(" ")[0] === "Token") ||
    (token && token.split(" ")[0] === "Bearer")
  ) {
    return token.split(" ")[1];
  }
  return null;
};

const authMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = getTokenFromHeader(authorization);
  try {
    // console.log(token, "token?");
    let parsedData = JwtUtil.verifyToken(token);
    console.log(parsedData.user.username, "parsedData?");
    req.user = parsedData.user;
    req.token = token;
    // const isValidToken = await UserModel.exists({
    //   username: parsedData.user.username,
    // });
    // console.log(isValidToken, "isValidToken?");
    next();
    // if (isValidToken) {
      
    // } else {
    //   let errorObj = new Error();
    //   errorObj.status = 400;
    //   errorObj.name = "UnauthorizedError";
    //   errorObj.message = "Invalid token";
    //   throw errorObj;
    // }
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = { authMiddleware, JwtUtil, getTokenFromHeader };
