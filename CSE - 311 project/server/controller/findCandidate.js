const database = require("../config/DBConfig")

const findCandidateByUid = async (uid) => {
  const query = `SELECT * FROM Candidate
    WHERE uid='${uid}'`;
  const candidate = await new Promise((resolve) => {
    database.query(query, (error, result) => {
      if (error) throw error;
      resolve(result[0]);
    });
  });
  return candidate;
};

module.exports = { findCandidateByUid };
