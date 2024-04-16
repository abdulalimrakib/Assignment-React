const database = require("../config/DBConfig")

const findOneWithToken = async (token) => {
  const query = `SELECT * from Account
      WHERE token = '${token}'
    `;
  const user = await new Promise((resolve) => {
    database.query(query, (error, result) => {
      if (error) throw error;
      // id = result.insertId;
      resolve(result[0]);
    });
  });
  return user;
};

const verifyToken = async (req, res, next) => {
  const { token } = req?.cookies;
  if (!token) return res.json("You are not authenticated!");
  else {
    try {
      req.user = await findOneWithToken(token);
      next();
    } catch (error) {
      // Handle errors appropriately
      console.error(error);
      return res.status(500).json("Internal Server Error");
    }
  }
};


module.exports = {
  verifyToken,
};
