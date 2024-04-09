const database = require("../config/DBConfig");

const createRecruiter = async (recruiterData) => {
  const query = `INSERT INTO Recruiter (uid, position, status, company) 
      VALUES (
        '${recruiterData.uid}', 
        '${recruiterData.position}',
        '${recruiterData.status}',
        '${recruiterData.company}'
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

module.exports = createRecruiter
