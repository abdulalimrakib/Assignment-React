const database = require("./DBConfig");

database.connect((err) => {
  if (err) console.log("error");
  else {
    const createAccountTableQuery = `CREATE TABLE IF NOT EXISTS Account(
            uid INT AUTO_INCREMENT NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            token VARCHAR(16) NOT NULL UNIQUE,
            PRIMARY KEY(uid)
          )`;

    const createUserTableQuery = `CREATE TABLE IF NOT EXISTS User(
            uid INT NOT NULL UNIQUE,
            name VARCHAR(255) NOT NULL,
            mobile BIGINT NOT NULL,
            role VARCHAR(50) NOT NULL,
            address VARCHAR(600) NOT NULL,
            FOREIGN KEY (uid) REFERENCES Account(uid)
          )`;

    const createCandidateTableQuery = `CREATE TABLE IF NOT EXISTS Candidate(
            uid INT NOT NULL UNIQUE,
            dob DATE NOT NULL,
            experience INT NOT NULL,
            highestEducation VARCHAR(255) NOT NULL,
            FOREIGN KEY (uid) REFERENCES Account(uid)
          )`;

    const createRecruiterTableQuery = `CREATE TABLE IF NOT EXISTS Recruiter(
            uid INT NOT NULL UNIQUE,
            position VARCHAR(255) NOT NULL,
            company VARCHAR(255) NOT NULL,
            FOREIGN KEY (uid) REFERENCES Account(uid)
          )`;

    const createJobTableQuery = `CREATE TABLE IF NOT EXISTS Job(
            jid INT AUTO_INCREMENT,
            addedBy INT NOT NULL,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(600) NOT NULL,
            location VARCHAR(600) NOT NULL,
            salaryFrom int DEFAULT null,
            salaryTo int DEFAULT null,
            expired BOOL DEFAULT false,
            PRIMARY KEY (jid),
            FOREIGN KEY (addedBy) REFERENCES Account(uid)
          )`;

    const createApplicationTableQuery = `CREATE TABLE IF NOT EXISTS Application(
            id INT AUTO_INCREMENT NOT NULL,
            jid INT NOT NULL,
            uid INT NOT NULL,
            message VARCHAR(1200),
            PRIMARY KEY (id),
            FOREIGN KEY (uid) REFERENCES Account(uid),
            FOREIGN KEY (jid) REFERENCES Job(jid)
          )`;

    database.query(createAccountTableQuery, (err) => {
      if (err) {
        console.log("Error creating account table :", err);
      } else {
        console.log("Account table created successfully");
      }
    });
    database.query(createUserTableQuery, (err) => {
      if (err) {
        console.log("Error creating user table :", err);
      } else {
        console.log("User table created successfully");
      }
    });
    database.query(createCandidateTableQuery, (err) => {
      if (err) {
        console.log("Error creating candidate table :", err);
      } else {
        console.log("Candidate table created successfully");
      }
    });
    database.query(createRecruiterTableQuery, (err) => {
      if (err) {
        console.log("Error creating reqruiter table :", err);
      } else {
        console.log("Reqruiter table created successfully");
      }
    });
    database.query(createJobTableQuery, (err) => {
      if (err) {
        console.log("Error creating job table :", err);
      } else {
        console.log("Job table created successfully");
      }
    });
    database.query(createApplicationTableQuery, (err) => {
      if (err) {
        console.log("Error creating application table :", err);
      } else {
        console.log("Application table created successfully");
      }
    });
  }
});
