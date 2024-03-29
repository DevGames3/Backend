const { verifyToken } = require("../utils/token");

const validateToken = (req, res, next) => {
  const {token} = req.body;

  console.log(req.body)

  if (!token) return res.sendStatus(401);

  const user = verifyToken(token);

  if (!user) return res.sendStatus(401);

  req.user = user;

  next();
};

module.exports = { validateToken };
