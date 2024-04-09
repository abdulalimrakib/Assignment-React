const database = require("../config/DBConfig")

const createApplication = async (applicationData) => {
  const query = `INSERT INTO Application (jid, uid, status, message) 
      VALUES (
        '${applicationData.jid}', 
        '${applicationData.uid}',
        '${applicationData.status}',
        '${applicationData.message}'
      )
    `;

  const applicationId = await new Promise((resolve) => {
    database.query(query, (error, result) => {
      if (error) throw error;
      // id = result.insertId;
      resolve(result.insertId);
    });
  });
  return applicationId;
};

module.exports = createApplication