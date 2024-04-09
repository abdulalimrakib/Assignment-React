const database = require("../config/DBConfig");

const createJob = async (jobData) => {
  const query = `INSERT INTO Job (addedBy, title, description, location, tag) 
      VALUES (
        '${jobData.addedBy}', 
        '${jobData.title}',
        '${jobData.description}',
        '${jobData.location}',
        '${jobData.tag}'
      )
    `;
  const jid = await new Promise((resolve) => {
    database.query(query, (error, result) => {
      if (error) throw error;
      // id = result.insertId;
      resolve(result.insertId);
    });
  });
  return jid;
};

module.exports = createJob;
