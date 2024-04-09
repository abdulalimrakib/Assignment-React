const database = require("../config/DBConfig");

const findUserById = async (uid) => {
  console.log(uid);
  const query = `SELECT * FROM User
    WHERE uid = '${uid}'`;
  const expectedDataById = await new Promise((resolve) => {
    database.query(query, (error, result) => {
      if (error) throw error;
      // id = result.insertId;
      resolve(result[0]);
    });
  });
  return expectedDataById;
};

module.exports = { findUserById };
