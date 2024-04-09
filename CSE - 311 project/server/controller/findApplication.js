const database = require("../config/DBConfig");

const findApplicationById = async (id) => {
  const query = `SELECT * FROM Application
    WHERE id='${id}'`;
  const applications = await new Promise((resolve) => {
    database.query(query, (error, result) => {
      if (error) throw error;
      resolve(result[0]);
    });
  });
  return applications;
};

const findApplicationByJid = async (jid) => {
  const query = `SELECT * FROM Application
    WHERE jid='${jid}'`;
  const applications = await new Promise((resolve) => {
    database.query(query, (error, result) => {
      if (error) throw error;
      resolve(result);
    });
  });
  return applications;
};

const findApplicationByUid = async (uid) => {
  const query = `SELECT * FROM Application
    WHERE uid='${uid}'`;
  const applications = await new Promise((resolve) => {
    database.query(query, (error, result) => {
      if (error) throw error;
      resolve(result);
    });
  });
  return applications;
};

const updateApplicationStatus = async (id, status, message) => {
    const query = `UPDATE Application
    SET status = '${status}', message='${message}'
    WHERE id='${id}'`;
    const success = await new Promise((resolve) => {
        database.query(query, (error) => {
        if (error) throw error;
        resolve(true);
      });
    });
    return success;
  }

const findApplicationInterviews = async (uid) => {
  const query = `SELECT * FROM Application
    WHERE uid='${uid}' AND status='${1}'`;
  const interviews = await new Promise((resolve) => {
    database.query(query, (error, result) => {
      if (error) throw error;
      resolve(result);
    });
  });
  return interviews;
};

module.exports = {
  findApplicationById,
  findApplicationByJid,
  findApplicationByUid,
  findApplicationInterviews,
  updateApplicationStatus
};
