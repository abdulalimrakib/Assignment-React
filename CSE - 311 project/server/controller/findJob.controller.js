const database = require("../config/DBConfig");

const findJobById = async (jid) => {
  const query = `SELECT * FROM Job
    WHERE jid='${jid}'`;
  const job = await new Promise((resolve) => {
    database.query(query, (error, result) => {
      if (error) throw error;
      resolve(result[0]);
    });
  });
  return job;
};

const findByRecruiter = async (uid) => {
  const query = `SELECT * FROM Job
    WHERE addedBy='${uid}'`;
  const jobs = await new Promise((resolve) => {
    database.query(query, (error, result) => {
      if (error) throw error;
      resolve(result);
    });
  });
  return jobs;
};

const findByLocation = async (location, tag) => {
  let query = `SELECT * FROM Job
    WHERE location = '${location}'`;
  if (tag) {
    query += ` AND tag='${tag}'`;
  }
  const jobs = await new Promise((resolve) => {
    database.query(query, (error, result) => {
      if (error) throw error;
      resolve(result);
    });
  });
  return jobs;
};

module.exports = { findJobById, findByRecruiter, findByLocation };
