const router = require("express").Router();

const {
  MSG_INTERNAL_ERROR,
  MSG_DATA_INSUFFICIENT_ERROR,
  MSG_INVALID_CREDS,
} = require("../config/statasMassage");

const { findUserById } = require("./findUser.controller");

router.get("/:id", async (req, res) => {
  const responseData = {
    status: "failed",
    message: MSG_INTERNAL_ERROR,
  };

  try {
    const id = req.params.id;
    console.log(id);
    if (!id) throw Error(MSG_DATA_INSUFFICIENT_ERROR);

    const user = await findUserById(parseInt(id));
    console.log(user);
    if (!user) throw Error(MSG_INVALID_CREDS);

    responseData.status = "success";
    responseData.message = "success";

    responseData.data = {
      ...user,
    };
  } catch (error) {
    responseData.status = "failed";
    responseData.message = error.message;
  } finally {
    res.json(responseData);
  }
});

module.exports = router;
