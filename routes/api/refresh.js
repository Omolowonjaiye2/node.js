const express = require("express");
const router = express.Router();
const refreshTokenController = require("../../public/controllers/refreshTokenController");

router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;