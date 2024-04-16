const database = require("../config/DBConfig");
const {
  MSG_DATA_INSUFFICIENT_ERROR,
  MSG_DUPLICATE_EMAIL_ERROR,
  MSG_INTERNAL_ERROR,
  MSG_SIGNUP_SUCCESS,
  MSG_INVALID_CREDS,
  MSG_LOGIN_SUCCESS,
} = require("../config/statasMassage");

const recruiterGetApplicants = async (req, res) => {
  const responseData = {
    status: "failed",
    message: MSG_INTERNAL_ERROR,
  };

  try {
    const { jid } = req.params;

    const selectQuery = `SELECT * FROM Job WHERE jid = ${jid}`;

    let job = await new Promise((resolve) => {
      database.query(selectQuery, (error, result) => {
        resolve(result[0]);
      });
    });
    if (!job) throw new Error(MSG_INTERNAL_ERROR);

    const query = `SELECT * FROM Application
    WHERE jid='${jid}'`;

    const applications = await new Promise((resolve) => {
      database.query(query, (error, result) => {
        if (error) throw error;
        resolve(result);
      });
    });

    job.applications = [];
    if (applications) {
      job.applications = await Promise.all(
        applications.map(async (application) => {
          const userQuery = `SELECT * FROM User
          WHERE uid = '${application.uid}'`;
          const user = await new Promise((resolve) => {
            database.query(userQuery, (error, result) => {
              if (error) throw error;
              resolve(result[0]);
            });
          });

          const candidateQuery = `SELECT * FROM Candidate
            WHERE uid='${application.uid}';`;
          const candidate = await new Promise((resolve) => {
            database.query(candidateQuery, (error, result) => {
              if (error) throw error;
              resolve(result[0]);
            });
          });

          return {
            ...application,
            ...user,
            ...candidate,
          };
        })
      );
    }

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

const applicantGetApplicants = async (req, res) => {
  const responseData = {
    status: "failed",
    message: MSG_INTERNAL_ERROR,
  };

  try {
    const { uid } = req.user;
    console.log(uid);

    const query = `SELECT * FROM Application
      WHERE uid='${uid}'`;

    const applications = await new Promise((resolve) => {
      database.query(query, (error, result) => {
        if (error) throw error;
        resolve(result);
      });
    });

    responseData.status = "success";
    responseData.message = "";
    responseData.data = applications;
  } catch (error) {
    responseData.status = "failed";
    responseData.message = error.message;
  } finally {
    res.json(responseData);
  }
};

const applicantDeleteApllication = async (req, res) => {
  const responseData = {
    status: "failed",
  };
  try {
    const { aid } = req.params;

    const selectQuery = `SELECT * FROM Application WHERE id = ${aid}`;

    let application = await new Promise((resolve, reject) => {
      database.query(selectQuery, (error, result) => {
        if (error) reject(error);
        resolve(result[0]);
      });
    });
    if (!application) throw new Error(MSG_INTERNAL_ERROR);
    else {
      const deleteQuery = `DELETE FROM Application WHERE id = ${aid}`;

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

const postApllication = async (req, res) => {
  const responseObject = {
    status: "failed",
    message: MSG_INTERNAL_ERROR,
  };
  try {
    const { jid } = req.params;
    console.log(jid);
    console.log(req.user.uid);

    const query = `INSERT INTO Application (jid, uid, message) 
      VALUES (
        '${jid}', 
        '${req.user.uid}',
        '${req.body.message}'
      )
    `;

    const applicationId = await new Promise((resolve) => {
      database.query(query, (error, result) => {
        if (error) throw error;
        resolve(result.insertId);
      });
    });
    if (!applicationId) throw Error(MSG_INTERNAL_ERROR);

    responseObject.status = "success";
    responseObject.message = "";
  } catch (error) {
    responseObject.status = "failed";
    responseObject.message = error.message;
  } finally {
    res.json(responseObject);
  }
};

module.exports = {
  recruiterGetApplicants,
  applicantGetApplicants,
  applicantDeleteApllication,
  postApllication,
};
