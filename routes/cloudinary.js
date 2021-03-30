const express = require("express");
const router = express.Router();

// middlewares
const {authCheck, adminCheck} = require("../middleware/auth")

const {upload, remove} = require("../controller/cloudinary")

router.post('/uploadimages', authCheck, adminCheck, upload)
router.post('/deleteimages', authCheck, adminCheck, remove)


module.exports = router