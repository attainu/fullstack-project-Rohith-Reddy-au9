const express = require('express')
const router = express.Router()


router.get("/userinfo", (req, res) => {
    res.json({
      data: "hey you hit node API of userInfo",
    });
  });

module.exports = router