const database = require("../config/DBConfig");

const createJob = async (jobData) => {
  const query = `INSERT INTO Job (addedBy, title, description, location, salaryFrom, salaryTo, expired) 
      VALUES (
        '${jobData.addedBy}', 
        '${jobData.title}',
        '${jobData.description}',
        '${jobData.location}',
        '${jobData.salaryFrom}',
        '${jobData.salaryTo}',
        '${jobData.expired}'
      )
    `;
  const job = await new Promise((resolve) => {
    database.query(query, (error, result) => {
      if (error) throw error;
      // id = result.insertId;
      resolve(result);
    });
  });
  return job;
};

module.exports = createJob;
