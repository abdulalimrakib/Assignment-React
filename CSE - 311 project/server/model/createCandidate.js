const database = require("../config/DBConfig")

const createCandidate = async(candidateData) => {
    const query = `INSERT INTO Candidate (uid, dob, experience, highestEducation) 
      VALUES (
        '${candidateData.uid}', 
        '${candidateData.dob}',
        '${candidateData.experience}',
        '${candidateData.highestEducation}'
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
  }

  module.exports = createCandidate