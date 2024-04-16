const database = require("../config/DBConfig");
const createJob = require("../model/createJob");

const {
  MSG_DATA_INSUFFICIENT_ERROR,
  MSG_DUPLICATE_EMAIL_ERROR,
  MSG_INTERNAL_ERROR,
  MSG_SIGNUP_SUCCESS,
  MSG_INVALID_CREDS,
  MSG_LOGIN_SUCCESS,
} = require("../config/statasMassage");

const getAllJobs = async (req, res) => {
  const responseData = {
    status: "failed",
  };

  try {
    const query = `SELECT * FROM Job
    WHERE expired = 'false'`;

    const jobs = await new Promise((resolve) => {
      database.query(query, (error, result) => {
        if (error) throw error;
        resolve(result);
      });
    });

    (responseData.status = "success"), (responseData.data = jobs);
  } catch (error) {
    responseData.status = "failed";
  } finally {
    res.json(responseData);
  }
};

const postJob = async (req, res) => {
  console.log(req.user.uid);
  const responseData = {
    status: "failed",
    message: MSG_DATA_INSUFFICIENT_ERROR,
  };

  try {
    const {
      title,
      description,
      location,
      salary,
      salaryFrom,
      salaryTo,
      tag,
      expired,
    } = req.body;

    if (!title || !description || !location) {
      throw Error(MSG_DATA_INSUFFICIENT_ERROR);
    }

    const job = await createJob({
      addedBy: req.user.uid,
      title,
      description,
      location,
      salary,
      salaryFrom,
      salaryTo,
      tag,
      expired,
    });

    console.log(job);
    if (!job) throw Error(MSG_INTERNAL_ERROR);

    responseData.status = "success";
    responseData.message = "";
    responseData.data = job;
  } catch (error) {
    responseData.status = "failed";
    responseData.message = error.message;
  } finally {
    res.json(responseData);
  }
};

const getMyJobs = async (req, res) => {
  const responseData = {
    status: "failed",
  };

  try {
    const { uid } = req.user;

    const query = `SELECT * FROM Job
    WHERE addedBy = ${uid}`;

    const jobs = await new Promise((resolve) => {
      database.query(query, (error, result) => {
        if (error) throw error;
        resolve(result);
      });
    });

    (responseData.status = "success"), (responseData.data = jobs);
  } catch (error) {
    responseData.status = "failed";
  } finally {
    res.json(responseData);
  }
};

const updateJob = async (req, res) => {
  const responseData = {
    status: "failed",
  };

  try {
    const { jid } = req.params;

    const selectQuery = `SELECT * FROM Job WHERE jid = ${jid}`;

    let job = await new Promise((resolve, reject) => {
      database.query(selectQuery, (error, result) => {
        if (error) reject(error);
        resolve(result[0]);
      });
    });

    if (!job) throw new Error(MSG_INTERNAL_ERROR);
    else {
      const updateQuery = `UPDATE Job SET title = ?, description = ?, location = ?, salaryFrom = ?, salaryTo = ?, expired = ? WHERE jid = ${jid}`;

      await new Promise((resolve, reject) => {
        database.query(
          updateQuery,
          [
            req.body.title,
            req.body.description,
            req.body.location,
            req.body.salaryFrom,
            req.body.salaryTo,
            req.body.expired,
          ],
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        );
      });

      responseData.status = "success";
      responseData.message = "Updated";
    }
  } catch (error) {
    responseData.message = error.message;
  } finally {
    res.json(responseData);
  }
};

const deleteJob = async (req, res) => {
  const responseData = {
    status: "failed",
  };

  try {
    const { jid } = req.params;

    const selectQuery = `SELECT * FROM Job WHERE jid = ${jid}`;

    let job = await new Promise((resolve, reject) => {
      database.query(selectQuery, (error, result) => {
        if (error) reject(error);
        resolve(result[0]);
      });
    });

    if (!job) throw new Error(MSG_INTERNAL_ERROR);
    else {
      const deleteQuery = `DELETE FROM Job WHERE jid = ${jid}`;

      await new Promise((resolve, reject) => {
        database.query(deleteQuery, (error, result) => {
          if (error) reject(error);
          resolve(result);
        });
      });

      responseData.status = "success";
      responseData.message = "Deleted";
    }
  } catch (error) {
    responseData.message = error.message;
  } finally {
    res.json(responseData);
  }
};

module.exports = { getAllJobs, postJob, getMyJobs, updateJob, deleteJob };
