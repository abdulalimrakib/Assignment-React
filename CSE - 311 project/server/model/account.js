const database = require("../config/DBConfig")

const createAccount = (accountData) => {
  const query = `INSERT INTO Account (email, password, token) 
      VALUES (
        '${accountData.email}', 
        '${accountData.password}',
        '${accountData.token}'
        )
    `;
  const uid = new Promise((resolve) => {
    database.query(query, (error, result) => {
      if (error) throw error;
      // id = result.insertId;
      resolve(result.insertId);
    });
  });
  return uid;
};

module.exports = createAccount;
