const database = require("../config/DBConfig");

const createUser = async (userData) => {
  const query = `INSERT INTO User (uid, name, mobile, role, address) 
      VALUES (
        '${userData.uid}',
        '${userData.name}', 
        '${userData.mobile}',
        '${userData.role}',
        '${userData.address}'
      )
    `;

  const success = await new Promise((resolve) => {
    database.query(query, (error) => {
      if (error) throw error;
      // id = result.insertId;
      resolve(true);
    });
  });
  return success;
};

module.exports = createUser;
